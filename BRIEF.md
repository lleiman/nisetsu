# NISETSU — design brief & handoff spec

Single-page landing prototype for **NISETSU (二節)** — an atelier for hand-finished training nunchaku, sold in numbered editions of 120. Positioned alongside refined heritage craft brands (Niwaki, Le Labo, Bottega Veneta, Aesop, Loewe Casa). Not positioned in the martial-arts gear category at all.

The file `nisetsu_landing.html` is the source of truth for visual decisions. This document captures the *why* behind those decisions, the tokens to extract, the assets to commission, and the scope for the full build.

---

## 1 · Brand identity

| | |
|---|---|
| Name | 二節 NISETSU |
| Reading | Nisetsu (Japanese for "two sections" — the literal word for nunchaku) |
| Established | 2026 |
| Locations | Atelier · Kyoto · Studio · Manila · Berlin |
| Positioning | Hand-finished objects of focus, made in editions of 120 |
| Voice | Quiet, certain, slightly archival. Never instructional. Never aggressive. |
| Adjacent references | Niwaki, Aesop, Bottega Veneta, Hermès objets, Loewe Casa, Le Labo, Bryan Raquin (knife maker), Best Made Co. heritage period |
| Anti-references | Anything tactical, "performance", or "training" coded. Gym, dojo websites, sporting goods. |

---

## 2 · Palette — Noir

Single source of truth — copy these tokens into the design system directly. Values match `:root` in the HTML.

```css
/* Surfaces — tonal gradation in dark */
--bg: #1A1814;        /* Page background — deep warm ink */
--bg-soft: #221E18;   /* Subtle raise — product cards, spotlight, journal */
--bg-deeper: #2E2820; /* Further raised — article thumbnails, product hover */

/* Ink — parchment family on dark */
--ink: #EFEBE3;       /* Primary text — warm parchment */
--ink-muted: #B5AC9E; /* Body copy */
--ink-quiet: #8A8175; /* Captions, micro labels */
--ink-faint: #5C5145; /* Disabled, very low emphasis */

/* Rules */
--rule: #3A332B;
--rule-soft: #2E2820;

/* Accent — brightened to cinnabar/copper for legibility on dark */
--accent: #C9622E;
--accent-soft: #E07A48;

/* Deepest panels — for hero photo, Craft section, footer */
--dark: #0F0D0A;
--dark-soft: #1E1A14;
--dark-ink: #EFEBE3;
--dark-muted: #B5AC9E;
--dark-quiet: #8A8175;

/* Product material colors — warmed for visibility on dark */
--wood-kuro: #6B4F36;
--wood-shiro: #C9BFA8;
--wood-shu: #A53324;
--metal-brass: #D4AC6E;
--metal-silver: #D5D0C5;
--metal-blackened: #5C5045;
```

**Rules of use.**

Accent copper (`--accent`) appears in only four places: nav-link hover, CTA hover, article category labels, master signature seal. Restraint is the design.

The page rhythm is built from a three-step tonal gradation, not from light/dark contrast. From shallowest to deepest:

| Tier | Value | Used in |
|---|---|---|
| Raised | `#2E2820` | Article thumbnails, product card hover state |
| Subtle raise | `#221E18` | Product image areas, Spotlight section, Journal section, Master portrait area |
| Page base | `#1A1814` | Default page, all editorial sections |
| Deepest | `#0F0D0A` | Hero product photo panel, The Craft section, footer |

Each "raised" section reads like cardstock lifted off the page. Each "deepest" section reads like a recessed display case. The eye perceives architecture without ever crossing a hard boundary.

**Inverted CTA.** Primary buttons use parchment background with dark ink text (the auto-inversion of `var(--ink)` and `var(--bg)`). On hover, the background shifts to copper accent. This is the only "light surface" on the page outside the SVG seal — and it carries weight precisely because of that scarcity.

---

## 3 · Typography

Two families, Google Fonts:

| Role | Family | Weights | Letter-spacing | Notes |
|---|---|---|---|---|
| Display | **Cormorant Garamond** | 300, 400, italic 300, italic 400 | -0.008em to -0.018em | Italic carries half the headlines — pair one straight line with one italic line in display |
| Body / UI | **Manrope** | 300, 400 | +0.005em normal, +0.22em to +0.32em on micro labels | Never use Inter. Manrope replaces it. |

**Scale (desktop):**

| Token | Size | Weight | Line-height | Used for |
|---|---|---|---|---|
| h1 hero | 80px | 300 | 1.02 | Hero only |
| h2 section | 44px | 300 | 1.05 | "Smoked for eight weeks", "Six months by two hands", "From the atelier" |
| h2 manifesto | 42px italic | 300 | 1.32 | Center-quoted manifesto |
| h3 article | 22px | 300 | 1.3 | Journal cards |
| Body | 14.5px | 300 | 1.7-1.85 | Default body, descriptions |
| Body small | 13.5px | 300 | 1.75 | Article excerpts |
| Caption | 12.5px | 300 | 1.7 | Material descriptions |
| Micro label | 10.5px | 400 | — | Tracked 0.26em, ALL CAPS — section numbers, edition info, captions |
| Nav | 11px | 400 | — | Tracked 0.22em, ALL CAPS |
| CTA | 10.5px | 400 | — | Tracked 0.28em, ALL CAPS |

