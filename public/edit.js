/* NISETSU — edit-mode client
 *
 * Auto-discovers editable elements after DOM is parsed. Each text-bearing
 * leaf element gets a stable `data-nedit-text` id (sequential), each known
 * visual slot gets `data-nedit-image`. Content overrides are fetched on load
 * and re-applied on every page view. Edit mode is gated by a server-checked
 * password; only authenticated users can persist changes.
 */

(function () {
  'use strict';

  const TEXT_SELECTORS = [
    'h1', 'h2', 'h3', 'h4',
    'p',
    '.nav__link', '.nav__util-link', '.nav__wordmark-main', '.nav__wordmark-est',
    '.utility-bar__shipping', '.utility-bar__lang',
    '.hero__eyebrow', '.hero__bottom',
    '.btn',
    '.product__name', '.product__materials', '.product__price', '.product__view',
    '.product__tag',
    '.section-num', '.section-label',
    '.spotlight__title', '.spotlight__body', '.spotlight__detail-label',
    '.spotlight__detail-value',
    '.craft__num', '.craft__material-title', '.craft__material-body',
    '.craft__intro', '.craft__attribution',
    '.master__name', '.master__bio', '.master__quote', '.master__attribution',
    '.article__title', '.article__excerpt', '.article__meta',
    '.journal__head',
    '.newsletter__title', '.newsletter__pitch', '.newsletter__small',
    '.footer__col-title', '.footer__brand-line', '.footer__bottom',
    'a', 'span', 'li', 'label', 'small', 'blockquote',
  ];

  // Image slots: classes from the prototype that currently hold SVG placeholders
  const IMAGE_SLOT_SELECTORS = [
    '.hero__panel',
    '.product__image',
    '.spotlight__image',
    '.master__portrait',
    '.article__thumb',
  ];

  const PASSWORD_HINT = 'Cmd/Ctrl + Shift + E · ателье';

  let editMode = false;
  let pending = { texts: {}, images: {} };
  let dirty = false;

  // ---------------------------------------------------------------------------
  // Discovery
  // ---------------------------------------------------------------------------

  function hasDirectText(el) {
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
    }
    return false;
  }

  function isInsideEditUI(el) {
    return el.closest('.nisetsu-edit-overlay, .nisetsu-edit-toolbar');
  }

  function tagTextElements() {
    const seen = new Set();
    const matches = document.querySelectorAll(TEXT_SELECTORS.join(','));
    let idx = 0;
    matches.forEach((el) => {
      if (seen.has(el)) return;
      if (isInsideEditUI(el)) return;
      if (!hasDirectText(el)) return;
      // Skip elements whose direct text is empty after trim
      seen.add(el);
      el.setAttribute('data-nedit-text', `t${idx}`);
      idx++;
    });
    return idx;
  }

  function tagImageSlots() {
    const slots = document.querySelectorAll(IMAGE_SLOT_SELECTORS.join(','));
    slots.forEach((el, i) => {
      el.setAttribute('data-nedit-image', `i${i}`);
    });
    return slots.length;
  }

  // ---------------------------------------------------------------------------
  // Apply overrides from server
  // ---------------------------------------------------------------------------

  async function applyOverrides() {
    try {
      const res = await fetch('/api/content', { credentials: 'same-origin' });
      if (!res.ok) return;
      const content = await res.json();
      for (const [id, value] of Object.entries(content.texts || {})) {
        const el = document.querySelector(`[data-nedit-text="${id}"]`);
        if (!el) continue;
        // Preserve child elements (like <em> for italic) — only replace if
        // the saved value contains markup. Otherwise, replace only the direct
        // text node, leaving children intact.
        replaceDirectText(el, value);
      }
      for (const [id, url] of Object.entries(content.images || {})) {
        const el = document.querySelector(`[data-nedit-image="${id}"]`);
        if (!el) continue;
        setSlotImage(el, url);
      }
    } catch (err) {
      console.warn('Failed to load content overrides:', err);
    }
  }

  function replaceDirectText(el, value) {
    // If element has only text children, just set textContent
    const hasElementChildren = Array.from(el.childNodes).some(
      (n) => n.nodeType === Node.ELEMENT_NODE
    );
    if (!hasElementChildren) {
      el.textContent = value;
      return;
    }
    // If it has element children too, replace the first text node only.
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = value;
        return;
      }
    }
    // Fallback: prepend a text node
    el.insertBefore(document.createTextNode(value), el.firstChild);
  }

  function setSlotImage(el, url) {
    el.classList.add('has-photo');
    let img = el.querySelector('img.nisetsu-edit-uploaded');
    if (!img) {
      img = document.createElement('img');
      img.className = 'nisetsu-edit-uploaded';
      img.alt = '';
      el.appendChild(img);
    }
    img.src = url;
  }

  // ---------------------------------------------------------------------------
  // Auth + edit-mode lifecycle
  // ---------------------------------------------------------------------------

  function showPasswordPrompt() {
    if (document.querySelector('.nisetsu-edit-overlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'nisetsu-edit-overlay';
    overlay.innerHTML = `
      <form class="nisetsu-edit-prompt" autocomplete="off">
        <div class="nisetsu-edit-prompt__seal">二節</div>
        <div class="nisetsu-edit-prompt__label">Ателье · ключ</div>
        <input type="password"
               class="nisetsu-edit-prompt__input"
               placeholder="…"
               autocomplete="off"
               autofocus />
        <div class="nisetsu-edit-prompt__error" data-role="error"></div>
        <button type="submit" class="nisetsu-edit-prompt__btn">Войти</button>
        <div class="nisetsu-edit-prompt__hint">${PASSWORD_HINT}</div>
      </form>
    `;
    document.body.appendChild(overlay);

    const form = overlay.querySelector('form');
    const input = overlay.querySelector('input');
    const error = overlay.querySelector('[data-role="error"]');

    overlay.addEventListener('mousedown', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    document.addEventListener('keydown', escClose);
    function escClose(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', escClose);
      }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      error.textContent = '';
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ password: input.value }),
        });
        if (res.ok) {
          overlay.remove();
          document.removeEventListener('keydown', escClose);
          enterEditMode();
        } else {
          error.textContent = 'Не тот ключ.';
          input.value = '';
          input.focus();
        }
      } catch (err) {
        error.textContent = 'Сеть не отвечает.';
      }
    });
  }

  function enterEditMode() {
    if (editMode) return;
    editMode = true;
    document.body.classList.add('nisetsu-edit-mode');

    document.querySelectorAll('[data-nedit-text]').forEach((el) => {
      if (isInsideEditUI(el)) return;
      el.setAttribute('contenteditable', 'plaintext-only');
      el.addEventListener('input', onTextInput);
      el.addEventListener('focus', onTextFocus);
      el.addEventListener('blur', onTextBlur);
    });

    document.querySelectorAll('[data-nedit-image]').forEach((el) => {
      el.addEventListener('click', onImageClick);
    });

    // Block all link navigation while editing (pointer-events:none on <a>
    // doesn't stop propagation from children with pointer-events:auto)
    document.addEventListener('click', blockLinks, true);

    buildToolbar();
  }

  function blockLinks(e) {
    if (!editMode) return;
    const link = e.target.closest('a[href]');
    if (!link) return;
    if (link.closest('.nisetsu-edit-toolbar')) return;
    e.preventDefault();
  }

  function exitEditMode(silent = false) {
    if (!editMode) return;
    if (!silent && dirty && !confirm('Есть несохранённые правки. Выйти?')) return;
    editMode = false;
    document.body.classList.remove('nisetsu-edit-mode');

    document.querySelectorAll('[data-nedit-text]').forEach((el) => {
      el.removeAttribute('contenteditable');
      el.removeEventListener('input', onTextInput);
      el.removeEventListener('focus', onTextFocus);
      el.removeEventListener('blur', onTextBlur);
    });
    document.querySelectorAll('[data-nedit-image]').forEach((el) => {
      el.removeEventListener('click', onImageClick);
    });
    document.removeEventListener('click', blockLinks, true);

    const bar = document.querySelector('.nisetsu-edit-toolbar');
    if (bar) bar.remove();

    pending = { texts: {}, images: {} };
    dirty = false;
  }

  function onTextFocus(e) {
    e.currentTarget.dataset.neditOriginal = e.currentTarget.innerText;
  }

  function onTextBlur(e) {
    // No-op: input handler already captured the value
  }

  function onTextInput(e) {
    const el = e.currentTarget;
    const id = el.dataset.neditText;
    pending.texts[id] = el.innerText;
    markDirty();
  }

  function onImageClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const slot = e.currentTarget;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', async () => {
      if (!input.files || !input.files[0]) return;
      const fd = new FormData();
      fd.append('photo', input.files[0]);
      setStatus('Загрузка фото…');
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          credentials: 'same-origin',
          body: fd,
        });
        if (!res.ok) throw new Error('upload failed');
        const { url } = await res.json();
        pending.images[slot.dataset.neditImage] = url;
        setSlotImage(slot, url);
        markDirty();
      } catch (err) {
        setStatus('Не удалось загрузить', 'error');
      }
    });
    input.click();
  }

  // ---------------------------------------------------------------------------
  // Toolbar
  // ---------------------------------------------------------------------------

  function buildToolbar() {
    const bar = document.createElement('div');
    bar.className = 'nisetsu-edit-toolbar';
    bar.innerHTML = `
      <span class="nisetsu-edit-toolbar__status" data-role="status">Режим редактирования</span>
      <button type="button" class="nisetsu-edit-toolbar__btn" data-action="save">Сохранить</button>
      <button type="button" class="nisetsu-edit-toolbar__btn nisetsu-edit-toolbar__btn--ghost" data-action="exit">Выйти</button>
    `;
    document.body.appendChild(bar);
    bar.querySelector('[data-action="save"]').addEventListener('click', save);
    bar.querySelector('[data-action="exit"]').addEventListener('click', () => exitEditMode());
  }

  function setStatus(text, tone) {
    const status = document.querySelector('[data-role="status"]');
    if (!status) return;
    status.textContent = text;
    status.classList.remove('is-dirty', 'is-saved');
    if (tone === 'dirty') status.classList.add('is-dirty');
    if (tone === 'saved') status.classList.add('is-saved');
  }

  function markDirty() {
    dirty = true;
    setStatus('Несохранённые правки', 'dirty');
  }

  async function save() {
    if (!dirty) {
      setStatus('Нечего сохранять');
      return;
    }
    setStatus('Сохранение…');
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(pending),
      });
      if (!res.ok) throw new Error('save failed');
      pending = { texts: {}, images: {} };
      dirty = false;
      setStatus('Сохранено', 'saved');
      setTimeout(() => {
        if (!dirty) setStatus('Режим редактирования');
      }, 2400);
    } catch (err) {
      setStatus('Ошибка сохранения', 'error');
    }
  }

  // ---------------------------------------------------------------------------
  // Keyboard shortcut
  // ---------------------------------------------------------------------------

  function onKey(e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      if (editMode) {
        exitEditMode();
      } else {
        showPasswordPrompt();
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  function init() {
    tagTextElements();
    tagImageSlots();
    applyOverrides();
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
