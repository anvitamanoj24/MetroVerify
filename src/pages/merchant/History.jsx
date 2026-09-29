import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { AuditTrail, StatusBanner } from '../../components/passport/DigitalPassportTimeline'
import { getStatusTitle } from '../../utils/statusTranslator'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History as HistoryIcon,
  Calendar, User, Zap, Truck, ExternalLink, ChevronDown, ChevronUp
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
    { to: '/merchant/history',       label: 'History',      icon: HistoryIcon },
    { to: '/merchant/notifications', label: 'Alerts',       icon: Bell, badge: '3' },
  ]},
]

// Each record maps to a DB status code so StatusBanner can render plain-language descriptions
const records = [
  { year: 2026, entries: [
    {
      cert: 'MV-2026-TN-004521', instrument: 'Platform Weighbridge', serial: 'WB-2024-001',
      method: 'Physical', officer: 'Insp. Suresh M.', date: 'Sep 10, 2026', validUntil: 'Sep 2029',
      status: 'valid',
      auditEvents: [
        { step: 'Instrument registered', date: 'Sep 1, 2024', actor: 'Rajesh Kumar (Owner)' },
        { step: 'Physical inspection completed', date: 'Sep 9, 2026', actor: 'Insp. Suresh M.' },
        { step: 'Certificate issued — MV-2026-TN-004521', date: 'Sep 10, 2026', actor: 'Legal Metrology Dept., Tamil Nadu', note: 'Valid for 3 years.' },
      ],
    },
    {
      cert: 'APP-2026-0412', instrument: 'Counter Scale 5kg', serial: 'CS-2023-112',
      method: 'Digital', officer: 'Insp. Priya Sharma', date: 'Sep 20, 2026', validUntil: '—',
      status: 'under_review',
      auditEvents: [
        { step: 'Application submitted', date: 'Sep 20, 2026', actor: 'Rajesh Kumar (Owner)' },
        { step: 'Evidence received and queued', date: 'Sep 20, 2026', actor: 'System' },
        { step: 'Officer assigned for review', date: 'Sep 21, 2026', actor: 'Insp. Priya Sharma' },
      ],
    },
  ]},
  { year: 2024, entries: [
    {
      cert: 'MV-2024-TN-003312', instrument: 'Petrol Pump Dispenser', serial: 'PP-2024-089',
      method: 'Physical', officer: 'Insp. Kumar R.', date: 'Dec 15, 2024', validUntil: 'Dec 2026',
      status: 'expiring',
      auditEvents: [
        { step: 'Instrument registered', date: 'Nov 18, 2024', actor: 'Rajesh Kumar (Owner)' },
        { step: 'Physical inspection completed', date: 'Dec 14, 2024', actor: 'Insp. Kumar R.' },
        { step: 'Certificate issued — MV-2024-TN-003312', date: 'Dec 15, 2024', actor: 'Legal Metrology Dept., Tamil Nadu' },
      ],
    },
  ]},
  { year: 2023, entries: [
    {
      cert: 'MV-2023-TN-002104', instrument: 'Counter Scale 5kg', serial: 'CS-2023-112',
      method: 'Physical', officer: 'Insp. Suresh M.', date: 'Oct 1, 2023', validUntil: 'Oct 2026',
      status: 'expiring',
      auditEvents: [
        { step: 'Application submitted', date: 'Sep 28, 2023', actor: 'Rajesh Kumar (Owner)' },
        { step: 'Physical inspection completed', date: 'Sep 30, 2023', actor: 'Insp. Suresh M.' },
        { step: 'Certificate issued — MV-2023-TN-002104', date: 'Oct 1, 2023', actor: 'Legal Metrology Dept., Tamil Nadu' },
      ],
    },
    {
      cert: 'MV-2023-TN-001876', instrument: 'Electronic Balance', serial: 'EB-2022-045',
      method: 'Physical', officer: 'Insp. Raj K.', date: 'Jun 5, 2023', validUntil: 'Jun 2026',
      status: 'expired',
      auditEvents: [
        { step: 'Application submitted', date: 'Jun 2, 2023', actor: 'Rajesh Kumar (Owner)' },
        { step: 'Physical inspection completed', date: 'Jun 4, 2023', actor: 'Insp. Raj K.' },
        { step: 'Certificate issued — MV-2023-TN-001876', date: 'Jun 5, 2023', actor: 'Legal Metrology Dept., Tamil Nadu' },
        { step: 'Certificate expired', date: 'Jun 5, 2026', actor: 'System — automatic expiry' },
      ],
    },
  ]},
]

function HistoryCard({ r }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Summary row */}
      <div
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${r.method === 'Digital' ? 'bg-primary-50' : 'bg-slate-100'}`}>
          {r.method === 'Digital'
            ? <Zap size={18} className="text-primary-600" />
            : <Truck size={18} className="text-slate-500" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-semibold text-slate-800">{r.instrument}</span>
            {/* Plain-language status pill */}
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200">
              {getStatusTitle(r.status)}
            </span>
          </div>
          <p className="text-xs text-slate-400">Serial: {r.serial}</p>
          <div className="flex items-center gap-4 mt-1.5 flex-wrap">
            <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar size={10} />{r.date}</span>
            <span className="text-xs text-slate-500 flex items-center gap-1"><User size={10} />{r.officer}</span>
            {r.validUntil !== '—' && (
              <span className="text-xs text-slate-500">Valid until: {r.validUntil}</span>
            )}
          </div>
        </div>

        <div className="text-right shrink-0 flex flex-col items-end gap-1">
          <p className="text-xs font-mono text-primary-600">{r.cert}</p>
          {r.status !== 'under_review' && (
            <Link
              to="/merchant/certificates"
              onClick={e => e.stopPropagation()}
              className="text-[10px] text-slate-400 hover:text-primary-600 flex items-center gap-0.5"
            >
              <ExternalLink size={9} /> View cert
            </Link>
          )}
          <span className="text-slate-300 mt-1">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>
      </div>

      {/* Expanded: plain-language status banner + audit trail */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-4">
          <StatusBanner status={r.status} />
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Lifecycle Audit Trail
            </p>
            <AuditTrail events={r.auditEvents} title="" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function History() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="Verification History">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Verification History</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Click any record to expand the full lifecycle audit trail.
          </p>
        </div>

        {records.map(group => (
          <div key={group.year}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-slate-400">{group.year}</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="flex flex-col gap-3">
              {group.entries.map(r => (
                <HistoryCard key={r.cert} r={r} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
