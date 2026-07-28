# Task 07 — Deploy & Launch

## Goal
Deploy frontend & backend, setup domain, performance optimization, dan final QA.

## Dependencies
- Task 06 selesai

## Checklist

### 7.1 Image Optimization
- [ ] Setup Cloudinary account (gratis)
- [ ] Buat `CLOUDINARY_URL` env variable
- [ ] Upload placeholder images ke Cloudinary
- [ ] Gunakan Cloudinary URL untuk semua images:
  - Auto format: `f_auto`
  - Auto quality: `q_auto`
  - Responsive resize: `w_auto`
- [ ] Compress cover/hero image < 200KB
- [ ] Pastikan semua gallery images WebP

### 7.2 Frontend Build Optimization
- [ ] Jalankan `npm run build` — pastikan tanpa error
- [ ] Cek bundle size: `npx vite-bundle-visualizer`
- [ ] Pastikan total bundle < 100KB gzipped
- [ ] Lazy load semua below-fold components:
  ```typescript
  const Gallery = lazy(() => import('./components/gallery/Gallery'))
  const RSVPForm = lazy(() => import('./components/rsvp/RSVPForm'))
  const Guestbook = lazy(() => import('./components/guestbook/Guestbook'))
  ```
- [ ] Add `<Suspense>` fallback untuk lazy components

### 7.3 Performance Optimization
- [ ] Tambahkan `fetchpriority="high"` pada hero/cover image
- [ ] Tambahkan `loading="lazy"` pada semua gambar below fold
- [ ] Set `width` & `height` pada semua `<img>` untuk prevent CLS
- [ ] Font loading: `font-display: swap` untuk semua Google Fonts
- [ ] Preconnect ke Google Fonts:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```
- [ ] Minify CSS & JS (otomatis via Vite build)
- [ ] Setup meta tags di `index.html`:
  - `<title>`: "Wedding of [Groom] & [Bride]"
  - `<meta name="description">`: "Undangan pernikahan [Groom] & [Bride]"
  - `<meta property="og:title">`, `og:description`, `og:image`
  - `<meta name="viewport">`: `width=device-width, initial-scale=1`

### 7.4 Deploy Backend
- [ ] Pilih platform: **Vercel Serverless** atau **Cloudflare Workers**
- [ ] Setup repository di GitHub
- [ ] Connect repo ke Vercel/Cloudflare
- [ ] Set environment variables:
  - `DATABASE_URL`
  - `CORS_ORIGIN` (frontend URL)
- [ ] Deploy & test API endpoints
- [ ] Catat backend URL (contoh: `api.example.com`)

### 7.5 Deploy Frontend
- [ ] Connect repo ke **Vercel**
- [ ] Set environment variables:
  - `VITE_API_URL` → backend URL
- [ ] Deploy automatic preview
- [ ] Test preview URL

### 7.6 Custom Domain (opsional)
- [ ] Beli domain (contoh: `nikah-budi-sarah.com`)
- [ ] Setup di Vercel: Settings → Domains → Add
- [ ] Update DNS records di domain registrar
- [ ] SSL otomatis via Vercel
- [ ] Update `VITE_API_URL` jika backend juga pakai custom domain

### 7.7 WhatsApp Distribution Setup
- [ ] Buat template pesan WhatsApp yang siap kirim
- [ ] Generate daftar link personalisasi:
  ```
  https://domain.com/inv?to=Budi+Santoso
  https://domain.com/inv?to=Rina+Wijaya
  https://domain.com/inv?to=Ahmad+Hidayat
  ```
- [ ] Export ke CSV untuk bulk send
- [ ] Test beberapa link di WhatsApp mobile

### 7.8 Final QA Checklist

#### Mobile Testing (PRIORITAS)
- [ ] iPhone SE (375px) — semua section tampil benar
- [ ] iPhone 14/15 (390px) — optimal
- [ ] Android mid-range (360-412px) — optimal
- [ ] Tap targets ≥ 44px
- [ ] Font ≥ 16px
- [ ] No horizontal scroll
- [ ] Smooth scroll berfungsi
- [ ] Animasi tidak lag
- [ ] Musik toggle berfungsi

#### Desktop Testing
- [ ] 1024px — layout berubah ke multi-column
- [ ] 1440px — max-width container terlihat baik
- [ ] Hover effects berfungsi
- [ ] Keyboard navigation (Tab, Enter, Escape)

#### Functionality Testing
- [ ] Cover: envelope animation OK
- [ ] Guest name personalization: `?to=Nama` berfungsi
- [ ] Countdown timer: akurat & real-time
- [ ] Gallery: lightbox buka/tutup OK
- [ ] RSVP: form submit → backend → success
- [ ] Guestbook: tampil data dari backend
- [ ] Amplop Digital: copy-to-clipboard OK
- [ ] Maps: embed tampil & lazy-load
- [ ] WhatsApp share: buka WhatsApp dengan pesan benar
- [ ] Music toggle: play/pause berfungi

#### Performance Testing
- [ ] Lighthouse Mobile: Performance ≥ 90
- [ ] Lighthouse Desktop: Performance ≥ 95
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total page weight < 1MB

#### Cross-Browser Testing
- [ ] Chrome (Android & Desktop)
- [ ] Safari (iOS & macOS)
- [ ] Firefox (Desktop)
- [ ] Samsung Internet (Android)

### 7.9 Monitoring & Analytics (opsional)
- [ ] Setup Google Analytics / Plausible
- [ ] Track: page views, RSVP submissions, music plays
- [ ] Setup uptime monitoring (UptimeRobot — gratis)

## Verification
- [ ] Frontend live di Vercel URL
- [ ] Backend live di Vercel/Cloudflare URL
- [ ] Semua API endpoints berfungsi
- [ ] Custom domain aktif (jika applicable)
- [ ] Lighthouse score ≥ 90
- [ ] Semua fitur berfungsi di mobile
- [ ] Link WhatsApp dikirim ke 3-5 test contacts → semua berfungsi
- [ ] No console errors di browser
