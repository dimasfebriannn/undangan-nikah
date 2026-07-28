import { useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { useGuestName } from '../hooks/useGuestName'
import { useInvitation } from '../hooks/useInvitation'
import { EnvelopeAnimation } from '../components/cover/EnvelopeAnimation'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'

export function CoverPage() {
  const { invitation, isLoading } = useInvitation('galih-maesya')
  const data = invitation
  const { guestName } = useGuestName(data?.slug || 'galih-maesya')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playMusic = useCallback(() => {
    if (audioRef.current) return
    const audio = new Audio('/music/background.mp3')
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio
    audio.play().then(() => {
      let vol = 0
      const target = 0.3
      const step = target / 30
      const id = setInterval(() => {
        vol += step
        if (vol >= target) {
          audio.volume = target
          clearInterval(id)
        } else {
          audio.volume = vol
        }
      }, 20)
    }).catch(() => {})
  }, [])

  if (isLoading || !data) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>The Wedding of Galih & Maesya</title>
        <meta name="description" content="Kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan Galih Dwi Rahman & Maesya Bella Dian. 20 Agustus 2026, Jember." />
        <meta property="og:title" content="The Wedding of Galih & Maesya" />
        <meta property="og:description" content="Kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan Galih Dwi Rahman & Maesya Bella Dian. 20 Agustus 2026, Jember." />
        <meta property="og:image" content="/images/couple/hero.jpeg" />
      </Helmet>
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.coverImage})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(30, 20, 12, 0.3) 0%, rgba(30, 20, 12, 0.55) 50%, rgba(30, 20, 12, 0.75) 100%)',
        }}
      />

      {/* Botanical top-left */}
      <div className="pointer-events-none absolute top-0 left-0 opacity-25">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M0 0 C50 15, 70 50, 90 110 C70 95, 45 75, 10 55Z" fill="var(--color-text-inverse)" />
          <path d="M0 0 C35 25, 55 50, 75 95" stroke="var(--color-text-inverse)" strokeWidth="0.8" fill="none" />
          <path d="M15 35 C30 30, 40 40, 48 55" stroke="var(--color-text-inverse)" strokeWidth="0.6" fill="none" />
          <circle cx="85" cy="105" r="3" fill="var(--color-accent-3)" opacity="0.4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 opacity-20" style={{ transform: 'scaleX(-1)' }}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 C40 12, 55 40, 70 90 C55 78, 38 62, 8 45Z" fill="var(--color-text-inverse)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 opacity-20" style={{ transform: 'scaleY(-1)' }}>
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 C40 12, 55 40, 70 90 C55 78, 38 62, 8 45Z" fill="var(--color-text-inverse)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 opacity-25" style={{ transform: 'rotate(180deg)' }}>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M0 0 C50 15, 70 50, 90 110 C70 95, 45 75, 10 55Z" fill="var(--color-text-inverse)" />
          <path d="M0 0 C35 25, 55 50, 75 95" stroke="var(--color-text-inverse)" strokeWidth="0.8" fill="none" />
          <circle cx="85" cy="105" r="3" fill="var(--color-accent-3)" opacity="0.4" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <EnvelopeAnimation
          guestName={guestName || 'Tamu Undangan'}
          onOpen={playMusic}
        />
      </div>
      </section>
    </>
  )
}
