import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import dotenv from 'dotenv'

import invitationRoutes from '../src/routes/invitation'
import rsvpRoutes from '../src/routes/rsvp'
import wishesRoutes from '../src/routes/wishes'
import adminRoutes from '../src/routes/admin'

dotenv.config()

const app = new Hono()

app.use('*', logger())
app.use('*', cors({
  origin: process.env.CORS_ORIGIN || '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

const requestCounts = new Map<string, { count: number; resetTime: number }>()

app.use('*', async (c, next) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown'
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 100

  const record = requestCounts.get(ip)

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return next()
  }

  if (record.count >= maxRequests) {
    return c.json({ error: 'Too many requests' }, 429)
  }

  record.count++
  return next()
})

app.route('/api/inv', invitationRoutes)
app.route('/api/inv', rsvpRoutes)
app.route('/api/inv', wishesRoutes)
app.route('/api/inv', adminRoutes)

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404)
})

export default app
