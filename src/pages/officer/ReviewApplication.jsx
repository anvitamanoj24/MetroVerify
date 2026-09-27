import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode, Calendar, BarChart3,
  CheckCircle2, XCircle, AlertTriangle, Play, Activity,
  ArrowLeft, User, MapPin, Clock, ChevronRight, ShieldCheck,
  TrendingUp
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/officer', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/queue', label: 'Review Queue', icon: ClipboardList, badge: '8' },
    { to: '/officer/schedule', label: 'Schedule', icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments', icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued', label: 'Issued Certificates', icon: QrCode },
    { to: '/officer/notifications', label: 'Notifications', icon: Bell, badge: '2' },
    { to: '/officer/analytics', label: 'Analytics', icon: BarChart3 },
  ]},
]

const evidenceReadings = [
  { stage: 'Zero Load', reference: '0.000 kg', submitted: '0.001 kg', deviation: '+0.001', ok: true },
  { stage: 'Test Load 1 (1 kg)', reference: '1.000 kg', submitted: '1.002 kg', deviation: '+0.002', ok: true },
  { stage: 'Test Load 2 (2.5 kg)', reference: '2.500 kg', submitted: '2.497 kg', deviation: '-0.003', ok: true },
  { stage: 'Test Load 3 (5 kg)', reference: '5.000 kg', submitted: '5.012 kg', deviation: '+0.012', ok: false },
]

export default function ReviewApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [decision, setDecision] = useState('')
  const [remarks, setRemarks] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const appId = id || 'APP-2026-0412'

  const handleDecision = (d) => {
    setDecision(d)
    if (d !== 'escalate') {
      setTimeout(() => {
        setSubmitted(true)
        if (d === 'approve') {
          navigate('/officer/certificate/preview')
        }
      }, 400)
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title={`Review · ${appId}`}>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Back + header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/officer')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft size={15} /> Back to Queue
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">Counter Scale 5kg</h2>
              <Badge variant="info">Digital Verification</Badge>
              <Badge variant="danger">High Priority</Badge>
            </div>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
              <span className="text-xs text-slate-400 flex items-center gap-1"><User size={11} />Rajesh Kumar</span>
              <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11} />Anna Nagar, Chennai</span>
              <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} />Submitted 2h ago</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-xl px-4 py-3">
            <Activity size={18} className="text-primary-600" />
            <div>
              <p className="text-xs text-slate-500">Evidence Quality</p>
              <p className="text-xl font-extrabold text-primary-700">92%</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left — Evidence + AI */}
          <div className="lg:col-span-2 space-y-5">
            {/* Video */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Inspection Video</h3>
                <span className="text-xs text-slate-400">Duration: 2m 34s</span>
              </div>
              <div className="bg-slate-900 aspect-video flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/25 transition-colors">
                    <Play size={28} className="text-white ml-1" />
                  </div>
                  <span className="text-white/60 text-sm">Click to play inspection video</span>
                </div>
                {/* Timestamp markers */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
                  {['Serial No. Check', 'Zero Load', 'Test Weights', 'Final Reading'].map((m, i) => (
                    <div key={m} className="bg-black/60 text-white/70 text-[9px] px-1.5 py-0.5 rounded cursor-pointer hover:bg-black/80">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Evidence Analysis */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-primary-600" />
                  <h3 className="font-semibold text-slate-800">Evidence Analysis</h3>
                </div>
                <span className="text-xs bg-primary-50 text-primary-600 font-semibold px-2 py-0.5 rounded-full">System-extracted</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Score breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Reading Accuracy', v: 87, color: 'bg-primary-500' },
                    { label: 'Seal Integrity',   v: 98, color: 'bg-accent-500' },
                    { label: 'Evidence Quality', v: 91, color: 'bg-violet-500' },
                  ].map(({ label, v, color }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-lg font-extrabold text-slate-800">{v}%</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
                      <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Readings table */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Submitted Readings vs Reference</p>
                  <div className="rounded-xl overflow-hidden border border-slate-100">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50">
                        <tr>
                          {['Test Stage', 'Reference', 'Submitted', 'Deviation', 'Status'].map(h => (
                            <th key={h} className="text-left px-3 py-2 font-semibold text-slate-500 first:pl-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {evidenceReadings.map((r) => (
                          <tr key={r.stage} className={r.ok ? '' : 'bg-red-50'}>
                            <td className="px-3 pl-4 py-2.5 font-medium text-slate-700">{r.stage}</td>
                            <td className="px-3 py-2.5 text-slate-500">{r.reference}</td>
                            <td className="px-3 py-2.5 text-slate-800 font-medium">{r.submitted}</td>
                            <td className={`px-3 py-2.5 font-semibold ${r.ok ? 'text-slate-500' : 'text-red-600'}`}>{r.deviation}</td>
                            <td className="px-3 py-2.5">
                              {r.ok
                                ? <CheckCircle2 size={14} className="text-accent-500" />
                                : <AlertTriangle size={14} className="text-red-500" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Flag note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2">
                  <AlertTriangle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    <span className="font-semibold">System Note:</span> Test Load 3 (5 kg) shows +0.012 kg deviation — within permissible limit but at the upper boundary. Recommend reviewing the submitted evidence carefully before approving.
                  </p>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Submitted Photos</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5">
                {['Instrument (Front)', 'Serial Number Plate'].map((label) => (
                  <div key={label} className="aspect-video bg-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="text-slate-300 text-4xl mb-2">🖼️</div>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Details + Decision */}
          <div className="space-y-5">
            {/* Instrument info */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">Instrument Details</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { k: 'Application', v: appId },
                  { k: 'Type', v: 'Counter Scale' },
                  { k: 'Serial No.', v: 'CS-2023-112' },
                  { k: 'Capacity', v: '5 kg' },
                  { k: 'Manufacturer', v: 'Essae Teraoka' },
                  { k: 'Owner', v: 'Rajesh Kumar' },
                  { k: 'Location', v: 'Anna Nagar, Chennai' },
                  { k: 'Pathway', v: 'Digital Verification' },
                  { k: 'Fee Paid', v: '₹ 150' },
                ].map(({ k, v }) => (
                  <div key={k} className="flex justify-between px-5 py-2.5">
                    <span className="text-xs text-slate-400">{k}</span>
                    <span className="text-xs font-medium text-slate-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Decision */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">Officer Decision</h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-2">Remarks (optional)</label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                    placeholder="Add any inspection notes or remarks..."
                    className="w-full border border-slate-200 rounded-xl text-xs px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-slate-400"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDecision('approve')}
                    className="w-full flex items-center justify-center gap-2 bg-accent-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-accent-600 transition-colors"
                  >
                    <CheckCircle2 size={16} /> Approve & Issue Certificate
                  </button>
                  <button
                    onClick={() => handleDecision('escalate')}
                    className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-yellow-600 transition-colors"
                  >
                    <AlertTriangle size={16} /> Escalate to Physical
                  </button>
                  <button
                    onClick={() => handleDecision('reject')}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 text-sm font-medium py-2.5 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <XCircle size={16} /> Reject Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
