export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2"
          style={{
            borderColor: 'rgba(194,113,79,0.2)',
            borderTopColor: 'var(--color-accent)',
          }}
        />
        <p
          className="text-sm tracking-wide"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          Memuat data...
        </p>
      </div>
    </div>
  )
}
