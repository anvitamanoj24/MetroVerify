import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { gatcSidebarItems } from './GATCDashboard'
import {
  Search, Eye, User, MapPin, Clock, Scale, Filter
} from 'lucide-react'

const allQueue = [
  { id: 'APP-2026-0442', owner: 'Kiran Auto Parts',   instrument: 'Platform Scale 500kg',  serial: 'PS-2024-011', priority: 'high',   received: '1h ago',  district: 'Chennai',      category: 'Industrial' },
  { id: 'APP-2026-0438', owner: 'Metro Grains Ltd.',  instrument: 'Weighbridge 25T',       serial: 'WB-2023-088', priority: 'high',   received: '3h ago',  district: 'Kancheepuram', category: 'Weighbridge' },
  { id: 'APP-2026-0431', owner: 'Sai Medical Stores', instrument: 'Analytical Balance',    serial: 'AB-2024-002', priority: 'medium', received: '5h ago',  district: 'Chennai',      category: 'Balance' },
  { id: 'APP-2026-0427', owner: 'Fresh Produce Hub',  instrument: 'Counter Scale 10kg',    serial: 'CS-2023-204', priority: 'low',    received: '1d ago',  district: 'Tiruvallur',   category: 'Scale' },
  { id: 'APP-2026-0420', owner: 'Lakshmi Rice Mill',  instrument: 'Bulk Weigher',          serial: 'BW-2022-015', priority: 'medium', received: '1d ago',  district: 'Chengalpet',   category: 'Industrial' },
]

const priorityMap = {
  high:   { label: 'High Priority',   variant: 'danger'  },
  medium: { label: 'Medium Priority', variant: 'warning' },
  low:    { label: 'Low Priority',    variant: 'neutral' },
}

export default function GATCQueue() {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('all')

  const filtered = allQueue
    .filter(a => priority === 'all' || a.priority === priority)
    .filter(a => [a.instrument, a.owner, a.id, a.district].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={gatcSidebarItems} role="gatc" title="Inspection Queue">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Inspection Queue</h2>
          <p className="text-sm text-slate-500 mt-0.5">{allQueue.length} applications pending physical inspection</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by instrument, owner or application ID..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
          </div>
          <div className="flex gap-2">
            {[['all','All'], ['high','High'], ['medium','Medium'], ['low','Low']].map(([id, label]) => (
              <button key={id} onClick={() => setPriority(id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors
                  ${priority === id ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map(app => (
            <div key={app.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                <Scale size={18} className="text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-slate-800 text-sm">{app.instrument}</span>
                  <Badge variant={priorityMap[app.priority].variant} className="text-[10px]">{priorityMap[app.priority].label}</Badge>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">{app.category}</span>
                </div>
                <p className="text-xs text-slate-500">Serial: {app.serial}</p>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <span className="text-xs text-slate-400 flex items-center gap-1"><User size={10} />{app.owner}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{app.district}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} />{app.received}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono text-slate-400">{app.id}</span>
                <Link to={`/gatc/review/${app.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                  <Eye size={13} /> Start Inspection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
