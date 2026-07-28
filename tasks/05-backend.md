# Task 05 — Backend Setup & API

## Goal
Setup backend Hono + Drizzle ORM + PostgreSQL, buat database schema, dan semua API endpoints.

## Dependencies
- Task 01 selesai (frontend setup bisa paralel)
- PostgreSQL database ready (Neon / Supabase)

## Checklist

### 5.1 Backend Init
- [ ] Buat folder `backend/` di root project
- [ ] `npm init -y` di folder backend
- [ ] Install dependencies:
  ```
  npm install hono @hono/node-server drizzle-orm postgres dotenv
  npm install -D drizzle-kit typescript @types/node tsx
  ```
- [ ] Setup `tsconfig.json` untuk backend
- [ ] Buat `backend/src/index.ts` — Hono app entry point
- [ ] Buat `backend/drizzle.config.ts` — Drizzle config
- [ ] Buat `backend/.env.example` dengan placeholder values

### 5.2 Database Schema
- [ ] Buat `backend/src/db/schema.ts` — Drizzle schema:
  - `invitations` table:
    - id (UUID, PK)
    - slug (VARCHAR, UNIQUE)
    - groom_name, bride_name (VARCHAR)
    - groom_full, bride_full (TEXT)
    - groom_parents, bride_parents (TEXT)
    - wedding_date (DATE)
    - akad_time, akad_location (TIME, TEXT)
    - resepsi_time, resepsi_location (TIME, TEXT)
    - resepsi_sesi (JSONB)
    - venue_maps_url (TEXT)
    - cover_image, music_url (TEXT)
    - quote, quote_source (TEXT, VARCHAR)
    - status (VARCHAR, default 'active')
    - created_at (TIMESTAMPTZ)
  - `guests` table:
    - id (UUID, PK)
    - invitation_id (UUID, FK → invitations)
    - name (VARCHAR)
    - slug (VARCHAR)
    - attending (VARCHAR, default 'pending')
    - guest_count (INT, default 1)
    - message (TEXT)
    - created_at (TIMESTAMPTZ)
  - `wishes` table:
    - id (UUID, PK)
    - invitation_id (UUID, FK → invitations)
    - guest_name (VARCHAR)
    - message (TEXT)
    - approved (BOOLEAN, default false)
    - created_at (TIMESTAMPTZ)
  - `rsvp_logs` table:
    - id (UUID, PK)
    - invitation_id (UUID, FK → invitations)
    - guest_id (UUID, FK → guests)
    - attending (VARCHAR)
    - guest_count (INT)
    - created_at (TIMESTAMPTZ)
- [ ] Jalankan `drizzle-kit generate` untuk migration
- [ ] Jalankan `drizzle-kit push` untuk apply ke database

### 5.3 Database Connection
- [ ] Buat `backend/src/db/index.ts` — Drizzle connection:
  ```typescript
  import { drizzle } from 'drizzle-orm/postgres-js'
  import postgres from 'postgres'
  // Setup connection dengan env DATABASE_URL
  ```

### 5.4 Seed Data
- [ ] Buat `backend/src/seed.ts` — seed script:
  - Insert 1 sample invitation (budi-sarah)
  - Insert 5-10 sample guests
  - Insert 3-5 sample wishes
  - Jalankan sekali untuk development

### 5.5 Public API Routes
- [ ] Buat `backend/src/routes/invitation.ts`:
  - `GET /api/inv/:slug` — ambil data undangan berdasarkan slug
    - Return: full invitation data
    - 404 jika slug tidak ditemukan
  - `GET /api/inv/:slug/guest` — ambil data tamu
    - Query param: `?name=Nama+Tamu`
    - Return: guest data berdasarkan nama (fuzzy match)
    - 404 jika tidak ditemukan

- [ ] Buat `backend/src/routes/rsvp.ts`:
  - `POST /api/inv/:slug/rsvp` — submit RSVP
    - Body: `{ name, attending, guestCount, message }`
    - Validasi: name required, attending required
    - Insert ke `guests` table + log ke `rsvp_logs`
    - Return: success message + guest data
  - `GET /api/inv/:slug/rsvp` — ambil semua RSVP
    - Return: array of guests yang sudah RSVP
    - Include: name, attending, guestCount, message, createdAt
    - Sort: terbaru di atas

- [ ] Buat `backend/src/routes/wishes.ts`:
  - `POST /api/inv/:slug/wishes` — submit ucapan
    - Body: `{ guestName, message }`
    - Insert ke `wishes` table (approved: false by default)
    - Return: success message
  - `GET /api/inv/:slug/wishes` — ambil ucapan
    - Query: `?page=1&limit=10`
    - Filter: `approved: true` only
    - Return: paginated wishes

### 5.6 Middleware
- [ ] CORS middleware — allow frontend origin
- [ ] Rate limiting — max 100 requests per minute per IP
- [ ] Error handling — global error handler
- [ ] Request logging — console log method, path, status

### 5.7 Dev Scripts
- [ ] `package.json` scripts:
  - `dev`: `tsx watch src/index.ts`
  - `build`: `tsc`
  - `start`: `node dist/index.js`
  - `db:generate`: `drizzle-kit generate`
  - `db:push`: `drizzle-kit push`
  - `db:seed`: `tsx src/seed.ts`

## Verification
- [ ] `npm run dev` backend start tanpa error
- [ ] `GET /api/inv/budi-sarah` return sample invitation data
- [ ] `GET /api/inv/budi-sarah/guest?name=Budi` return guest data
- [ ] `POST /api/inv/budi-sarah/rsvp` berhasil submit RSVP
- [ ] `GET /api/inv/budi-sarah/rsvp` return list RSVP
- [ ] `POST /api/inv/budi-sarah/wishes` berhasil submit ucapan
- [ ] `GET /api/inv/budi-sarah/wishes` return list ucapan
- [ ] CORS header present di response
- [ ] Rate limiting berfungsi (test: 101 requests → 429)
