import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { InlineLoader, ErrorBanner } from '../../components/ui/LoadingSpinner'
import { useAllCertificates } from '../../hooks/useCertificates'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3, Bell,
  Settings, AlertTriangle, Globe, Search, Download, ExternalLink, FileText
} from 'lucide-react'

const sidebarItems = [
  { label: 'Overview', links: [
    { to: '/admin',           label: 'Dashboard',        icon: LayoutDashboard },
    { to: '/admin/analytics', label: 'Analytics',        icon: BarChart3 },
    { to: '/admin/map',       label: 'Jurisdiction Map', icon: Globe },
  ]},
  { label: 'Management', links: [
    { to: '/admin/instruments', label: 'All Instruments', icon: Scale },
    { to: '/admin/users',       label: 'Users & Officers',icon: Users },
    { to: '/admin/certificates',label: 'Certificates',    icon: ShieldCheck },
    { to: '/admin/enforcement', label: 'Enforcement',     icon: AlertTriangle },
  ]},
  { label: 'System', links: [
    { to: '/admin/notifications', label: 'Notifications', icon: Bell },
    { to: '/admin/settings',      label: 'Settings',      icon: Settings },
  ]},
]

export default function AdminCertificates() {
  const { certificates, loading, error } = useAllCertificates()
  const [search, setSearch] = useState('')

  const filtered = certificates.filter(c =>
    [c.cert_number, c.instrument_name, c.owner_name, c.instrument_district]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="All Certificates">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">All Certificates</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {loading ? 'Loading…' : `${certificates.length} certificates in the registry`}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700
            text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-50">
            <Download size={15} /> Export
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search certificates…"
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
            <h3 className="font-semibold text-slate-800 mb-2">No certificates yet</h3>
            <p className="text-sm text-slate-500">
              Certificates issued by officers will appear here once the first application is approved.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Certificate ID','Instrument','Owner','District','Officer','Issued','Method','Status',''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap first:pl-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 pl-5 py-3 font-mono text-xs text-primary-600 font-semibold whitespace-nowrap">{c.cert_number}</td>
                    <td className="px-4 py-3 text-xs font-medium text-slate-800 whitespace-nowrap">{c.instrument_name || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{c.owner_name || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{c.instrument_district || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{c.officer_name || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {c.issued_at ? new Date(c.issued_at).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold
                        ${c.verification_method === 'digital'
                          ? 'bg-primary-50 text-primary-600'
                          : 'bg-slate-100 text-slate-600'}`}>
                        {c.verification_method === 'digital' ? 'Digital' : 'Physical'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={c.is_revoked ? 'danger' : 'success'} className="text-[10px]">
                        {c.is_revoked ? 'Revoked' : 'Active'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Link to="/verify"
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
