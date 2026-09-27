import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { useMyInstruments } from '../../hooks/useInstruments'
import { useMyApplications } from '../../hooks/useApplications'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Scale, Bell, QrCode, PlusCircle,
  ClipboardList, History, Clock, CheckCircle2, AlertTriangle,
  ChevronRight, ArrowUpRight, Shield
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/merchant',              label: 'Dashboard',      icon: LayoutDashboard },
    { to: '/merchant/instruments',  label: 'My Instruments', icon: Scale },
    { to: '/merchant/apply',        label: 'New Application',icon: PlusCircle },
    { to: '/merchant/applications', label: 'Applications',   icon: ClipboardList },
  ]},
  { label: 'Records', links: [
    { to: '/merchant/certificates',  label: 'Certificates', icon: QrCode },
    { to: '/merchant/history',       label: 'History',      icon: History },
    { to: '/merchant/notifications', label: 'Alerts',       icon: Bell, badge: '3' },
  ]},
]

const statusMap = {
  valid:        { label: 'Valid',        variant: 'success' },
  expiring:     { label: 'Expiring',     variant: 'warning' },
  expired:      { label: 'Expired',      variant: 'danger'  },
  unverified:   { label: 'Unverified',   variant: 'neutral' },
  under_review: { label: 'Under Review', variant: 'info'    },
  submitted:    { label: 'Submitted',    variant: 'info'    },
  approved:     { label: 'Approved',     variant: 'success' },
  escalated:    { label: 'Escalated',    variant: 'warning' },
  rejected:     { label: 'Rejected',     variant: 'danger'  },
}

export default function MerchantDashboard() {
  const { profile } = useAuth()
  const { instruments, loading: iLoad, error: iErr, reload: iReload } = useMyInstruments()
  const { applications, loading: aLoad, error: aErr } = useMyApplications()

  const valid    = instruments.filter(i => i.status === 'valid').length
  const expiring = instruments.filter(i => i.status === 'expiring').length
  const expired  = instruments.filter(i => i.status === 'expired').length
  const hasAlert = expired > 0 || expiring > 0

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="Dashboard">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Compliance Overview</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Welcome back, {profile?.full_name || 'User'} &nbsp;·&nbsp; {profile?.state || 'India'}
            </p>
          </div>
          <Link to="/merchant/apply"
            className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-semibold
              px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            <PlusCircle size={15} /> New Application
          </Link>
        </div>

        {/* Alert banner */}
        {hasAlert && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={17} className="text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">
                Action required — {expired > 0 && `${expired} expired`}{expired > 0 && expiring > 0 && ', '}{expiring > 0 && `${expiring} expiring soon`}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">Apply for re-verification to avoid non-compliance penalties.</p>
            </div>
            <Link to="/merchant/apply"
              className="ml-auto text-xs font-semibold text-amber-800 border border-amber-300 bg-amber-100
                px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors whitespace-nowrap">
              Apply Now
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Instruments" value={instruments.length} icon={Scale}         color="primary" />
          <StatCard label="Valid"             value={valid}             icon={CheckCircle2}   color="accent" />
          <StatCard label="Expiring Soon"     value={expiring}          icon={Clock}          color="warning" />
          <StatCard label="Expired"           value={expired}           icon={AlertTriangle}  color="danger" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Instruments */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">Registered Instruments</h3>
              <Link to="/merchant/instruments"
                className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </Link>
            </div>

            {iLoad && <InlineLoader text="Loading instruments…" />}
            {iErr  && <div className="p-4"><ErrorBanner message={iErr} onRetry={iReload} /></div>}

            {!iLoad && !iErr && (
              <div className="divide-y divide-slate-50">
                {instruments.slice(0, 5).map(inst => (
                  <Link key={inst.id} to={`/passport/${inst.id}`}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <Scale size={16} className="text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{inst.name}</p>
                      <p className="text-xs text-slate-400">{inst.serial_number} · {inst.district}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={statusMap[inst.status]?.variant || 'neutral'}>
                        {statusMap[inst.status]?.label || inst.status}
                      </Badge>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-400 shrink-0" />
                  </Link>
                ))}
                {instruments.length === 0 && (
                  <p className="text-sm text-slate-400 text-center py-8">
                    No instruments registered yet.{' '}
                    <Link to="/merchant/apply" className="text-primary-600 hover:underline">Register one</Link>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Recent Applications */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">Recent Applications</h3>
                <Link to="/merchant/applications" className="text-xs text-primary-600 hover:underline">View all</Link>
              </div>

              {aLoad && <InlineLoader text="Loading…" />}
              {aErr  && <div className="p-4"><ErrorBanner message={aErr} /></div>}

              {!aLoad && !aErr && (
                <div className="divide-y divide-slate-50">
                  {applications.slice(0, 3).map(app => (
                    <Link key={app.id} to="/merchant/applications"
                      className="block px-5 py-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-medium text-slate-500">{app.app_number}</span>
                        <Badge variant={statusMap[app.status]?.variant || 'neutral'} className="text-[10px]">
                          {statusMap[app.status]?.label || app.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-700 font-medium">{app.instrument_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
                          ${app.pathway === 'digital' ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>
                          {app.pathway === 'digital' ? 'Digital' : 'Physical'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(app.submitted_at).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {applications.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">No applications yet.</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-800 text-sm mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-1">
                {[
                  { to: '/merchant/apply',         icon: PlusCircle, label: 'Apply for Verification',  color: 'bg-primary-50 text-primary-600' },
                  { to: '/merchant/certificates',  icon: QrCode,     label: 'View Certificates',       color: 'bg-teal-50 text-teal-600' },
                  { to: '/verify',                 icon: Shield,     label: 'Verify a Certificate',    color: 'bg-violet-50 text-violet-600' },
                  { to: '/merchant/notifications', icon: Bell,       label: 'Alerts & Reminders',      color: 'bg-amber-50 text-amber-600' },
                ].map(a => (
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
