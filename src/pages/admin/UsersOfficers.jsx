import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3, Bell,
  Settings, AlertTriangle, Globe, Search, User, Building2,
  CheckCircle2, Mail, Phone
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

const officers = [
  { name: 'Insp. Priya Sharma', email: 'priya.sharma@tn.gov.in', phone: '+91 98400 11111', district: 'Chennai', role: 'LMO Officer', issued: 256, pending: 8, status: 'active' },
  { name: 'Insp. Suresh Muthu', email: 'suresh.m@tn.gov.in', phone: '+91 98400 22222', district: 'Coimbatore', role: 'LMO Officer', issued: 198, pending: 5, status: 'active' },
  { name: 'Insp. Raj Kumar', email: 'raj.k@tn.gov.in', phone: '+91 98400 33333', district: 'Madurai', role: 'Senior LMO', issued: 312, pending: 12, status: 'active' },
  { name: 'Insp. Kumar Raja', email: 'kumar.r@tn.gov.in', phone: '+91 98400 44444', district: 'Salem', role: 'LMO Officer', issued: 145, pending: 3, status: 'active' },
  { name: 'GATC Chennai', email: 'gatc.chn@tn.gov.in', phone: '+91 44 2234 5678', district: 'Chennai', role: 'GATC', issued: 88, pending: 2, status: 'active' },
]

const merchants = [
  { name: 'Rajesh Kumar', email: 'rajesh@example.com', business: 'Rajesh General Stores', district: 'Chennai', instruments: 4, status: 'compliant' },
  { name: 'Meena Textiles', email: 'meena@textiles.com', business: 'Meena Textiles Ltd.', district: 'Coimbatore', instruments: 12, status: 'compliant' },
  { name: 'HP Petrol Pump', email: 'hp.tambaram@hp.in', business: 'HP Fuel Station', district: 'Madurai', instruments: 3, status: 'compliant' },
  { name: "Farmers' Market", email: 'fm.trichy@gmail.com', business: "Trichy Farmers' Market", district: 'Trichy', instruments: 8, status: 'non_compliant' },
]

export default function UsersOfficers() {
  const [tab, setTab] = useState('officers')
  const [search, setSearch] = useState('')

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="Users & Officers">
      <div className="max-w-6xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Users &amp; Officers</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage all stakeholders in the system</p>
        </div>

        <div className="flex gap-2">
          {[['officers', 'LMO Officers & GATC'], ['merchants', 'Owners / Merchants']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                ${tab === id ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
        </div>

        {tab === 'officers' && (
          <div className="grid md:grid-cols-2 gap-4">
            {officers.filter(o => [o.name, o.district, o.role].join(' ').toLowerCase().includes(search.toLowerCase())).map(o => (
              <div key={o.email} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <User size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{o.name}</p>
                      <p className="text-xs text-slate-400">{o.role} · {o.district}</p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px]">Active</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1"><Mail size={10} />{o.email}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-50 rounded-xl p-2">
                    <p className="text-lg font-bold text-slate-800">{o.issued}</p>
                    <p className="text-[10px] text-slate-400">Certs Issued</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-2">
                    <p className="text-lg font-bold text-yellow-700">{o.pending}</p>
                    <p className="text-[10px] text-slate-400">Pending</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'merchants' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Owner', 'Business', 'District', 'Instruments', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 first:pl-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {merchants.filter(m => [m.name, m.business, m.district].join(' ').toLowerCase().includes(search.toLowerCase())).map(m => (
                  <tr key={m.email} className="hover:bg-slate-50">
                    <td className="px-4 pl-5 py-3">
                      <p className="font-semibold text-slate-800 text-xs">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">{m.business}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{m.district}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-slate-700">{m.instruments}</td>
                    <td className="px-4 py-3">
                      <Badge variant={m.status === 'compliant' ? 'success' : 'danger'} className="text-[10px]">
                        {m.status === 'compliant' ? 'Compliant' : 'Non-Compliant'}
                      </Badge>
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
