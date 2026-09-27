import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
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

const queue = [
  { id: 'APP-2026-0412', owner: 'Rajesh Kumar',     instrument: 'Counter Scale 5kg',   serial: 'CS-2023-112', type: 'digital',  priority: 'high',   received: '2h ago',  district: 'Chennai',     evidenceScore: 92 },
  { id: 'APP-2026-0418', owner: 'Meena Textiles',   instrument: 'Platform Weighbridge', serial: 'WB-2024-019', type: 'digital',  priority: 'medium', received: '4h ago',  district: 'Coimbatore',  evidenceScore: 78 },
  { id: 'APP-2026-0405', owner: 'Gold Palace Jwlrs',instrument: 'Jewellery Balance',    serial: 'JB-2023-007', type: 'physical', priority: 'low',    received: '1d ago',  district: 'Salem',       evidenceScore: null },
  { id: 'APP-2026-0399', owner: 'HP Petrol Pump',   instrument: 'Fuel Dispenser',      serial: 'PP-2024-033', type: 'digital',  priority: 'high',   received: '1d ago',  district: 'Madurai',     evidenceScore: 55 },
  { id: 'APP-2026-0395', owner: "Farmers' Market",  instrument: 'Platform Scale 100kg', serial: 'PS-2022-078', type: 'physical', priority: 'medium', received: '2d ago',  district: 'Trichy',      evidenceScore: null },
  { id: 'APP-2026-0388', owner: 'City Hospital',    instrument: 'Medical Scale',        serial: 'MS-2024-011', type: 'digital',  priority: 'medium', received: '2d ago',  district: 'Chennai',     evidenceScore: 88 },
  { id: 'APP-2026-0374', owner: 'Fresh Mart',       instrument: 'Counter Scale 20kg',  serial: 'CS-2023-198', type: 'physical', priority: 'low',    received: '3d ago',  district: 'Vellore',     evidenceScore: null },
  { id: 'APP-2026-0361', owner: 'Madurai Silks',    instrument: 'Electronic Balance',  serial: 'EB-2023-077', type: 'digital',  priority: 'low',    received: '3d ago',  district: 'Madurai',     evidenceScore: 81 },
]

const priorityMap = {
  high:   { label: 'High',   variant: 'danger'  },
  medium: { label: 'Medium', variant: 'warning' },
  low:    { label: 'Low',    variant: 'neutral' },
}

export default function OfficerQueue() {
  const [typeTab, setTypeTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = queue
    .filter(a => typeTab === 'all' || a.type === typeTab)
    .filter(a => [a.instrument, a.owner, a.id, a.district].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Application Queue">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Application Queue</h2>
          <p className="text-sm text-slate-500 mt-0.5">{queue.length} applications pending review &nbsp;·&nbsp; Chennai Division</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by instrument, owner or application ID..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
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

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
          {filtered.map((app) => (
            <div key={app.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                ${app.type === 'digital' ? 'bg-blue-50' : 'bg-slate-100'}`}>
                {app.type === 'digital'
                  ? <FileSearch size={16} className="text-blue-600" />
                  : <Truck size={16} className="text-slate-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-800">{app.instrument}</span>
                  <Badge variant={priorityMap[app.priority].variant} className="text-[10px]">
                    {priorityMap[app.priority].label}
                  </Badge>
                  {app.evidenceScore !== null && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold
                      ${app.evidenceScore >= 80 ? 'bg-teal-50 text-teal-700'
                      : app.evidenceScore >= 65 ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-red-50 text-red-600'}`}>
                      Evidence: {app.evidenceScore}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{app.id} &nbsp;·&nbsp; {app.serial}</p>
                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                  <span className="text-xs text-slate-400 flex items-center gap-1"><User size={10} />{app.owner}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{app.district}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} />{app.received}</span>
                </div>
              </div>

              <Link to={`/officer/review/${app.id}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors shrink-0">
                <Eye size={13} /> Review
              </Link>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
