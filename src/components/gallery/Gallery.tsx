import { useState } from 'react'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { SectionOrnament } from '../shared/SectionOrnament'
import { PhotoLightbox } from './PhotoLightbox'
import { SAMPLE_GALLERY } from '../../lib/constants'

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  return (
    <SectionContainer className="section-cream">
      <SectionOrnament position="top-left" variant="dots" />
      <SectionOrnament position="bottom-right" variant="circle" className="scale-75" />

      <ScrollReveal>
        <p
          className="mb-3 text-center text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-subtle)' }}
        >
          Momen Bahagia Kami
        </p>
        <h2
          className="mb-10 text-center text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}
        >
          Galeri Foto
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {SAMPLE_GALLERY.map((img, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <button
              onClick={() => openLightbox(i)}
              className="group relative block w-full overflow-hidden rounded-xl shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              style={{ aspectRatio: '1/1' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay with gradient */}
              <div
                className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(180deg, rgba(194,113,79,0.1) 0%, rgba(42,30,20,0.3) 100%)',
                }}
              />
              {/* Corner accent on hover */}
              <div
                className="absolute top-2 right-2 h-6 w-6 opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{
                  borderTop: '2px solid rgba(255,255,255,0.6)',
                  borderRight: '2px solid rgba(255,255,255,0.6)',
                }}
              />
              <div
                className="absolute bottom-2 left-2 h-6 w-6 opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{
                  borderBottom: '2px solid rgba(255,255,255,0.6)',
                  borderLeft: '2px solid rgba(255,255,255,0.6)',
                }}
              />
            </button>
          </ScrollReveal>
        ))}
      </div>

      <PhotoLightbox
        images={SAMPLE_GALLERY.map((g) => ({ src: g.src, alt: g.alt }))}
        startIndex={activeIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </SectionContainer>
  )
}
