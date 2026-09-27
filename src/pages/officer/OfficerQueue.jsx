import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { useApplicationQueue } from '../../hooks/useApplications'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  Eye, User, MapPin, Clock, Truck, BarChart3, Calendar, FileSearch, Search
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/officer',             label: 'Dashboard',           icon: LayoutDashboard },
    { to: '/officer/queue',       label: 'Application Queue',   icon: ClipboardList, badge: '8' },
    { to: '/officer/schedule',    label: 'Inspection Schedule', icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments',         icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued',        label: 'Issued Certificates', icon: QrCode },
    { to: '/officer/analytics',     label: 'Analytics',           icon: BarChart3 },
    { to: '/officer/notifications', label: 'Notifications',       icon: Bell, badge: '2' },
  ]},
]

const priorityColor = {
  high:   { label: 'High',   variant: 'danger'  },
  medium: { label: 'Medium', variant: 'warning' },
  low:    { label: 'Low',    variant: 'neutral' },
}

const statusMap = {
  submitted:          { label: 'Submitted',         variant: 'info'    },
  under_review:       { label: 'Under Review',      variant: 'info'    },
  evidence_requested: { label: 'Evidence Requested',variant: 'warning' },
}

export default function OfficerQueue() {
  const [typeTab, setTypeTab] = useState('all')
  const [search, setSearch]   = useState('')
  const { queue, loading, error, reload } = useApplicationQueue(typeTab)

  const filtered = queue.filter(a =>
    [a.instrument_name, a.applicant_name, a.app_number, a.instrument_district]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Application Queue">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Application Queue</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {queue.length} applications pending review &nbsp;·&nbsp; Chennai Division
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by instrument, owner or application ID…"
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none
                focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {[['all','All'], ['digital','Digital'], ['physical','Physical']].map(([id, label]) => (
              <button key={id} onClick={() => setTypeTab(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors
                  ${typeTab === id ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading && <InlineLoader text="Loading queue…" />}
        {error   && <ErrorBanner message={error} onRetry={reload} />}

        {!loading && !error && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
            {filtered.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-12">No applications in queue.</p>
            )}
            {filtered.map(app => (
              <div key={app.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                  ${app.pathway === 'digital' ? 'bg-blue-50' : 'bg-slate-100'}`}>
                  {app.pathway === 'digital'
                    ? <FileSearch size={16} className="text-blue-600" />
                    : <Truck size={16} className="text-slate-500" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{app.instrument_name}</span>
                    <Badge variant={statusMap[app.status]?.variant || 'info'} className="text-[10px]">
                      {statusMap[app.status]?.label || app.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {app.app_number} &nbsp;·&nbsp; {app.serial_number}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <User size={10} />{app.applicant_name}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={10} />{app.instrument_district}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(app.submitted_at).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                <Link to={`/officer/review/${app.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary-600
                    border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50
                    transition-colors shrink-0">
                  <Eye size={13} /> Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
