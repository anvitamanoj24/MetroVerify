import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import {
  Bell, AlertTriangle, CheckCircle2, Clock, Info,
  ChevronRight, X, LayoutDashboard, Scale, QrCode,
  ClipboardList, History, PlusCircle, BarChart3,
  ShieldCheck, Users, Globe, Settings, Calendar
} from 'lucide-react'

const merchantSidebar = [
  { label: 'Main', links: [
    { to: '/merchant', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/merchant/instruments', label: 'My Instruments', icon: Scale },
    { to: '/merchant/apply', label: 'New Application', icon: PlusCircle },
    { to: '/merchant/applications', label: 'Applications', icon: ClipboardList },
  ]},
  { label: 'Records', links: [
    { to: '/merchant/certificates', label: 'Certificates', icon: QrCode },
    { to: '/merchant/history', label: 'History', icon: History },
    { to: '/merchant/notifications', label: 'Alerts', icon: Bell, badge: '3' },
  ]},
]

const officerSidebar = [
  { label: 'Main', links: [
    { to: '/officer', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/queue', label: 'Review Queue', icon: ClipboardList, badge: '8' },
    { to: '/officer/schedule', label: 'Schedule', icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments', icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued', label: 'Issued Certificates', icon: QrCode },
    { to: '/officer/notifications', label: 'Notifications', icon: Bell, badge: '2' },
    { to: '/officer/analytics', label: 'Analytics', icon: BarChart3 },
  ]},
]

const adminSidebar = [
  { label: 'Overview', links: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/map', label: 'Jurisdiction Map', icon: Globe },
  ]},
  { label: 'Management', links: [
    { to: '/admin/instruments', label: 'All Instruments', icon: Scale },
    { to: '/admin/users', label: 'Users & Officers', icon: Users },
    { to: '/admin/certificates', label: 'Certificates', icon: ShieldCheck },
    { to: '/admin/enforcement', label: 'Enforcement', icon: AlertTriangle },
  ]},
  { label: 'System', links: [
    { to: '/admin/notifications', label: 'Notifications', icon: Bell, badge: '5' },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ]},
]

const merchantNotifications = [
  { id: 1, type: 'danger', title: 'Instrument Expired', body: 'Electronic Balance (EB-2022-045) verification expired on Jun 15, 2026. Apply for re-verification immediately to avoid penalties.', time: 'Today, 9:00 AM', read: false, action: { label: 'Apply Now', to: '/merchant/apply' } },
  { id: 2, type: 'warning', title: 'Expiring in 28 Days', body: 'Counter Scale 5kg (CS-2023-112) verification expires on Oct 25, 2026. Renew before expiry to continue using the instrument.', time: 'Today, 9:00 AM', read: false, action: { label: 'Renew Now', to: '/merchant/apply' } },
  { id: 3, type: 'info', title: 'Application Under Review', body: 'Your application APP-2026-0412 for Counter Scale 5kg has been received and is under review by the LMO officer.', time: 'Sep 20, 2026, 3:42 PM', read: false, action: { label: 'Track Status', to: '/merchant/applications' } },
  { id: 4, type: 'success', title: 'Certificate Issued', body: 'Certificate MV-2026-TN-004521 has been issued for Platform Weighbridge (WB-2024-001). Valid until Sep 2029.', time: 'Sep 10, 2026, 11:15 AM', read: true, action: { label: 'View Certificate', to: '/merchant/certificates' } },
  { id: 5, type: 'warning', title: 'Evidence Review Required', body: 'The analysis for APP-2026-0301 flagged an anomaly. The officer has requested additional photos of the serial number plate.', time: 'Aug 29, 2026, 2:00 PM', read: true, action: { label: 'Upload Evidence', to: '/merchant/apply' } },
]

const officerNotifications = [
  { id: 1, type: 'danger', title: 'High Priority Application', body: 'APP-2026-0412 (Counter Scale 5kg) has been pending for 48+ hours. Review required.', time: 'Today, 8:00 AM', read: false, action: { label: 'Review Now', to: '/officer/queue' } },
  { id: 2, type: 'warning', title: 'Low Confidence Score', body: 'Application APP-2026-0399 (Fuel Dispenser) received a low confidence score (55%). Manual review recommended.', time: 'Today, 9:30 AM', read: false, action: { label: 'Review', to: '/officer/queue' } },
  { id: 3, type: 'info', title: 'Inspection Scheduled', body: 'Physical inspection for APP-2026-0405 (Jewellery Balance) is scheduled for Sep 29, 2026 at 10:00 AM at Salem.', time: 'Sep 20, 2026', read: true, action: { label: 'View Schedule', to: '/officer/schedule' } },
  { id: 4, type: 'success', title: 'Certificate Issued', body: 'Certificate MV-2026-TN-004521 has been successfully generated and dispatched to the owner.', time: 'Sep 10, 2026', read: true, action: null },
]

const adminNotifications = [
  { id: 1, type: 'danger', title: 'Enforcement Alert', body: 'Seal tampering suspected at Roadside Vendor, Madurai (ENF-2026-0079). Investigation required.', time: 'Today, 8:00 AM', read: false, action: { label: 'View Case', to: '/admin/enforcement' } },
  { id: 2, type: 'warning', title: '156 Expired Instruments', body: '156 instruments across Tamil Nadu have expired verification. Enforcement action may be required.', time: 'Today, 9:00 AM', read: false, action: { label: 'View Instruments', to: '/admin/instruments' } },
  { id: 3, type: 'info', title: 'Monthly Report Ready', body: 'September 2026 compliance report is ready for download. 310 verifications completed this month.', time: 'Sep 27, 2026', read: false, action: { label: 'Download', to: '/admin/analytics' } },
  { id: 4, type: 'success', title: 'System Update Applied', body: 'Platform updated to v1.0.1. Certificate generation performance improved by 40%.', time: 'Sep 25, 2026', read: true, action: null },
  { id: 5, type: 'warning', title: 'New Officer Pending Approval', body: 'Insp. Arun V. from Vellore has registered and is awaiting role approval.', time: 'Sep 22, 2026', read: true, action: { label: 'Review User', to: '/admin/users' } },
]

const typeStyle = {
  danger:  { icon: AlertTriangle, bg: 'bg-red-50',     border: 'border-red-100',     iconColor: 'text-red-500',     dot: 'bg-red-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50',   border: 'border-amber-100',   iconColor: 'text-amber-500',   dot: 'bg-amber-500' },
  success: { icon: CheckCircle2,  bg: 'bg-emerald-50', border: 'border-emerald-100', iconColor: 'text-emerald-500', dot: 'bg-emerald-500' },
  info:    { icon: Info,          bg: 'bg-blue-50',    border: 'border-blue-100',    iconColor: 'text-blue-500',    dot: 'bg-blue-500' },
}

export default function Notifications() {
  const { user } = useAuth()
  const role = user?.role || 'merchant'

  const sidebarItems = role === 'admin' ? adminSidebar : role === 'officer' || role === 'gatc' ? officerSidebar : merchantSidebar
  const sidebarRole = role === 'officer' || role === 'gatc' ? 'officer' : role
  const allNotifs = role === 'admin' ? adminNotifications : role === 'officer' || role === 'gatc' ? officerNotifications : merchantNotifications

  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(allNotifs)

  const dismiss = (id) => setItems(items.filter(n => n.id !== id))
  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })))

  const filtered = filter === 'all' ? items
    : filter === 'unread' ? items.filter(n => !n.read)
    : items.filter(n => n.type === filter)

  const unreadCount = items.filter(n => !n.read).length

  return (
    <DashboardLayout sidebarItems={sidebarItems} role={sidebarRole} title="Notifications & Alerts">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Alerts &amp; Notifications</h2>
            <p className="text-sm text-slate-500 mt-0.5">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary-600 hover:underline font-medium">
              Mark all as read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'danger', label: 'Critical' },
            { id: 'warning', label: 'Warnings' },
            { id: 'info', label: 'Updates' },
            { id: 'success', label: 'Completed' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors
                ${filter === f.id ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Bell size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No notifications here</p>
            </div>
          )}
          {filtered.map((notif) => {
            const style = typeStyle[notif.type]
            const Icon = style.icon
            return (
              <div key={notif.id}
                className={`relative bg-white rounded-2xl border shadow-sm p-4 transition-all
                  ${!notif.read ? `${style.bg} ${style.border}` : 'border-slate-100'}`}>
                {!notif.read && (
                  <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${style.dot}`} />
                )}
                <div className="flex items-start gap-3 pr-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${style.bg}`}>
                    <Icon size={15} className={style.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.body}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                      <div className="flex items-center gap-2">
                        {notif.action && (
                          <Link to={notif.action.to}
                            className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-0.5">
                            {notif.action.label} <ChevronRight size={11} />
                          </Link>
                        )}
                        <button onClick={() => dismiss(notif.id)} className="text-slate-300 hover:text-slate-500 ml-1">
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

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Notification Preferences</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Email alerts for expiring instruments', checked: true },
              { label: 'SMS reminders 30 days before expiry', checked: true },
              { label: 'Application status updates', checked: true },
              { label: 'Certificate issuance notifications', checked: true },
              { label: 'Monthly compliance summary', checked: false },
            ].map((pref) => (
              <label key={pref.label} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-600">{pref.label}</span>
                <div className={`relative w-9 h-5 rounded-full transition-colors ${pref.checked ? 'bg-primary-600' : 'bg-slate-200'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${pref.checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
