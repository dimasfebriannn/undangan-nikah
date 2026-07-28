import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ message = 'Gagal memuat data. Silakan coba lagi.', onRetry }: ErrorMessageProps) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="text-center">
        <AlertCircle className="mx-auto mb-3 h-10 w-10" style={{ color: 'var(--color-accent)' }} />
        <p className="mb-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            style={{
              background: 'rgba(194,113,79,0.08)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(194,113,79,0.15)',
            }}
          >
            <RefreshCw size={14} />
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  )
}
