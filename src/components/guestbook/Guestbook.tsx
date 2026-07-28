import { useState, useEffect, useCallback } from 'react'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { SectionOrnament } from '../shared/SectionOrnament'
import { useInvitationData } from '../../hooks/useInvitationContext'
import { api } from '../../lib/api'
import { getTimeAgo } from '../../lib/utils'
import type { Wish } from '../../types'

export function Guestbook() {
  const data = useInvitationData()
  const [wishes, setWishes] = useState<Wish[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const fetchWishes = useCallback(async (p: number) => {
    setIsLoading(true)
    try {
      const res = await api.getWishes(data.slug, p, 4)
      if (p === 1) {
        setWishes(res.wishes)
      } else {
        setWishes((prev) => [...prev, ...res.wishes])
      }
      setHasMore(res.wishes.length === 4)
    } catch {
      setWishes([])
    } finally {
      setIsLoading(false)
    }
  }, [data.slug])

  useEffect(() => {
    fetchWishes(1)
  }, [fetchWishes])

  useEffect(() => {
    const handler = () => {
      setPage(1)
      setIsExpanded(false)
      fetchWishes(1)
    }
    window.addEventListener('wish-submitted', handler)
    return () => window.removeEventListener('wish-submitted', handler)
  }, [fetchWishes])

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    setIsExpanded(true)
    fetchWishes(next)
  }

  const collapse = () => {
    setPage(1)
    setIsExpanded(false)
    fetchWishes(1)
  }

  return (
    <SectionContainer className="dot-pattern">
      <SectionOrnament position="top-left" variant="circle" className="scale-50" />

      <ScrollReveal>
        <p
          className="mb-3 text-center text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-subtle)' }}
        >
          Ucapan & Doa
        </p>
        <h2
          className="mb-10 text-center text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}
        >
          Guestbook
        </h2>
      </ScrollReveal>

      <div className="mx-auto max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishes.map((wish, i) => (
          <ScrollReveal key={wish.id} delay={i * 0.05}>
            <div className="glass-warm rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: 'var(--gradient-accent)' }}
                  >
                    {(wish.guestName || '?').charAt(0)}
                  </div>
                  <h4
                    className="font-semibold"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                  >
                    {wish.guestName}
                  </h4>
                </div>
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-text-subtle)' }}
                >
                  {getTimeAgo(wish.createdAt)}
                </span>
              </div>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              >
                {wish.message}
              </p>
            </div>
          </ScrollReveal>
        ))}

        {wishes.length === 0 && !isLoading && (
          <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Belum ada ucapan.
          </p>
        )}

        {wishes.length > 0 && (
          <div className="col-span-full flex items-center justify-center gap-3 pt-2">
            {hasMore && (
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="rounded-full px-6 py-2 text-xs font-medium transition-all duration-300 hover:shadow-md"
                style={{
                  background: 'rgba(194,113,79,0.08)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(194,113,79,0.15)',
                }}
              >
                {isLoading ? 'Memuat...' : 'Muat Lebih Banyak'}
              </button>
            )}
            {isExpanded && (
              <button
                onClick={collapse}
                disabled={isLoading}
                className="rounded-full px-6 py-2 text-xs font-medium transition-all duration-300 hover:shadow-md"
                style={{
                  background: 'rgba(139,158,121,0.08)',
                  color: 'var(--color-accent-2)',
                  border: '1px solid rgba(139,158,121,0.15)',
                }}
              >
                Sembunyikan
              </button>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  )
}
