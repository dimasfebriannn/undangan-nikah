import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useInvitationData } from '../../hooks/useInvitationContext'
import { formatDate } from '../../lib/utils'

const SLIDE_INTERVAL = 5000

export function OpeningHero() {
  const data = useInvitationData()
  const images = data.heroImages?.length ? data.heroImages : [data.coupleImage]
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [next, images.length])

  return (
    <section id="hero-section" className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[current]})` }}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </AnimatePresence>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(30, 20, 12, 0.3) 0%, rgba(30, 20, 12, 0.5) 40%, rgba(30, 20, 12, 0.75) 100%)',
        }}
      />

      {/* Botanical decorations */}
      <div className="pointer-events-none absolute top-0 left-0 z-[2] opacity-20">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path d="M0 0 C45 12, 65 45, 82 105 C65 90, 42 72, 8 52Z" fill="var(--color-text-inverse)" />
          <path d="M0 0 C32 22, 50 46, 68 90" stroke="var(--color-text-inverse)" strokeWidth="0.7" fill="none" />
          <circle cx="78" cy="100" r="2.5" fill="var(--color-accent-3)" opacity="0.35" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 z-[2] opacity-20" style={{ transform: 'rotate(180deg)' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path d="M0 0 C45 12, 65 45, 82 105 C65 90, 42 72, 8 52Z" fill="var(--color-text-inverse)" />
          <path d="M0 0 C32 22, 50 46, 68 90" stroke="var(--color-text-inverse)" strokeWidth="0.7" fill="none" />
          <circle cx="78" cy="100" r="2.5" fill="var(--color-accent-3)" opacity="0.35" />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3 text-center pb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.p
          className="text-xs tracking-[0.35em] uppercase"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.8em', color: 'rgba(255,255,255,0.6)', textTransform: 'none', letterSpacing: '0.05em' }}>
            The Wedding of
          </span>
        </motion.p>

        <motion.h1
          className="mt-2 text-5xl font-light tracking-wide md:text-7xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-inverse)', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {data.groomName}
        </motion.h1>

        <motion.span
          className="my-1 text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-script)', color: 'var(--color-accent-3)' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 200 }}
        >
          &amp;
        </motion.span>

        <motion.h1
          className="text-5xl font-light tracking-wide md:text-7xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-inverse)', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {data.brideName}
        </motion.h1>

        <motion.div
          className="mt-5 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div className="h-px w-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-accent-3)', opacity: 0.5 }} />
          <div className="h-px w-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
        </motion.div>

        <motion.p
          className="mt-1 text-sm tracking-wide"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {formatDate(data.weddingDate)}
        </motion.p>
      </motion.div>

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: current === i ? 24 : 6,
                background: current === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <p
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}
        >
          Scroll
        </p>
        <motion.div
          className="flex h-8 w-5 items-start justify-center rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <motion.div
            className="mt-1.5 h-1.5 w-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
