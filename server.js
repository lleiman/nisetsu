const express = require('express');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.EDIT_PASSWORD || 'Ци';
const SESSION_SECRET = process.env.SESSION_SECRET ||
  crypto.randomBytes(32).toString('hex');
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '256kb' }));

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return Object.fromEntries(
    header.split(';').map(p => p.trim()).filter(Boolean).map(p => {
      const idx = p.indexOf('=');
      return [p.slice(0, idx), decodeURIComponent(p.slice(idx + 1))];
    })
  );
}

function sign(value) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('hex');
}

function isAuthed(req) {
  const cookies = parseCookies(req);
  const token = cookies.nisetsu_edit;
  if (!token) return false;
  const [value, sig] = token.split('.');
  if (value !== 'ok' || !sig) return false;
  const expected = sign(value);
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

function requireAuth(req, res, next) {
  if (!isAuthed(req)) return res.status(401).json({ ok: false });
  next();
}

async function readContent() {
  try {
    return JSON.parse(await fsp.readFile(CONTENT_FILE, 'utf-8'));
  } catch {
    return { texts: {}, images: {} };
  }
}

async function writeContent(content) {
  await fsp.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
}

app.post('/api/auth', (req, res) => {
  const provided = String(req.body?.password ?? '');
  const expected = PASSWORD;
  const a = Buffer.from(provided.normalize('NFC'));
  const b = Buffer.from(expected.normalize('NFC'));
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) return res.status(401).json({ ok: false });
  const token = `ok.${sign('ok')}`;
  res.setHeader('Set-Cookie',
    `nisetsu_edit=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 7}`
  );
  res.json({ ok: true });
});

app.post('/api/logout', (req, res) => {
  res.setHeader('Set-Cookie', 'nisetsu_edit=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
  res.json({ ok: true });
});

app.get('/api/content', async (req, res) => {
  res.json(await readContent());
});

app.post('/api/content', requireAuth, async (req, res) => {
  const current = await readContent();
  const incoming = req.body || {};
  current.texts = { ...current.texts, ...(incoming.texts || {}) };
  current.images = { ...current.images, ...(incoming.images || {}) };
  for (const k of Object.keys(current.texts)) {
    if (current.texts[k] === null) delete current.texts[k];
  }
  for (const k of Object.keys(current.images)) {
    if (current.images[k] === null) delete current.images[k];
  }
  await writeContent(current);
  res.json({ ok: true });
});

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => {
      const ext = (path.extname(file.originalname) || '.jpg').toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) return cb(null, true);
    cb(new Error('Only images allowed'));
  },
});

app.post('/api/upload', requireAuth, upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false });
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.use('/uploads', express.static(UPLOADS_DIR, {
  maxAge: '7d',
  immutable: true,
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

// Catch-all: any non-API, non-static GET returns the landing page.
// Prevents "Cannot GET /products/kuro" — all routes resolve client-side.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NISETSU listening on :${PORT}`);
  console.log(`Data dir: ${DATA_DIR}`);
});
