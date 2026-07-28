import { pgTable, uuid, varchar, text, date, time, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core'

export const invitations = pgTable('invitations', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  groomName: varchar('groom_name', { length: 200 }).notNull(),
  brideName: varchar('bride_name', { length: 200 }).notNull(),
  groomFull: text('groom_full'),
  brideFull: text('bride_full'),
  groomParents: text('groom_parents'),
  brideParents: text('bride_parents'),
  weddingDate: date('wedding_date').notNull(),
  akadTime: time('akad_time'),
  akadLocation: text('akad_location'),
  resepsiTime: time('resepsi_time'),
  resepsiLocation: text('resepsi_location'),
  resepsiSesi: jsonb('resepsi_sesi'),
  venueMapsUrl: text('venue_maps_url'),
  resepsiMapsUrl: text('resepsi_maps_url'),
  coverImage: text('cover_image'),
  groomImage: text('groom_image'),
  brideImage: text('bride_image'),
  coupleImage: text('couple_image'),
  heroImages: jsonb('hero_images'),
  musicUrl: text('music_url'),
  quote: text('quote'),
  quoteSource: varchar('quote_source', { length: 100 }),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const guests = pgTable('guests', {
  id: uuid('id').primaryKey().defaultRandom(),
  invitationId: uuid('invitation_id').references(() => invitations.id),
  name: varchar('name', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }),
  attending: varchar('attending', { length: 20 }).default('pending'),
  guestCount: varchar('guest_count', { length: 10 }).default('1'),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const wishes = pgTable('wishes', {
  id: uuid('id').primaryKey().defaultRandom(),
  invitationId: uuid('invitation_id').references(() => invitations.id),
  guestName: varchar('guest_name', { length: 200 }),
  message: text('message').notNull(),
  approved: boolean('approved').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const rsvpLogs = pgTable('rsvp_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  invitationId: uuid('invitation_id').references(() => invitations.id),
  guestId: uuid('guest_id').references(() => guests.id),
  attending: varchar('attending', { length: 20 }).notNull(),
  guestCount: varchar('guest_count', { length: 10 }).default('1'),
  createdAt: timestamp('created_at').defaultNow(),
})
