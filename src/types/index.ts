export interface Invitation {
  id: string
  slug: string
  groomName: string
  brideName: string
  groomFull: string
  brideFull: string
  groomParents: string
  brideParents: string
  weddingDate: string
  akadTime: string
  akadLocation: string
  resepsiTime: string
  resepsiLocation: string
  resepsiSesi: SesiAcara[]
  venueMapsUrl: string
  resepsiMapsUrl?: string
  coverImage: string
  groomImage: string
  brideImage: string
  coupleImage: string
  heroImages?: string[]
  musicUrl: string
  quote: string
  quoteSource: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface SesiAcara {
  sesi: number
  start: string
  end: string
}

export interface Guest {
  id: string
  invitationId: string
  name: string
  slug: string
  attending: 'pending' | 'yes' | 'no' | 'maybe'
  guestCount: number
  message: string
  createdAt: string
}

export interface Wish {
  id: string
  invitationId: string
  guestName: string
  message: string
  approved: boolean
  createdAt: string
}

export interface RSVPPayload {
  name: string
  attending: 'yes' | 'no' | 'maybe'
  guestCount?: number
  message?: string
}

export interface TimelineItem {
  id: string
  title: string
  date: string
  description: string
  icon: string
  photoUrl?: string
}

export interface GalleryImage {
  src: string
  alt: string
}
