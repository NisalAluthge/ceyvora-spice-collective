# Ceyvora Ceylon Spices — B2B Supply Chain Portal

A premium, luxury-styled B2B wholesale website for Ceyvora Ceylon Spices, targeting export houses. Built with React + Vite + Tailwind + shadcn/ui.

---

## 📑 Table of Contents
1. [Tech Stack](#tech-stack)
2. [Run Locally](#run-locally)
3. [Project Structure](#project-structure)
4. [Design System (colors / fonts)](#design-system)
5. [Page Sections — what to edit where](#page-sections)
6. [Common Edits (cheat-sheet)](#common-edits)
7. [Assets / Images](#assets)
8. [Build & Deploy](#build--deploy)

---

## Tech Stack
- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS v3** (semantic design tokens via CSS variables)
- **shadcn/ui** components (in `src/components/ui/`)
- **React Router v6** for routing
- **TanStack Query** for data fetching
- **Lucide React** for icons

---

## Run Locally
```bash
npm install
npm run dev      # starts dev server at http://localhost:8080
npm run build    # production build → /dist
npm run preview  # preview the production build
```

> Windows PowerShell users: if `npm` is blocked, run PowerShell as Admin once:
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

---

## Project Structure

```
ceyvora/
├── index.html                  # <title>, meta description, OG tags (SEO)
├── tailwind.config.ts          # Tailwind theme (colors, fonts, animations)
├── vite.config.ts              # Dev server (port 8080)
├── package.json                # Dependencies & scripts
│
├── public/
│   ├── robots.txt              # SEO crawler rules
│   └── placeholder.svg
│
└── src/
    ├── main.tsx                # App entry point
    ├── App.tsx                 # Router + global providers
    ├── index.css               # 🎨 Design tokens (HSL colors, gradients, shadows)
    │
    ├── pages/
    │   ├── Index.tsx           # Home page — assembles all sections in order
    │   └── NotFound.tsx        # 404 page
    │
    ├── components/
    │   ├── site/               # 👈 ALL CEYVORA SECTIONS LIVE HERE
    │   │   ├── Navbar.tsx          # Glassmorphism navbar + logo + menu
    │   │   ├── Hero.tsx            # Wide hero with cinnamon background
    │   │   ├── SpecsSection.tsx    # Bento grid — product specs / certifications
    │   │   ├── BondSection.tsx     # Founders' story (Nisal & Shashikala)
    │   │   ├── InquiryForm.tsx     # Wholesale inquiry form
    │   │   └── Footer.tsx          # Footer with logo, links, contact
    │   │
    │   ├── NavLink.tsx
    │   └── ui/                 # shadcn components (button, input, card, etc.)
    │
    ├── assets/                 # Images imported by components
    │   ├── ceyvora-logo.png        # Brand logo (used in Navbar + Footer)
    │   ├── hero-cinnamon.jpg       # Hero background
    │   ├── spice-pepper.jpg        # Pepper macro
    │   ├── spices-flatlay.jpg      # Bento grid image
    │   └── founders-hands.jpg      # Founders section
    │
    ├── hooks/
    │   ├── use-mobile.tsx          # Mobile breakpoint hook
    │   └── use-toast.ts            # Toast notifications
    │
    └── lib/
        └── utils.ts                # cn() helper for Tailwind classes
```

---

## Design System

### Colors (defined in `src/index.css`, mapped in `tailwind.config.ts`)
All colors are **HSL** semantic tokens — never hardcode hex in components.

| Token              | Value                  | Use                          |
|--------------------|------------------------|------------------------------|
| `background`       | Midnight Charcoal #121212 | Page background           |
| `foreground`       | Cream #FDFBF7          | Default text                 |
| `primary`          | Metallic Gold #C5A059  | Buttons, accents, headings   |
| `card`             | Cream #FDFBF7          | Card backgrounds             |
| `muted` / `border` | Subtle dark tones      | Dividers, secondary text     |

**Usage in components:**
```tsx
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground">
```

### Fonts
- Headings: serif (luxury feel) — set in `tailwind.config.ts` under `fontFamily.serif`
- Body: sans-serif — `fontFamily.sans`

To change the brand color or fonts, edit `src/index.css` (`:root { --primary: ... }`) and `tailwind.config.ts`.

---

## Page Sections

The home page (`src/pages/Index.tsx`) renders sections in this order:

| # | Section          | File                                    | What it contains                              |
|---|------------------|-----------------------------------------|-----------------------------------------------|
| 1 | **Navbar**       | `src/components/site/Navbar.tsx`        | Logo, nav menu links, glassmorphism effect    |
| 2 | **Hero**         | `src/components/site/Hero.tsx`          | Headline, sub-headline, CTA, cinnamon image   |
| 3 | **SpecsSection** | `src/components/site/SpecsSection.tsx`  | Bento grid: Alba Cinnamon, Black Pepper, SLS 81:2021 |
| 4 | **BondSection**  | `src/components/site/BondSection.tsx`   | Founders' mission — Nisal & Shashikala        |
| 5 | **InquiryForm**  | `src/components/site/InquiryForm.tsx`   | Wholesale form (volume, destination, etc.)    |
| 6 | **Footer**       | `src/components/site/Footer.tsx`        | Logo, links, copyright, contact info          |

To **reorder, remove, or add** a section, edit `src/pages/Index.tsx`.

---

## Common Edits

### ✏️ Change page title / SEO description
→ `index.html` — edit `<title>` and `<meta name="description">`.

### ✏️ Change hero headline / CTA text
→ `src/components/site/Hero.tsx` — edit the JSX text.

### ✏️ Change product specs (cinnamon / pepper details)
→ `src/components/site/SpecsSection.tsx`.

### ✏️ Change founders' story
→ `src/components/site/BondSection.tsx`.

### ✏️ Add / remove inquiry form fields
→ `src/components/site/InquiryForm.tsx` — copy an existing `<Input>` block.

### ✏️ Change navbar links
→ `src/components/site/Navbar.tsx` — edit the `navLinks` array.

### ✏️ Change brand color (gold)
→ `src/index.css` — change `--primary: 40 45% 57%;` (HSL).

### ✏️ Replace the logo
→ Drop new image at `src/assets/ceyvora-logo.png` (same filename) — auto-used in Navbar & Footer.

### ✏️ Replace hero / spice images
→ Replace the file in `src/assets/` keeping the same name, OR update the `import` in the component.

### ✏️ Add a new page
1. Create `src/pages/About.tsx`.
2. Add a route in `src/App.tsx` **above** the catch-all `*` route:
   ```tsx
   <Route path="/about" element={<About />} />
   ```

---

## Assets
All images live in `src/assets/` and are imported as ES modules:
```tsx
import logo from "@/assets/ceyvora-logo.png";
<img src={logo} alt="Ceyvora" />
```
The `@` alias maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`).

---

## Build & Deploy

```bash
npm run build     # outputs static site to /dist
```
Deploy `/dist` to any static host: Vercel, Netlify, Cloudflare Pages, GitHub Pages, or your own server.

From Lovable: click **Publish** (top-right) for a one-click hosted URL, or connect GitHub for full code ownership.

---

## Need help?
- Lovable docs: https://docs.lovable.dev
- Tailwind docs: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
