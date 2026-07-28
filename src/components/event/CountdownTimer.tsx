import { motion } from 'motion/react'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { SectionOrnament } from '../shared/SectionOrnament'
import { useCountdown } from '../../hooks/useCountdown'
import { useInvitationData } from '../../hooks/useInvitationContext'

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="relative overflow-hidden rounded-2xl px-5 py-3 md:px-7 md:py-5"
        style={{
          background: 'linear-gradient(145deg, rgba(240,230,216,0.8) 0%, rgba(232,213,192,0.6) 100%)',
          boxShadow: '0 4px 20px rgba(58,42,30,0.08), inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 32px rgba(58,42,30,0.06)',
          perspective: '500px',
        }}
        whileHover={{
          rotateX: -5,
          rotateY: 5,
          boxShadow: '0 12px 40px rgba(58,42,30,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle glow */}
        <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-15 blur-xl" style={{ background: 'var(--gradient-accent)' }} />

        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 h-2 w-2 border-t border-l opacity-20" style={{ borderColor: 'var(--color-accent)' }} />
        <div className="absolute top-2 right-2 h-2 w-2 border-t border-r opacity-20" style={{ borderColor: 'var(--color-accent)' }} />
        <div className="absolute bottom-2 left-2 h-2 w-2 border-b border-l opacity-20" style={{ borderColor: 'var(--color-accent)' }} />
        <div className="absolute bottom-2 right-2 h-2 w-2 border-b border-r opacity-20" style={{ borderColor: 'var(--color-accent)' }} />

        <motion.span
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
          className="relative block text-4xl font-light tabular-nums md:text-5xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-accent)',
            transformStyle: 'preserve-3d',
          }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </motion.div>
      <span
        className="text-[10px] tracking-[0.2em] uppercase"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
      >
        {label}
      </span>
    </div>
  )
}

export function CountdownTimer() {
  const data = useInvitationData()
  const { days, hours, minutes, seconds } = useCountdown(data.weddingDate)

  return (
    <SectionContainer className="text-center section-accent">
      <SectionOrnament position="top-center" variant="wave" />

      <ScrollReveal>
        <p
          className="mb-6 text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}
        >
          Hitung Mundur
        </p>
        <div className="flex items-start justify-center gap-3 md:gap-5">
          <CountdownBox value={days} label="Hari" />
          <span
            className="mt-5 text-2xl font-light md:mt-6 md:text-3xl"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}
          >
            :
          </span>
          <CountdownBox value={hours} label="Jam" />
          <span
            className="mt-5 text-2xl font-light md:mt-6 md:text-3xl"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}
          >
            :
          </span>
          <CountdownBox value={minutes} label="Menit" />
          <span
            className="mt-5 text-2xl font-light md:mt-6 md:text-3xl"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}
          >
            :
          </span>
          <CountdownBox value={seconds} label="Detik" />
        </div>
      </ScrollReveal>
    </SectionContainer>
  )
}
