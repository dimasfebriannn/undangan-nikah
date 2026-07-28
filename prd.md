# PRD — E-Wedding / Undangan Nikah Digital

## 1. Project Overview

Website undangan nikah digital dengan konsep **elegant earth tone** dan efek **subtle 3D parallax**. Target pengguna utama adalah tamu undangan yang membuka link via WhatsApp di **mobile device** (92% traffic).

### Goals
- Undangan digital yang elegan, personal, dan mudah diakses
- RSVP real-time untuk memantau kehadiran tamu
- Amplop digital / gift info terintegrasi
- Performa cepat (< 2s load time di mobile)

---

## 2. Tech Stack

### Frontend

| Kategori | Pilihan | Alasan |
|---|---|---|
| Framework | **React 19 + Vite 6** | Cepat, modern, HMR instan |
| Bahasa | **TypeScript** | Type safety, DX lebih baik |
| Animasi & Parallax | **Motion** (framer-motion successor) | Declarative API, scroll hooks, ~18KB gzipped |
| Smooth Scroll | **Lenis** | Industry standard, ~4KB, accessible |
| Form RSVP | **React Hook Form + Zod** | Zero re-render, validasi ringan |
| Gallery Lightbox | **yet-another-react-lightbox** | Modern, responsive, customizable |
| Music / Audio | **Custom hook** (native `HTMLAudioElement`) | 0KB dependency, full control |
| Maps | **Google Maps `<iframe>` embed** | Gratis, zero config, lazy-loadable |
| Styling | **Tailwind CSS 4** | Utility-first, earth tone tokens via CSS vars |
| Icons | **Lucide React** | Lightweight, tree-shakeable |

**Estimated bundle: ~40-50KB gzipped**

### Backend

| Kategori | Pilihan | Alasan |
|---|---|---|
| Runtime | **Node.js 22 LTS** | JavaScript fullstack, cepat |
| Framework | **Hono** | Ultra-lightweight, edge-ready, TypeScript-first |
| Database | **PostgreSQL** (via Neon / Supabase) | Reliable, free tier cukup untuk wedding site |
| ORM | **Drizzle ORM** | Type-safe, lightweight, SQL-like API |
| Hosting Backend | **Vercel Serverless** atau **Cloudflare Workers** | Gratis, edge deployment |
| Auth (opsional) | **Lucia Auth** | Simple session-based auth untuk admin |

### Infrastructure

| Kategori | Pilihan |
|---|---|
| Frontend Hosting | **Vercel** (gratis, custom domain support) |
| Database | **Neon PostgreSQL** (gratis 0.5GB) atau **Supabase** (gratis 500MB) |
| Image Storage | **Cloudinary** (gratis 25GB, auto WebP, resize on-the-fly) |
| Domain | Custom domain via Vercel / Cloudflare |

---

## 3. Design System — Earth Tone

### Color Palette

| Role | Nama | Hex | Kegunaan |
|---|---|---|---|
| Background | Warm Linen | `#FAF6F0` | Canvas utama halaman |
| Surface / Card | Sand Dune | `#F0E6D8` | Card, section alternatif |
| Primary Text | Deep Umber | `#3A2A1E` | Heading, body text (bukan hitam) |
| Muted Text | Warm Stone | `#8A7565` | Caption, label, placeholder |
| **Accent Utama** | Terracotta | `#C2714F` | Tombol, link, highlight |
| Secondary Accent | Sage Green | `#8B9E79` | Tag, badge, aksen pendamping |
| Tertiary | Dusty Ochre | `#C4996B` | Gradient, border dekoratif |
| Dark Surface | Espresso | `#2C1E14` | Footer, section gelap |

### Gradients

```css
--gradient-dawn:       linear-gradient(135deg, #FAF6F0, #F0E6D8, #E8D5C0);
--gradient-accent:     linear-gradient(135deg, #C2714F, #C4996B);
--gradient-botanical:  linear-gradient(180deg, #FAF6F0, #F0E6D8, #E8EDDF);
```

### Typography

