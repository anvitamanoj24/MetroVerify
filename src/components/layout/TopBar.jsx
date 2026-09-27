import { useState } from 'react'
import { Bell, Search, Menu, ChevronDown, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../hooks/useNotifications'

export default function TopBar({ onMenuClick, title }) {
  const { profile, logout }      = useAuth()
  const { unreadCount }          = useNotifications()
  const navigate                 = useNavigate()
  const [showMenu, setShowMenu]  = useState(false)

  const roleRoutes = {
    merchant: '/merchant/notifications',
    officer:  '/officer/notifications',
    gatc:     '/gatc/notifications',
    admin:    '/admin/notifications',
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-4 gap-4 sticky top-0 z-20">
      <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-700 p-1">
        <Menu size={20} />
      </button>

      <div className="flex-1">
        {title && <h1 className="text-sm font-semibold text-slate-700">{title}</h1>}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-56">
        <Search size={14} className="text-slate-400" />
        <input placeholder="Search…"
          className="bg-transparent text-sm outline-none w-full text-slate-600 placeholder:text-slate-400" />
      </div>

      {/* Notifications bell */}
      <button
        onClick={() => navigate(roleRoutes[profile?.role] || '/merchant/notifications')}
        className="relative text-slate-500 hover:text-slate-700 p-1.5 hover:bg-slate-100 rounded-lg">
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px]
            font-bold rounded-full flex items-center justify-center px-0.5">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* User menu */}
      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors">
          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={14} className="text-primary-600" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-700 leading-tight">
              {profile?.full_name || 'User'}
            </p>
            <p className="text-[10px] text-slate-400 capitalize leading-tight">
              {profile?.role || '—'}
            </p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-slate-100
            shadow-lg py-1 z-50">
            <div className="px-3 py-2.5 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-700">{profile?.full_name}</p>
              <p className="text-xs text-slate-400">{profile?.email}</p>
              <p className="text-[10px] text-slate-400 capitalize mt-0.5">{profile?.role}</p>
            </div>
            <button onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
