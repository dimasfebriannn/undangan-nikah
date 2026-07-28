interface SectionOrnamentProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  variant?: 'leaf' | 'dots' | 'circle' | 'diamond' | 'wave'
  className?: string
}

export function SectionOrnament({ position = 'top-right', variant = 'leaf', className = '' }: SectionOrnamentProps) {
  const positionClasses: Record<string, string> = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  }

  const svgs: Record<string, React.ReactNode> = {
    leaf: (
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="opacity-[0.07]">
        <path d="M10 10 C40 10, 70 30, 90 70 C70 60, 45 45, 15 30Z" fill="var(--color-accent-2)" />
        <path d="M10 10 C30 25, 50 45, 65 75" stroke="var(--color-accent-2)" strokeWidth="0.8" fill="none" />
        <path d="M20 30 C35 28, 45 38, 52 52" stroke="var(--color-accent-2)" strokeWidth="0.5" fill="none" />
        <circle cx="88" cy="68" r="4" fill="var(--color-accent-3)" opacity="0.5" />
        <circle cx="72" cy="55" r="2.5" fill="var(--color-accent-3)" opacity="0.4" />
        <circle cx="58" cy="42" r="1.5" fill="var(--color-accent-3)" opacity="0.3" />
      </svg>
    ),
    dots: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.06]">
        {Array.from({ length: 16 }, (_, i) => (
          <circle
            key={i}
            cx={15 + (i % 4) * 30}
            cy={15 + Math.floor(i / 4) * 30}
            r={1.5 + (i % 3) * 0.5}
            fill="var(--color-accent)"
          />
        ))}
      </svg>
    ),
    circle: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="opacity-[0.04]">
        <circle cx="80" cy="80" r="60" stroke="var(--color-accent)" strokeWidth="0.8" fill="none" />
        <circle cx="80" cy="80" r="45" stroke="var(--color-accent-3)" strokeWidth="0.6" fill="none" strokeDasharray="4 6" />
        <circle cx="80" cy="80" r="30" stroke="var(--color-accent-2)" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    diamond: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-[0.06]">
        <path d="M50 10 L80 50 L50 90 L20 50Z" stroke="var(--color-accent)" strokeWidth="0.8" fill="none" />
        <path d="M50 25 L68 50 L50 75 L32 50Z" stroke="var(--color-accent-3)" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="4" fill="var(--color-accent)" opacity="0.3" />
      </svg>
    ),
    wave: (
      <svg width="200" height="60" viewBox="0 0 200 60" fill="none" className="opacity-[0.06]">
        <path d="M0 30 C25 10, 50 10, 75 30 C100 50, 125 50, 150 30 C175 10, 200 10, 200 30" stroke="var(--color-accent)" strokeWidth="0.8" fill="none" />
        <path d="M0 35 C25 15, 50 15, 75 35 C100 55, 125 55, 150 35 C175 15, 200 15, 200 35" stroke="var(--color-accent-3)" strokeWidth="0.5" fill="none" />
      </svg>
    ),
  }

  return (
    <div
      className={`pointer-events-none absolute ${positionClasses[position]} ${className}`}
    >
      {svgs[variant]}
    </div>
  )
}
