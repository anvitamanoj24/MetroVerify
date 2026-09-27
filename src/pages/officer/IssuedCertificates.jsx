import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  Calendar, BarChart3, Search, ExternalLink,
  ShieldCheck, User, MapPin, Download
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

const certs = [
  { id: 'MV-2026-TN-004521', instrument: 'Counter Scale 5kg', owner: 'Rajesh Kumar', location: 'Chennai', issued: 'Sep 10, 2026', expiry: 'Sep 2029', method: 'Digital', status: 'active' },
  { id: 'MV-2026-TN-004498', instrument: 'Platform Scale 200kg', owner: 'Fresh Mart', location: 'Coimbatore', issued: 'Sep 7, 2026', expiry: 'Sep 2029', method: 'Physical', status: 'active' },
  { id: 'MV-2026-TN-004465', instrument: 'Fuel Dispenser', owner: 'HP Petrol Pump', location: 'Madurai', issued: 'Aug 30, 2026', expiry: 'Aug 2029', method: 'Digital', status: 'active' },
  { id: 'MV-2026-TN-004440', instrument: 'Jewellery Balance', owner: 'Gold Palace', location: 'Salem', issued: 'Aug 22, 2026', expiry: 'Aug 2029', method: 'Physical', status: 'active' },
  { id: 'MV-2026-TN-004410', instrument: 'Weighbridge 50T', owner: 'Chennai Port Trust', location: 'Chennai', issued: 'Aug 10, 2026', expiry: 'Aug 2029', method: 'Physical', status: 'active' },
  { id: 'MV-2026-TN-004380', instrument: 'Electronic Balance', owner: 'Medi Labs', location: 'Trichy', issued: 'Aug 2, 2026', expiry: 'Aug 2029', method: 'Digital', status: 'active' },
]

export default function IssuedCertificates() {
  const [search, setSearch] = useState('')

  const filtered = certs.filter(c =>
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.instrument.toLowerCase().includes(search.toLowerCase()) ||
    c.owner.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Issued Certificates">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Issued Certificates</h2>
            <p className="text-sm text-slate-500 mt-0.5">47 certificates issued this month</p>
          </div>
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            <Download size={15} /> Export Report
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by certificate ID, instrument or owner..."
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Certificate ID', 'Instrument', 'Owner', 'Location', 'Issued', 'Method', 'Valid Until', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 pl-5 py-3 font-mono text-xs text-primary-600 font-semibold">{c.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={13} className="text-accent-500 shrink-0" />
                      <span className="text-slate-800 font-medium text-xs">{c.instrument}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{c.owner}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{c.location}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{c.issued}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold
                      ${c.method === 'Digital' ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-600'}`}>
                      {c.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{c.expiry}</td>
                  <td className="px-4 py-3">
                    <Link to="/merchant/certificates" className="text-xs text-primary-600 hover:underline flex items-center gap-0.5">
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
