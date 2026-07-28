import { useState } from 'react'
import { motion } from 'motion/react'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { SectionOrnament } from '../shared/SectionOrnament'
import { Copy, Check } from 'lucide-react'

interface BankInfo {
  name: string
  account: string
  holder: string
  logo: string
}

const BANKS: BankInfo[] = [
  { name: 'BCA', account: '1234 5678 9012', holder: 'Muhammad Budi P', logo: '/images/banks/bca.png' },
  { name: 'Mandiri', account: '1234 5678 9012 3456', holder: 'Sarah Aminah', logo: '/images/banks/mandiri.png' },
  { name: 'BNI', account: '1234 5678 90', holder: 'Muhammad Budi P', logo: '/images/banks/bni.png' },
  { name: 'BRI', account: '1234 5678 9012 345', holder: 'Sarah Aminah', logo: '/images/banks/bri.png' },
]

const CARD_BG = 'linear-gradient(145deg, #2C1E14 0%, #3A2A1E 30%, #4A3828 60%, #3A2A1E 100%)'

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <motion.button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-medium"
      style={{
        background: copied ? 'rgba(196,153,107,0.3)' : 'rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileTap={{ scale: 0.92 }}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'OK' : 'Salin'}
    </motion.button>
  )
}

function BankLogo({ logo, name }: { logo: string; name: string }) {
  return (
    <img
      src={logo}
      alt={name}
      className="w-auto object-contain"
      style={{ height: name === 'Mandiri' ? '5rem' : '4rem', filter: 'brightness(0) invert(1) sepia(0.2) saturate(0.5) brightness(0.8)', mixBlendMode: 'screen' }}
      loading="lazy"
    />
  )
}

function BankCard({ bank, index }: { bank: BankInfo; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl"
        style={{
          aspectRatio: '1.586/1',
          background: CARD_BG,
          boxShadow: '0 16px 48px rgba(30,18,8,0.25), 0 4px 12px rgba(30,18,8,0.15)',
        }}
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Metallic sheen */}
        <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(196,153,107,0.04) 45%, rgba(196,153,107,0.08) 50%, rgba(196,153,107,0.04) 55%, transparent 70%)',
        }} />

        {/* Bank logo — replaces holographic strip */}
        <div className="absolute top-8 right-4 z-20">
          <BankLogo logo={bank.logo} name={bank.name} />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 pt-12">
          {/* EMV Chip */}
          <div className="flex items-start">
            <div style={{
              width: 40, height: 30, borderRadius: 6,
              background: 'linear-gradient(145deg, #D4AF37 0%, #C9A830 50%, #B8963A 100%)',
              boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.2)',
              position: 'relative', overflow: 'hidden',
            }}>
              <svg className="absolute inset-0" width="40" height="30" viewBox="0 0 40 30" fill="none">
                <rect x="5" y="3" width="30" height="24" rx="2" stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" fill="none" />
                <line x1="13" y1="3" x2="13" y2="27" stroke="rgba(0,0,0,0.07)" strokeWidth="0.3" />
                <line x1="20" y1="3" x2="20" y2="27" stroke="rgba(0,0,0,0.07)" strokeWidth="0.3" />
                <line x1="27" y1="3" x2="27" y2="27" stroke="rgba(0,0,0,0.07)" strokeWidth="0.3" />
                <line x1="5" y1="10" x2="35" y2="10" stroke="rgba(0,0,0,0.07)" strokeWidth="0.3" />
                <line x1="5" y1="17" x2="35" y2="17" stroke="rgba(0,0,0,0.07)" strokeWidth="0.3" />
                <line x1="5" y1="24" x2="35" y2="24" stroke="rgba(0,0,0,0.07)" strokeWidth="0.3" />
              </svg>
            </div>
          </div>

          {/* Account number */}
          <p className="text-[14px] tracking-[0.2em] sm:text-[16px]" style={{
            fontFamily: "'Courier New', Consolas, monospace",
            color: 'rgba(232,213,192,0.85)',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}>
            {bank.account}
          </p>

          {/* Holder + Copy */}
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[7px] tracking-[0.22em] uppercase" style={{ color: 'rgba(196,153,107,0.35)' }}>
                Card Holder
              </p>
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[10px] font-medium tracking-wide uppercase" style={{
                  color: 'rgba(232,213,192,0.6)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}>
                  {bank.holder}
                </p>
                <CopyBtn text={bank.account} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export function AmplopDigital() {
  return (
    <SectionContainer className="section-accent crosshatch">
      <SectionOrnament position="top-right" variant="wave" />
      <SectionOrnament position="bottom-left" variant="dots" />

      <ScrollReveal>
        <p className="mb-3 text-center text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
          Hadiah Pernikahan
        </p>
        <h2 className="mb-2 text-center text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}>
          Amplop Digital
        </h2>
        <p className="mx-auto mb-10 max-w-sm text-center text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih, dapat melalui:
        </p>
      </ScrollReveal>

      <div className="mx-auto max-w-md space-y-5">
        {BANKS.map((bank, i) => (
          <BankCard key={bank.name} bank={bank} index={i} />
        ))}
      </div>
    </SectionContainer>
  )
}
