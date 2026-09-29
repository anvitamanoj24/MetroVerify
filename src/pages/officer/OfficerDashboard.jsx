import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import { InlineLoader } from '../../components/ui/LoadingSpinner'
import { useApplicationQueue } from '../../hooks/useApplications'
import { useIssuedCertificates } from '../../hooks/useCertificates'
import { useScheduledInspections } from '../../hooks/useAdminStats'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  CheckCircle2, AlertTriangle, Clock, Eye,
  ArrowUpRight, MapPin, User, Calendar,
  Truck, BarChart3, ShieldCheck, FileSearch
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/officer',             label: 'Dashboard',           icon: LayoutDashboard },
    { to: '/officer/queue',       label: 'Application Queue',   icon: ClipboardList },
    { to: '/officer/schedule',    label: 'Inspection Schedule', icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments',         icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued',        label: 'Issued Certificates', icon: QrCode },
    { to: '/officer/analytics',     label: 'Analytics',           icon: BarChart3 },
    { to: '/officer/notifications', label: 'Notifications',       icon: Bell },
  ]},
]

export default function OfficerDashboard() {
  const { profile } = useAuth()
  const { queue, loading: qLoad }             = useApplicationQueue('all')
  const { certificates, loading: cLoad }      = useIssuedCertificates()
  const { inspections, loading: iLoad }       = useScheduledInspections(profile?.id)

  const pending   = queue.filter(a => ['submitted','under_review'].includes(a.status)).length
  const escalated = queue.filter(a => a.status === 'escalated').length
  const upcoming  = (inspections || []).filter(i => i.status === 'upcoming').slice(0, 3)

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Dashboard">
      <div className="max-w-6xl mx-auto space-y-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">Officer Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {profile?.full_name || 'Officer'} &nbsp;·&nbsp; {profile?.state || 'Legal Metrology Department'}
          </p>
        </div>

        {/* Stats — live from DB */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pending Review"    value={qLoad ? '…' : pending}            icon={Clock}        color="warning" sub="Applications" />
          <StatCard label="Escalated"         value={qLoad ? '…' : escalated}          icon={AlertTriangle}color="danger" />
          <StatCard label="Certs Issued"      value={cLoad ? '…' : certificates.length}icon={ShieldCheck}  color="primary" />
          <StatCard label="Upcoming Visits"   value={iLoad ? '…' : upcoming.length}    icon={Calendar}     color="accent" />
        </div>

        {/* Review pending notice */}
        {pending > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <FileSearch size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">
                {pending} application{pending !== 1 ? 's' : ''} awaiting your review
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Review submitted evidence and issue certificates or schedule physical inspections.
              </p>
            </div>
            <Link to="/officer/queue"
              className="text-xs font-semibold text-blue-700 border border-blue-300 bg-white
                px-3 py-1.5 rounded-lg hover:bg-blue-50 whitespace-nowrap transition-colors">
              Open Queue
            </Link>
          </div>
        )}

        {/* Recent queue */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Recent Applications</h3>
            <Link to="/officer/queue"
              className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              View full queue <ArrowUpRight size={12} />
            </Link>
          </div>

          {qLoad
            ? <InlineLoader text="Loading queue…" />
            : queue.length === 0
              ? (
                <div className="py-10 text-center text-slate-400">
                  <CheckCircle2 size={28} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Queue is clear — no pending applications.</p>
                </div>
              )
              : (
                <div className="divide-y divide-slate-50">
                  {queue.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                        ${app.pathway === 'digital' ? 'bg-blue-50' : 'bg-slate-100'}`}>
                        {app.pathway === 'digital'
                          ? <FileSearch size={16} className="text-blue-600" />
                          : <Truck size={16} className="text-slate-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {app.instrument_name || 'Instrument'}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <User size={10} />{app.applicant_name || '—'}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin size={10} />{app.instrument_district || '—'}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={10} />
                            {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString('en-IN') : '—'}
                          </span>
                        </div>
                      </div>
                      <Link to={`/officer/review/${app.id}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-primary-600
                          border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50
                          transition-colors shrink-0">
                        <Eye size={13} /> Review
                      </Link>
                    </div>
                  ))}
                </div>
              )}
        </div>

        {/* Upcoming inspections */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Upcoming Physical Inspections</h3>
            <Link to="/officer/schedule"
              className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              View calendar <ArrowUpRight size={12} />
            </Link>
          </div>
          {iLoad
            ? <InlineLoader text="Loading schedule…" />
            : upcoming.length === 0
              ? (
                <div className="py-8 text-center text-slate-400">
                  <Calendar size={24} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No upcoming inspections scheduled.</p>
                </div>
              )
              : (
                <div className="divide-y divide-slate-50">
                  {upcoming.map(v => (
                    <div key={v.id} className="flex items-center gap-4 px-6 py-4">
                      <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <Calendar size={16} className="text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">{v.location || 'Location TBD'}</p>
                        <p className="text-xs text-slate-400">{v.district || '—'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-slate-700">
                          {v.scheduled_date ? new Date(v.scheduled_date).toLocaleDateString('en-IN') : '—'}
                        </p>
                        <p className="text-xs text-slate-400">{v.scheduled_time || '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
        </div>

      </div>
    </DashboardLayout>
  )
}
