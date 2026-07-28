import { useEffect, useState } from 'react'

interface Leaf {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  rotate: number
  variant: number
}

function generateLeaves(count: number): Leaf[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 30,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    rotate: Math.random() * 360,
    variant: Math.floor(Math.random() * 3),
  }))
}

function LeafSVG({ variant, size }: { variant: number; size: number }) {
  const paths = [
    // Olive leaf
    <svg key={0} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 2C20 2 8 12 8 24C8 32 13 38 20 38C27 38 32 32 32 24C32 12 20 2 20 2Z" stroke="var(--color-accent-2)" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M20 8V34" stroke="var(--color-accent-2)" strokeWidth="0.5" opacity="0.3" />
    </svg>,
    // Small circle / berry
    <svg key={1} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="8" stroke="var(--color-accent-3)" strokeWidth="0.8" fill="none" opacity="0.25" />
      <circle cx="20" cy="20" r="3" fill="var(--color-accent-3)" opacity="0.15" />
    </svg>,
    // Diamond
    <svg key={2} width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4L36 20L20 36L4 20Z" stroke="var(--color-accent)" strokeWidth="0.6" fill="none" opacity="0.2" />
    </svg>,
  ]
  return paths[variant]
}

export function FloatingBotanicals() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    setLeaves(generateLeaves(12))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-float"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            transform: `rotate(${leaf.rotate}deg)`,
          }}
        >
          <LeafSVG variant={leaf.variant} size={leaf.size} />
        </div>
      ))}
    </div>
  )
}
