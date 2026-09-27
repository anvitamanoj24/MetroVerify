import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Scale, ShieldCheck, QrCode, Search, CheckCircle2,
  AlertTriangle, XCircle, ArrowRight, ExternalLink,
  Calendar, MapPin, User, Hash, Building2
} from 'lucide-react'

const DEMO_CERT = {
  id: 'MV-2026-TN-004521',
  status: 'valid',
  instrument: 'Counter Scale 5kg',
  serial: 'CS-2023-112',
  sealId: 'SL-TN-2026-7741',
  owner: 'Rajesh Kumar',
  business: 'Rajesh General Stores',
  location: 'Anna Nagar, Chennai, Tamil Nadu',
  issuedOn: 'Sep 10, 2026',
  validUntil: 'Sep 9, 2029',
  officer: 'Insp. Priya Sharma',
  office: 'Chennai Division, Tamil Nadu LMD',
}

export default function VerifyPublic() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleVerify = () => {
    setLoading(true)
    setNotFound(false)
    setTimeout(() => {
      setLoading(false)
      if (query.trim().toUpperCase() === 'MV-2026-TN-004521' || query.trim() === '') {
        setResult(DEMO_CERT)
      } else {
        setNotFound(true)
        setResult(null)
      }
    }, 900)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <Scale size={14} className="text-white" />
            </div>
            <span className="font-bold text-slate-800">MetroVerify</span>
          </Link>
          <Link to="/login" className="text-sm text-primary-600 font-medium hover:underline">Sign in →</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        {/* Hero */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <QrCode size={32} className="text-primary-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Verify Certificate</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
            Enter the certificate ID from the instrument's stamp or digital certificate to check its authenticity and validity.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <label className="text-sm font-semibold text-slate-700 block mb-3">Certificate ID</label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                placeholder="e.g. MV-2026-TN-004521"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 font-mono placeholder:font-sans placeholder:text-slate-400"
              />
            </div>
            <button onClick={handleVerify}
              className="flex items-center gap-2 bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><ShieldCheck size={15} /> Verify</>}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
            <span className="text-primary-500">→</span> Try: <span className="font-mono text-primary-600 cursor-pointer hover:underline" onClick={() => setQuery('MV-2026-TN-004521')}>MV-2026-TN-004521</span>
          </p>
        </div>

        {/* Result */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
            <XCircle size={24} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">Certificate Not Found</h3>
              <p className="text-sm text-red-600 mt-1">No certificate found for <span className="font-mono">{query}</span>. Check the ID and try again.</p>
              <p className="text-xs text-red-500 mt-2">If you believe this instrument should be verified, contact your nearest Legal Metrology office.</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Status banner */}
            <div className="bg-accent-500 rounded-2xl p-5 flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} className="text-white" />
              </div>
              <div>
                <p className="font-extrabold text-lg">Certificate is Valid ✓</p>
                <p className="text-white/80 text-sm">This instrument has a valid verification certificate issued by the Legal Metrology Department.</p>
              </div>
            </div>

            {/* Details card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certificate Details</p>
                <span className="font-mono text-xs text-primary-600 font-semibold">{result.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-0">
                {[
                  { k: 'Instrument', v: result.instrument, icon: Scale, span: true },
                  { k: 'Serial Number', v: result.serial, icon: Hash },
                  { k: 'Seal ID', v: result.sealId, icon: ShieldCheck },
                  { k: 'Owner', v: result.owner, icon: User },
                  { k: 'Business', v: result.business, icon: Building2 },
                  { k: 'Location', v: result.location, icon: MapPin, span: true },
                  { k: 'Issued On', v: result.issuedOn, icon: Calendar },
                  { k: 'Valid Until', v: result.validUntil, icon: Calendar },
                  { k: 'Issuing Officer', v: result.officer, icon: User },
                  { k: 'Office', v: result.office, icon: Building2 },
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

              {/* Validity bar */}
              <div className="px-5 py-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Valid from: {result.issuedOn}</span>
                  <span className="text-accent-600 font-semibold">Expires: {result.validUntil}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[6%] bg-gradient-to-r from-accent-400 to-accent-500 rounded-full" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">Certificate is valid for 3 years from issue date</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link to="/passport/INS-TN-002"
                className="flex-1 flex items-center justify-center gap-2 border border-primary-200 text-primary-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-primary-50 transition-colors">
                <ExternalLink size={15} /> View Digital Passport
              </Link>
              <button
                className="flex items-center justify-center gap-2 border border-yellow-200 text-yellow-700 text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-yellow-50 transition-colors">
                <AlertTriangle size={15} /> Report Issue
              </button>
            </div>
          </div>
        )}

        {/* Info panels */}
        {!result && !notFound && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: QrCode, title: 'Scan QR Code', desc: 'Scan the QR on the instrument stamp to auto-fill the certificate ID.' },
              { icon: ShieldCheck, title: 'Check Authenticity', desc: 'Verify the certificate is genuine and has not been tampered with.' },
              { icon: AlertTriangle, title: 'Report Issues', desc: 'Found a mismatch? Report it to the Legal Metrology Department.' },
            ].map((item) => (
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
