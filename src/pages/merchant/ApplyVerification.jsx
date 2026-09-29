import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import VideoChallengeCapture from '../../components/evidence/VideoChallengeCapture'
import {
  LayoutDashboard, Scale, FileText, Bell, QrCode, PlusCircle,
  ClipboardList, History, CheckCircle2, Video, Camera, MapPin,
  ArrowRight, ArrowLeft, Upload, Zap, Truck, Info, AlertTriangle
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/merchant', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/merchant/instruments', label: 'My Instruments', icon: Scale },
    { to: '/merchant/apply', label: 'New Application', icon: PlusCircle },
    { to: '/merchant/applications', label: 'Applications', icon: ClipboardList },
  ]},
  { label: 'Records', links: [
    { to: '/merchant/certificates', label: 'Certificates', icon: QrCode },
    { to: '/merchant/history', label: 'History', icon: History },
    { to: '/merchant/notifications', label: 'Alerts', icon: Bell, badge: '3' },
  ]},
]

const instrumentTypes = [
  'Platform Weighbridge','Counter Scale','Electronic Balance','Spring Balance',
  'Petrol Pump Dispenser','LPG Cylinder','Taxi Meter','Clinical Thermometer',
  'Water Meter','Electricity Meter',
]

const steps = ['Instrument Details', 'Verification Pathway', 'Upload Evidence', 'Review & Submit']