| Kegunaan | Font | Weight |
|---|---|---|
| Headline / Nama Mempelai | **Cormorant Garamond** | 300–700 |
| Body Text | **Lato** | 300, 400, 700 |
| Script / Nama (aksen) | **Great Vibes** | 400 (untuk nama mempelai saja) |

### Visual Motifs

- **Arch shapes** — Frame foto, section containers (bentuk lengkung pintu gerbang)
- **Botanical line art** — Olive branch, eucalyptus sebagai divider antar section
- **Watercolor wash** — Background hero dengan efek organik
- **Wax seal** — Element dekoratif pada RSVP button
- **Dried flowers** — Pampas grass, dried roses sebagai elemen visual
- **Copper accents** — Efek metalik pada border / hover states
- **Deckled edges** — Tepi kasar handmade (SVG clip-path)

### CSS Variables (Design Tokens)

```css
:root {
  /* Backgrounds */
  --color-bg:            #FAF6F0;
  --color-bg-subtle:     #FFF9F2;
  --color-bg-surface:    #F0E6D8;
  --color-bg-inverse:    #2C1E14;

  /* Text */
  --color-text:          #3A2A1E;
  --color-text-muted:    #8A7565;
  --color-text-inverse:  #FAF6F0;

  /* Accent */
  --color-accent:        #C2714F;
  --color-accent-hover:  #A85C3D;
  --color-accent-2:      #8B9E79;
  --color-accent-3:      #C4996B;

  /* Borders */
  --color-border:        #E8D5C0;
  --color-border-strong: #B87A5A;

  /* Shadows (warm-tinted) */
  --shadow-sm:  0 1px 3px rgba(58,42,30,0.08);
  --shadow-md:  0 4px 12px rgba(58,42,30,0.10);
  --shadow-lg:  0 8px 30px rgba(58,42,30,0.12);
}
```

---

## 4. Fitur & Section (Frontend)

### Section Flow (11 bagian, scroll vertikal)

| # | Section | Deskripsi |
|---|---|---|
| 1 | **Cover / Open Envelope** | Landing screen tertutup. Nama tamu dari `?to=Nama+Tamu`. Tombol "Buka Undangan" dengan animasi envelope open. |
| 2 | **Ayat & Doa** | Bismillah + QS. Ar-Rum: 21 atau Ayat Kursi. Transisi fade-in saat scroll. |
| 3 | **Mempelai** | Foto + nama lengkap mempelai + nama orang tua. Layout: foto kiri-kanan, nama di tengah. |
| 4 | **Akad & Resepsi** | Detail waktu & lokasi. Support multi-sesi (Sesi 1 & 2). Countdown timer. |
| 5 | **Love Story** | Timeline: Pertama Bertemu → PDKT → Pacaran → Lamaran → Menikah. Scroll-reveal animations. |
| 6 | **Galeri Foto** | 6-12 foto prewedding. Masonry grid + lightbox. WebP, lazy-loaded. |
| 7 | **RSVP Form** | Konfirmasi hadir, jumlah pendamping, ucapan/pesan. Validasi dengan Zod. |
| 8 | **Ucapan & Doa** | Guestbook wall — pesan dari tamu yang sudah RSVP. Realtime update. |
| 9 | **Amplop Digital** | Rekening bank (BCA/Mandiri/BNI/BRI), e-wallet (GoPay/OVO/DANA), QRIS. Copy-to-clipboard. |
| 10 | **Maps & Lokasi** | Google Maps embed untuk setiap venue. Tombol "Get Directions". |
| 11 | **Footer** | Penutup, salam, credit. |

### Fitur Tambahan

| Fitur | Deskripsi |
|---|---|
| **Guest Name Personalization** | URL: `example.com/inv?to=Budi+Santoso`. Nama tamu muncul di cover. |
| **Countdown Timer** | Hitung mundur ke hari pernikahan. Animasi angka bergulir. |
| **Musik Latar** | Autoplay muted by default. Toggle on/off. Custom `useAudio` hook. |
| **WhatsApp Share** | Tombol share langsung ke WhatsApp dengan pesan template. |
| **Mobile-First** | Semua section single-column, tap target ≥ 44px, font ≥ 16px. |
| **Dark Mode** | Opsional — earth tone palette tetap hangat di dark mode. |

