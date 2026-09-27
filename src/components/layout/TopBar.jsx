import { Bell, Search, Menu, ChevronDown, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function TopBar({ onMenuClick, title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-4 gap-4 sticky top-0 z-20">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-500 hover:text-slate-700 p-1"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1">
        {title && <h1 className="text-sm font-semibold text-slate-700">{title}</h1>}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-64">
        <Search size={14} className="text-slate-400" />
        <input
          placeholder="Search instruments, certificates..."
          className="bg-transparent text-sm outline-none w-full text-slate-600 placeholder:text-slate-400"
        />
      </div>

      {/* Notifications */}
      <button className="relative text-slate-500 hover:text-slate-700 p-1.5 hover:bg-slate-100 rounded-lg">
        <Bell size={18} />
        <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* User */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors"
        >
          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={14} className="text-primary-600" />
          </div>
          <span className="hidden md:block text-sm font-medium text-slate-700">{user?.name || 'User'}</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg border border-slate-100 shadow-lg py-1 z-50">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-700">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
