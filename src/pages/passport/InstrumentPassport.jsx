import { Link, useParams } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import { AuditTrail, StatusBanner } from '../../components/passport/DigitalPassportTimeline'
import {
  Scale, QrCode, ShieldCheck, Clock, AlertTriangle,
  CheckCircle2, ArrowLeft, Download, Share2,
  Calendar, MapPin, User, Building2, Activity,
  FileText, Camera, ChevronRight, ExternalLink, Hash
} from 'lucide-react'

const history = [
  { date: 'Sep 10, 2026', action: 'Certificate Issued', cert: 'MV-2026-TN-004521', officer: 'Insp. Priya Sharma', method: 'Digital', result: 'Pass' },
  { date: 'Sep 5, 2023', action: 'Re-verification', cert: 'MV-2023-TN-002104', officer: 'Insp. Suresh M.', method: 'Physical', result: 'Pass' },
  { date: 'Aug 28, 2020', action: 'Initial Verification', cert: 'MV-2020-TN-000891', officer: 'Insp. Kumar R.', method: 'Physical', result: 'Pass' },
]

export default function InstrumentPassport() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <Scale size={14} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 text-sm">MetroVerify</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 text-sm">Instrument Passport</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              <Share2 size={13} /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs text-white bg-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-700">
              <Download size={13} /> Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-5">
        {/* Identity card */}
        <div className="bg-gradient-to-br from-primary-950 to-primary-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/15 text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">Instrument Digital Passport</span>
                <span className="bg-accent-500/20 text-accent-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">● Valid</span>
              </div>
              <h1 className="text-2xl font-extrabold mb-1">Counter Scale</h1>
              <p className="text-white/60 text-sm mb-4">5 kg Capacity · Class III</p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Serial Number', value: 'CS-2023-112', icon: Hash },
                  { label: 'Seal ID', value: 'SL-TN-2026-7741', icon: ShieldCheck },
                  { label: 'Manufacturer', value: 'Essae Teraoka', icon: Building2 },
                  { label: 'Model', value: 'DS-252 Plus', icon: Scale },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-white/8 rounded-xl p-3">
                    <p className="text-white/40 text-[10px] flex items-center gap-1 mb-1"><Icon size={9} />{label}</p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QR */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-2xl p-4 w-36 h-36 flex items-center justify-center">
                <div className="w-full h-full grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className={`rounded-[1px] ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <p className="text-white/50 text-[10px] text-center">Scan to verify</p>
              <Link to="/verify" className="flex items-center gap-1 text-xs text-primary-300 hover:text-white">
                <ExternalLink size={11} /> Open passport
              </Link>
            </div>
          </div>
        </div>

        {/* Current certificate + validity */}
        <StatusBanner status="valid" className="max-w-5xl" />

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Current Verification</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { k: 'Certificate No.', v: 'MV-2026-TN-004521', highlight: true },
                { k: 'Issued Date', v: 'September 10, 2026' },
                { k: 'Valid Until', v: 'September 9, 2029' },
                { k: 'Issuing Officer', v: 'Insp. Priya Sharma' },
                { k: 'Verification Method', v: 'Digital Verification' },
                { k: 'Legal Metrology Dept.', v: 'Tamil Nadu, Chennai Division' },
              ].map(({ k, v, highlight }) => (
                <div key={k} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                  <span className="text-xs text-slate-400">{k}</span>
                  <span className={`text-xs font-medium ${highlight ? 'text-primary-600 font-mono' : 'text-slate-700'}`}>{v}</span>
                </div>
              ))}
            </div>
            <Link to="/merchant/certificates/MV-2026-TN-004521"
              className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-primary-600 border border-primary-200 rounded-xl py-2 hover:bg-primary-50 transition-colors">
              <QrCode size={13} /> View Digital Certificate
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Instrument Location</h3>
            <div className="flex flex-col gap-2.5 mb-4">
              {[
                { k: 'Owner', v: 'Rajesh Kumar', icon: User },
                { k: 'Business', v: 'Rajesh General Stores', icon: Building2 },
                { k: 'Address', v: '14, Anna Nagar West, Chennai', icon: MapPin },
                { k: 'District', v: 'Chennai', icon: MapPin },
                { k: 'State', v: 'Tamil Nadu', icon: MapPin },
              ].map(({ k, v, icon: Icon }) => (
                <div key={k} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Icon size={9} />{k}</span>
                  <span className="text-xs font-medium text-slate-700">{v}</span>
                </div>
              ))}
            </div>

            {/* Validity meter */}
            <div className="bg-slate-50 rounded-xl p-3">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-slate-500">Validity period</span>
                <span className="text-xs font-semibold text-accent-600">1,095 days remaining</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-slate-400">Sep 2026</span>
                <span className="text-[10px] text-slate-400">Sep 2029</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification History — Audit Trail */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Activity size={16} className="text-primary-600" />
            <h3 className="font-semibold text-slate-800">Instrument Lifecycle Audit Trail</h3>
          </div>
          <div className="px-6 py-5">
            <AuditTrail
              title=""
              events={[
                { step: 'Certificate Issued — MV-2026-TN-004521', date: 'Sep 10, 2026', actor: 'Insp. Priya Sharma, Chennai Division', note: 'Digital verification approved. QR certificate activated.' },
                { step: 'Re-verification — MV-2023-TN-002104',    date: 'Sep 5, 2023',  actor: 'Insp. Suresh M., Chennai Division' },
                { step: 'Initial Verification — MV-2020-TN-000891', date: 'Aug 28, 2020', actor: 'Insp. Kumar R., Chennai Division' },
                { step: 'Instrument Registered',                  date: 'Aug 25, 2020',  actor: 'Rajesh Kumar (Owner)' },
              ]}
            />
          </div>
        </div>

        {/* Evidence history */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Camera size={16} className="text-primary-600" />
            <h3 className="font-semibold text-slate-800">Latest Inspection Evidence</h3>
            <span className="ml-auto text-xs text-slate-400">Sep 10, 2026 · Digital Verification</span>
          </div>
          <div className="p-5 grid grid-cols-3 gap-3">
            {['Inspection Video', 'Instrument Front', 'Serial Number Plate'].map((label) => (
              <div key={label}
                className="aspect-video bg-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="text-3xl mb-1">{label.includes('Video') ? '▶️' : '🖼️'}</div>
                <p className="text-[10px] text-slate-400 text-center px-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report mismatch */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-4">
          <AlertTriangle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-800 text-sm mb-1">Spotted a discrepancy?</p>
            <p className="text-xs text-yellow-700 mb-3">If the physical instrument doesn't match this passport, or if the seal appears tampered, report it to the Legal Metrology Department.</p>
            <button className="text-xs font-semibold text-yellow-800 border border-yellow-300 bg-yellow-100 px-3 py-1.5 rounded-lg hover:bg-yellow-200 transition-colors">
              Report Mismatch
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
