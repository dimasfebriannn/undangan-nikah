import { Hono } from 'hono'
import { db } from '../db/index'
import { invitations, guests } from '../db/schema'
import { eq, like } from 'drizzle-orm'

const app = new Hono()

// GET /api/inv/:slug - Get invitation by slug
app.get('/:slug', async (c) => {
  const slug = c.req.param('slug')

  const result = await db
    .select()
    .from(invitations)
    .where(eq(invitations.slug, slug))
    .limit(1)

  if (result.length === 0) {
    return c.json({ error: 'Invitation not found' }, 404)
  }

  return c.json(result[0])
})

// GET /api/inv/:slug/guest - Get guest by name
app.get('/:slug/guest', async (c) => {
  const slug = c.req.param('slug')
  const name = c.req.query('name')

  if (!name) {
    return c.json({ error: 'Name parameter is required' }, 400)
  }

  // Get invitation first
  const invitationResult = await db
    .select()
    .from(invitations)
    .where(eq(invitations.slug, slug))
    .limit(1)

  if (invitationResult.length === 0) {
    return c.json({ error: 'Invitation not found' }, 404)
  }

  const invitation = invitationResult[0]

  // Search for guest with fuzzy match
  const guestResult = await db
    .select()
    .from(guests)
    .where(
      eq(guests.invitationId, invitation.id) &&
      like(guests.name, `%${name}%`)
    )
    .limit(1)

  if (guestResult.length === 0) {
    return c.json({ error: 'Guest not found' }, 404)
  }

  return c.json(guestResult[0])
})

export default app
