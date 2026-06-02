# Personal Portfolio

Pixel-aesthetic personal portfolio built with **Tailwind CSS v4** and **GSAP** animations.
No CDN imports — everything is local and deployment-ready.

---

## Project Structure

```
portfolio/
├── index.html              ← Main entry point
├── styles/
│   ├── main.css            ← ALL design tokens + custom classes (single source of truth)
│   └── output.css          ← Compiled Tailwind output (do not edit manually)
├── sections/
│   └── hero.html           ← Hero section HTML snippet
│   └── (add more here)
├── js/
│   ├── main.js             ← Orchestrator: loads sections, triggers animations
│   └── animations/
│       └── hero.js         ← GSAP animations for the hero section
│       └── (add more here)
├── vendor/
│   └── gsap/               ← Local GSAP ESM package (no CDN)
└── assets/
    └── (place your images here)
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development (CSS watch mode)

```bash
npm run dev
```

Then open `index.html` in your browser via a local dev server.
> **Note:** Because sections are loaded via `fetch()`, you need a local server (not `file://`).
> Use VS Code's **Live Server** extension, or run:
> ```bash
> npx serve .
> ```

### 3. Build for production

```bash
npm run build
```

This minifies `styles/output.css` for deployment.

---

## Customisation Guide

### Changing your name
Open `sections/hero.html` and update the `<h1>` block.

### Changing skills
In `sections/hero.html`, edit the `.skill-chip` list items inside `.skills-grid`.

### Changing typewriter roles
In `js/animations/hero.js`, edit the `ROLES` array at the top of the file.

### Changing colors / fonts / spacing
Everything is in **`styles/main.css`** under `@theme { ... }`.
Change a variable there and it cascades everywhere automatically.
**Never add inline styles to HTML tags** — always add/edit a class in `main.css`.

### Adding your portrait
1. Place your image in `assets/portrait.png` (or any format).
2. In `sections/hero.html`, comment out the placeholder `<div>` and uncomment the `<img>` tag.
3. Update the `src` path if needed.

### Adding a new section
1. Create `sections/your-section.html`
2. Create `js/animations/your-section.js`
3. Add a mount point in `index.html`: `<div id="section-your-section"></div>`
4. In `js/main.js`, add to the `Promise.all` array:
   ```js
   loadSection("sections/your-section.html", "section-your-section"),
   ```
5. Import and call your animation after the `await`.

---

## Deployment

### Netlify / Vercel / GitHub Pages
1. Run `npm run build` first.
2. Deploy the entire folder (excluding `node_modules`).
3. No build command needed on the host — `output.css` is pre-compiled.

### `.gitignore` recommendation
```
node_modules/
```
Everything else (including `vendor/gsap/` and `styles/output.css`) should be committed
so the site works without running `npm install` on the host.
