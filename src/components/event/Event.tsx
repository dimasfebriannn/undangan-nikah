import { MapPin, Clock, Navigation } from 'lucide-react'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { useInvitationData } from '../../hooks/useInvitationContext'

function EnvelopeLetter({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative mx-auto max-w-md">
      {/* ── Envelope flap (terbuka ke atas on hover) ── */}
      <div
        className="envelope-flap relative z-20 mx-auto"
        style={{ maxWidth: 380 }}
      >
        <svg
          className="block w-full"
          viewBox="0 0 380 65"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: 'auto' }}
        >
          <path
            d="M0 0 L190 60 L380 0 L380 8 L190 68 L0 8 Z"
            fill="#E8D5C0"
            stroke="rgba(194,113,79,0.15)"
            strokeWidth="0.5"
          />
          <path
            d="M12 0 L190 55 L368 0"
            fill="none"
            stroke="rgba(194,113,79,0.12)"
            strokeWidth="0.5"
          />
          <path
            d="M40 0 L190 48 L340 0"
            fill="none"
            stroke="rgba(194,113,79,0.06)"
            strokeWidth="0.3"
          />
          <circle cx="190" cy="58" r="10" fill="#C2714F" opacity="0.8" />
          <circle cx="190" cy="58" r="7" fill="#A85C3D" opacity="0.6" />
          <circle cx="190" cy="58" r="4" fill="#C2714F" opacity="0.9" />
          <circle cx="190" cy="58" r="2" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>

      {/* ── Envelope body ── */}
      <div
        className="envelope-letter relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10"
        style={{
          background: 'linear-gradient(180deg, rgba(255,252,247,0.95) 0%, rgba(250,246,240,0.9) 100%)',
          borderLeft: '1px solid rgba(194,113,79,0.12)',
          borderRight: '1px solid rgba(194,113,79,0.12)',
          borderBottom: '1px solid rgba(194,113,79,0.12)',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 12px 40px rgba(58,42,30,0.08), inset 0 0 30px rgba(232,213,192,0.3)',
        }}
      >
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-0 right-0 h-8" style={{
          background: 'linear-gradient(180deg, rgba(58,42,30,0.04) 0%, transparent 100%)',
        }} />
        <div className="absolute top-4 left-4 h-5 w-5 border-t border-l opacity-15" style={{ borderColor: 'var(--color-accent)' }} />
        <div className="absolute top-4 right-4 h-5 w-5 border-t border-r opacity-15" style={{ borderColor: 'var(--color-accent)' }} />
        <div className="absolute bottom-4 left-4 h-5 w-5 border-b border-l opacity-15" style={{ borderColor: 'var(--color-accent)' }} />
        <div className="absolute bottom-4 right-4 h-5 w-5 border-b border-r opacity-15" style={{ borderColor: 'var(--color-accent)' }} />

        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Event() {
  const data = useInvitationData()

  return (
    <SectionContainer className="text-center">
      <ScrollReveal>
        <p className="mb-1 text-sm tracking-widest" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
          InsyaAllah
        </p>
        <h2 className="mb-10 text-4xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          Waktu &amp; Tempat
        </h2>
      </ScrollReveal>

      <EnvelopeLetter>
        {/* Big date */}
        <ScrollReveal>
          <div className="mb-8 flex items-baseline justify-center gap-3">
            <span
              className="text-6xl font-light tabular-nums"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)', lineHeight: 1 }}
            >
              20
            </span>
            <div className="text-left">
              <p className="text-sm font-medium tracking-wider uppercase" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
                September
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                2026
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Akad ── */}
        <ScrollReveal>
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
              Akad Nikah
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <Clock size={13} className="opacity-50" />
                <span>{data.akadTime}</span>
              </div>
              <div className="flex items-start justify-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <MapPin size={13} className="mt-0.5 shrink-0 opacity-50" />
                <span className="max-w-[240px] text-center text-[13px] leading-relaxed">{data.akadLocation}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <a
                href={data.venueMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                style={{
                  background: 'rgba(194,113,79,0.08)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(194,113,79,0.15)',
                }}
              >
                <Navigation size={11} />
                Lihat Peta
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 my-5">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(194,113,79,0.2))' }} />
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M0 6 L8 0 L10 4 L12 0 L20 6 L12 12 L10 8 L8 12 Z" fill="rgba(194,113,79,0.15)" />
          </svg>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(194,113,79,0.2), transparent)' }} />
        </div>

        {/* ── Resepsi ── */}
        <ScrollReveal>
          <div>
            <h3 className="mb-3 text-lg font-medium tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
              Resepsi
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <Clock size={13} className="opacity-50" />
                <span>{data.resepsiTime}</span>
              </div>

              {data.resepsiSesi && data.resepsiSesi.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {data.resepsiSesi.map((s) => (
                    <span
                      key={s.sesi}
                      className="rounded-full px-3 py-1 text-[11px]"
                      style={{
                        background: 'rgba(194,113,79,0.06)',
                        color: 'var(--color-accent)',
                        border: '1px solid rgba(194,113,79,0.12)',
                      }}
                    >
                      Sesi {s.sesi}: {s.start}–{s.end}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-start justify-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <MapPin size={13} className="mt-0.5 shrink-0 opacity-50" />
                <span className="max-w-[240px] text-center text-[13px] leading-relaxed">{data.resepsiLocation}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <a
                href={data.resepsiMapsUrl || data.venueMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                style={{
                  background: 'rgba(194,113,79,0.08)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(194,113,79,0.15)',
                }}
              >
                <Navigation size={11} />
                Lihat Peta
              </a>
            </div>
          </div>
        </ScrollReveal>
      </EnvelopeLetter>
    </SectionContainer>
  )
}
