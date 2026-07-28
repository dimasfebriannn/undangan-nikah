import { useState, useEffect } from 'react'
import { api, ApiError } from '../lib/api'
import { SAMPLE_INVITATION } from '../lib/constants'
import type { Invitation } from '../types'

export function useInvitation(slug: string) {
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchInvitation() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await api.getInvitation(slug)
        if (!cancelled) setInvitation(data as unknown as Invitation)
      } catch (err) {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 404) {
          console.warn('Invitation not found, using sample data')
          setInvitation(SAMPLE_INVITATION)
        } else {
          console.warn('API unavailable, using sample data:', err)
          setInvitation(SAMPLE_INVITATION)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchInvitation()
    return () => { cancelled = true }
  }, [slug])

  return { invitation, isLoading, error }
}
