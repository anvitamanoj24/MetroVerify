import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History, Search, Eye,
  Calendar, Zap, Truck, AlertTriangle, CheckCircle2, Clock, XCircle
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

const applications = [
  { id: 'APP-2026-0412', instrument: 'Counter Scale 5kg', serial: 'CS-2023-112', type: 'Digital', status: 'under_review', submitted: 'Sep 20, 2026', fee: '₹150', officer: 'Insp. Priya Sharma', aiScore: 92 },
  { id: 'APP-2026-0389', instrument: 'Platform Weighbridge', serial: 'WB-2024-001', type: 'Physical', status: 'approved', submitted: 'Sep 5, 2026', fee: '₹500', officer: 'Insp. Suresh M.', aiScore: null },
  { id: 'APP-2026-0301', instrument: 'Electronic Balance', serial: 'EB-2022-045', type: 'Digital', status: 'escalated', submitted: 'Aug 28, 2026', fee: '₹150', officer: 'Insp. Raj K.', aiScore: 55 },
  { id: 'APP-2026-0245', instrument: 'Petrol Pump Dispenser', serial: 'PP-2024-089', type: 'Physical', status: 'approved', submitted: 'Nov 20, 2024', fee: '₹500', officer: 'Insp. Kumar R.', aiScore: null },
  { id: 'APP-2023-0188', instrument: 'Counter Scale 5kg', serial: 'CS-2023-112', type: 'Physical', status: 'approved', submitted: 'Oct 1, 2023', fee: '₹500', officer: 'Insp. Suresh M.', aiScore: null },
]

const statusConfig = {
  under_review: { label: 'Under Review', variant: 'info', icon: Clock },
  approved: { label: 'Approved', variant: 'success', icon: CheckCircle2 },
  escalated: { label: 'Escalated to Physical', variant: 'warning', icon: AlertTriangle },
  rejected: { label: 'Rejected', variant: 'danger', icon: XCircle },
}

const timeline = {
  under_review: [
    { label: 'Application Submitted', done: true },
    { label: 'Evidence Received', done: true },
    { label: 'AI Analysis Complete', done: true },
    { label: 'Officer Review', done: false, active: true },
    { label: 'Certificate Issued', done: false },
  ],
  approved: [
    { label: 'Application Submitted', done: true },
    { label: 'Evidence Received', done: true },
    { label: 'AI Analysis Complete', done: true },
    { label: 'Officer Review', done: true },
    { label: 'Certificate Issued', done: true },
  ],
  escalated: [
    { label: 'Application Submitted', done: true },
    { label: 'Evidence Received', done: true },
    { label: 'AI Analysis — Flagged', done: true, flag: true },
    { label: 'Escalated to Physical', done: true, flag: true },
    { label: 'Physical Inspection Pending', done: false, active: true },
  ],
}

export default function Applications() {
  const [selected, setSelected] = useState(applications[0])
  const [search, setSearch] = useState('')

  const filtered = applications.filter(a =>
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.instrument.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="My Applications">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Applications</h2>
            <p className="text-sm text-slate-500 mt-0.5">{applications.length} applications total</p>
          </div>
          <Link to="/merchant/apply"
            className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            <PlusCircle size={15} /> New Application
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search applications..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 placeholder:text-slate-400" />
            </div>

            <div className="flex flex-col gap-2">
              {filtered.map(app => {
                const cfg = statusConfig[app.status]
                return (
                  <button key={app.id} onClick={() => setSelected(app)}
                    className={`text-left p-4 rounded-xl border transition-all ${selected?.id === app.id ? 'border-primary-400 bg-primary-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold text-slate-600">{app.id}</span>
                      <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{app.instrument}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${app.type === 'Digital' ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>
                        {app.type === 'Digital' ? <Zap size={8} className="inline mr-0.5" /> : <Truck size={8} className="inline mr-0.5" />}{app.type}
                      </span>
                      <span className="text-[10px] text-slate-400">{app.submitted}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          {selected && (() => {
            const cfg = statusConfig[selected.status]
            const StatusIcon = cfg.icon
            const steps = timeline[selected.status] || timeline.approved
            return (
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-mono text-slate-400 mb-1">{selected.id}</p>
                      <h3 className="text-lg font-bold text-slate-900">{selected.instrument}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Serial: {selected.serial}</p>
                    </div>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { k: 'Pathway', v: selected.type },
                      { k: 'Fee Paid', v: selected.fee },
                      { k: 'Submitted', v: selected.submitted },
                      { k: 'Assigned Officer', v: selected.officer },
                      ...(selected.aiScore ? [{ k: 'AI Confidence', v: `${selected.aiScore}%` }] : []),
                    ].map(({ k, v }) => (
                      <div key={k} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-[10px] text-slate-400">{k}</p>
                        <p className="text-sm font-semibold text-slate-800">{v}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress timeline */}
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Application Progress</p>
                    <div className="flex flex-col gap-0">
                      {steps.map((s, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs
                              ${s.done && !s.flag ? 'bg-accent-500 text-white' :
                                s.flag ? 'bg-yellow-500 text-white' :
                                s.active ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                                'bg-slate-100 text-slate-400'}`}>
                              {s.done ? '✓' : s.active ? '●' : i + 1}
                            </div>
                            {i < steps.length - 1 && (
                              <div className={`w-0.5 h-6 ${s.done ? 'bg-accent-200' : 'bg-slate-100'}`} />
                            )}
                          </div>
                          <div className="pb-4">
                            <p className={`text-sm font-medium ${s.active ? 'text-primary-700' : s.done ? 'text-slate-700' : 'text-slate-400'}`}>
                              {s.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selected.status === 'approved' && (
                    <Link to="/merchant/certificates"
                      className="flex items-center justify-center gap-2 bg-accent-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-accent-600 transition-colors mt-2">
                      <QrCode size={15} /> View Certificate
                    </Link>
                  )}
                  {selected.status === 'escalated' && (
                    <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                      <p className="text-xs text-yellow-800 font-semibold mb-1 flex items-center gap-1.5"><AlertTriangle size={13} />Physical Inspection Scheduled</p>
                      <p className="text-xs text-yellow-700">An officer will contact you to schedule an on-site inspection. No additional action required from your end.</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    </DashboardLayout>
  )
}
