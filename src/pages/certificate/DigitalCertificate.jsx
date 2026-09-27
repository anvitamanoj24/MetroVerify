import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Scale, ShieldCheck, Download, Printer, Share2,
  CheckCircle2, QrCode, ExternalLink, Hash, Calendar,
  Building2, MapPin, User, Award, ArrowLeft
} from 'lucide-react'

export default function DigitalCertificate() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const backPath = user?.role === 'officer' || user?.role === 'gatc' ? '/officer/issued'
    : user?.role === 'admin' ? '/admin/certificates'
    : '/merchant/certificates'

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Toolbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-13 flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mr-1">
              <ArrowLeft size={15} />
            </button>
            <Link to={backPath} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800">
              <Scale size={16} className="text-primary-600" /> MetroVerify
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm text-slate-500">Certificate MV-2026-TN-004521</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              <Share2 size={13} /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              <Printer size={13} /> Print
            </button>
            <button className="flex items-center gap-1.5 text-xs text-white bg-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-700">
              <Download size={13} /> Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Certificate */}
      <div className="flex-1 flex items-start justify-center p-6 overflow-auto">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
          {/* Certificate header */}
          <div className="bg-gradient-to-r from-primary-900 to-primary-700 px-8 py-7 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                    <Scale size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Government of India</p>
                    <p className="text-white/60 text-xs">Department of Consumer Affairs</p>
                  </div>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight">VERIFICATION CERTIFICATE</h1>
                <p className="text-white/60 text-xs mt-1">Legal Metrology Act, 2009 · Rule 23</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center">
                  <div className="w-full h-full grid grid-cols-9 gap-0.5">
                    {Array.from({ length: 81 }).map((_, i) => (
                      <div key={i} className={`rounded-[1px] ${
                        (i < 9 || i % 9 === 0 || i % 9 === 8 || i > 72 ||
                          [10,11,12,20,30,40,50,60,13,22,31,48,57,66]) ? 'bg-slate-900' : Math.random() > 0.55 ? 'bg-slate-900' : 'bg-transparent'
                      }`} />
                    ))}
                  </div>
                </div>
                <p className="text-white/50 text-[10px]">Scan to verify</p>
              </div>
            </div>
          </div>

          {/* Validity banner */}
          <div className="bg-accent-500 px-8 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-white" />
              <span className="text-white font-semibold text-sm">VALID CERTIFICATE</span>
            </div>
            <span className="text-white/80 text-xs">Valid until: September 9, 2029</span>
          </div>

          {/* Body */}
          <div className="px-8 py-7 space-y-6">
            {/* Certificate ID */}
            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl border border-primary-100">
              <div className="flex items-center gap-3">
                <Award size={20} className="text-primary-600" />
                <div>
                  <p className="text-xs text-primary-600 font-medium">Certificate Number</p>
                  <p className="text-xl font-extrabold font-mono text-primary-900">MV-2026-TN-004521</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Issued on</p>
                <p className="text-sm font-bold text-slate-800">September 10, 2026</p>
              </div>
            </div>

            {/* Two-column details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Scale size={11} /> Instrument Details
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { k: 'Type', v: 'Counter Scale' },
                    { k: 'Class', v: 'Class III' },
                    { k: 'Capacity', v: '5 kg' },
                    { k: 'Least Count', v: '2 g' },
                    { k: 'Serial Number', v: 'CS-2023-112' },
                    { k: 'Seal ID', v: 'SL-TN-2026-7741' },
                    { k: 'Manufacturer', v: 'Essae Teraoka' },
                    { k: 'Model', v: 'DS-252 Plus' },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex justify-between text-xs border-b border-slate-50 pb-1.5">
                      <span className="text-slate-400">{k}</span>
                      <span className="font-medium text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <User size={11} /> Owner &amp; Location
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { k: 'Owner Name', v: 'Rajesh Kumar' },
                    { k: 'Business', v: 'Rajesh General Stores' },
                    { k: 'Address', v: '14, Anna Nagar West' },
                    { k: 'City', v: 'Chennai' },
                    { k: 'District', v: 'Chennai' },
                    { k: 'State', v: 'Tamil Nadu' },
                    { k: 'PIN', v: '600040' },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex justify-between text-xs border-b border-slate-50 pb-1.5">
                      <span className="text-slate-400">{k}</span>
                      <span className="font-medium text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification details */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <ShieldCheck size={11} /> Verification Details
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: 'Method', v: 'Digital Verification' },
                  { k: 'Issuing Officer', v: 'Insp. Priya Sharma' },
                  { k: 'Office', v: 'Chennai Division' },
                  { k: 'Date of Verification', v: 'Sep 10, 2026' },
                  { k: 'Valid From', v: 'Sep 10, 2026' },
                  { k: 'Valid Until', v: 'Sep 9, 2029' },
                ].map(({ k, v }) => (
                  <div key={k} className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-[10px] text-slate-400">{k}</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital signature */}
            <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center">
                  <ShieldCheck size={16} className="text-accent-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Digitally Signed Certificate</p>
                  <p className="text-[10px] text-slate-400 font-mono">SHA-256: 8f4e...a3b1 · Issued by: NIC Legal Metrology CA</p>
                </div>
              </div>
              <span className="text-[10px] bg-accent-50 text-accent-700 font-semibold px-2 py-1 rounded-full border border-accent-200">Verified ✓</span>
            </div>

            {/* Footer note */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] text-slate-500 leading-relaxed text-center">
                This is a digitally generated certificate under the Legal Metrology Act, 2009. Verify authenticity at{' '}
                <span className="text-primary-600 font-medium">verify.metroverify.gov.in</span> or by scanning the QR code. Any alteration to this certificate is a punishable offence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
