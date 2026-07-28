import type { Invitation, Guest, Wish } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }))
    throw new ApiError(res.status, body.error || res.statusText)
  }

  return res.json()
}

export const api = {
  getInvitation(slug: string) {
    return fetchAPI<Invitation>(`/api/inv/${slug}`)
  },

  getGuest(slug: string, name: string) {
    return fetchAPI<Guest>(`/api/inv/${slug}/guest?name=${encodeURIComponent(name)}`)
  },

  submitRSVP(slug: string, data: { name: string; attending: string; guestCount?: number; message?: string }) {
    return fetchAPI<{ message: string; guest: Guest }>(`/api/inv/${slug}/rsvp`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getRSVPs(slug: string) {
    return fetchAPI<Guest[]>(`/api/inv/${slug}/rsvp`)
  },

  submitWish(slug: string, data: { guestName: string; message: string }) {
    return fetchAPI<{ message: string; wish: Wish }>(`/api/inv/${slug}/wishes`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getWishes(slug: string, page = 1, limit = 10) {
    return fetchAPI<{ wishes: Wish[]; page: number; limit: number }>(
      `/api/inv/${slug}/wishes?page=${page}&limit=${limit}`
    )
  },

  // Admin
  getGuests(slug: string) {
    return fetchAPI<{ guests: Guest[]; total: number }>(`/api/inv/${slug}/admin/guests`)
  },

  addGuest(slug: string, name: string) {
    return fetchAPI<{ guest: Guest }>(`/api/inv/${slug}/admin/guests`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
  },

  addGuestsBulk(slug: string, names: string[]) {
    return fetchAPI<{ guests: Guest[]; added: number }>(`/api/inv/${slug}/admin/guests/bulk`, {
      method: 'POST',
      body: JSON.stringify({ names }),
    })
  },

  deleteGuest(slug: string, id: string) {
    return fetchAPI<{ message: string }>(`/api/inv/${slug}/admin/guests/${id}`, {
      method: 'DELETE',
    })
  },
}
