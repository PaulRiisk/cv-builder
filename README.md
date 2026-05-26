# CV Builder

A small open-source web tool to build a CV with a live A4 preview and PDF
export. Single-file, single-user, no backend.

- Fill the form on the left, see a live A4 preview on the right.
- Switch between Blue / Teal / Rust theme presets, or pick a custom accent
  color.
- Save your data to a JSON file, load it back later.
- Export the preview as an A4 PDF.

Your data is auto-saved to the browser's `localStorage`. The profile photo
is never persisted — you re-upload it after loading a saved file.

## Setup

Requirements: Node 18+.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (typically <http://localhost:5173/>).

## Build

```bash
npm run build
```

Static output goes to `dist/` and can be deployed to any static host.

## Deploy to GitHub Pages

A workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` to
GitHub Pages on every push to `main`. Enable Pages in the repository
settings with "GitHub Actions" as the source.

If your repo is hosted at `https://<user>.github.io/<repo>/`, set the Vite
base path before deploying — adjust `base` in `vite.config.ts` to match the
repo name (or leave the default `/` for a custom domain or user/organization
site).

## Tech

React + TypeScript + Vite, plain CSS with CSS variables, html2pdf.js for
export. State lives in a single `useReducer` exposed via Context.

## License

MIT
