import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import { gatcSidebarItems } from './GATCDashboard'
import {
  ArrowLeft, CheckCircle2, XCircle, AlertTriangle,
  User, MapPin, Clock, Camera, Upload, Scale
} from 'lucide-react'

export default function GATCReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const appId = id || 'APP-2026-0442'
  const [remarks, setRemarks] = useState('')
  const [readings, setReadings] = useState([
    { stage: 'Zero Load',     reference: '0.000 kg', observed: '', ok: null },
    { stage: '100 kg Load',   reference: '100.000 kg', observed: '', ok: null },
    { stage: '250 kg Load',   reference: '250.000 kg', observed: '', ok: null },
    { stage: '500 kg Load',   reference: '500.000 kg', observed: '', ok: null },
  ])
  const [uploaded, setUploaded] = useState({ front: false, serial: false, seal: false })

  const updateReading = (i, val) => {
    const updated = [...readings]
    updated[i] = { ...updated[i], observed: val, ok: val ? Math.abs(parseFloat(val) - parseFloat(updated[i].reference)) < 0.5 : null }
    setReadings(updated)
  }

  const handleDecision = (d) => {
    if (d === 'approve') navigate('/gatc/issued')
    else navigate('/gatc')
  }

  return (
    <DashboardLayout sidebarItems={gatcSidebarItems} role="gatc" title={`Inspection · ${appId}`}>
      <div className="max-w-5xl mx-auto space-y-5">
        <button onClick={() => navigate('/gatc/queue')}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={15} /> Back to Queue
        </button>

        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">Platform Scale 500kg</h2>
              <Badge variant="info">Physical Inspection</Badge>
              <Badge variant="danger">High Priority</Badge>
            </div>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
              <span className="text-xs text-slate-400 flex items-center gap-1"><User size={11} />Kiran Auto Parts</span>
              <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11} />Chennai</span>
              <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} />Received 1h ago</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            {/* Test Readings */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Test Readings</h3>
                <p className="text-xs text-slate-400 mt-0.5">Enter observed values from field inspection</p>
              </div>
              <div className="p-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      {['Test Stage', 'Reference Value', 'Observed Value', 'Status'].map(h => (
                        <th key={h} className="text-left pb-2 text-xs font-semibold text-slate-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {readings.map((r, i) => (
                      <tr key={i}>
                        <td className="py-2.5 text-xs font-medium text-slate-700">{r.stage}</td>
                        <td className="py-2.5 text-xs text-slate-500 font-mono">{r.reference}</td>
                        <td className="py-2.5">
                          <input
                            value={r.observed}
                            onChange={e => updateReading(i, e.target.value)}
                            placeholder="Enter value"
                            className="w-28 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-primary-500 font-mono placeholder:font-sans placeholder:text-slate-400"
                          />
                        </td>
                        <td className="py-2.5">
                          {r.ok === null ? <span className="text-xs text-slate-400">—</span>
                            : r.ok ? <CheckCircle2 size={15} className="text-teal-500" />
                            : <AlertTriangle size={15} className="text-red-500" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Photo uploads */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Inspection Photographs</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 p-5">
                {[
                  { k: 'front', label: 'Instrument (Front)' },
                  { k: 'serial', label: 'Serial Number Plate' },
                  { k: 'seal', label: 'Seal Applied' },
                ].map(({ k, label }) => (
                  <div key={k}
                    onClick={() => setUploaded({ ...uploaded, [k]: !uploaded[k] })}
                    className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors
                      ${uploaded[k] ? 'border-teal-400 bg-teal-50' : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50'}`}>
                    {uploaded[k]
                      ? <CheckCircle2 size={22} className="text-teal-500 mb-1" />
                      : <Camera size={22} className="text-slate-400 mb-1" />}
                    <p className="text-[10px] text-slate-500 text-center px-1">{uploaded[k] ? '✓ Uploaded' : label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — details + decision */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">Application Details</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { k: 'Application', v: appId },
                  { k: 'Type', v: 'Platform Scale' },
                  { k: 'Capacity', v: '500 kg' },
                  { k: 'Serial No.', v: 'PS-2024-011' },
                  { k: 'Manufacturer', v: 'Mettler Toledo' },
                  { k: 'Owner', v: 'Kiran Auto Parts' },
                  { k: 'District', v: 'Chennai' },
                ].map(({ k, v }) => (
                  <div key={k} className="flex justify-between px-5 py-2.5">
                    <span className="text-xs text-slate-400">{k}</span>
                    <span className="text-xs font-medium text-slate-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">Inspection Decision</h3>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Inspector Remarks</label>
                <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={3}
                  placeholder="Record inspection findings and remarks..."
                  className="w-full border border-slate-200 rounded-xl text-xs px-3 py-2.5 outline-none focus:border-primary-500 resize-none placeholder:text-slate-400" />
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleDecision('approve')}
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-teal-600 transition-colors">
                  <CheckCircle2 size={15} /> Approve &amp; Issue Certificate
                </button>
                <button onClick={() => handleDecision('reject')}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 text-sm font-medium py-2.5 rounded-xl hover:bg-red-50 transition-colors">
                  <XCircle size={15} /> Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
