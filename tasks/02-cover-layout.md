# Task 02 — Cover, Layout & Smooth Scroll

## Goal
Membuat cover/landing screen dengan envelope animation, guest name personalization, dan smooth scroll foundation.

## Dependencies
- Task 01 selesai

## Checklist

### 2.1 Smooth Scroll Setup
- [ ] Buat `src/hooks/useSmoothScroll.ts` — wrapper untuk Lenis
- [ ] Setup Lenis di `src/app/layout.tsx` atau `App.tsx`
- [ ] Konfigurasi: `smoothTouch: true`, `duration: 1.2`
- [ ] Pastikan `prefers-reduced-motion` dihormati

### 2.2 Guest Name Hook
- [ ] Buat `src/hooks/useGuestName.ts`
  - Parse URL param `?to=Nama+Tamu`
  - Decode URI component
  - Return `guestName: string | null`
- [ ] Handle edge cases: param tidak ada, empty string, special characters

### 2.3 Cover Component
- [ ] Buat `src/components/cover/Cover.tsx`
  - Full viewport height (100vh)
  - Background: gradient dawn (`#FAF6F0 → #F0E6D8`)
  - Decorative botanical SVG di pojok atas & bawah
  - Tampilkan: "The Wedding of" (Cormorant Garamond, light)
  - Nama mempelai besar (Cormorant Garamond + Great Vibes)
  - Tanggal pernikahan di bawah nama
  - Pesan personal: "Kepada Yth. Bapak/Ibu/Saudara/i [Nama Tamu]"
  - Jika tidak ada nama: tampilkan versi generic

### 2.4 Envelope Animation
- [ ] Buat `src/components/cover/EnvelopeAnimation.tsx`
  - State: `isOpen` (default: false)
  - Visual: flat envelope illustration (SVG) dengan flap
  - Animasi buka envelope saat user klik tombol
  - Menggunakan Motion `AnimatePresence` + `motion.div`
  - Setelah envelope terbuka, fade-in konten undangan
  - Smooth transition: envelope → full invitation content

### 2.5 Music Toggle
- [ ] Buat `src/components/shared/MusicToggle.tsx`
  - Floating button di pojok kanan bawah (fixed position)
  - Ikon: speaker on / speaker off (Lucide: Volume2, VolumeX)
  - Toggle play/pause state
  - Style: terracotta background, white icon, rounded-full, shadow

### 2.6 Scroll Reveal Wrapper
- [ ] Buat `src/components/shared/ScrollReveal.tsx`
  - Wrapper component yang animate children saat scroll into view
  - Menggunakan Motion `whileInView`
  - Props: `direction` (up/down/left/right), `delay`, `duration`
  - Default: fade-in + slide-up, duration 0.6s, ease "easeOut"

### 2.7 Botanical Divider
- [ ] Buat `src/components/shared/BotanicalDivider.tsx`
  - SVG botanical line art (olive branch / eucalyptus)
  - Props: `variant` (top, bottom, left, right), `color`
  - Default color: warm stone `#8A7565` at 30% opacity
  - Digunakan sebagai antar-section divider

### 2.8 Section Container
- [ ] Buat `src/components/shared/SectionContainer.tsx`
  - Wrapper untuk setiap section
  - Padding: `py-16 md:py-24 px-6`
  - Max-width: `max-w-2xl mx-auto` (mobile-first)
  - Background: configurable via props

## Verification
- [ ] Halaman load dengan smooth scroll
- [ ] URL `?to=Budi+Santoso` menampilkan nama "Budi Santoso" di cover
- [ ] Tanpa `?to=` param, cover tetap tampil dengan generic text
- [ ] Envelope animation berjalan smooth saat klik
- [ ] Music toggle muncul dan berfungsi
- [ ] Scroll reveal animasi triggered saat section masuk viewport
- [ ] Botanical divider terlihat antar section
