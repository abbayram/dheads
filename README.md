# dickheads

Sculptural satire by SAKAT × KINAM. Built as a bilingual gallery/shop with inquiry-based acquisition.

## What is included

- 30 local demo objects so the site works before the CMS is connected
- DE/EN language switcher
- interactive object parade inspired by physical product displays
- catalogue with availability filters
- Vero-style object detail pages
- inquiry workflow without cart or visible prices
- events, collective page and German imprint
- Sanity Studio for adding, editing and deleting objects and events
- image gallery fields and a prepared `.glb` upload field
- static GitHub Pages deployment
- responsive layouts and reduced-motion support

## Run locally

Node.js 22 or newer is recommended.

```bash
npm install
npm run dev
```

The site opens at `http://localhost:4321/dheads/`.

Production check:

```bash
npm run build
npm run preview
```

## Content management

The public site works without external services. Until Sanity is connected it uses `src/data/sculptures.js` and `src/data/events.js`.

To enable the editor:

1. Create a project at Sanity.
2. Copy `.env.example` to `.env` and add the project ID.
3. Copy `studio/.env.example` to `studio/.env` and add the same project ID.
4. Install and open the Studio:

```bash
npm --prefix studio install
npm run studio
```

The Studio has three areas:

- **Objects** — title, status, bilingual copy, materials, dimensions, photography, gallery, home-page feature flag and order.
- **Events** — venue, public date label, bilingual copy and inquiry link.
- **Site settings** — reserved for contact and legal metadata.

The object editor already accepts `.glb` files. Phase 1 exposes a designed 3D placeholder on each object page. A real viewer can be enabled in phase 2 without changing the content model.

Publish the editor at a Sanity-hosted URL:

```bash
npm run studio:deploy
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

Add these optional repository secrets:

```text
PUBLIC_SANITY_PROJECT_ID
PUBLIC_SANITY_DATASET
```

If the CMS is connected, publishing content must trigger a fresh site build. The workflow accepts a `repository_dispatch` event named `sanity_update`, or it can be started manually from GitHub Actions. A Sanity webhook can call that dispatch after the GitHub token is configured.

Default preview URL:

```text
https://abbayram.github.io/dheads/
```

For the custom domain later:

```text
SITE_URL=https://dickheads.shop
SITE_BASE=/
```

## Replace before the public launch

Search the project for these placeholders:

- `studio@dickheads.shop` — temporary inquiry email
- `[VOLLSTÄNDIGER RECHTLICHER NAME]`
- `[STRASSE UND HAUSNUMMER]`
- `[PLZ]`
- `[VOLLSTÄNDIGER NAME DER VERANTWORTLICHEN PERSON]`
- placeholder Instagram link

The inquiry form currently opens the visitor's email app with a complete prefilled message. This is intentional for the GitHub Pages preview. It can later be connected to Formspree, a serverless function or a lightweight CRM inbox.

## Structure

```text
src/
├── components/
│   ├── ProductCard.astro
│   └── SculptureObject.astro
├── data/
│   ├── events.js
│   └── sculptures.js
├── layouts/Base.astro
├── lib/sanity.js
├── pages/
│   ├── object/[slug].astro
│   ├── 404.astro
│   ├── about.astro
│   ├── events.astro
│   ├── imprint.astro
│   ├── index.astro
│   ├── inquire.astro
│   └── objects.astro
└── styles/global.css

studio/
└── schemaTypes/
    ├── event.js
    ├── sculpture.js
    └── siteSettings.js
```
