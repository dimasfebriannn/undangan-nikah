import { useState, useCallback, useRef, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Helmet } from 'react-helmet-async'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { InvitationProvider } from '../hooks/useInvitationContext'
import { AyatSection } from '../components/shared/AyatSection'
import { Mempelai } from '../components/mempelai/Mempelai'
import { Event } from '../components/event/Event'
import { CountdownTimer } from '../components/event/CountdownTimer'
import { LoveStory } from '../components/love-story/LoveStory'
import { Footer } from '../components/shared/Footer'
import { WavyDivider } from '../components/shared/WavyDivider'
import { FloatingBotanicals } from '../components/shared/FloatingBotanicals'
import { OpeningHero } from '../components/shared/OpeningHero'
import { CoverEnvelope } from '../components/cover/CoverEnvelope'

const Gallery = lazy(() => import('../components/gallery/Gallery').then(m => ({ default: m.Gallery })))
const RSVPForm = lazy(() => import('../components/rsvp/RSVPForm').then(m => ({ default: m.RSVPForm })))
const Guestbook = lazy(() => import('../components/guestbook/Guestbook').then(m => ({ default: m.Guestbook })))
const AmplopDigital = lazy(() => import('../components/gift/AmplopDigital').then(m => ({ default: m.AmplopDigital })))
const VenueMaps = lazy(() => import('../components/maps/VenueMaps').then(m => ({ default: m.VenueMaps })))

export function InvitationPage() {
  useSmoothScroll()
  const slug = 'galih-maesya'
  const [coverDone, setCoverDone] = useState(false)
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

  return (
    <InvitationProvider slug={slug}>
      <Helmet>
        <title>The Wedding of Galih & Maesya</title>
        <meta name="description" content="Kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan Galih Dwi Rahman & Maesya Bella Dian. 20 Agustus 2026, Jember." />
        <meta property="og:title" content="The Wedding of Galih & Maesya" />
        <meta property="og:description" content="Kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan Galih Dwi Rahman & Maesya Bella Dian. 20 Agustus 2026, Jember." />
        <meta property="og:image" content="/images/couple/hero.jpeg" />
        <meta name="twitter:title" content="The Wedding of Galih & Maesya" />
        <meta name="twitter:description" content="Kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan Galih Dwi Rahman & Maesya Bella Dian. 20 Agustus 2026, Jember." />
        <meta name="twitter:image" content="/images/couple/hero.jpeg" />
      </Helmet>
      <div className="relative min-h-dvh" style={{ backgroundColor: 'var(--color-bg)' }}>
        <FloatingBotanicals />

        <div className="relative z-10">
          <AnimatePresence>
            {!coverDone && (
              <motion.div
                key="cover"
                className="fixed inset-0 z-50"
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <CoverEnvelope onOpen={() => { playMusic(); setTimeout(() => setCoverDone(true), 2000) }} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: coverDone ? 1 : 0 }}
            transition={{ duration: 0.8, delay: coverDone ? 0.3 : 0 }}
          >
            <OpeningHero />

            {/* Ayat — sand bg with dot pattern */}
            <div className="section-sand">
              <AyatSection />
            </div>

            <WavyDivider />

            {/* Mempelai — warm crosshatch bg */}
            <Mempelai />

            <WavyDivider flip />

            {/* Event + Countdown — sand bg with dot pattern */}
            <div className="section-sand">
              <Event />
              <CountdownTimer />
            </div>

            <WavyDivider />

            {/* Love Story — botanical bg with crosshatch */}
            <div className="section-botanical">
              <LoveStory />
            </div>

            <WavyDivider flip />

            {/* Gallery — cream bg */}
            <Suspense>
              <Gallery />
            </Suspense>

            <WavyDivider />

            {/* RSVP — warm bg */}
            <Suspense>
              <RSVPForm />
            </Suspense>

            <WavyDivider flip />

            {/* Guestbook — dot pattern */}
            <Suspense>
              <Guestbook />
            </Suspense>

            <WavyDivider />

            {/* Amplop Digital — accent bg with crosshatch */}
            <Suspense>
              <AmplopDigital />
            </Suspense>

            <WavyDivider flip />

            {/* Maps — sand bg */}
            <div className="section-sand">
              <Suspense>
                <VenueMaps />
              </Suspense>
            </div>

            <Footer />
          </motion.div>
        </div>
      </div>
    </InvitationProvider>
  )
}
