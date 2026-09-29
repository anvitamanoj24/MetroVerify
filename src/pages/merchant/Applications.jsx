import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { StatusBanner, WorkflowTimeline } from '../../components/passport/DigitalPassportTimeline'
import { getStatus } from '../../utils/statusTranslator'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History, Search, AlertTriangle, CheckCircle2, Clock, XCircle, Zap, Truck
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/merchant',              label: 'Dashboard',       icon: LayoutDashboard },
    { to: '/merchant/instruments',  label: 'My Instruments',  icon: Scale },
    { to: '/merchant/apply',        label: 'New Application', icon: PlusCircle },
    { to: '/merchant/applications', label: 'Applications',    icon: ClipboardList },
  ]},
  { label: 'Records', links: [
    { to: '/merchant/certificates',  label: 'Certificates', icon: QrCode },
    { to: '/merchant/history',       label: 'History',      icon: History },
    { to: '/merchant/notifications', label: 'Alerts',       icon: Bell, badge: '3' },
  ]},
]

const applications = [
  {
    id: 'APP-2026-0412', instrument: 'Counter Scale 5kg', serial: 'CS-2023-112',
    type: 'Digital', status: 'under_review', submitted: 'Sep 20, 2026',
    fee: '₹150', officer: 'Insp. Priya Sharma',
    events: [
      { label: 'Application received', date: 'Sep 20, 2026', actor: 'System' },
      { label: 'Evidence reviewed by officer', date: 'Sep 21, 2026', actor: 'Insp. Priya Sharma' },
    ],
  },
  {
    id: 'APP-2026-0389', instrument: 'Platform Weighbridge', serial: 'WB-2024-001',
    type: 'Physical', status: 'approved', submitted: 'Sep 5, 2026',
    fee: '₹500', officer: 'Insp. Suresh M.',
    events: [
      { label: 'Application received', date: 'Sep 5, 2026', actor: 'System' },
      { label: 'Physical inspection completed', date: 'Sep 9, 2026', actor: 'Insp. Suresh M.' },
      { label: 'Certificate MV-2026-TN-004521 issued', date: 'Sep 10, 2026', actor: 'Legal Metrology Dept.' },
    ],
  },
  {
    id: 'APP-2026-0301', instrument: 'Electronic Balance', serial: 'EB-2022-045',
    type: 'Digital', status: 'escalated', submitted: 'Aug 28, 2026',
    fee: '₹150', officer: 'Insp. Raj K.',
    events: [
      { label: 'Application received', date: 'Aug 28, 2026', actor: 'System' },
      { label: 'Evidence flagged — deviation at 5 kg load', date: 'Aug 29, 2026', actor: 'Evidence Analysis System' },
      { label: 'Escalated to physical inspection', date: 'Aug 30, 2026', actor: 'Insp. Raj K.' },
    ],
  },
  {
    id: 'APP-2026-0245', instrument: 'Petrol Pump Dispenser', serial: 'PP-2024-089',
    type: 'Physical', status: 'approved', submitted: 'Nov 20, 2024',
    fee: '₹500', officer: 'Insp. Kumar R.',
    events: [
      { label: 'Application received', date: 'Nov 20, 2024', actor: 'System' },
      { label: 'Physical inspection completed', date: 'Nov 24, 2024', actor: 'Insp. Kumar R.' },
      { label: 'Certificate MV-2024-TN-003312 issued', date: 'Nov 25, 2024', actor: 'Legal Metrology Dept.' },
    ],
  },
]

export default function Applications() {
  const [selected, setSelected] = useState(applications[0])
  const [search, setSearch]     = useState('')

  const filtered = applications.filter(a =>
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.instrument.toLowerCase().includes(search.toLowerCase())
  )

  const s = getStatus(selected?.status)

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="My Applications">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Applications</h2>
            <p className="text-sm text-slate-500 mt-0.5">{applications.length} applications total</p>
          </div>
          <Link to="/merchant/apply"
            className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm
              font-semibold px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            <PlusCircle size={15} /> New Application
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* ── Application list ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search applications…"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm
                  outline-none focus:border-primary-500 placeholder:text-slate-400" />
            </div>

            <div className="flex flex-col gap-2">
              {filtered.map(app => {
                const st = getStatus(app.status)
                return (
                  <button key={app.id} onClick={() => setSelected(app)}
                    className={`text-left p-4 rounded-xl border transition-all
                      ${selected?.id === app.id
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold text-slate-500">{app.id}</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold
                        px-2 py-0.5 rounded-full border ${st.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        {st.title}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{app.instrument}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
                        ${app.type === 'Digital' ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>
                        {app.type === 'Digital'
                          ? <><Zap size={8} className="inline mr-0.5" />Digital</>
                          : <><Truck size={8} className="inline mr-0.5" />Physical</>}
                      </span>
                      <span className="text-[10px] text-slate-400">{app.submitted}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Detail panel ──────────────────────────────── */}
          {selected && (
            <div className="lg:col-span-3 space-y-4">
              {/* Plain-language status banner */}
              <StatusBanner status={selected.status} />

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs font-mono text-slate-400 mb-1">{selected.id}</p>
                    <h3 className="text-lg font-bold text-slate-900">{selected.instrument}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Serial: {selected.serial}</p>
                  </div>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { k: 'Pathway',          v: selected.type },
                    { k: 'Fee Paid',         v: selected.fee },
                    { k: 'Submitted',        v: selected.submitted },
                    { k: 'Assigned Officer', v: selected.officer },
                  ].map(({ k, v }) => (
                    <div key={k} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400">{k}</p>
                      <p className="text-sm font-semibold text-slate-800">{v}</p>
                    </div>
                  ))}
                </div>

                {/* Workflow progress */}
                <div className="mb-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                    Application Progress
                  </p>
                  <WorkflowTimeline
                    status={selected.status}
                    events={selected.events}
                  />
                </div>

                {/* CTA */}
                {selected.status === 'approved' && (
                  <Link to="/merchant/certificates"
                    className="mt-2 flex items-center justify-center gap-2 bg-emerald-500 text-white
                      text-sm font-semibold py-2.5 rounded-xl hover:bg-emerald-600 transition-colors">
                    <QrCode size={15} /> View Certificate &amp; Digital Passport
                  </Link>
                )}
                {selected.status === 'escalated' && (
                  <div className="mt-2 bg-orange-50 border border-orange-200 rounded-xl p-3">
                    <p className="text-xs text-orange-800 font-semibold mb-1 flex items-center gap-1.5">
                      <AlertTriangle size={13} /> Physical Inspection Scheduled
                    </p>
                    <p className="text-xs text-orange-700">
                      An officer will contact you to arrange an on-site visit. No additional action needed from you right now.
                    </p>
                  </div>
                )}
                {selected.status === 'evidence_requested' && (
                  <Link to="/merchant/apply"
                    className="mt-2 flex items-center justify-center gap-2 bg-amber-500 text-white
                      text-sm font-semibold py-2.5 rounded-xl hover:bg-amber-600 transition-colors">
                    Upload Additional Evidence
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
