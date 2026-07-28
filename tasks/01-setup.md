# Task 01 — Setup & Foundation

## Goal
Setup project Vite + React + TypeScript beserta seluruh dependencies dan design system.

## Checklist

### 1.1 Init Project
- [ ] `npm create vite@latest . -- --template react-ts`
- [ ] Pastikan working directory adalah `D:\my-project\undangan-nikah`
- [ ] Hapus boilerplate files (`App.css`, `assets/`, default content)

### 1.2 Install Dependencies
- [ ] `npm install motion lenis react-hook-form zod @hookform/resolvers yet-another-react-lightbox lucide-react`
- [ ] `npm install -D tailwindcss @tailwindcss/vite`

### 1.3 Setup Tailwind CSS
- [ ] Tambahkan plugin `@tailwindcss/vite` di `vite.config.ts`
- [ ] Import `@import "tailwindcss"` di `src/index.css`
- [ ] Hapus default styling dari boilerplate

### 1.4 Setup Design Tokens (CSS Variables)
- [ ] Buat `src/styles/tokens.css` dengan earth tone palette:
  - Background: `#FAF6F0` (Warm Linen)
  - Surface: `#F0E6D8` (Sand Dune)
  - Text: `#3A2A1E` (Deep Umber)
  - Muted: `#8A7565` (Warm Stone)
  - Accent: `#C2714F` (Terracotta)
  - Secondary: `#8B9E79` (Sage Green)
  - Tertiary: `#C4996B` (Dusty Ochre)
  - Dark: `#2C1E14` (Espresso)
- [ ] Tambahkan gradients, shadows, spacing tokens
- [ ] Import `tokens.css` di `src/index.css`

### 1.5 Setup Google Fonts
- [ ] Tambahkan import Google Fonts di `index.html`:
  - Cormorant Garamond (300-700)
  - Lato (300, 400, 700)
  - Great Vibes (400)
- [ ] Set CSS variables untuk font families di tokens

### 1.6 Folder Structure
- [ ] Buat folder structure:
  ```
  src/
  ├── components/
  │   ├── cover/
  │   ├── mempelai/
  │   ├── event/
  │   ├── love-story/
  │   ├── gallery/
  │   ├── rsvp/
  │   ├── guestbook/
  │   ├── gift/
  │   ├── maps/
  │   └── shared/
  ├── hooks/
  ├── lib/
  ├── styles/
  └── types/
  ```

### 1.7 Base Files
- [ ] Buat `src/types/index.ts` — type definitions untuk Invitation, Guest, Wish, RSVP
- [ ] Buat `src/lib/constants.ts` — placeholder data mempelai, event info
- [ ] Buat `src/lib/utils.ts` — helper functions (formatDate, generateSlug, dll)

## Verification
- [ ] `npm run dev` berhasil start tanpa error
- [ ] Halaman localhost menampilkan background warm linen `#FAF6F0`
- [ ] Font Cormorant Garamond & Lato ter-load dengan benar
- [ ] Tailwind utility classes berfungsi
