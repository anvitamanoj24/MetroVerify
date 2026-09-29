import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { AuditTrail, StatusBanner } from '../../components/passport/DigitalPassportTimeline'
import { getStatusTitle } from '../../utils/statusTranslator'
import { useMyApplications } from '../../hooks/useApplications'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History as HistoryIcon,
  Calendar, ExternalLink, ChevronDown, ChevronUp,
  Zap, Truck, FileText, ArrowRight
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
    { to: '/merchant/notifications', label: 'Alerts',       icon: Bell },
  ]},
]

function HistoryCard({ app }) {
  const [expanded, setExpanded] = useState(false)

  // Build audit events from application data
  const events = [
    { step: 'Application submitted', date: app.submitted_at ? new Date(app.submitted_at).toLocaleDateString('en-IN') : '—', actor: 'You (Owner)' },
    ...(app.status !== 'submitted' ? [{ step: 'Assigned to officer', date: '—', actor: app.assigned_to || 'Legal Metrology Dept.' }] : []),
    ...(['approved', 'escalated', 'rejected'].includes(app.status) && app.reviewed_at
      ? [{ step: getStatusTitle(app.status), date: new Date(app.reviewed_at).toLocaleDateString('en-IN'), actor: app.assigned_to || 'Legal Metrology Officer' }]
      : []),
    ...(app.status === 'approved'
      ? [{ step: 'Digital certificate issued', date: app.reviewed_at ? new Date(app.reviewed_at).toLocaleDateString('en-IN') : '—', actor: 'Legal Metrology Dept.' }]
      : []),
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${app.pathway === 'digital' ? 'bg-primary-50' : 'bg-slate-100'}`}>
          {app.pathway === 'digital'
            ? <Zap size={18} className="text-primary-600" />
            : <Truck size={18} className="text-slate-500" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-semibold text-slate-800">{app.instrument_name || 'Instrument'}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200">
              {getStatusTitle(app.status)}
            </span>
          </div>
          <p className="text-xs text-slate-400">Serial: {app.serial_number || '—'}</p>
          <div className="flex items-center gap-4 mt-1.5 flex-wrap">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar size={10} />
              {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString('en-IN') : '—'}
            </span>
            <span className="text-xs text-slate-400 font-mono">{app.app_number}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          {app.status === 'approved' && (
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

      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-4">
          <StatusBanner status={app.status} />
          {app.remarks && (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs font-semibold text-slate-600 mb-1">Officer Remarks</p>
              <p className="text-xs text-slate-700">{app.remarks}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Lifecycle Audit Trail
            </p>
            <AuditTrail events={events} title="" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function History() {
  const { applications, loading, error, reload } = useMyApplications()

  // Group by year
  const grouped = applications.reduce((acc, app) => {
    const year = app.submitted_at
      ? new Date(app.submitted_at).getFullYear()
      : new Date().getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(app)
    return acc
  }, {})
  const years = Object.keys(grouped).sort((a, b) => b - a)

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="Verification History">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Verification History</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Click any record to see the full lifecycle audit trail.
          </p>
        </div>

        {loading && <InlineLoader text="Loading history…" />}
        {error   && <ErrorBanner message={error} onRetry={reload} />}

        {!loading && !error && applications.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">No history yet</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              Your verification history will appear here once you submit your first application.
            </p>
            <Link to="/merchant/apply"
              className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm
                font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
              <PlusCircle size={15} /> Submit First Application <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {years.map(year => (
          <div key={year}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-slate-400">{year}</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="flex flex-col gap-3">
              {grouped[year].map(app => (
                <HistoryCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
