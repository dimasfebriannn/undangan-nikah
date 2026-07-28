import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { SAMPLE_INVITATION } from '../../lib/constants'

interface EnvelopeAnimationProps {
  guestName: string | null
  onOpen?: () => void
}

export function EnvelopeAnimation({ guestName, onOpen }: EnvelopeAnimationProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isOpening, setIsOpening] = useState(false)
  const data = SAMPLE_INVITATION

  const handleClick = () => {
    if (isOpening) return
    setIsOpening(true)
    onOpen?.()
    const params = searchParams.toString()
    setTimeout(() => {
      navigate(`/undangan${params ? `?${params}&opened=1` : '?opened=1'}`)
    }, 2200)
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Guest name */}
      {guestName && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p
            className="mb-1 text-[11px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}
          >
            Kepada Yth.
          </p>
          <p
            className="mb-1 text-[11px] tracking-wide"
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}
          >
            Bapak/Ibu/Saudara/i
          </p>
          <p
            className="mt-2 text-xl font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-inverse)' }}
          >
            {guestName}
          </p>
        </motion.div>
      )}

      {/* === ENVELOPE === */}
      <motion.div
        className="relative cursor-pointer"
        style={{ perspective: '900px' }}
        onClick={handleClick}
        whileHover={!isOpening ? { y: -8, scale: 1.02 } : {}}
        whileTap={!isOpening ? { scale: 0.98 } : {}}
      >
        {/* Shadow on surface */}
        <div
          className="absolute -bottom-4 left-1/2 h-6 w-[260px] -translate-x-1/2 rounded-[50%] blur-xl"
          style={{ background: 'rgba(44, 30, 20, 0.3)' }}
        />

        {/* 3D wrapper */}
        <motion.div
          style={{ transformStyle: 'preserve-3d' }}
          animate={!isOpening ? { rotateX: [0, 1.5, 0], rotateY: [0, -1, 0] } : { rotateX: 0, rotateY: 0 }}
          transition={{ duration: 5, repeat: !isOpening ? Infinity : 0, ease: 'easeInOut' }}
        >
          {/* === ENVELOPE BODY — Paper texture === */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              width: 300,
              height: 200,
              background: 'linear-gradient(175deg, #F5EDE3 0%, #EDE2D4 40%, #E5D8C8 100%)',
              boxShadow: '0 2px 4px rgba(44,30,20,0.08), 0 8px 24px rgba(44,30,20,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
          >
            {/* Paper grain texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Inner border — letterpress style */}
            <div
              className="absolute rounded-sm"
              style={{
                top: 14,
                left: 14,
                right: 14,
                bottom: 14,
                border: '1px solid rgba(160, 130, 100, 0.15)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.3)',
              }}
            />

            {/* Center ornament */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ top: 30 }}>
              <div className="text-center" style={{ color: 'rgba(140, 110, 80, 0.2)' }}>
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                  <path d="M0 10 Q10 0 20 10 Q30 20 40 10" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M5 10 Q15 3 20 10 Q25 17 35 10" stroke="currentColor" strokeWidth="0.3" />
                </svg>
              </div>
            </div>

            {/* Bottom fold lines */}
            <svg className="absolute bottom-0 left-0 h-[145px] w-full" viewBox="0 0 300 145" fill="none">
              <path d="M0 145 L150 85" stroke="rgba(180,155,130,0.12)" strokeWidth="0.5" />
              <path d="M300 145 L150 85" stroke="rgba(180,155,130,0.12)" strokeWidth="0.5" />
            </svg>

            {/* === FLAP === */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: 110,
                transformStyle: 'preserve-3d',
                zIndex: 2,
              }}
              initial={{ rotateX: 0 }}
              animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Flap shape */}
              <svg width="300" height="110" viewBox="0 0 300 110" fill="none" className="absolute top-0 left-0">
                <defs>
                  <linearGradient id="flapGrad" x1="150" y1="0" x2="150" y2="110" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#EDE2D4" />
                    <stop offset="100%" stopColor="#E0D4C4" />
                  </linearGradient>
                </defs>
                <path d="M0 0 L150 105 L300 0 Z" fill="url(#flapGrad)" />
                <path d="M0 0 L150 105 L300 0" stroke="rgba(180,155,130,0.2)" strokeWidth="0.5" fill="none" />
                {/* Flap inner line */}
                <path d="M15 0 L150 92 L285 0" stroke="rgba(180,155,130,0.1)" strokeWidth="0.3" fill="none" />
              </svg>
            </motion.div>

            {/* === WAX SEAL === */}
            <AnimatePresence>
              {!isOpening && (
                <motion.div
                  className="absolute top-[38px] left-1/2 z-10 -translate-x-1/2"
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.8, opacity: 0, rotate: 8 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ transformOrigin: 'center center' }}
                >
                  {/* Seal glow */}
                  <motion.div
                    className="absolute -inset-3 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(194,113,79,0.2) 0%, transparent 70%)' }}
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Seal body */}
                  <div
                    className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 40% 35%, #D4845A 0%, #B8613E 50%, #8B4528 100%)',
                      boxShadow: '0 2px 6px rgba(80,40,15,0.4), inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.15)',
                    }}
                  >
                    {/* Edge ring */}
                    <div
                      className="absolute inset-[3px] rounded-full"
                      style={{ border: '0.5px solid rgba(255,255,255,0.15)' }}
                    />
                    {/* Scallop ring */}
                    <div
                      className="absolute inset-[6px] rounded-full"
                      style={{ border: '0.5px dashed rgba(255,255,255,0.1)' }}
                    />
                    {/* Ampersand */}
                    <span
                      className="relative text-sm"
                      style={{ fontFamily: 'var(--font-script)', color: 'rgba(255,255,255,0.85)' }}
                    >
                      &amp;
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* === LETTER (visible when opening) === */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  className="absolute left-1/2 z-0 -translate-x-1/2 overflow-hidden rounded"
                  style={{
                    width: 260,
                    height: 140,
                    top: 48,
                    background: 'linear-gradient(175deg, #FFFCF8 0%, #FAF5EE 100%)',
                    boxShadow: '0 2px 8px rgba(44,30,20,0.1)',
                  }}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: -10, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Letter content */}
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <p
                      className="text-[8px] tracking-[0.25em] uppercase"
                      style={{ color: 'rgba(140,110,80,0.5)', fontFamily: 'var(--font-body)' }}
                    >
                      The Wedding of
                    </p>
                    <p
                      className="mt-1 text-lg font-light"
                      style={{ fontFamily: 'var(--font-display)', color: '#5A4030' }}
                    >
                      {data.groomName}
                    </p>
                    <p
                      className="text-base"
                      style={{ fontFamily: 'var(--font-script)', color: '#B87A5A' }}
                    >
                      &amp;
                    </p>
                    <p
                      className="text-lg font-light"
                      style={{ fontFamily: 'var(--font-display)', color: '#5A4030' }}
                    >
                      {data.brideName}
                    </p>
                    <div className="mt-2 h-px w-16" style={{ background: 'rgba(180,150,120,0.2)' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        disabled={isOpening}
        className="group relative overflow-hidden rounded-full px-10 py-4 text-sm tracking-widest uppercase"
        style={{
          color: 'rgba(255,255,255,0.85)',
          fontFamily: 'var(--font-body)',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        whileHover={!isOpening ? {
          scale: 1.05,
          background: 'rgba(255,255,255,0.12)',
          boxShadow: '0 0 30px rgba(194, 113, 79, 0.15)',
        } : {}}
        whileTap={!isOpening ? { scale: 0.95 } : {}}
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s ease-in-out infinite',
          }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isOpening ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 3v4M8 3v4" />
              <path d="M2 11h20" />
            </svg>
          )}
          {isOpening ? 'Membuka...' : 'Buka Undangan'}
        </span>
      </motion.button>
    </motion.div>
  )
}
