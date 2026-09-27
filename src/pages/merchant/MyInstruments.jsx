import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { useMyInstruments } from '../../hooks/useInstruments'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History, Search, MapPin, Eye, Hash
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/merchant',              label: 'Dashboard',      icon: LayoutDashboard },
    { to: '/merchant/instruments',  label: 'My Instruments', icon: Scale },
    { to: '/merchant/apply',        label: 'New Application',icon: PlusCircle },
    { to: '/merchant/applications', label: 'Applications',   icon: ClipboardList },
  ]},
  { label: 'Records', links: [
    { to: '/merchant/certificates',  label: 'Certificates', icon: QrCode },
    { to: '/merchant/history',       label: 'History',      icon: History },
    { to: '/merchant/notifications', label: 'Alerts',       icon: Bell, badge: '3' },
  ]},
]

const statusMap = {
  valid:      { label: 'Valid',      variant: 'success' },
  expiring:   { label: 'Expiring',   variant: 'warning' },
  expired:    { label: 'Expired',    variant: 'danger'  },
  unverified: { label: 'Unverified', variant: 'neutral' },
}

export default function MyInstruments() {
  const { instruments, loading, error, reload } = useMyInstruments()
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')

  const filtered = instruments
    .filter(i => filter === 'all' || i.status === filter)
    .filter(i => [i.name, i.serial_number, i.district].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="My Instruments">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Instruments</h2>
            <p className="text-sm text-slate-500 mt-0.5">{instruments.length} registered instruments</p>
          </div>
          <Link to="/merchant/apply"
            className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-semibold
              px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            <PlusCircle size={15} /> Register New
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, serial or district…"
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none
                focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
          </div>
          <div className="flex gap-2">
            {[['all','All'], ['valid','Valid'], ['expiring','Expiring'], ['expired','Expired']].map(([id, label]) => (
              <button key={id} onClick={() => setFilter(id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors
                  ${filter === id ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading && <InlineLoader text="Loading instruments…" />}
        {error   && <ErrorBanner message={error} onRetry={reload} />}

        {!loading && !error && (
          <div className="grid gap-4">
            {filtered.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-12">
                {instruments.length === 0
                  ? 'No instruments yet. Apply to register your first instrument.'
                  : 'No instruments match your search.'}
              </p>
            )}
            {filtered.map(inst => (
              <div key={inst.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 p-5">
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                    <Scale size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-bold text-slate-800">{inst.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {inst.instrument_type} · {inst.capacity} {inst.unit} · {inst.manufacturer}
                        </p>
                      </div>
                      <Badge variant={statusMap[inst.status]?.variant || 'neutral'}>
                        {statusMap[inst.status]?.label || inst.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      {[
                        { icon: Hash,   label: 'Serial No.', value: inst.serial_number },
                        { icon: MapPin, label: 'Location',   value: inst.address || inst.district },
                        { icon: QrCode, label: 'Seal ID',    value: inst.seal_id || '—' },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label}>
                          <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                            <Icon size={9} />{label}
                          </p>
                          <p className="text-xs font-semibold text-slate-700 truncate">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-5 pb-4 border-t border-slate-50 pt-3">
                  <Link to={`/passport/${inst.id}`}
                    className="flex items-center gap-1.5 text-xs text-primary-600 border border-primary-200
                      px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                    <Eye size={12} /> View Passport
                  </Link>
                  {(inst.status === 'expiring' || inst.status === 'expired') && (
                    <Link to="/merchant/apply"
                      className="flex items-center gap-1.5 text-xs text-white bg-primary-600
                        px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors ml-auto">
                      <PlusCircle size={12} /> Apply Re-verification
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
