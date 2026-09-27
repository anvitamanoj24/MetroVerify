import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History, Search, Filter,
  MapPin, ChevronRight, Calendar, Hash, Building2, Eye
} from 'lucide-react'

const sidebarItems = [
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

const instruments = [
  { id: 'INS-TN-001', name: 'Platform Weighbridge', serial: 'WB-2024-001', type: 'Weighbridge', capacity: '50 T', manufacturer: 'Avery Weigh-Tronix', location: 'Chennai Market, Chennai', status: 'valid', cert: 'MV-2026-TN-004521', expiry: 'Sep 2029', issued: 'Sep 2026' },
  { id: 'INS-TN-002', name: 'Counter Scale 5kg', serial: 'CS-2023-112', type: 'Counter Scale', capacity: '5 kg', manufacturer: 'Essae Teraoka', location: 'Anna Nagar Shop, Chennai', status: 'expiring', cert: 'MV-2023-TN-002104', expiry: 'Oct 2026', issued: 'Oct 2023' },
  { id: 'INS-TN-003', name: 'Electronic Balance', serial: 'EB-2022-045', type: 'Balance', capacity: '200 g', manufacturer: 'Mettler Toledo', location: 'T. Nagar Store, Chennai', status: 'expired', cert: 'MV-2023-TN-001876', expiry: 'Jun 2026', issued: 'Jun 2023' },
  { id: 'INS-TN-004', name: 'Petrol Pump Dispenser', serial: 'PP-2024-089', type: 'Fuel Dispenser', capacity: '—', manufacturer: 'Tatsuno', location: 'Tambaram Fuel Station', status: 'valid', cert: 'MV-2024-TN-003312', expiry: 'Dec 2026', issued: 'Dec 2024' },
]

const statusMap = {
  valid: { label: 'Valid', variant: 'success' },
  expiring: { label: 'Expiring Soon', variant: 'warning' },
  expired: { label: 'Expired', variant: 'danger' },
}

export default function MyInstruments() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = instruments
    .filter(i => filter === 'all' || i.status === filter)
    .filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.serial.toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="My Instruments">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Instruments</h2>
            <p className="text-sm text-slate-500 mt-0.5">{instruments.length} registered instruments</p>
          </div>
          <Link to="/merchant/apply"
            className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            <PlusCircle size={15} /> Register New Instrument
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or serial number..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
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

        {/* Cards */}
        <div className="grid gap-4">
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
                      <p className="text-xs text-slate-400 mt-0.5">{inst.type} · {inst.capacity} · {inst.manufacturer}</p>
                    </div>
                    <Badge variant={statusMap[inst.status].variant}>{statusMap[inst.status].label}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {[
                      { icon: Hash, label: 'Serial No.', value: inst.serial },
                      { icon: MapPin, label: 'Location', value: inst.location },
                      { icon: Calendar, label: 'Valid Until', value: inst.expiry },
                      { icon: QrCode, label: 'Certificate', value: inst.cert },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5"><Icon size={9} />{label}</p>
                        <p className="text-xs font-semibold text-slate-700 truncate">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 pb-4 pt-0 border-t border-slate-50 pt-3">
                <Link to={`/passport/${inst.id}`}
                  className="flex items-center gap-1.5 text-xs text-primary-600 border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                  <Eye size={12} /> View Passport
                </Link>
                <Link to="/merchant/certificates"
                  className="flex items-center gap-1.5 text-xs text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <QrCode size={12} /> Certificate
                </Link>
                {(inst.status === 'expiring' || inst.status === 'expired') && (
                  <Link to="/merchant/apply"
                    className="flex items-center gap-1.5 text-xs text-white bg-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors ml-auto">
                    <PlusCircle size={12} /> Apply Re-verification
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
