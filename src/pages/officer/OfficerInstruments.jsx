import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { useAllInstruments } from '../../hooks/useInstruments'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  Calendar, BarChart3, Search, Eye, FileText
} from 'lucide-react'

const sidebarItems = [
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

const statusMap = {
  valid:      { label: 'Valid',      variant: 'success' },
  expiring:   { label: 'Expiring',   variant: 'warning' },
  expired:    { label: 'Expired',    variant: 'danger'  },
  unverified: { label: 'Unverified', variant: 'neutral' },
}

export default function OfficerInstruments() {
  const { instruments, loading, error } = useAllInstruments()
  const [search, setSearch] = useState('')

  const filtered = instruments.filter(i =>
    [i.name, i.serial_number, i.district, i.state].join(' ')
      .toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Instruments Registry">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Instruments Registry</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? 'Loading…' : `${instruments.length} registered instruments in your jurisdiction`}
          </p>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search instruments…"
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm
              outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100
              placeholder:text-slate-400" />
        </div>

        {loading && <InlineLoader text="Loading instruments…" />}
        {error   && <ErrorBanner message={error} />}

        {!loading && !error && instruments.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">No instruments registered yet</h3>
            <p className="text-sm text-slate-500">
              Instruments registered by merchants in your jurisdiction will appear here.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Instrument', 'Serial', 'Type', 'Owner', 'Location', 'Status', 'Expiry', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 first:pl-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(inst => (
                  <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 pl-5 py-3 font-semibold text-slate-800 text-xs">{inst.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{inst.serial_number}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{inst.instrument_type || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{inst.profiles?.full_name || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{inst.district || '—'}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={statusMap[inst.status]?.variant || 'neutral'}
                        className="text-[10px]">
                        {statusMap[inst.status]?.label || inst.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">—</td>
                    <td className="px-4 py-3">
                      <Link to={`/passport/${inst.id}`}
                        className="text-xs text-primary-600 hover:underline flex items-center gap-0.5">
                        <Eye size={11} /> Passport
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