export default function ApplyVerification() {
  const [step, setStep] = useState(0)
  const [pathway, setPathway] = useState('')
  const [form, setForm] = useState({
    instrumentType: '', serial: '', manufacturer: '', capacity: '', unit: 'kg',
    location: '', address: '', state: '', district: '',
    notes: '',
  })
  const [uploaded, setUploaded] = useState({ video: false, photo1: false, photo2: false, doc: false })
  const navigate = useNavigate()

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const toggleUpload = (k) => setUploaded({ ...uploaded, [k]: !uploaded[k] })

  const handleSubmit = () => {
    navigate('/merchant/applications', { state: { submitted: true } })
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="merchant" title="New Verification Application">
      <div className="max-w-3xl mx-auto">
        {/* Step progress */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                ${i === step ? 'bg-primary-600 text-white' : i < step ? 'bg-accent-100 text-accent-700' : 'bg-slate-100 text-slate-400'}`}>
                {i < step ? <CheckCircle2 size={12} /> : <span className="w-4 text-center">{i + 1}</span>}
                {s}
              </div>
              {i < steps.length - 1 && <div className={`w-6 h-px ${i < step ? 'bg-accent-300' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
          {/* Step 0 — Instrument Details */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Instrument Details</h2>
              <p className="text-sm text-slate-500 mb-6">Provide information about the instrument to be verified.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Instrument Type <span className="text-red-500">*</span></label>
                  <select value={form.instrumentType} onChange={set('instrumentType')}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-white text-slate-800">
                    <option value="">Select instrument type</option>
                    {instrumentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Serial Number <span className="text-red-500">*</span></label>
                  <input value={form.serial} onChange={set('serial')} placeholder="e.g. WB-2024-001"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Manufacturer</label>
                  <input value={form.manufacturer} onChange={set('manufacturer')} placeholder="e.g. Avery Weigh-Tronix"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Capacity / Range</label>
                  <input value={form.capacity} onChange={set('capacity')} placeholder="e.g. 500"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Unit</label>
                  <select value={form.unit} onChange={set('unit')}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-white text-slate-800">
                    {['kg','g','tonne','litre','ml','metre','mm'].map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Installation Address <span className="text-red-500">*</span></label>
                  <input value={form.address} onChange={set('address')} placeholder="Shop / premise address"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">State</label>
                  <select value={form.state} onChange={set('state')}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-white text-slate-800">
                    <option value="">Select state</option>
                    {['Tamil Nadu','Maharashtra','Delhi','Gujarat','Karnataka'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">District</label>
                  <input value={form.district} onChange={set('district')} placeholder="e.g. Chennai"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400" />
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Pathway */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Choose Verification Pathway</h2>
              <p className="text-sm text-slate-500 mb-6">Select how you'd like this instrument to be verified.</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Digital */}
                <button type="button" onClick={() => setPathway('digital')}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${pathway === 'digital' ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Zap size={20} className="text-primary-600" />
                    </div>
                    {pathway === 'digital' && <CheckCircle2 size={18} className="text-primary-600" />}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">Digital Verification</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">Submit guided inspection video + photos. Officer reviews remotely. AI-assisted analysis.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-primary-700">₹ 150</span>
                    <span className="text-xs bg-accent-100 text-accent-700 font-semibold px-2 py-0.5 rounded-full">Faster · Cheaper</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {['Remote officer review','AI evidence analysis','Result in 24–48 hrs','Auto-escalates if needed'].map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 size={11} className="text-accent-500 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </button>

                {/* Physical */}
                <button type="button" onClick={() => setPathway('physical')}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${pathway === 'physical' ? 'border-slate-700 bg-slate-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Truck size={20} className="text-slate-600" />
                    </div>
                    {pathway === 'physical' && <CheckCircle2 size={18} className="text-slate-700" />}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">Physical Inspection</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">LMO officer visits your premises. Required for high-capacity or critical instruments.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-slate-700">₹ 500</span>
                    <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">On-site visit</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {['Officer visits premises','Physical stamp applied','Scheduled within 5–7 days','Required for critical types'].map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 size={11} className="text-slate-400 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </button>
              </div>

              {pathway === 'digital' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                  <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    You'll need to record a short guided inspection video showing the instrument serial number, test weights and readings. If evidence is insufficient, this case will automatically escalate to physical inspection.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Evidence Upload */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Upload Evidence</h2>
              <p className="text-sm text-slate-500 mb-6">
                {pathway === 'digital'
                  ? 'Upload your inspection video, instrument photos and supporting documents.'
                  : 'Upload instrument photos and any prior calibration documents.'}
              </p>

              <div className="flex flex-col gap-4">
                {/* Live challenge video capture for digital pathway */}
                {pathway === 'digital' && !uploaded.video && (
                  <VideoChallengeCapture
                    onCaptureComplete={(_blob, _code) => {
                      setUploaded(u => ({ ...u, video: true }))
                    }}
                    onSkip={() => setUploaded(u => ({ ...u, video: true }))}
                  />
                )}
                {pathway === 'digital' && uploaded.video && (
                  <div className="border-2 border-emerald-400 bg-emerald-50 rounded-2xl p-5 flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-800">Inspection Video Captured</p>
                      <p className="text-xs text-emerald-600 mt-0.5">One-time challenge code verified. Video evidence is locked to this application.</p>
                    </div>
                    <button onClick={() => setUploaded(u => ({ ...u, video: false }))}
                      className="ml-auto text-xs text-emerald-700 border border-emerald-300 px-2.5 py-1 rounded-lg hover:bg-emerald-100">
                      Re-record
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { k: 'photo1', label: 'Instrument Photo (Front)', req: true },
                    { k: 'photo2', label: 'Serial Number Photo', req: true },
                  ].map(({ k, label, req }) => (
                    <div key={k} onClick={() => toggleUpload(k)}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-colors
                        ${uploaded[k] ? 'border-accent-400 bg-accent-50' : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50'}`}>
                      {uploaded[k]
                        ? <CheckCircle2 size={24} className="text-accent-500 mx-auto mb-2" />
                        : <Camera size={24} className="text-slate-400 mx-auto mb-2" />}
                      <p className="text-xs font-semibold text-slate-700">
                        {uploaded[k] ? '✓ Uploaded' : label}
                      </p>
                      {req && <p className="text-[10px] text-slate-400 mt-0.5">Required</p>}
                    </div>
                  ))}
                </div>

                <div onClick={() => toggleUpload('doc')}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-colors
                    ${uploaded.doc ? 'border-accent-400 bg-accent-50' : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50'}`}>
                  {uploaded.doc
                    ? <CheckCircle2 size={24} className="text-accent-500 mx-auto mb-2" />
                    : <Upload size={24} className="text-slate-400 mx-auto mb-2" />}
                  <p className="text-sm font-semibold text-slate-700">
                    {uploaded.doc ? '✓ Documents Uploaded' : 'Supporting Documents (Optional)'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Previous certificate, calibration reports · PDF, JPG · max 10 MB</p>
                </div>
              </div>

              {pathway === 'digital' && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2">
                  <AlertTriangle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">Ensure the serial number is clearly visible in the video and matches what you entered in Step 1.</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Review & Submit</h2>
              <p className="text-sm text-slate-500 mb-6">Confirm your application details before submitting.</p>

              <div className="flex flex-col gap-4">
                {[
                  { label: 'Instrument Details', items: [
                    { k: 'Type', v: form.instrumentType || 'Platform Weighbridge' },
                    { k: 'Serial Number', v: form.serial || 'WB-2024-001' },
                    { k: 'Manufacturer', v: form.manufacturer || 'Avery Weigh-Tronix' },
                    { k: 'Location', v: form.address || 'Anna Nagar, Chennai' },
                  ]},
                  { label: 'Verification Pathway', items: [
                    { k: 'Method', v: pathway === 'digital' ? 'Digital Verification' : 'Physical Inspection' },
                    { k: 'Fee', v: pathway === 'digital' ? '₹ 150' : '₹ 500' },
                  ]},
                  { label: 'Evidence', items: [
                    { k: 'Inspection Video', v: uploaded.video ? '✓ Uploaded' : '— Not uploaded' },
                    { k: 'Photos', v: (uploaded.photo1 && uploaded.photo2) ? '✓ Uploaded' : '⚠ Incomplete' },
                    { k: 'Documents', v: uploaded.doc ? '✓ Uploaded' : '— Not provided' },
                  ]},
                ].map((section) => (
                  <div key={section.label} className="border border-slate-100 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{section.label}</p>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {section.items.map(({ k, v }) => (
                        <div key={k} className="flex justify-between px-4 py-2.5">
                          <span className="text-xs text-slate-500">{k}</span>
                          <span className="text-xs font-medium text-slate-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex gap-3">
                  <Info size={16} className="text-primary-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-primary-700 leading-relaxed">
                    By submitting, you confirm that the information is accurate. Submission of false evidence is an offence under the Legal Metrology Act 2009.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => step > 0 ? setStep(step - 1) : null}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} /> Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !pathway}
                className="flex items-center gap-2 bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-accent-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-accent-600 transition-colors"
              >
                <CheckCircle2 size={16} /> Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
