import { CheckCircle } from 'lucide-react'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'

interface RSVPSuccessProps {
  name: string
}

export function RSVPSuccess({ name }: RSVPSuccessProps) {
  return (
    <SectionContainer className="text-center">
      <ScrollReveal>
        <div
          className="mx-auto max-w-md rounded-2xl border p-10 shadow-md"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <CheckCircle
            size={56}
            className="mx-auto mb-4"
            style={{ color: 'var(--color-accent-2)' }}
          />
          <h3
            className="mb-2 text-2xl font-medium"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Terima kasih, {name}!
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Konfirmasi kehadiran Anda telah kami terima. Kami berharap Anda dapat hadir di hari bahagia kami.
          </p>
        </div>
      </ScrollReveal>
    </SectionContainer>
  )
}