---

## 5. Backend Architecture

### API Endpoints

#### Public API (untuk frontend)

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/inv/:slug` | Ambil data undangan berdasarkan slug pasangan |
| `GET` | `/api/inv/:slug/guest?name=...` | Ambil data tamu personalisasi |
| `POST` | `/api/inv/:slug/rsvp` | Submit RSVP (hadir/tidak/pesanan) |
| `GET` | `/api/inv/:slug/rsvp` | Ambil semua RSVP (untuk guestbook) |
| `POST` | `/api/inv/:slug/wishes` | Submit ucapan/doa |
| `GET` | `/api/inv/:slug/wishes` | Ambil semua ucapan (pagination) |

#### Admin API (opsional, butuh auth)

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/admin/login` | Login admin |
| `GET` | `/api/admin/inv` | List semua undangan |
| `POST` | `/api/admin/inv` | Buat undangan baru |
| `PUT` | `/api/admin/inv/:id` | Update data undangan |
| `POST` | `/api/admin/inv/:id/guests` | Bulk upload tamu (CSV/JSON) |
| `GET` | `/api/admin/inv/:id/stats` | Statistik RSVP & views |

### Database Schema (Drizzle ORM)

```sql
-- Undangan (satu pasangan = satu undangan)
CREATE TABLE invitations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          VARCHAR(100) UNIQUE NOT NULL,     -- "budi-sarah"
  groom_name    VARCHAR(200) NOT NULL,
  bride_name    VARCHAR(200) NOT NULL,
  groom_full    TEXT,
  bride_full    TEXT,
  groom_parents TEXT,
  bride_parents TEXT,
  wedding_date  DATE NOT NULL,
  akad_time     TIME,
  akad_location TEXT,
  resepsi_time  TIME,
  resepsi_location TEXT,
  resepsi_sesi  JSONB,                            -- [{sesi: 1, start: "10:00", end: "12:00"}]
  venue_maps_url TEXT,
  cover_image   TEXT,
  music_url     TEXT,
  quote         TEXT,
  quote_source  VARCHAR(100),
  status        VARCHAR(20) DEFAULT 'active',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Tamu (personalisasi nama)
CREATE TABLE guests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id),
  name          VARCHAR(200) NOT NULL,
  slug          VARCHAR(200),                     -- URL-safe name
  attending     VARCHAR(20) DEFAULT 'pending',    -- pending/yes/no/maybe
  guest_count   INT DEFAULT 1,
  message       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Ucapan & Doa
CREATE TABLE wishes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id),
  guest_name    VARCHAR(200),
  message       TEXT NOT NULL,
  approved      BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- RSVP Log
CREATE TABLE rsvp_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id),
  guest_id      UUID REFERENCES guests(id),
  attending     VARCHAR(20) NOT NULL,
  guest_count   INT DEFAULT 1,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Frontend Component Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing / home (redirect ke /inv)
│   └── inv/
│       └── [slug]/
│           └── page.tsx        # Halaman undangan utama
│
├── components/
│   ├── cover/
│   │   ├── Cover.tsx           # Envelope screen + guest name
│   │   └── EnvelopeAnimation.tsx
│   ├── mempelai/
│   │   └── Mempelai.tsx        # Foto + nama + orang tua
│   ├── event/
│   │   ├── Event.tsx           # Akad & resepsi info
│   │   └── CountdownTimer.tsx  # Hitung mundur
│   ├── love-story/
│   │   └── LoveStory.tsx       # Timeline cinta
│   ├── gallery/
│   │   ├── Gallery.tsx         # Masonry grid
│   │   └── PhotoLightbox.tsx   # Lightbox viewer
│   ├── rsvp/
│   │   ├── RSVPForm.tsx        # Form konfirmasi
│   │   └── RSVPSuccess.tsx     # Success state
│   ├── guestbook/
│   │   └── Guestbook.tsx       # Wall ucapan
│   ├── gift/
│   │   └── AmplopDigital.tsx   # Rekening + QRIS
│   ├── maps/
│   │   └── VenueMaps.tsx       # Google Maps embed
│   └── shared/
│       ├── SectionContainer.tsx
│       ├── ParallaxLayer.tsx
│       ├── BotanicalDivider.tsx
│       ├── MusicToggle.tsx
│       ├── WhatsAppShare.tsx
│       └── ScrollReveal.tsx
│
├── hooks/
│   ├── useAudio.ts             # Background music control
│   ├── useGuestName.ts         # Parse ?to= param
│   ├── useCountdown.ts         # Countdown timer logic
│   └── useScrollProgress.ts    # Scroll position tracking
│
├── lib/
│   ├── api.ts                  # API client (fetch wrapper)
│   ├── constants.ts            # Default data, config
│   └── utils.ts                # Helper functions
│
├── styles/
│   ├── globals.css             # Tailwind + CSS vars + fonts
│   └── animations.css          # Reusable animation keyframes
│
├── public/
│   ├── fonts/                  # Self-hosted fonts (optional)
│   ├── images/
│   │   ├── botanical/          # SVG botanical line art
│   │   └── patterns/           # Texture overlays
│   └── music/                  # Background music file
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

---

## 7. Implementation Phases

### Phase 1 — Setup & Foundation (Hari 1)
- [ ] Init Vite + React + TypeScript
- [ ] Install dependencies (Motion, Lenis, RHF, Zod, Tailwind, Lucide)
- [ ] Setup design tokens (CSS variables, Tailwind config)
- [ ] Setup Google Fonts (Cormorant Garamond, Lato, Great Vibes)
- [ ] Buat component folder structure

### Phase 2 — Cover & Layout (Hari 2)
- [ ] Cover component dengan envelope animation
- [ ] Guest name personalization (`?to=` param)
- [ ] Smooth scroll setup (Lenis)
- [ ] Section container + scroll reveal wrapper
- [ ] Botanical divider SVG components

### Phase 3 — Content Sections (Hari 3-4)
- [ ] Mempelai section (foto + nama + orang tua)
- [ ] Event section (akad + resepsi + multi-sesi)
- [ ] Countdown timer dengan animasi
- [ ] Love story timeline dengan parallax
- [ ] Ayat & doa section

### Phase 4 — Interactive Features (Hari 5-6)
- [ ] Gallery masonry grid + lightbox
- [ ] RSVP form (React Hook Form + Zod)
- [ ] Guestbook / ucapan wall
- [ ] Music toggle (useAudio hook)
- [ ] WhatsApp share button

### Phase 5 — Backend (Hari 7-8)
- [ ] Setup Hono + Drizzle ORM + PostgreSQL
- [ ] Database schema & migration
- [ ] Public API endpoints (invitation, RSVP, wishes)
- [ ] CORS & rate limiting setup

### Phase 6 — Integration & Polish (Hari 9-10)
- [ ] Connect frontend ke backend API
- [ ] Amplop digital section (copy-to-clipboard)
- [ ] Maps embed untuk venue
- [ ] Image optimization (Cloudinary)
- [ ] Mobile testing & responsive polish

### Phase 7 — Deploy & Launch (Hari 11-12)
- [ ] Deploy backend ke Vercel/Cloudflare
- [ ] Deploy frontend ke Vercel
- [ ] Setup custom domain
- [ ] Performance audit (Lighthouse ≥ 90)
- [ ] Final QA di multiple devices

---

## 8. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Bundle Size | < 100KB gzipped |
| Image Format | WebP (auto via Cloudinary) |
| Total Page Weight | < 1MB (initial load) |

---

## 9. Notes

- **Distribusi**: Link undangan di-share via WhatsApp dengan format `example.com/inv?to=Nama+Tamu`
- **Multi-faith**: Template mendukung format Islamic (Bismillah, Ar-Rum:21) — bisa di扩展 untuk Kristen (Pemberkatan) dll.
- **Admin Panel**: Bisa ditambahkan nanti untuk manage undangan + bulk upload tamu via CSV
- **Guest Tracking**: Log setiap kali tamu membuka undangan (open tracking)
