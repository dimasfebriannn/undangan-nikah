import { Hono } from 'hono'
import { db } from '../db/index'
import { invitations, wishes } from '../db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { z } from 'zod'

const app = new Hono()

const wishSchema = z.object({
  guestName: z.string().min(2),
  message: z.string().min(1).max(1000),
})

// POST /api/inv/:slug/wishes - Submit wish
app.post('/:slug/wishes', async (c) => {
  const slug = c.req.param('slug')

  try {
    const body = await c.req.json()
    const validatedData = wishSchema.parse(body)

    // Get invitation
    const invitationResult = await db
      .select()
      .from(invitations)
      .where(eq(invitations.slug, slug))
      .limit(1)

    if (invitationResult.length === 0) {
      return c.json({ error: 'Invitation not found' }, 404)
    }

    const invitation = invitationResult[0]

    // Create wish
    const [newWish] = await db.insert(wishes).values({
      invitationId: invitation.id,
      guestName: validatedData.guestName,
      message: validatedData.message,
      approved: true,
    }).returning()

    return c.json({
      message: 'Wish submitted successfully',
      wish: newWish,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400)
    }
    throw error
  }
})

// GET /api/inv/:slug/wishes - Get wishes
app.get('/:slug/wishes', async (c) => {
  const slug = c.req.param('slug')
  const page = parseInt(c.req.query('page') || '1')
  const limit = parseInt(c.req.query('limit') || '10')
  const offset = (page - 1) * limit

  // Get invitation
  const invitationResult = await db
    .select()
    .from(invitations)
    .where(eq(invitations.slug, slug))
    .limit(1)

  if (invitationResult.length === 0) {
    return c.json({ error: 'Invitation not found' }, 404)
  }

  const invitation = invitationResult[0]

  // Get approved wishes with pagination
  const wishesList = await db
    .select()
    .from(wishes)
    .where(
      and(
        eq(wishes.invitationId, invitation.id),
        eq(wishes.approved, true)
      )
    )
    .orderBy(desc(wishes.createdAt))
    .limit(limit)
    .offset(offset)

  return c.json({
    wishes: wishesList,
    page,
    limit,
  })
})

export default app
