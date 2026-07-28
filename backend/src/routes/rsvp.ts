import { Hono } from 'hono'
import { db } from '../db/index'
import { invitations, guests, rsvpLogs } from '../db/schema'
import { eq, desc } from 'drizzle-orm'
import { z } from 'zod'

const app = new Hono()

const rsvpSchema = z.object({
  name: z.string().min(2),
  attending: z.enum(['yes', 'no', 'maybe']),
  guestCount: z.number().min(1).max(10).optional(),
  message: z.string().max(500).optional(),
})

// POST /api/inv/:slug/rsvp - Submit RSVP
app.post('/:slug/rsvp', async (c) => {
  const slug = c.req.param('slug')

  try {
    const body = await c.req.json()
    const validatedData = rsvpSchema.parse(body)

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

    // Check if guest already exists
    const existingGuest = await db
      .select()
      .from(guests)
      .where(
        eq(guests.invitationId, invitation.id) &&
        eq(guests.name, validatedData.name)
      )
      .limit(1)

    let guest

    if (existingGuest.length > 0) {
      // Update existing guest
      const [updatedGuest] = await db
        .update(guests)
        .set({
          attending: validatedData.attending,
          guestCount: String(validatedData.guestCount || 1),
          message: validatedData.message || '',
        })
        .where(eq(guests.id, existingGuest[0].id))
        .returning()

      guest = updatedGuest
    } else {
      // Create new guest
      const [newGuest] = await db.insert(guests).values({
        invitationId: invitation.id,
        name: validatedData.name,
        slug: validatedData.name.toLowerCase().replace(/\s+/g, '-'),
        attending: validatedData.attending,
        guestCount: String(validatedData.guestCount || 1),
        message: validatedData.message || '',
      }).returning()

      guest = newGuest
    }

    // Log RSVP
    await db.insert(rsvpLogs).values({
      invitationId: invitation.id,
      guestId: guest.id,
      attending: validatedData.attending,
      guestCount: String(validatedData.guestCount || 1),
    })

    return c.json({
      message: 'RSVP submitted successfully',
      guest,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400)
    }
    throw error
  }
})

// GET /api/inv/:slug/rsvp - Get all RSVPs
app.get('/:slug/rsvp', async (c) => {
  const slug = c.req.param('slug')

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

  // Get all RSVPs
  const rsvps = await db
    .select()
    .from(guests)
    .where(eq(guests.invitationId, invitation.id))
    .orderBy(desc(guests.createdAt))

  return c.json(rsvps)
})

export default app
