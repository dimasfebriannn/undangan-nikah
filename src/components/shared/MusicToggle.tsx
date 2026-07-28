import { useRef, useEffect, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasAutoPlayed = useRef(false)

  const fadeVolume = useCallback(
    (from: number, to: number, duration = 400) => {
      const audio = audioRef.current
      if (!audio) return
      const step = (to - from) / (duration / 16)
      let current = from
      const id = setInterval(() => {
        current += step
        if ((step > 0 && current >= to) || (step < 0 && current <= to)) {
          audio.volume = to
          clearInterval(id)
        } else {
          audio.volume = Math.max(0, Math.min(1, current))
        }
      }, 16)
    },
    [],
  )

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio.play().then(() => {
      fadeVolume(0, 0.3, 600)
      setIsPlaying(true)
    }).catch(() => {})
  }, [fadeVolume])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    fadeVolume(audio.volume, 0, 400)
    setTimeout(() => {
      audio.pause()
      setIsPlaying(false)
    }, 420)
  }, [fadeVolume])

  useEffect(() => {
    const audio = new Audio('/music/background.mp3')
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    audioRef.current = audio

    audio.load()

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    if (hasAutoPlayed.current) return

    const handleInteraction = () => {
      if (hasAutoPlayed.current) return
      hasAutoPlayed.current = true
      play()
    }

    const events = ['click', 'touchstart', 'keydown']
    events.forEach((e) => document.addEventListener(e, handleInteraction, { once: true, passive: true }))

    return () => {
      events.forEach((e) => document.removeEventListener(e, handleInteraction))
    }
  }, [play])

  return (
    <button
      onClick={isPlaying ? pause : play}
      className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 active:scale-90 md:hover:scale-110"
      style={{
        backgroundColor: 'var(--color-accent)',
        color: '#fff',
        boxShadow: isPlaying
          ? '0 0 0 4px rgba(194,113,79,0.2), 0 4px 24px rgba(194,113,79,0.4)'
          : '0 4px 20px rgba(194,113,79,0.35), 0 0 0 2px rgba(255,255,255,0.15)',
      }}
      aria-label={isPlaying ? 'Matikan musik' : 'Nyalakan musik'}
    >
      {isPlaying && (
        <span
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid var(--color-accent)',
            animation: 'musicPulse 2s ease-in-out infinite',
          }}
        />
      )}
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}

      <style>{`
        @keyframes musicPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </button>
  )
}
