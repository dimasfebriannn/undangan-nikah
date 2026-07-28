import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionContainerProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionContainer({
  children,
  className = '',
  id,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('px-6 py-16 md:py-24', className)}
    >
      <div className="mx-auto max-w-2xl">
        {children}
      </div>
    </section>
  )
}
