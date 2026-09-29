import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { useIssuedCertificates } from '../../hooks/useCertificates'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  Calendar, BarChart3, Search, ExternalLink, Download, ShieldCheck, FileText
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

export default function IssuedCertificates() {
  const { certificates, loading, error } = useIssuedCertificates()
  const [search, setSearch] = useState('')

  const filtered = certificates.filter(c =>
    [c.cert_number, c.instrument_name, c.owner_name].join(' ')
      .toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Issued Certificates">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Issued Certificates</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {loading ? 'Loading…' : `${certificates.length} certificate${certificates.length !== 1 ? 's' : ''} issued by you`}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700
            text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            <Download size={15} /> Export Report
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by certificate ID, instrument or owner…"
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm
              outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100
              placeholder:text-slate-400" />
        </div>

        {loading && <InlineLoader text="Loading certificates…" />}
        {error   && <ErrorBanner message={error} />}

        {!loading && !error && certificates.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">No certificates issued yet</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Certificates you issue will appear here. Start by reviewing pending applications.
            </p>
            <Link to="/officer/queue"
              className="inline-flex items-center gap-2 mt-5 bg-primary-600 text-white
                text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
              Review Queue
            </Link>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
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
                    <td className="px-4 pl-5 py-3 font-mono text-xs text-primary-600 font-semibold whitespace-nowrap">
                      {c.cert_number}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                        <span className="text-slate-800 font-medium text-xs">{c.instrument_name || '—'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">{c.owner_name || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{c.instrument_district || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {c.issued_at ? new Date(c.issued_at).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold
                        ${c.verification_method === 'digital'
                          ? 'bg-primary-50 text-primary-600'
                          : 'bg-slate-100 text-slate-600'}`}>
                        {c.verification_method === 'digital' ? 'Digital' : 'Physical'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                      {c.valid_until ? new Date(c.valid_until).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Link to="/officer/certificate/preview"
                        className="text-xs text-primary-600 hover:underline flex items-center gap-0.5 whitespace-nowrap">
                        <ExternalLink size={11} /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
