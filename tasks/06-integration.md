# Task 06 — Frontend-Backend Integration

## Goal
Connect frontend ke backend API, implement data fetching, dan pastikan semua fitur berjalan end-to-end.

## Dependencies
- Task 04 selesai (frontend sections)
- Task 05 selesai (backend API)

## Checklist

### 6.1 API Client Setup
- [ ] Buat `src/lib/api.ts`:
  - Base URL dari environment variable (`VITE_API_URL`)
  - Wrapper function `fetchAPI<T>(endpoint, options?)` dengan:
    - Automatic JSON parse
    - Error handling
    - Loading state management
  - Typed response interfaces

### 6.2 Invitation Data Fetching
- [ ] Buat `src/hooks/useInvitation.ts`:
  - Fetch data undangan berdasarkan slug dari URL
  - `GET /api/inv/:slug`
  - Return: `{ invitation, isLoading, error }`
  - Cache data di state setelah fetch pertama
  - Handle: loading, error, not found states

### 6.3 Guest Data Fetching
- [ ] Update `src/hooks/useGuestName.ts`:
  - Fetch data tamu dari backend: `GET /api/inv/:slug/guest?name=...`
  - Return: `{ guestName, guestData, isLoading }`
  - Fallback ke URL param jika backend down

### 6.4 Cover Section — Dynamic Data
- [ ] Update `Cover.tsx`:
  - Gunakan data dari `useInvitation()`:
    - Nama mempelai dari `invitation.groom_name` & `invitation.bride_name`
    - Tanggal dari `invitation.wedding_date`
  - Gunakan data dari `useGuestName()`:
    - Nama tamu dari `guestData.name` atau URL param

### 6.5 Mempelai Section — Dynamic Data
- [ ] Update `Mempelai.tsx`:
  - Nama lengkap: `groom_full` & `bride_full`
  - Nama orang tua: `groom_parents` & `bride_parents`
  - Foto: `cover_image` atau placeholder

### 6.6 Event Section — Dynamic Data
- [ ] Update `Event.tsx`:
  - Akad: waktu dari `akad_time`, lokasi dari `akad_location`
  - Resepsi: waktu dari `resepsi_time`, lokasi dari `resepsi_location`
  - Multi-sesi dari `resepsi_sesi` (JSON)
  - Maps URL dari `venue_maps_url`

### 6.7 Countdown — Dynamic Date
- [ ] Update `CountdownTimer.tsx`:
  - Target date dari `invitation.wedding_date`

### 6.8 RSVP Form — Submit to API
- [ ] Update `RSVPForm.tsx`:
  - `onSubmit`: POST ke `/api/inv/:slug/rsvp`
  - Kirim: `{ name, attending, guestCount, message }`
  - Loading state saat submit
  - Success: tampilkan `RSVPSuccess` component
  - Error: tampilkan error message

### 6.9 Guestbook — Fetch & Display
- [ ] Update `Guestbook.tsx`:
  - Fetch ucapan dari `GET /api/inv/:slug/wishes`
  - Pagination: load more button
  - Real-time: refresh setelah submit RSVP (jika user juga kirim ucapan)
  - Sort: terbaru di atas

### 6.10 Wishes Submit (integrated with RSVP)
- [ ] Update `RSVPForm.tsx`:
  - Jika user isi "Ucapan & Doa" field:
    - POST ke `/api/inv/:slug/wishes`
    - Kirim: `{ guestName: name, message }`
  - Submit bersamaan dengan RSVP

### 6.11 Love Story — Dynamic Data
- [ ] Update `LoveStory.tsx`:
  - Timeline items dari data yang bisa dikonfigurasi
  - Sementara: gunakan placeholder data dari `constants.ts`
  - Nanti: tambahkan field di invitation schema untuk love story items

### 6.12 Environment Variables
- [ ] Buat `.env` di frontend root:
  ```
  VITE_API_URL=http://localhost:3001
  ```
- [ ] Buat `.env.example` sebagai template

### 6.13 Error Handling & Loading States
- [ ] Buat `src/components/shared/LoadingSpinner.tsx`
  - Full-screen atau inline loading indicator
  - Earth tone styled (terracotta spinner)
- [ ] Buat `src/components/shared/ErrorMessage.tsx`
  - Display error with retry button
  - Friendly message: "Gagal memuat data. Silakan coba lagi."
- [ ] Implement di semua data-fetching hooks

## Verification
- [ ] Cover menampilkan nama mempelai dari backend
- [ ] Guest name personalization bekerja dari backend
- [ ] RSVP form submit ke backend dan sukses
- [ ] Guestbook menampilkan ucapan dari backend
- [ ] Semua section menggunakan data dynamic dari backend
- [ ] Loading states tampil saat fetch data
- [ ] Error states tampil jika backend down
- [ ] Data persist setelah page refresh (backend)
