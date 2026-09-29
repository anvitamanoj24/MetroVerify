import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import { InlineLoader } from '../../components/ui/LoadingSpinner'
import { useApplicationQueue } from '../../hooks/useApplications'
import { useIssuedCertificates } from '../../hooks/useCertificates'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Scale, ClipboardList, QrCode,
  Bell, BarChart3, Calendar, CheckCircle2,
  Clock, AlertTriangle, ShieldCheck, Eye,
  ArrowUpRight, ChevronRight, MapPin, User
} from 'lucide-react'

export const gatcSidebarItems = [
  { label: 'Main', links: [
    { to: '/gatc',              label: 'Dashboard',           icon: LayoutDashboard },
    { to: '/gatc/queue',        label: 'Inspection Queue',    icon: ClipboardList },
    { to: '/gatc/schedule',     label: 'Inspection Schedule', icon: Calendar },
    { to: '/gatc/instruments',  label: 'Instruments',         icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/gatc/issued',        label: 'Issued Certificates', icon: QrCode },
    { to: '/gatc/reports',       label: 'Reports',             icon: BarChart3 },
    { to: '/gatc/notifications', label: 'Notifications',       icon: Bell },
  ]},
]

export default function GATCDashboard() {
  const { profile } = useAuth()
  const { queue, loading: qLoad }        = useApplicationQueue('physical')
  const { certificates, loading: cLoad } = useIssuedCertificates()

  const pending   = queue.filter(a => ['submitted','under_review'].includes(a.status)).length
  const escalated = queue.filter(a => a.status === 'escalated').length

  return (
    <DashboardLayout sidebarItems={gatcSidebarItems} role="gatc" title="GATC Dashboard">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">GATC Operations Dashboard</h2>
            <p className="text-sm text-slate-500 mt-0.5">
            Government Approved Test Centre &nbsp;·&nbsp; {profile?.organisation || profile?.state || 'GATC'}
          </p>
          </div>
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2">
            <ShieldCheck size={14} className="text-teal-600" />
            <span className="text-xs font-semibold text-teal-700">Accredited Centre · NABL</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pending Inspections" value={qLoad ? '…' : pending}              icon={Clock}        color="warning" sub="In queue" />
          <StatCard label="Certs Issued"        value={cLoad ? '…' : certificates.length}  icon={ShieldCheck}  color="primary" />
          <StatCard label="Escalated"           value={qLoad ? '…' : escalated}            icon={AlertTriangle}color="danger" />
          <StatCard label="Total in Queue"      value={qLoad ? '…' : queue.length}         icon={CheckCircle2} color="accent" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Inspection Queue */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">Pending Inspection Queue</h3>
              <Link to="/gatc/queue" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                Full queue <ArrowUpRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {qLoad
                ? <InlineLoader text="Loading queue…" />
                : queue.length === 0
                  ? (
                    <div className="py-10 text-center text-slate-400">
                      <CheckCircle2 size={28} className="mx-auto mb-2 opacity-40" />
                      <p className="text-sm">No pending inspections.</p>
                    </div>
                  )
                  : queue.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors group">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <Scale size={16} className="text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {app.instrument_name || 'Instrument'}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <User size={10} />{app.applicant_name || '—'}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin size={10} />{app.instrument_district || '—'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-400">
                          {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString('en-IN') : '—'}
                        </span>
                        <Link to={`/gatc/review/${app.id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-primary-600
                            border border-primary-200 px-2.5 py-1.5 rounded-lg hover:bg-primary-50
                            transition-colors">
                          <Eye size={12} /> Review
                        </Link>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            {/* Centre info */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">Centre Information</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { k: 'Centre Name',    v: 'GATC Chennai' },
                  { k: 'GATC Code',      v: 'TN-GATC-001' },
                  { k: 'Accreditation',  v: 'NABL / BIS' },
                  { k: 'Jurisdiction',   v: 'Chennai, Kancheepuram, Chengalpet' },
                  { k: 'Contact',        v: '+91 44 2234 5678' },
                ].map(({ k, v }) => (
                  <div key={k} className="flex justify-between py-1 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-slate-400">{k}</span>
                    <span className="text-xs font-medium text-slate-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-800 text-sm mb-3">Quick Access</h3>
              <div className="flex flex-col gap-1">
                {[
                  { to: '/gatc/queue',    icon: ClipboardList, label: 'Inspection Queue',    color: 'bg-teal-50 text-teal-600' },
                  { to: '/gatc/schedule', icon: Calendar,      label: 'View Schedule',       color: 'bg-blue-50 text-blue-600' },
                  { to: '/gatc/issued',   icon: QrCode,        label: 'Issued Certificates', color: 'bg-violet-50 text-violet-600' },
                  { to: '/gatc/reports',  icon: BarChart3,     label: 'Reports',             color: 'bg-amber-50 text-amber-600' },
                ].map((a) => (
                  <Link key={a.to} to={a.to}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                      <a.icon size={14} />
                    </div>
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">{a.label}</span>
                    <ChevronRight size={13} className="ml-auto text-slate-300 group-hover:text-slate-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
