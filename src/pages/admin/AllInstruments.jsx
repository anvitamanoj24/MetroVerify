import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3, Bell,
  Settings, AlertTriangle, Search, Download, Filter, Globe,
  MapPin, Hash, Calendar, Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'

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

const instruments = [
  { id: 'INS-TN-001', name: 'Platform Weighbridge', serial: 'WB-2024-001', type: 'Weighbridge', owner: 'Rajesh Kumar', district: 'Chennai', status: 'valid', expiry: 'Sep 2029' },
  { id: 'INS-TN-002', name: 'Counter Scale 5kg', serial: 'CS-2023-112', type: 'Counter Scale', owner: 'Rajesh Kumar', district: 'Chennai', status: 'expiring', expiry: 'Oct 2026' },
  { id: 'INS-TN-003', name: 'Electronic Balance', serial: 'EB-2022-045', type: 'Balance', owner: 'Rajesh Kumar', district: 'Chennai', status: 'expired', expiry: 'Jun 2026' },
  { id: 'INS-CB-001', name: 'Industrial Scale 500kg', serial: 'IS-2023-009', type: 'Industrial Scale', owner: 'Meena Textiles', district: 'Coimbatore', status: 'valid', expiry: 'Mar 2027' },
  { id: 'INS-MD-001', name: 'Fuel Dispenser', serial: 'FD-2024-033', type: 'Fuel Dispenser', owner: 'HP Petrol Pump', district: 'Madurai', status: 'valid', expiry: 'Dec 2026' },
  { id: 'INS-SL-001', name: 'Jewellery Balance 200g', serial: 'JB-2023-007', type: 'Balance', owner: 'Gold Palace Jwlrs', district: 'Salem', status: 'valid', expiry: 'Aug 2029' },
  { id: 'INS-TC-001', name: 'Platform Scale 100kg', serial: 'PS-2022-078', type: 'Platform Scale', owner: "Farmers' Market", district: 'Trichy', status: 'expiring', expiry: 'Nov 2026' },
  { id: 'INS-CH-001', name: 'Crane Weighbridge', serial: 'CW-2026-001', type: 'Weighbridge', owner: 'Chennai Port Trust', district: 'Chennai', status: 'valid', expiry: 'Sep 2029' },
]

const statusMap = { valid: { label: 'Valid', variant: 'success' }, expiring: { label: 'Expiring', variant: 'warning' }, expired: { label: 'Expired', variant: 'danger' } }

export default function AllInstruments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = instruments
    .filter(i => statusFilter === 'all' || i.status === statusFilter)
    .filter(i => [i.name, i.serial, i.owner, i.district].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="All Instruments">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">All Instruments</h2>
            <p className="text-sm text-slate-500 mt-0.5">Tamil Nadu · {instruments.length} shown</p>
          </div>
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-50">
            <Download size={15} /> Export
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, serial, owner, district..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
          </div>
          <div className="flex gap-2">
            {[['all','All'], ['valid','Valid'], ['expiring','Expiring'], ['expired','Expired']].map(([id, label]) => (
              <button key={id} onClick={() => setStatusFilter(id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors
                  ${statusFilter === id ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Instrument', 'Serial', 'Type', 'Owner', 'District', 'Status', 'Expiry', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(inst => (
                <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 pl-5 py-3 font-semibold text-slate-800 text-xs">{inst.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{inst.serial}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{inst.type}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{inst.owner}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{inst.district}</td>
                  <td className="px-4 py-3"><Badge variant={statusMap[inst.status].variant} className="text-[10px]">{statusMap[inst.status].label}</Badge></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{inst.expiry}</td>
                  <td className="px-4 py-3">
                    <Link to={`/passport/${inst.id}`} className="text-xs text-primary-600 hover:underline flex items-center gap-0.5">
                      <Eye size={11} /> Passport
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