**Italic discipline.** Every headline has one straight line and one italic line. This is the brand's signature typographic move. Examples in the prototype:
- "Two sections. / *One discipline.*"
- "Smoked for eight weeks, / *returned to oil.*"
- "Six months, / *by two hands.*"
- "Tarō Hashimoto has finished / *every pair.*"

Keep this pattern for any future headlines. It's the single move that distinguishes this voice from generic luxury copywriting.

---

## 4 · Layout system

```css
--container: 1320px;   /* Max content width */
--gutter: 36px;        /* Side gutters (desktop) — 20px mobile */
--section-pad: 112px;  /* Vertical section padding — 64px mobile */
```

Hairline rules between every section (0.5px `--rule`). These are part of the brand language — never remove.

**Mobile breakpoint:** `768px` and `900px` (some 2-col layouts stack at 900). Mobile is a stack of the same blocks — no separate mobile design. Test at 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone Plus).

---

## 5 · Sections — content map

The HTML has 11 sections in order. Below is what each one does and what content lives in it.

1. **Utility bar** — shipping line + language selector. Thin strip, 10.5px text.
2. **Main nav** — left links (Collection, Craft, Dojo, Journal), centered wordmark (二節 + NISETSU · EST. 2026), right utility (Search, Account, Cart).
3. **Hero** — Two columns. Left: edition label, headline ("Two sections. / *One discipline.*"), description, primary CTA + secondary link. Right: dark panel with product photo, edition number, fig caption, price.
4. **Manifesto** — centered italic statement. Currently: *"An object made not to be wielded often, but to be returned to."* Attributed to "the atelier notebook · Kyoto, March 2026". Change quarterly.
5. **Collection** — three products in a row: 黒 Kuro ($1,480), 白 Shiro ($1,720), 朱 Shu ($1,940). Each: edition tag, image, name (kanji + romaji italic), materials, price, "View →".
6. **Spotlight** — featured product band. Dark photo left, detailed text right. Currently spotlights Kuro. Should rotate per quarter or per inventory. Includes specs grid (Length, Weight, Cord, Finish) and primary acquire CTA.
7. **The Craft** — dark section, two columns. Left: intro headline ("Six months, / *by two hands.*"), atelier copy, master attribution. Right: three numbered material breakdowns (i. Wood, ii. Metal, iii. Cord).
8. **The Master** — editorial, two columns. Left: portrait area (commission photo). Right: section label, headline, two-paragraph bio, pull-quote, signature seal.
9. **Journal teaser** — three article cards. Categories: Atelier letter / Materials / On form. Each has thumbnail, category + date, title, two-line excerpt.
10. **Newsletter** — "The Letter", four times a year. Two columns: pitch left, signup right. Italic serif placeholder ("Your address").
11. **Footer** — dark, five columns: brand block + four nav columns (Shop / Atelier / Service / Follow) + bottom strip with copyright and legal.

---

## 6 · Assets to commission

The HTML currently uses SVG silhouettes as placeholders. Real photography is non-negotiable for the production site. Specifications:

