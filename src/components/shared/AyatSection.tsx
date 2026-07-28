import { ScrollReveal } from './ScrollReveal'
import { SectionContainer } from './SectionContainer'
import { useInvitationData } from '../../hooks/useInvitationContext'

export function AyatSection() {
  const data = useInvitationData()
  const { quote, quoteSource } = data

  return (
    <SectionContainer className="text-center dot-pattern">
      <ScrollReveal>
        <div className="mx-auto max-w-lg">
          {/* Outer decorative border */}
          <div className="relative p-8 md:p-12" style={{
            border: '1px solid rgba(194,113,79,0.2)',
            borderRadius: '16px',
            background: 'linear-gradient(180deg, rgba(255,252,247,0.6) 0%, rgba(250,246,240,0.4) 100%)',
            boxShadow: '0 8px 32px rgba(58,42,30,0.06), inset 0 0 40px rgba(232,213,192,0.2)',
          }}>
            {/* Inner border */}
            <div className="absolute inset-3 rounded-xl border opacity-20" style={{ borderColor: 'var(--color-accent)' }} />

            {/* Corner ornaments */}
            <svg className="absolute top-2 left-2 h-8 w-8" viewBox="0 0 32 32" fill="none">
              <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill="rgba(194,113,79,0.25)" />
              <circle cx="4" cy="4" r="1.5" fill="rgba(194,113,79,0.3)" />
            </svg>
            <svg className="absolute top-2 right-2 h-8 w-8 rotate-90" viewBox="0 0 32 32" fill="none">
              <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill="rgba(194,113,79,0.25)" />
              <circle cx="4" cy="4" r="1.5" fill="rgba(194,113,79,0.3)" />
            </svg>
            <svg className="absolute bottom-2 right-2 h-8 w-8 rotate-180" viewBox="0 0 32 32" fill="none">
              <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill="rgba(194,113,79,0.25)" />
              <circle cx="4" cy="4" r="1.5" fill="rgba(194,113,79,0.3)" />
            </svg>
            <svg className="absolute bottom-2 left-2 h-8 w-8 -rotate-90" viewBox="0 0 32 32" fill="none">
              <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill="rgba(194,113,79,0.25)" />
              <circle cx="4" cy="4" r="1.5" fill="rgba(194,113,79,0.3)" />
            </svg>

            {/* Top divider */}
            <div className="mx-auto mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(194,113,79,0.3))' }} />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="rgba(194,113,79,0.25)" />
              </svg>
              <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(90deg, rgba(194,113,79,0.3), transparent)' }} />
            </div>

            {/* Quote mark */}
            <span
              className="mb-1 block text-5xl leading-none md:text-6xl"
              style={{ fontFamily: 'var(--font-script)', color: 'rgba(194,113,79,0.25)' }}
            >
              &ldquo;
            </span>

            {/* Quote text */}
            <blockquote
              className="text-base leading-relaxed font-light italic md:text-lg"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              {quote}
            </blockquote>

            {/* Source */}
            <p
              className="mt-5 text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
            >
              — {quoteSource}
            </p>

            {/* Bottom divider */}
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(194,113,79,0.3))' }} />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="2.5" y="2.5" width="5" height="5" rx="0.5" fill="rgba(194,113,79,0.25)" transform="rotate(45 5 5)" />
              </svg>
              <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(90deg, rgba(194,113,79,0.3), transparent)' }} />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionContainer>
  )
}
