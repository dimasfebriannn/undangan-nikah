import { createContext, useContext, type ReactNode } from 'react'
import { useInvitation } from '../hooks/useInvitation'
import { SAMPLE_INVITATION } from '../lib/constants'
import type { Invitation } from '../types'

const InvitationContext = createContext<Invitation>(SAMPLE_INVITATION)

export function InvitationProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const { invitation } = useInvitation(slug)
  const data = invitation || SAMPLE_INVITATION

  return (
    <InvitationContext.Provider value={data}>
      {children}
    </InvitationContext.Provider>
  )
}

export function useInvitationData() {
  return useContext(InvitationContext)
}
