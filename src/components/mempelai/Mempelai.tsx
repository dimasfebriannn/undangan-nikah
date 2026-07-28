import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { BotanicalDivider } from '../shared/BotanicalDivider'
import { SectionOrnament } from '../shared/SectionOrnament'
import { useInvitationData } from '../../hooks/useInvitationContext'

const SLIDES = [
  '/images/slides/s1.jpeg',
  '/images/slides/s2.jpeg',
  '/images/slides/s3.jpeg',
  '/images/slides/s4.jpeg',
  '/images/slides/s5.jpeg',
]

function PersonPhoto({ src, name, label }: { src: string; name: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className="text-2xl"
        style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)' }}
      >
        {label}
      </p>
      <div className="relative mx-auto h-40 w-40 md:h-52 md:w-52">
        {/* Outer glow ring */}
        <div
          className="absolute -inset-3 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(194,113,79,0.3) 0%, transparent 70%)' }}
        />
        {/* Decorative ring */}
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed opacity-30" style={{ borderColor: 'var(--color-accent)' }} />
        {/* Inner decorative ring */}
        <div className="absolute inset-2 rounded-full border opacity-15" style={{ borderColor: 'var(--color-accent-3)' }} />
        {/* Photo */}
        <div className="h-40 w-40 overflow-hidden rounded-full ring-2 ring-offset-4 md:h-52 md:w-52" style={{ '--tw-ring-color': 'var(--color-accent)', '--tw-ring-offset-color': 'var(--color-bg)' } as React.CSSProperties}>
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
            width={208}
            height={208}
          />
        </div>
      </div>
    </div>
  )
}

function PhotoStrip() {
  const allSlides = [...SLIDES, ...SLIDES]

  return (
    <div className="relative mx-auto mt-14 max-w-lg overflow-hidden rounded-xl" style={{
      border: '1px solid rgba(194,113,79,0.15)',
      boxShadow: '0 8px 32px rgba(30,18,8,0.08)',
    }}>
      {/* Top/bottom film-strip sprocket holes */}
      <div className="absolute inset-x-0 top-0 z-10 flex justify-between px-3 py-1" style={{ background: 'linear-gradient(180deg, rgba(44,30,20,0.5), transparent)' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-1.5 w-2 rounded-sm" style={{ background: 'rgba(232,213,192,0.15)' }} />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-between px-3 py-1" style={{ background: 'linear-gradient(0deg, rgba(44,30,20,0.5), transparent)' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-1.5 w-2 rounded-sm" style={{ background: 'rgba(232,213,192,0.15)' }} />
        ))}
      </div>

      {/* Scrolling strip */}
      <div className="flex" style={{ animation: 'marquee-scroll 30s linear infinite', width: 'max-content' }}>
        {allSlides.map((src, i) => (
          <div key={i} className="relative h-36 w-64 flex-shrink-0 overflow-hidden sm:h-44 sm:w-80" style={{ padding: '4px' }}>
            <img
              src={src}
              alt={`Moments ${i + 1}`}
              className="h-full w-full rounded-lg object-cover"
              style={{ filter: 'sepia(0.08) saturate(0.9)' }}
              loading="lazy"
              width={320}
              height={176}
            />
            {/* Vignette overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-lg" style={{
              background: 'radial-gradient(ellipse at center, transparent 60%, rgba(44,30,20,0.15) 100%)',
            }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Mempelai() {
  const data = useInvitationData()

  return (
    <SectionContainer className="text-center section-warm crosshatch">
      {/* Decorative corners */}
      <SectionOrnament position="top-right" variant="circle" />
      <SectionOrnament position="bottom-left" variant="circle" className="rotate-180" />

      <ScrollReveal>
        <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-subtle)' }}>
          InsyaAllah, Kami Yang Bahagia
        </p>
        <h2 className="text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}>
          Meet the Couple
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent-3))' }} />
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-accent-3)' }} />
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, var(--color-accent-3), transparent)' }} />
        </div>
      </ScrollReveal>

      <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16">
        {/* Mempelai 1 — Pria */}
        <ScrollReveal direction="left">
          <div className="flex flex-col items-center gap-4">
            <PersonPhoto src={data.groomImage} name={data.groomName} label="The Groom" />
            <div className="glass-warm relative overflow-hidden rounded-2xl px-6 py-4">
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-10 blur-xl" style={{ background: 'var(--gradient-accent)' }} />
              <h2
                className="relative text-2xl font-light md:text-3xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                {data.groomFull}
              </h2>
              <p
                className="relative mt-1 text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {data.groomParents}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Ampersand tengah */}
        <ScrollReveal delay={0.2}>
          <div className="relative my-4 md:my-0">
            <span
              className="text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}
            >
              &amp;
            </span>
          </div>
        </ScrollReveal>

        {/* Mempelai 2 — Wanita */}
        <ScrollReveal direction="right">
          <div className="flex flex-col items-center gap-4">
            <PersonPhoto src={data.brideImage} name={data.brideName} label="The Bride" />
            <div className="glass-warm relative overflow-hidden rounded-2xl px-6 py-4">
              <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full opacity-10 blur-xl" style={{ background: 'var(--gradient-accent)' }} />
              <h2
                className="relative text-2xl font-light md:text-3xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                {data.brideFull}
              </h2>
              <p
                className="relative mt-1 text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {data.brideParents}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16"><PhotoStrip /></div>

      <BotanicalDivider className="mt-10" />
    </SectionContainer>
  )
}
