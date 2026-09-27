import { NavLink } from 'react-router-dom'
import { Scale, X } from 'lucide-react'

export default function Sidebar({ items, role, onClose, mobile = false }) {
  const roleColors = {
    merchant: 'from-primary-900 to-primary-800',
    officer: 'from-slate-900 to-slate-800',
    admin: 'from-purple-900 to-purple-800',
    gatc: 'from-teal-900 to-teal-800',
  }

  const roleLabels = {
    merchant: 'Owner Portal',
    officer: 'LMO / GATC Portal',
    admin: 'Admin Dashboard',
    gatc: 'GATC Portal',
  }

  return (
    <aside className={`
      flex flex-col h-full w-64
      bg-gradient-to-b ${roleColors[role] || 'from-slate-900 to-slate-800'}
      text-white
    `}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
            <Scale size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">MetroVerify</p>
            <p className="text-[10px] text-white/50 leading-tight">{roleLabels[role] || 'Portal'}</p>
          </div>
        </div>
        {mobile && (
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {items.map((group, gi) => (
          <div key={gi} className="mb-5">
            {group.label && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 px-3 mb-2">
                {group.label}
              </p>
            )}
            {group.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5
                  text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:bg-white/8 hover:text-white/90'
                  }
                `}
              >
                <link.icon size={16} className="shrink-0" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-[10px] text-white/30 text-center">
          Legal Metrology Act 2009 · v1.0
        </p>
      </div>
    </aside>
  )
}
