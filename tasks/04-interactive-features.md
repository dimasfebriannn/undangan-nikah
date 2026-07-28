# Task 04 — Interactive Features

## Goal
Membuat Gallery, RSVP Form, Guestbook, Amplop Digital, Maps, dan WhatsApp Share.

## Dependencies
- Task 03 selesai

## Checklist

### 4.1 Gallery Section
- [ ] Buat `src/components/gallery/Gallery.tsx`
  - Masonry grid layout (3 kolom desktop, 2 kolom mobile)
  - 6-12 foto placeholder (gunakan gradient warna earth tone)
  - Setiap foto: rounded corners, shadow, aspect-ratio 4:5 atau 1:1
  - Hover effect: slight scale + shadow increase
  - Lazy loading: `loading="lazy"` pada semua foto
  - Animasi: muncul bertahan saat scroll (stagger)
- [ ] Buat `src/components/gallery/PhotoLightbox.tsx`
  - Wrapper `yet-another-react-lightbox`
  - Props: `images: string[]`, `startIndex: number`, `isOpen: boolean`, `onClose`
  - Toolbar: close button, download (opsional)
  - Thumbnails: show di bawah
  - Keyboard navigation: left/right arrow, Escape
  - Swipe support untuk mobile

### 4.2 RSVP Form
- [ ] Buat `src/lib/validations.ts` — Zod schema untuk RSVP:
  ```typescript
  rsvpSchema = z.object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    attending: z.enum(["yes", "no", "maybe"], { required_error: "Pilih konfirmasi" }),
    guestCount: z.number().min(1).max(10).optional(),
    message: z.string().max(500).optional(),
  })
  ```
- [ ] Buat `src/components/rsvp/RSVPForm.tsx`
  - Fields:
    - Nama (text, auto-fill dari `?to=` param jika ada)
    - Konfirmasi Kehadiran (radio buttons: Hadir / Tidak Hadir / Masih Ragu)
    - Jumlah Pendamping (number, show jika "Hadir" dipilih)
    - Ucapan & Doa (textarea, opsional)
  - Submit button: "Kirim Konfirmasi" (terracotta, full-width)
  - Style: card dengan Sand Dune background, padding, rounded, shadow
  - Loading state: spinner saat submit
  - Error state: red border + error message per field
  - Success state: thank you message + confetti animation (opsional)
- [ ] Buat `src/components/rsvp/RSVPSuccess.tsx`
  - Tampilkan setelah RSVP berhasil disubmit
  - Pesan: "Terima kasih, [Nama]! Konfirmasi Anda telah diterima."
  - Ikon checkmark (Lucide: CheckCircle)
  - Tombol: "Kirim ke WhatsApp" (share hasil RSVP)

### 4.3 Guestbook / Ucapan
- [ ] Buat `src/components/guestbook/Guestbook.tsx`
  - Tampilkan daftar ucapan dari tamu
  - Format setiap ucapan:
    - Nama pengirim (Cormorant Garamond, bold)
    - Waktu (relative: "2 jam yang lalu")
    - Pesan (Lato, normal)
  - Card style: white/light background, border, shadow-sm
  - Load more button jika banyak ucapan
  - Placeholder: 3-5 sample ucapan
  - Sort: terbaru di atas

### 4.4 Amplop Digital / Gift Info
- [ ] Buat `src/components/gift/AmplopDigital.tsx`
  - Section title: "Amplop Digital" atau "Hadiah Pernikahan"
  - Subtitle: "Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih..."
  - Rekening bank cards:
    - BCA — nama, nomor rekening, tombol copy
    - Mandiri — nama, nomor rekening, tombol copy
    - BNI — nama, nomor rekening, tombol copy
    - BRI — nama, nomor rekening, tombol copy
  - E-wallet cards:
    - GoPay, OVO, DANA, ShopeePay — nomor/QR
  - QRIS section dengan placeholder QR image
  - Copy-to-clipboard: `navigator.clipboard.writeText()`
  - Toast notification: "Nomor rekening tersalin!" (terracotta accent)
  - Style: card grid (2 kolom mobile, 4 kolom desktop)

### 4.5 Maps Section
- [ ] Buat `src/components/maps/VenueMaps.tsx`
  - Props: `venueName: string`, `mapsUrl: string`, `address: string`
  - Google Maps `<iframe>` embed:
    - `loading="lazy"`
    - `width="100%"`, `height="300"`
    - `border="0"`, `allowfullscreen`
    - `referrerpolicy="no-referrer-when-downgrade"`
  - Below iframe: venue name + address text
  - Tombol: "Buka di Google Maps" → link ke Google Maps app (deep link)
  - Style: rounded corners, shadow, border
  - Tampilkan 1-2 maps (akad + resepsi jika lokasi berbeda)

### 4.6 WhatsApp Share
- [ ] Buat `src/components/shared/WhatsAppShare.tsx`
  - Floating button: pojok kanan bawah (di atas music toggle)
  - Atau: tombol di section tertentu
  - Ikon: WhatsApp logo (SVG custom atau Lucide MessageCircle)
  - Link: `https://wa.me/?text=...`
  - Template pesan:
    ```
    Assalamualaikum Wr. Wb.
    Dengan memohon rahmat dan ridho Allah SWT,
    kami mengundang Anda untuk menghadiri pernikahan [Groom] & [Bride].
    📅 [Tanggal]
    📍 [Lokasi]
    Buka undangan: [URL]
    ```
  - Style: WhatsApp green (#25D366), rounded-full, shadow-lg
  - Animasi: subtle bounce/pulse

### 4.7 Footer
- [ ] Buat `src/components/shared/Footer.tsx`
  - Text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu..."
  - Closing: "Wassalamualaikum Wr. Wb."
  - Background: Espresso (`#2C1E14`)
  - Text color: Warm Linen (`#FAF6F0`)
  - Credit: "Made with ❤️ for [Groom] & [Bride]" (opsional)
  - Padding: generous (py-16)

## Verification
- [ ] Gallery menampilkan grid foto dan lightbox berfungsi (klik foto → fullscreen)
- [ ] RSVP form validasi input dan submit button berfungsi
- [ ] Guestbook menampilkan daftar ucapan dengan layout yang rapi
- [ ] Amplop Digital: copy-to-clipboard berhasil dan toast muncul
- [ ] Maps embed tampil dengan benar dan lazy-load
- [ ] WhatsApp share membuka WhatsApp dengan pesan template
- [ ] Footer tampil dengan benar dan styling earth tone
- [ ] Semua section responsive di mobile