### Product photography
- **Format:** 4:5 aspect ratio, 2400 × 3000px minimum
- **Setup:** Vertical hang from a brass hook against deep-ink backdrop (#0F0D0A, matching `--dark`). 60px breathing space around the object. Hard side-light from a tall window, no fill — directional light is what makes the object read in the dark frame.
- **Critical:** the photo backdrop must match `--dark` so the product reads as floating in the same dark space as the page itself, with no visible boundary between photo and surrounding UI. This is the central visual move of the Noir palette.
- **Quantity:** 3 hero shots per pair (front, detail, in-case), × 3 pairs = 9 hero shots. Plus 1 environmental shot per pair (in atelier setting).

### Master portrait
- **Format:** 3:4 aspect ratio
- **Setup:** Mid-work, hands visible, face not necessarily in full focus. Natural light from workshop window. Black-and-white or low-saturation color, never full-color.

### Journal thumbnails
- **Format:** 4:3 aspect ratio
- **Style:** Detail photography of materials, tools, or atelier scenes. Each article gets one. Quiet, almost archival.

### Signature seal
- The cinnabar seal (橋) currently rendered as SVG should be photographed from a real wax/ink impression once the master commits to a final character. The SVG is acceptable as fallback.

---

## 7 · Motion notes

The HTML has minimal CSS-driven animation only on hero entrance. The production build should add:

- **Staggered fade-up on first paint** for the hero text elements (already in HTML), and for first-fold visibility on all subsequent sections via intersection observer. Stagger: 120ms between sibling elements. Easing: `cubic-bezier(0.16, 1, 0.3, 1)`. Duration: 900ms. Translate: 12-16px.
- **Product hover:** image background lifts to `--bg-deeper`, SVG/image scales to 1.04x over 800ms.
- **Hairline rules:** on scroll-in, animate `transform: scaleX(0) → 1` from left, 1200ms, ease-out-quart. Subtle but felt.
- **Headlines with italic break:** option to delay the italic span by 200ms vs the straight line — italic word appears slightly after, like a thought completing.
- **Cursor:** keep default. Custom cursors break the restraint.
- **Page transitions:** if SPA, use a 240ms fade with a 60ms hold on white-noise (the page color `--bg`). No fancy reveals.

Avoid: parallax, scroll-snapping, scroll-tied animations beyond fade-in, any "ribbon" or "trail" cursor effects.

---

## 8 · Tech stack recommendation

The site is content-heavy but mostly static. Recommend:

- **Framework:** Astro (preferred) or Eleventy. Both give near-static output, MDX support for journal, and zero runtime overhead. SvelteKit also works if a shop with cart state is needed early.
- **Commerce:** Shopify (Hydrogen) if real transactions, or Stripe + Snipcart for a lighter setup. Either headless — the storefront is the design above, not Shopify defaults.
- **CMS for journal:** Sanity or Tina. Markdown in repo also fine for a small atelier.
- **Hosting:** Vercel or Netlify. Edge for SEO localization (EN / JP / 中文 — see utility bar).
- **Fonts:** Self-host the Cormorant Garamond and Manrope files (download from Google Fonts, serve as woff2 with `font-display: swap` and preload the two display weights). The CDN call in the prototype is a placeholder.

---

## 9 · Pages to build beyond the landing

The landing references these — Claude Code should scaffold them next:

- `/collection` — full collection grid (filterable by edition status, material)
- `/products/[slug]` — product detail pages for Kuro, Shiro, Shu. Long-form: material story, master's notes, dimensions, what comes in the case, certificate of authenticity, edition availability
- `/craft` — long-form essay version of section 7, with detailed process photography
- `/master` — extended biography page, lineage, philosophy
- `/journal` — full journal index, individual `/journal/[slug]` entries
- `/dojo` — minimal page with curated training resources, short films, recommended dojos
- `/care` — care instructions, restoration program (lifetime — important for the brand promise)
- `/stockists` — list of physical retailers (if any)
- `/letter` — signup landing for newsletter with past archive
- `/account` + `/cart` + `/checkout` — commerce flow

Account-bound feature worth building: **authenticate edition by serial number** (e.g. `/authenticate/00112` returns a card with master's signature, finish date, materials, original buyer city). This is the kind of detail that justifies the price and seeds the secondary market.

---

## 10 · Things to NOT do

The brand restraint is the design. These will quietly destroy the positioning:

- No "shop now" buttons, no countdown timers, no "limited stock" urgency banners.
- No customer reviews or star ratings. Replace with private testimonials in the journal, attributed to single buyers by initials only.
- No social proof badges. No "as seen in" logos.
- No popup modals of any kind on first visit. Newsletter signup lives in its dedicated section.
- No chat widget.
- No promotional discounts, ever. The price is the price.
- No emoji anywhere on the site.
- No martial arts imagery. No kicks, no punches, no people swinging the object. The object exists at rest.
- No light-mode toggle. Noir is the only palette. The Spotlight, Collection, and Journal sections lift slightly off the page through tonal gradation — that is the rhythm, not a theme switch.
- No animation that calls attention to itself. The motion exists to confirm a choice was made, not to entertain.

---

## 11 · Open decisions for the founder

Things the prototype assumes that should be confirmed before launch:

- **Pricing.** $1,480 / $1,720 / $1,940 are placeholders. Confirm with margins on actual production cost.
- **Edition size.** 120 per pair is a design choice that gives "limited" without being unattainable. Adjustable.
- **Master attribution.** "Tarō Hashimoto" is a placeholder name. Real master's name, lineage, and signature character (橋 placeholder) must be confirmed.
- **Locations.** Kyoto / Manila / Berlin currently. Manila reflects the founder's base — confirm public attribution.
- **Currency.** USD throughout. Decide on JPY / EUR display logic per locale.
- **Legal.** Confirm that "training nunchaku" framing is acceptable in target markets. Some jurisdictions restrict — may need a "for export to permitted regions" footer notice.

---

## File checklist for handoff

- `nisetsu_landing.html` — the full prototype, single file, opens in any browser
- `nisetsu_brief.md` — this document

Both are self-contained and ready for Claude Code to expand into a production site.
