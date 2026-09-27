import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import StatCard from '../../components/ui/StatCard'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3, Bell,
  Settings, AlertTriangle, Globe, MapPin, Calendar,
  XCircle, Eye, Search
} from 'lucide-react'
import { useState } from 'react'

const sidebarItems = [
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

const violations = [
  { id: 'ENF-2026-0081', type: 'Expired Instrument in Use', owner: "Farmers' Market", instrument: 'Platform Scale 100kg', district: 'Trichy', detected: 'Sep 24, 2026', severity: 'high', status: 'action_pending' },
  { id: 'ENF-2026-0079', type: 'Seal Tampering Suspected', owner: 'Roadside Vendor', instrument: 'Spring Balance 10kg', district: 'Madurai', detected: 'Sep 21, 2026', severity: 'high', status: 'under_investigation' },
  { id: 'ENF-2026-0075', type: 'Certificate Mismatch (QR)', owner: 'Kirana Store', instrument: 'Counter Scale 2kg', district: 'Chennai', detected: 'Sep 18, 2026', severity: 'medium', status: 'resolved' },
  { id: 'ENF-2026-0068', type: 'Overdue Re-verification', owner: 'Petrol Bunk',instrument: 'Fuel Dispenser', district: 'Salem', detected: 'Sep 10, 2026', severity: 'medium', status: 'notice_issued' },
  { id: 'ENF-2026-0061', type: 'Overdue Re-verification', owner: 'Vegetable Market', instrument: 'Electronic Balance', district: 'Coimbatore', detected: 'Sep 5, 2026', severity: 'low', status: 'resolved' },
]

const statusMap = {
  action_pending: { label: 'Action Pending', variant: 'danger' },
  under_investigation: { label: 'Investigating', variant: 'warning' },
  notice_issued: { label: 'Notice Issued', variant: 'info' },
  resolved: { label: 'Resolved', variant: 'success' },
}
const severityMap = { high: 'danger', medium: 'warning', low: 'neutral' }

export default function Enforcement() {
  const [search, setSearch] = useState('')
  const filtered = violations.filter(v => [v.type, v.owner, v.district].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="Enforcement">
      <div className="max-w-6xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Enforcement Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">Violations, notices and compliance actions · Tamil Nadu</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active Violations" value="3" icon={AlertTriangle} color="danger" />
          <StatCard label="Notices Issued" value="12" icon={XCircle} color="warning" sub="This month" />
          <StatCard label="Resolved" value="28" icon={ShieldCheck} color="accent" sub="This month" />
          <StatCard label="Spot Checks Done" value="15" icon={Eye} color="primary" sub="This month" />
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search violations..."
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Enforcement Cases</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {filtered.map(v => (
              <div key={v.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                  ${v.severity === 'high' ? 'bg-red-50' : v.severity === 'medium' ? 'bg-yellow-50' : 'bg-slate-100'}`}>
                  <AlertTriangle size={16} className={v.severity === 'high' ? 'text-red-500' : v.severity === 'medium' ? 'text-yellow-500' : 'text-slate-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{v.type}</span>
                    <Badge variant={severityMap[v.severity]} className="text-[10px]">{v.severity} severity</Badge>
                    <Badge variant={statusMap[v.status].variant} className="text-[10px]">{statusMap[v.status].label}</Badge>
                  </div>
                  <p className="text-xs text-slate-600">{v.owner} · {v.instrument}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{v.district}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={10} />{v.detected}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-mono text-slate-400">{v.id}</p>
                  <button className="text-xs text-primary-600 hover:underline mt-1">View →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
