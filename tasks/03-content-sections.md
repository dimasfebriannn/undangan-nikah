# Task 03 — Content Sections

## Goal
Membuat semua content sections: Ayat/Doa, Mempelai, Event/Countdown, dan Love Story.

## Dependencies
- Task 02 selesai

## Checklist

### 3.1 Ayat & Doa Section
- [ ] Buat `src/components/shared/AyatSection.tsx`
  - Background: warm linen dengan sedikit padding
  - Tampilkan QS. Ar-Rum: 21 (atau placeholder yang bisa diganti)
  - Typography: Cormorant Garamond italic untuk ayat, Lato untuk sumber
  - Dekorasi: botanical divider atas & bawah
  - Animasi: fade-in text saat scroll

### 3.2 Mempelai Section
- [ ] Buat `src/components/mempelai/Mempelai.tsx`
  - Layout mobile: stack vertikal (foto mempelai 1 → nama → foto mempelai 2)
  - Layout desktop: 3 kolom (foto kiri | nama tengah | foto kanan)
  - Setiap mempelai tampilkan:
    - Foto (圆形/rounded atau arch shape)
    - Nama lengkap (Cormorant Garamond besar)
    - Nama panggilan (Lato, muted)
    - "Putra/Putri dari Bapak ... dan Ibu ..." (Lato, smaller)
  - "&" atau symbol di tengah antara kedua nama
  - Placeholder foto: gunakan gradient/initials sementara
  - Animasi: foto fade-in dari kiri/kanan, nama dari bawah

### 3.3 Event Section
- [ ] Buat `src/components/event/Event.tsx`
  - Dua card side-by-side (mobile: stack)
  - Card 1: **Akad Nikah**
    - Ikon: Masjid / religion icon (Lucide)
    - Tanggal & waktu
    - Lokasi (nama venue + alamat)
    - Tombol "Lihat Maps" → scroll ke Maps section
  - Card 2: **Resepsi**
    - Ikon: Party / celebration icon (Lucide)
    - Tanggal & waktu
    - Support multi-sesi: "Sesi 1: 10:00-12:00 | Sesi 2: 13:00-15:00"
    - Lokasi (nama venue + alamat)
    - Dress code info (opsional)
  - Card style: Sand Dune background, border, shadow-md, arch-shape top
  - Animasi: card muncul bergantian (stagger animation)

### 3.4 Countdown Timer
- [ ] Buat `src/hooks/useCountdown.ts`
  - Input: `targetDate: Date`
  - Return: `{ days, hours, minutes, seconds }`
  - Update setiap detik via `setInterval`
  - Cleanup on unmount
- [ ] Buat `src/components/event/CountdownTimer.tsx`
  - 4 boxes: Hari | Jam | Menit | Detik
  - Style: Terracotta accent untuk angka, Deep Umber untuk label
  - Angka besar (text-4xl), label kecil (text-sm)
  - Animasi: angka berubah dengan effect geser/flip
  - Layout: flex row, gap, responsive
  - Letakkan di bawah Event section atau di antara Event & Love Story

### 3.5 Love Story Timeline
- [ ] Buat `src/components/love-story/LoveStory.tsx`
  - Vertical timeline layout (mobile-first)
  - Center line: terracotta color, 2px width
  - Timeline items (minimum 5):
    1. **Pertama Bertemu** — icon, date, deskripsi
    2. **PDKT** — icon, date, deskripsi
    3. **Pacaran** — icon, date, deskripsi
    4. **Lamaran** — icon, date, deskripsi
    5. **Menikah** — icon, date, deskripsi (highlighted)
  - Setiap item:
    - Dot marker di timeline (terracotta, 12px)
    - Date (Lato, muted, small)
    - Title (Cormorant Garamond, medium)
    - Description (Lato, normal)
    - Photo (opsional, bisa ditambahkan nanti)
  - Alternating layout: item ganjil kiri, genap kanan (desktop)
  - Mobile: semua item di satu sisi (kiri)
  - Animasi: setiap item muncul saat scroll (stagger + slide)

## Verification
- [ ] Ayat section tampil dengan teks dan dekorasi botanical
- [ ] Mempelai section menampilkan kedua mempelai dengan nama & placeholder foto
- [ ] Event section menampilkan akad & resepsi dalam card terpisah
- [ ] Countdown timer berjalan real-time dan terlihat elegan
- [ ] Love story timeline muncul bergantian saat scroll
- [ ] Semua section responsive di mobile (≤ 375px) dan desktop (≥ 1024px)
- [ ] Animasi scroll reveal berfungsi di setiap section
