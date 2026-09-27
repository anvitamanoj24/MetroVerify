import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  Calendar, BarChart3, Search, Eye, MapPin, Hash
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/officer', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/queue', label: 'Review Queue', icon: ClipboardList, badge: '8' },
    { to: '/officer/schedule', label: 'Schedule', icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments', icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued', label: 'Issued Certificates', icon: QrCode },
    { to: '/officer/notifications', label: 'Notifications', icon: Bell, badge: '2' },
    { to: '/officer/analytics', label: 'Analytics', icon: BarChart3 },
  ]},
]

const instruments = [
  { id: 'INS-TN-001', name: 'Platform Weighbridge', serial: 'WB-2024-001', type: 'Weighbridge', owner: 'Rajesh Kumar', location: 'Chennai', status: 'valid', expiry: 'Sep 2029' },
  { id: 'INS-TN-002', name: 'Counter Scale 5kg', serial: 'CS-2023-112', type: 'Counter Scale', owner: 'Rajesh Kumar', location: 'Chennai', status: 'expiring', expiry: 'Oct 2026' },
  { id: 'INS-TN-003', name: 'Electronic Balance', serial: 'EB-2022-045', type: 'Balance', owner: 'Rajesh Kumar', location: 'Chennai', status: 'expired', expiry: 'Jun 2026' },
  { id: 'INS-CB-001', name: 'Industrial Scale 500kg', serial: 'IS-2023-009', type: 'Industrial Scale', owner: 'Meena Textiles', location: 'Coimbatore', status: 'valid', expiry: 'Mar 2027' },
  { id: 'INS-MD-001', name: 'Fuel Dispenser', serial: 'FD-2024-033', type: 'Fuel Dispenser', owner: 'HP Petrol Pump', location: 'Madurai', status: 'valid', expiry: 'Dec 2026' },
]

const statusMap = { valid: { label: 'Valid', variant: 'success' }, expiring: { label: 'Expiring', variant: 'warning' }, expired: { label: 'Expired', variant: 'danger' } }

export default function OfficerInstruments() {
  const [search, setSearch] = useState('')
  const filtered = instruments.filter(i => [i.name, i.serial, i.owner, i.location].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Instruments Registry">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Instruments Registry</h2>
          <p className="text-sm text-slate-500 mt-0.5">All instruments under your division</p>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search instruments..."
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Instrument', 'Serial', 'Type', 'Owner', 'Location', 'Status', 'Expiry', ''].map(h => (
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
                  <td className="px-4 py-3 text-xs text-slate-400">{inst.location}</td>
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
