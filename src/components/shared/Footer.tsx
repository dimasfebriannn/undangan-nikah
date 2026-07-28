import { SAMPLE_INVITATION } from '../../lib/constants'

export function Footer() {
  const data = SAMPLE_INVITATION

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="px-6 py-16 text-center" style={{ backgroundColor: '#2C1E14' }}>
      <div className="mx-auto max-w-md">
        {/* Couple */}
        <p
          className="text-2xl font-light"
          style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.8)' }}
        >
          {data.groomName}
        </p>
        <p
          className="my-1 text-xl"
          style={{ fontFamily: 'var(--font-script)', color: 'var(--color-accent-3)' }}
        >
          &amp;
        </p>
        <p
          className="text-2xl font-light"
          style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.8)' }}
        >
          {data.brideName}
        </p>

        {/* Divider */}
        <div className="mx-auto my-6 h-px w-16" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Closing */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
        >
          Terima kasih atas doa dan ucapan yang telah diberikan.
        </p>
        <p
          className="mt-3 text-sm italic"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)' }}
        >
          Wassalamualaikum Wr. Wb.
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="mt-8 text-xs tracking-widest uppercase transition-colors duration-300 hover:text-white"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}
        >
          ↑ Kembali ke Atas
        </button>
      </div>
    </footer>
  )
}
