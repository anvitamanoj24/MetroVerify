export function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    </div>
  )
}

export function InlineLoader({ text = 'Loading…' }) {
  return (
    <div className="flex items-center gap-2 py-8 justify-center text-slate-400">
      <div className="w-4 h-4 border-2 border-slate-200 border-t-primary-500 rounded-full animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-3">
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <button onClick={onRetry}
          className="text-xs font-semibold text-red-700 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-100">
          Retry
        </button>
      )}
    </div>
  )
}
