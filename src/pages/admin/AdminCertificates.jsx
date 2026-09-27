import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3, Bell,
  Settings, AlertTriangle, Globe, Search, Download, ExternalLink
} from 'lucide-react'

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

const certs = [
  { id: 'MV-2026-TN-004521', instrument: 'Counter Scale 5kg', owner: 'Rajesh Kumar', district: 'Chennai', officer: 'Insp. Priya S.', issued: 'Sep 10, 2026', method: 'Digital', status: 'active' },
  { id: 'MV-2026-TN-004498', instrument: 'Platform Scale 200kg', owner: 'Fresh Mart', district: 'Coimbatore', officer: 'Insp. Suresh M.', issued: 'Sep 7, 2026', method: 'Physical', status: 'active' },
  { id: 'MV-2026-TN-004465', instrument: 'Fuel Dispenser', owner: 'HP Petrol Pump', district: 'Madurai', officer: 'Insp. Raj K.', issued: 'Aug 30, 2026', method: 'Digital', status: 'active' },
  { id: 'MV-2026-TN-004440', instrument: 'Jewellery Balance', owner: 'Gold Palace', district: 'Salem', officer: 'Insp. Kumar R.', issued: 'Aug 22, 2026', method: 'Physical', status: 'active' },
  { id: 'MV-2025-TN-003812', instrument: 'Electronic Balance', owner: 'Medi Labs', district: 'Trichy', officer: 'Insp. Priya S.', issued: 'Jan 5, 2025', method: 'Digital', status: 'expiring' },
]

export default function AdminCertificates() {
  const [search, setSearch] = useState('')
  const filtered = certs.filter(c => [c.id, c.instrument, c.owner, c.district].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="All Certificates">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">All Certificates</h2>
            <p className="text-sm text-slate-500 mt-0.5">State-wide certificate registry</p>
          </div>
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-50">
            <Download size={15} /> Export
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search certificates..."
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Certificate ID', 'Instrument', 'Owner', 'District', 'Officer', 'Issued', 'Method', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 pl-5 py-3 font-mono text-xs text-primary-600 font-semibold whitespace-nowrap">{c.id}</td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-800 whitespace-nowrap">{c.instrument}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{c.owner}</td>
                  <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{c.district}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{c.officer}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{c.issued}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${c.method === 'Digital' ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-600'}`}>{c.method}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant={c.status === 'active' ? 'success' : 'warning'} className="text-[10px]">
                      {c.status === 'active' ? 'Active' : 'Expiring'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Link to="/merchant/certificates" className="text-xs text-primary-600 hover:underline flex items-center gap-0.5 whitespace-nowrap">
                      <ExternalLink size={11} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
