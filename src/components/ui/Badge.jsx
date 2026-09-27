const variants = {
  success: 'bg-accent-100 text-accent-700 border border-accent-200',
  warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  danger: 'bg-red-50 text-red-600 border border-red-200',
  info: 'bg-primary-50 text-primary-700 border border-primary-200',
  neutral: 'bg-slate-100 text-slate-600 border border-slate-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
