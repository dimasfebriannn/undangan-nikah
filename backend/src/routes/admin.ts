import { Hono } from 'hono'
import { db } from '../db/index'
import { invitations, guests } from '../db/schema'
import { eq } from 'drizzle-orm'

const app = new Hono()

// GET /api/inv/:slug/admin/guests - List all guests
app.get('/:slug/admin/guests', async (c) => {
  const slug = c.req.param('slug')

  const invitation = await db
    .select()
    .from(invitations)
    .where(eq(invitations.slug, slug))
    .limit(1)

  if (invitation.length === 0) {
    return c.json({ error: 'Invitation not found' }, 404)
  }

  const allGuests = await db
    .select()
    .from(guests)
    .where(eq(guests.invitationId, invitation[0].id))

  return c.json({ guests: allGuests, total: allGuests.length })
})

// POST /api/inv/:slug/admin/guests - Add a guest
app.post('/:slug/admin/guests', async (c) => {
  const slug = c.req.param('slug')
  const body = await c.req.json()
  const { name } = body

  if (!name || !name.trim()) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const invitation = await db
    .select()
    .from(invitations)
    .where(eq(invitations.slug, slug))
    .limit(1)

  if (invitation.length === 0) {
    return c.json({ error: 'Invitation not found' }, 404)
  }

  const slugName = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const existing = await db
    .select()
    .from(guests)
    .where(eq(guests.invitationId, invitation[0].id))

  const duplicate = existing.find(
    (g) => g.name.toLowerCase() === name.trim().toLowerCase()
  )

  if (duplicate) {
    return c.json({ error: 'Guest already exists', guest: duplicate }, 409)
  }

  const result = await db
    .insert(guests)
    .values({
      invitationId: invitation[0].id,
      name: name.trim(),
      slug: slugName,
      attending: 'pending',
    })
    .returning()

  return c.json({ guest: result[0] }, 201)
})

// POST /api/inv/:slug/admin/guests/bulk - Bulk add guests
app.post('/:slug/admin/guests/bulk', async (c) => {
  const slug = c.req.param('slug')
  const body = await c.req.json()
  const { names } = body

  if (!Array.isArray(names) || names.length === 0) {
    return c.json({ error: 'names array is required' }, 400)
  }

  const invitation = await db
    .select()
    .from(invitations)
    .where(eq(invitations.slug, slug))
    .limit(1)

  if (invitation.length === 0) {
    return c.json({ error: 'Invitation not found' }, 404)
  }

  const existing = await db
    .select()
    .from(guests)
    .where(eq(guests.invitationId, invitation[0].id))

  const existingNames = new Set(existing.map((g) => g.name.toLowerCase()))

  const newNames = names
    .map((n: string) => n.trim())
    .filter((n: string) => n.length > 0 && !existingNames.has(n.toLowerCase()))

  if (newNames.length === 0) {
    return c.json({ message: 'All guests already exist', added: 0 })
  }

  const values = newNames.map((name: string) => ({
    invitationId: invitation[0].id,
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    attending: 'pending',
  }))

  const result = await db.insert(guests).values(values).returning()

  return c.json({ guests: result, added: result.length }, 201)
})

// DELETE /api/inv/:slug/admin/guests/:id - Delete a guest
app.delete('/:slug/admin/guests/:id', async (c) => {
  const slug = c.req.param('slug')
  const id = c.req.param('id')

  const invitation = await db
    .select()
    .from(invitations)
    .where(eq(invitations.slug, slug))
    .limit(1)

  if (invitation.length === 0) {
    return c.json({ error: 'Invitation not found' }, 404)
  }

  await db.delete(guests).where(eq(guests.id, id))

  return c.json({ message: 'Guest deleted' })
})

export default app
