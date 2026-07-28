import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { SectionOrnament } from '../shared/SectionOrnament'
import { SAMPLE_TIMELINE } from '../../lib/constants'
import type { TimelineItem } from '../../types'
import * as LucideIcons from 'lucide-react'

function getIcon(name: string) {
  const icons: Record<string, React.ReactNode> = {
    Sparkles: <LucideIcons.Sparkles size={18} />,
    Coffee: <LucideIcons.Coffee size={18} />,
    Heart: <LucideIcons.Heart size={18} />,
    Ring: <LucideIcons.Gem size={18} />,
    CalendarHeart: <LucideIcons.CalendarHeart size={18} />,
  }
  return icons[name] || <LucideIcons.Star size={18} />
}

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const isLast = index === SAMPLE_TIMELINE.length - 1

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="relative flex gap-6">
        {/* Timeline dot */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isLast ? 'ring-2 ring-offset-2 animate-pulse-glow' : 'glass'
            }`}
            style={{
              backgroundColor: isLast ? 'var(--color-accent)' : 'transparent',
              color: isLast ? '#fff' : 'var(--color-accent)',
              ...(isLast
                ? { '--tw-ring-color': 'var(--color-accent)', '--tw-ring-offset-color': 'var(--color-bg)' } as React.CSSProperties
                : {}),
            }}
          >
            {getIcon(item.icon)}
          </div>
        </div>

        {/* Content card */}
        <div className="flex-1 pb-10">
          <div className="glass-warm group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-lg">
            {/* Decorative glow */}
            <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-10 blur-xl transition-opacity duration-500 group-hover:opacity-20" style={{ background: 'var(--gradient-accent)' }} />

            {/* Photo */}
            {item.photoUrl && (
              <div className="relative overflow-hidden">
                <img
                  src={item.photoUrl}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>
            )}

            <div className="relative p-5">
              <p
                className="text-xs tracking-wide"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                {item.date}
              </p>
              <h3
                className="mt-1 text-xl font-medium"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                {item.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function LoveStory() {
  return (
    <SectionContainer className="crosshatch">
      <SectionOrnament position="top-right" variant="leaf" />
      <SectionOrnament position="bottom-left" variant="diamond" className="scale-75" />

      <ScrollReveal>
        <div className="mb-3 flex items-center justify-center gap-4">
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(194,113,79,0.3))' }} />
          <LucideIcons.Heart size={12} style={{ color: 'var(--color-accent)', opacity: 0.3 }} />
          <p
            className="text-center text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-subtle)' }}
          >
            Perjalanan Cinta Kami
          </p>
          <LucideIcons.Heart size={12} style={{ color: 'var(--color-accent)', opacity: 0.3 }} />
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(194,113,79,0.3), transparent)' }} />
        </div>
        <h2
          className="mb-12 text-center text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}
        >
          Love Story
        </h2>
      </ScrollReveal>

      <div className="relative ml-5 space-y-2 border-l-2" style={{ borderColor: 'rgba(194, 113, 79, 0.2)' }}>
        {/* Gradient overlay on timeline line */}
        <div className="absolute top-0 bottom-0 left-0 w-px" style={{
          background: 'linear-gradient(180deg, rgba(194,113,79,0.1) 0%, rgba(194,113,79,0.3) 50%, rgba(194,113,79,0.1) 100%)',
        }} />
        {SAMPLE_TIMELINE.map((item, i) => (
          <TimelineEntry key={item.id} item={item} index={i} />
        ))}
      </div>
    </SectionContainer>
  )
}
