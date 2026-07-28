import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import type { Guest } from '../types'

export function useGuestName(slug: string) {
  const urlParams = new URLSearchParams(window.location.search)
  const urlName = urlParams.get('to') || ''

  const [guestName, setGuestName] = useState(urlName)
  const [guestData, setGuestData] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!urlName || !slug) return

    let cancelled = false

    async function fetchGuest() {
      setIsLoading(true)
      try {
        const data = await api.getGuest(slug, urlName)
        if (!cancelled) {
          setGuestData(data as unknown as Guest)
          setGuestName(data.name || urlName)
        }
      } catch {
        if (!cancelled) setGuestName(urlName)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchGuest()
    return () => { cancelled = true }
  }, [slug, urlName])

  return { guestName, guestData, isLoading }
}
