import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Badge from '../components/ui/Badge'
import { InlineLoader, ErrorBanner } from '../components/ui/LoadingSpinner'
import { useNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'
import {
  Bell, AlertTriangle, CheckCircle2, Info,
  ChevronRight, X, LayoutDashboard, Scale, QrCode,
  ClipboardList, History, PlusCircle, BarChart3,
  ShieldCheck, Users, Globe, Settings, Calendar
} from 'lucide-react'

const merchantSidebar = [
  { label: 'Main', links: [
    { to: '/merchant',              label: 'Dashboard',      icon: LayoutDashboard },
    { to: '/merchant/instruments',  label: 'My Instruments', icon: Scale },
    { to: '/merchant/apply',        label: 'New Application',icon: PlusCircle },
    { to: '/merchant/applications', label: 'Applications',   icon: ClipboardList },
  ]},
  { label: 'Records', links: [
    { to: '/merchant/certificates',  label: 'Certificates', icon: QrCode },
    { to: '/merchant/history',       label: 'History',      icon: History },
    { to: '/merchant/notifications', label: 'Alerts',       icon: Bell },
  ]},
]

const officerSidebar = [
  { label: 'Main', links: [
    { to: '/officer',             label: 'Dashboard',           icon: LayoutDashboard },
    { to: '/officer/queue',       label: 'Application Queue',   icon: ClipboardList },
    { to: '/officer/schedule',    label: 'Inspection Schedule', icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments',         icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued',        label: 'Issued Certificates', icon: QrCode },
    { to: '/officer/analytics',     label: 'Analytics',           icon: BarChart3 },
    { to: '/officer/notifications', label: 'Notifications',       icon: Bell },
  ]},
]

const adminSidebar = [
  { label: 'Overview', links: [
    { to: '/admin',           label: 'Dashboard',       icon: LayoutDashboard },
    { to: '/admin/analytics', label: 'Analytics',       icon: BarChart3 },
    { to: '/admin/map',       label: 'Jurisdiction Map',icon: Globe },
  ]},
  { label: 'Management', links: [
    { to: '/admin/instruments', label: 'All Instruments', icon: Scale },
    { to: '/admin/users',       label: 'Users & Officers',icon: Users },
    { to: '/admin/certificates',label: 'Certificates',    icon: ShieldCheck },
    { to: '/admin/enforcement', label: 'Enforcement',     icon: AlertTriangle },
  ]},
  { label: 'System', links: [
    { to: '/admin/notifications', label: 'Notifications', icon: Bell },
    { to: '/admin/settings',      label: 'Settings',      icon: Settings },
  ]},
]

const typeStyle = {
  danger:  { icon: AlertTriangle, bg: 'bg-red-50',     border: 'border-red-100',     iconColor: 'text-red-500',     dot: 'bg-red-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50',   border: 'border-amber-100',   iconColor: 'text-amber-500',   dot: 'bg-amber-500' },
  success: { icon: CheckCircle2,  bg: 'bg-emerald-50', border: 'border-emerald-100', iconColor: 'text-emerald-500', dot: 'bg-emerald-500' },
  info:    { icon: Info,          bg: 'bg-blue-50',    border: 'border-blue-100',    iconColor: 'text-blue-500',    dot: 'bg-blue-500' },
}

export default function Notifications() {
  const { profile } = useAuth()
  const role = profile?.role || 'merchant'
  const {
    notifications, unreadCount, loading, error,
    markRead, markAllRead, dismiss,
  } = useNotifications()

  const [filter, setFilter] = useState('all')

  const sidebarItems = role === 'admin' ? adminSidebar
    : role === 'officer' || role === 'gatc' ? officerSidebar
    : merchantSidebar

  const sidebarRole = role === 'officer' || role === 'gatc' ? 'officer' : role

  const filtered = filter === 'all'    ? notifications
    : filter === 'unread' ? notifications.filter(n => !n.is_read)
    : notifications.filter(n => n.type === filter)

  return (
    <DashboardLayout sidebarItems={sidebarItems} role={sidebarRole} title="Notifications & Alerts">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Alerts &amp; Notifications</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              className="text-xs text-primary-600 hover:underline font-medium">
              Mark all as read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all',     label: 'All' },
            { id: 'unread',  label: `Unread (${unreadCount})` },
            { id: 'danger',  label: 'Critical' },
            { id: 'warning', label: 'Warnings' },
            { id: 'info',    label: 'Updates' },
            { id: 'success', label: 'Completed' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors
                ${filter === f.id ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {loading && <InlineLoader text="Loading notifications…" />}
        {error   && <ErrorBanner message={error} />}

        <div className="flex flex-col gap-3">
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Bell size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No notifications here</p>
            </div>
          )}

          {filtered.map(notif => {
            const style = typeStyle[notif.type] || typeStyle.info
            const Icon  = style.icon
            return (
              <div key={notif.id}
                onClick={() => !notif.is_read && markRead(notif.id)}
                className={`relative bg-white rounded-2xl border shadow-sm p-4 transition-all cursor-default
                  ${!notif.is_read ? `${style.bg} ${style.border}` : 'border-slate-100'}`}>
                {!notif.is_read && (
                  <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${style.dot}`} />
                )}
                <div className="flex items-start gap-3 pr-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${style.bg}`}>
                    <Icon size={15} className={style.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${!notif.is_read ? 'text-slate-900' : 'text-slate-700'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.body}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-slate-400">
                        {new Date(notif.created_at).toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center gap-2">
                        {notif.action_url && (
                          <Link to={notif.action_url}
                            className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-0.5">
                            {notif.action_label || 'View'} <ChevronRight size={11} />
                          </Link>
                        )}
                        <button onClick={() => dismiss(notif.id)}
                          className="text-slate-300 hover:text-slate-500 ml-1">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
