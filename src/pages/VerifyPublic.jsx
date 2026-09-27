import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useVerifyCertificate } from '../hooks/useCertificates'
import {
  Scale, ShieldCheck, QrCode, Search, CheckCircle2,
  AlertTriangle, XCircle, ExternalLink, Calendar,
  MapPin, User, Hash, Building2
} from 'lucide-react'

export default function VerifyPublic() {
  const [query, setQuery]     = useState('')
  const { certificate, loading, notFound, verify } = useVerifyCertificate()

  const handleVerify = () => verify(query)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Scale size={14} className="text-white" />
            </div>
            <span className="font-bold text-slate-800">MetroVerify</span>
          </Link>
          <Link to="/login" className="text-sm text-blue-600 font-medium hover:underline">Sign in →</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <QrCode size={26} className="text-blue-600" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Public Certificate Verification
          </p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Verify a Certificate</h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            Enter the certificate number from the instrument's stamp or digital certificate
            to instantly verify its authenticity and validity.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <label className="text-sm font-semibold text-slate-700 block mb-3">Certificate Number</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleVerify()}
                placeholder="e.g. MV-2026-TN-004521"
                className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-xl text-sm outline-none
                  focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white placeholder:text-slate-400 font-mono
                  placeholder:font-sans" />
            </div>
            <button onClick={handleVerify} disabled={loading || !query.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-3
                rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-60">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><ShieldCheck size={15} /> Verify</>}
            </button>
          </div>
        </div>

        {/* Not found */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
            <XCircle size={22} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">Certificate Not Found</h3>
              <p className="text-sm text-red-600 mt-1">
                No certificate found for <span className="font-mono">{query}</span>.
                Please check the certificate number and try again.
              </p>
            </div>
          </div>
        )}

        {/* Valid result */}
        {certificate && (
          <div className="space-y-4">
            <div className={`rounded-2xl p-5 flex items-center gap-4 text-white
              ${certificate.is_revoked ? 'bg-red-500' : 'bg-emerald-500'}`}>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                {certificate.is_revoked
                  ? <XCircle size={24} className="text-white" />
                  : <CheckCircle2 size={24} className="text-white" />}
              </div>
              <div>
                <p className="font-extrabold text-lg">
                  {certificate.is_revoked ? 'Certificate Revoked' : 'Certificate is Valid ✓'}
                </p>
                <p className="text-white/80 text-sm">
                  {certificate.is_revoked
                    ? 'This certificate has been revoked. Do not accept this instrument.'
                    : 'This instrument has a valid verification certificate from the Legal Metrology Department.'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certificate Details</p>
                <span className="font-mono text-xs text-blue-600 font-semibold">{certificate.cert_number}</span>
              </div>
              <div className="grid grid-cols-2 gap-0">
                {[
                  { k: 'Instrument',     v: certificate.instrument_name,     icon: Scale,      span: true },
                  { k: 'Serial Number',  v: certificate.serial_number,       icon: Hash },
                  { k: 'Seal ID',        v: certificate.seal_id || '—',      icon: ShieldCheck },
                  { k: 'Owner',          v: certificate.owner_name,          icon: User },
                  { k: 'Organisation',   v: certificate.owner_org || '—',    icon: Building2 },
                  { k: 'Location',       v: `${certificate.instrument_district}, ${certificate.instrument_state}`, icon: MapPin, span: true },
                  { k: 'Issued On',      v: new Date(certificate.issued_at).toLocaleDateString('en-IN'), icon: Calendar },
                  { k: 'Valid Until',    v: new Date(certificate.valid_until).toLocaleDateString('en-IN'), icon: Calendar },
                  { k: 'Issuing Officer',v: certificate.officer_name,        icon: User },
                  { k: 'Method',         v: certificate.verification_method === 'digital' ? 'Digital Verification' : 'Physical Inspection', icon: ShieldCheck },
                ].map(({ k, v, icon: Icon, span }) => (
                  <div key={k} className={`flex items-start gap-3 px-5 py-3 border-b border-slate-50 ${span ? 'col-span-2' : ''}`}>
                    <Icon size={13} className="text-slate-300 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400">{k}</p>
                      <p className="text-sm font-medium text-slate-800">{v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Link to={`/passport/${certificate.instrument_id}`}
                className="flex-1 flex items-center justify-center gap-2 border border-blue-200
                  text-blue-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                <ExternalLink size={15} /> View Digital Passport
              </Link>
              <button className="flex items-center justify-center gap-2 border border-yellow-200
                text-yellow-700 text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-yellow-50 transition-colors">
                <AlertTriangle size={15} /> Report Issue
              </button>
            </div>
          </div>
        )}

        {/* Info tiles */}
        {!certificate && !notFound && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: QrCode,      title: 'Scan QR Code',     desc: 'Scan the QR on the instrument stamp to auto-fill the certificate ID.' },
              { icon: ShieldCheck, title: 'Check Authenticity',desc: 'Verify the certificate is genuine and has not been tampered with.' },
              { icon: AlertTriangle, title: 'Report Issues',   desc: 'Spotted a mismatch? Report it to the Legal Metrology Department.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-slate-100 p-4 text-center shadow-sm">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <item.icon size={16} className="text-slate-500" />
                </div>
                <p className="text-xs font-semibold text-slate-700 mb-1">{item.title}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
