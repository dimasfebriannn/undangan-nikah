import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { drizzle } from 'drizzle-orm/postgres-js'
import { pgTable, uuid, varchar, text, date, time, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core'
import postgres from 'postgres'
import { eq, like, desc, and } from 'drizzle-orm'
import { z } from 'zod'

// Schema - inlined for Vercel serverless
const invitations = pgTable('invitations', {
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

const guests = pgTable('guests', {
  id: uuid('id').primaryKey().defaultRandom(),
  invitationId: uuid('invitation_id').references(() => invitations.id),
  name: varchar('name', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }),
  attending: varchar('attending', { length: 20 }).default('pending'),
  guestCount: varchar('guest_count', { length: 10 }).default('1'),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow(),
})

const wishes = pgTable('wishes', {
  id: uuid('id').primaryKey().defaultRandom(),
  invitationId: uuid('invitation_id').references(() => invitations.id),
  guestName: varchar('guest_name', { length: 200 }),
  message: text('message').notNull(),
  approved: boolean('approved').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

const rsvpLogs = pgTable('rsvp_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  invitationId: uuid('invitation_id').references(() => invitations.id),
  guestId: uuid('guest_id').references(() => guests.id),
  attending: varchar('attending', { length: 20 }).notNull(),
  guestCount: varchar('guest_count', { length: 10 }).default('1'),
  createdAt: timestamp('created_at').defaultNow(),
})

// DB connection
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
const db = drizzle(client, { schema: { invitations, guests, wishes, rsvpLogs } })

const app = new Hono()

app.use('*', logger())
app.use('*', cors({
  origin: (origin) => {
    const allowed = (process.env.CORS_ORIGIN || '*').split(',').map(s => s.trim())
    if (allowed.includes('*')) return '*'
    if (origin && allowed.includes(origin)) return origin
    return allowed[0] || '*'
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/inv/:slug', async (c) => {
  const slug = c.req.param('slug')
  const result = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (result.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  return c.json(result[0])
})

app.get('/api/inv/:slug/guest', async (c) => {
  const slug = c.req.param('slug')
  const name = c.req.query('name')
  if (!name) return c.json({ error: 'Name parameter is required' }, 400)
  const invitationResult = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (invitationResult.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  const guestResult = await db.select().from(guests)
    .where(and(eq(guests.invitationId, invitationResult[0].id), like(guests.name, `%${name}%`))).limit(1)
  if (guestResult.length === 0) return c.json({ error: 'Guest not found' }, 404)
  return c.json(guestResult[0])
})

const rsvpSchema = z.object({
  name: z.string().min(2),
  attending: z.enum(['yes', 'no', 'maybe']),
  guestCount: z.number().min(1).max(10).optional(),
  message: z.string().max(500).optional(),
})

app.post('/api/inv/:slug/rsvp', async (c) => {
  const slug = c.req.param('slug')
  try {
    const body = await c.req.json()
    const data = rsvpSchema.parse(body)
    const invitationResult = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
    if (invitationResult.length === 0) return c.json({ error: 'Invitation not found' }, 404)
    const invitation = invitationResult[0]
    const existingGuest = await db.select().from(guests)
      .where(and(eq(guests.invitationId, invitation.id), eq(guests.name, data.name))).limit(1)
    let guest
    if (existingGuest.length > 0) {
      const [updated] = await db.update(guests).set({
        attending: data.attending, guestCount: String(data.guestCount || 1), message: data.message || '',
      }).where(eq(guests.id, existingGuest[0].id)).returning()
      guest = updated
    } else {
      const [newGuest] = await db.insert(guests).values({
        invitationId: invitation.id, name: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        attending: data.attending, guestCount: String(data.guestCount || 1), message: data.message || '',
      }).returning()
      guest = newGuest
    }
    await db.insert(rsvpLogs).values({
      invitationId: invitation.id, guestId: guest.id,
      attending: data.attending, guestCount: String(data.guestCount || 1),
    })
    return c.json({ message: 'RSVP submitted successfully', guest })
  } catch (error) {
    if (error instanceof z.ZodError) return c.json({ error: 'Validation error', details: error.errors }, 400)
    throw error
  }
})

app.get('/api/inv/:slug/rsvp', async (c) => {
  const slug = c.req.param('slug')
  const invitationResult = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (invitationResult.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  const rsvps = await db.select().from(guests).where(eq(guests.invitationId, invitationResult[0].id)).orderBy(desc(guests.createdAt))
  return c.json(rsvps)
})

const wishSchema = z.object({
  guestName: z.string().min(2),
  message: z.string().min(1).max(1000),
})

app.post('/api/inv/:slug/wishes', async (c) => {
  const slug = c.req.param('slug')
  try {
    const body = await c.req.json()
    const data = wishSchema.parse(body)
    const invitationResult = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
    if (invitationResult.length === 0) return c.json({ error: 'Invitation not found' }, 404)
    const [newWish] = await db.insert(wishes).values({
      invitationId: invitationResult[0].id, guestName: data.guestName,
      message: data.message, approved: true,
    }).returning()
    return c.json({ message: 'Wish submitted successfully', wish: newWish })
  } catch (error) {
    if (error instanceof z.ZodError) return c.json({ error: 'Validation error', details: error.errors }, 400)
    throw error
  }
})

app.get('/api/inv/:slug/wishes', async (c) => {
  const slug = c.req.param('slug')
  const page = parseInt(c.req.query('page') || '1')
  const limit = parseInt(c.req.query('limit') || '10')
  const offset = (page - 1) * limit
  const invitationResult = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (invitationResult.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  const wishesList = await db.select().from(wishes)
    .where(and(eq(wishes.invitationId, invitationResult[0].id), eq(wishes.approved, true)))
    .orderBy(desc(wishes.createdAt)).limit(limit).offset(offset)
  return c.json({ wishes: wishesList, page, limit })
})

app.get('/api/inv/:slug/admin/guests', async (c) => {
  const slug = c.req.param('slug')
  const invitation = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (invitation.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  const allGuests = await db.select().from(guests).where(eq(guests.invitationId, invitation[0].id))
  return c.json({ guests: allGuests, total: allGuests.length })
})

app.post('/api/inv/:slug/admin/guests', async (c) => {
  const slug = c.req.param('slug')
  const body = await c.req.json()
  const { name } = body
  if (!name || !name.trim()) return c.json({ error: 'Name is required' }, 400)
  const invitation = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (invitation.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  const slugName = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const existing = await db.select().from(guests).where(eq(guests.invitationId, invitation[0].id))
  const duplicate = existing.find((g) => g.name.toLowerCase() === name.trim().toLowerCase())
  if (duplicate) return c.json({ error: 'Guest already exists', guest: duplicate }, 409)
  const result = await db.insert(guests).values({
    invitationId: invitation[0].id, name: name.trim(), slug: slugName, attending: 'pending',
  }).returning()
  return c.json({ guest: result[0] }, 201)
})

app.post('/api/inv/:slug/admin/guests/bulk', async (c) => {
  const slug = c.req.param('slug')
  const body = await c.req.json()
  const { names } = body
  if (!Array.isArray(names) || names.length === 0) return c.json({ error: 'names array is required' }, 400)
  const invitation = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (invitation.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  const existing = await db.select().from(guests).where(eq(guests.invitationId, invitation[0].id))
  const existingNames = new Set(existing.map((g) => g.name.toLowerCase()))
  const newNames = names.map((n: string) => n.trim()).filter((n: string) => n.length > 0 && !existingNames.has(n.toLowerCase()))
  if (newNames.length === 0) return c.json({ message: 'All guests already exist', added: 0 })
  const values = newNames.map((name: string) => ({
    invitationId: invitation[0].id, name,
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    attending: 'pending',
  }))
  const result = await db.insert(guests).values(values).returning()
  return c.json({ guests: result, added: result.length }, 201)
})

app.delete('/api/inv/:slug/admin/guests/:id', async (c) => {
  const slug = c.req.param('slug')
  const id = c.req.param('id')
  const invitation = await db.select().from(invitations).where(eq(invitations.slug, slug)).limit(1)
  if (invitation.length === 0) return c.json({ error: 'Invitation not found' }, 404)
  await db.delete(guests).where(eq(guests.id, id))
  return c.json({ message: 'Guest deleted' })
})

app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404)
})

export default app
