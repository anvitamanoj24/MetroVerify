import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { StatusBanner, WorkflowTimeline } from '../../components/passport/DigitalPassportTimeline'
import { getStatus } from '../../utils/statusTranslator'
import { useMyApplications } from '../../hooks/useApplications'
import {
  LayoutDashboard, Scale, PlusCircle, ClipboardList,
  QrCode, Bell, History, Search, AlertTriangle,
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
    { to: '/merchant/history',       label: 'History',      icon: History },
    { to: '/merchant/notifications', label: 'Alerts',       icon: Bell },
  ]},
]

export default function Applications() {
  const { applications, loading, error, reload } = useMyApplications()
  const [selected, setSelected] = useState(null)
  const [search, setSearch]     = useState('')

  // Auto-select first when data loads
  if (!selected && applications.length > 0 && !loading) {
    setSelected(applications[0])
  }

  const filtered = applications.filter(a =>
    (a.app_number || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.instrument_name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="My Applications">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Applications</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {loading ? 'Loading…' : `${applications.length} application${applications.length !== 1 ? 's' : ''} total`}
            </p>
          </div>
          <Link to="/merchant/apply"
            className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm
              font-semibold px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            <PlusCircle size={15} /> New Application
          </Link>
        </div>

        {loading && <InlineLoader text="Loading your applications…" />}
        {error   && <ErrorBanner message={error} onRetry={reload} />}

        {/* Empty state */}
        {!loading && !error && applications.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">No applications yet</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              Once you register an instrument and submit a verification application, it will appear here.
            </p>
            <Link to="/merchant/apply"
              className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm
                font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
              <PlusCircle size={15} /> Submit Your First Application <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* List + detail */}
        {!loading && !error && applications.length > 0 && (
          <div className="grid lg:grid-cols-5 gap-5">
            {/* List */}
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
                        <span className="text-xs font-mono font-semibold text-slate-500">
                          {app.app_number || app.id?.slice(0, 8)}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold
                          px-2 py-0.5 rounded-full border ${st.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.title}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">
                        {app.instrument_name || 'Instrument'}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
                          ${app.pathway === 'digital'
                            ? 'bg-primary-50 text-primary-600'
                            : 'bg-slate-100 text-slate-500'}`}>
                          {app.pathway === 'digital'
                            ? <><Zap size={8} className="inline mr-0.5" />Digital</>
                            : <><Truck size={8} className="inline mr-0.5" />Physical</>}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {app.submitted_at
                            ? new Date(app.submitted_at).toLocaleDateString('en-IN')
                            : '—'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Detail panel */}
            {selected && (() => {
              const st = getStatus(selected.status)
              return (
                <div className="lg:col-span-3 space-y-4">
                  <StatusBanner status={selected.status} />

                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-xs font-mono text-slate-400 mb-1">
                          {selected.app_number}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900">
                          {selected.instrument_name || 'Instrument'}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Serial: {selected.serial_number || '—'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { k: 'Pathway',          v: selected.pathway === 'digital' ? 'Digital' : 'Physical' },
                        { k: 'Fee',              v: selected.fee_amount ? `₹${selected.fee_amount}` : '—' },
                        { k: 'Submitted',        v: selected.submitted_at ? new Date(selected.submitted_at).toLocaleDateString('en-IN') : '—' },
                        { k: 'Assigned Officer', v: selected.assigned_to || 'Awaiting assignment' },
                      ].map(({ k, v }) => (
                        <div key={k} className="bg-slate-50 rounded-xl p-3">
                          <p className="text-[10px] text-slate-400">{k}</p>
                          <p className="text-sm font-semibold text-slate-800">{v}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                      Application Progress
                    </p>
                    <WorkflowTimeline status={selected.status} />

                    {selected.status === 'approved' && (
                      <Link to="/merchant/certificates"
                        className="mt-4 flex items-center justify-center gap-2 bg-emerald-500 text-white
                          text-sm font-semibold py-2.5 rounded-xl hover:bg-emerald-600 transition-colors">
                        <QrCode size={15} /> View Certificate &amp; Digital Passport
                      </Link>
                    )}
                    {selected.status === 'escalated' && (
                      <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-3">
                        <p className="text-xs text-orange-800 font-semibold mb-1 flex items-center gap-1.5">
                          <AlertTriangle size={13} /> Physical Inspection Scheduled
                        </p>
                        <p className="text-xs text-orange-700">
                          An officer will contact you to arrange a visit. No action needed from you right now.
                        </p>
                      </div>
                    )}
                    {selected.status === 'evidence_requested' && (
                      <Link to="/merchant/apply"
                        className="mt-4 flex items-center justify-center gap-2 bg-amber-500 text-white
                          text-sm font-semibold py-2.5 rounded-xl hover:bg-amber-600 transition-colors">
                        Upload Additional Evidence
                      </Link>
                    )}
                    {selected.remarks && (
                      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <p className="text-xs font-semibold text-slate-600 mb-1">Officer Remarks</p>
                        <p className="text-xs text-slate-700">{selected.remarks}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
