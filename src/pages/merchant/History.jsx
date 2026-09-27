import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History as HistoryIcon, CheckCircle2,
  Calendar, User, Zap, Truck, ExternalLink
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
    { to: '/merchant/history', label: 'History', icon: HistoryIcon },
    { to: '/merchant/notifications', label: 'Alerts', icon: Bell, badge: '3' },
  ]},
]

const records = [
  { year: 2026, entries: [
    { cert: 'MV-2026-TN-004521', instrument: 'Platform Weighbridge', serial: 'WB-2024-001', method: 'Physical', officer: 'Insp. Suresh M.', date: 'Sep 10, 2026', validUntil: 'Sep 2029', status: 'active' },
    { cert: 'APP-2026-0412', instrument: 'Counter Scale 5kg', serial: 'CS-2023-112', method: 'Digital', officer: 'Insp. Priya Sharma', date: 'Sep 20, 2026 (pending)', validUntil: '—', status: 'pending' },
  ]},
  { year: 2024, entries: [
    { cert: 'MV-2024-TN-003312', instrument: 'Petrol Pump Dispenser', serial: 'PP-2024-089', method: 'Physical', officer: 'Insp. Kumar R.', date: 'Dec 15, 2024', validUntil: 'Dec 2026', status: 'expiring' },
  ]},
  { year: 2023, entries: [
    { cert: 'MV-2023-TN-002104', instrument: 'Counter Scale 5kg', serial: 'CS-2023-112', method: 'Physical', officer: 'Insp. Suresh M.', date: 'Oct 1, 2023', validUntil: 'Oct 2026', status: 'expiring' },
    { cert: 'MV-2023-TN-001876', instrument: 'Electronic Balance', serial: 'EB-2022-045', method: 'Physical', officer: 'Insp. Raj K.', date: 'Jun 5, 2023', validUntil: 'Jun 2026', status: 'expired' },
  ]},
  { year: 2020, entries: [
    { cert: 'MV-2020-TN-000891', instrument: 'Platform Weighbridge', serial: 'WB-2024-001', method: 'Physical', officer: 'Insp. Kumar R.', date: 'Aug 28, 2020', validUntil: 'Aug 2023', status: 'expired' },
  ]},
]

const statusMap = { active: { label: 'Active', variant: 'success' }, expiring: { label: 'Expiring', variant: 'warning' }, expired: { label: 'Expired', variant: 'danger' }, pending: { label: 'Pending', variant: 'info' } }

export default function History() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="Verification History">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Verification History</h2>
          <p className="text-sm text-slate-500 mt-0.5">Complete record of all verifications across your instruments</p>
        </div>

        {records.map(group => (
          <div key={group.year}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-slate-400">{group.year}</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="flex flex-col gap-3">
              {group.entries.map(r => (
                <div key={r.cert} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${r.method === 'Digital' ? 'bg-primary-50' : 'bg-slate-100'}`}>
                    {r.method === 'Digital'
                      ? <Zap size={18} className="text-primary-600" />
                      : <Truck size={18} className="text-slate-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-slate-800">{r.instrument}</span>
                      <Badge variant={statusMap[r.status].variant} className="text-[10px]">{statusMap[r.status].label}</Badge>
                    </div>
                    <p className="text-xs text-slate-400">Serial: {r.serial}</p>
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                      <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={10} />{r.date}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1"><User size={10} />{r.officer}</span>
                      <span className="text-xs text-slate-500">Valid until: {r.validUntil}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono text-primary-600">{r.cert}</p>
                    {r.status !== 'pending' && (
                      <Link to="/merchant/certificates" className="text-[10px] text-slate-400 hover:text-primary-600 flex items-center gap-0.5 mt-0.5 justify-end">
                        <ExternalLink size={9} /> View cert
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
