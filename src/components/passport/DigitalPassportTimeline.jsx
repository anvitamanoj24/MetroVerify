import { CheckCircle2, Clock, Truck, Search, Upload, X, Circle } from 'lucide-react'
import { getStatus, getStatusTitle, WORKFLOW_STEPS } from '../../utils/statusTranslator'

/**
 * StatusBanner
 * Full-width plain-language banner shown at the top of any page
 * that needs to communicate application/instrument status clearly.
 */
export function StatusBanner({ status, className = '' }) {
  const s = getStatus(status)
  return (
    <div className={`rounded-xl border p-4 flex items-start gap-3 ${s.badge} ${className}`}>
      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${s.dot}`} />
      <div>
        <p className="text-sm font-semibold">{s.title}</p>
        <p className="text-xs mt-0.5 opacity-80 leading-relaxed">{s.description}</p>
      </div>
    </div>
  )
}

// Map icon key → lucide component
const ICON = {
  check:  CheckCircle2,
  clock:  Clock,
  truck:  Truck,
  search: Search,
  upload: Upload,
  x:      X,
  circle: Circle,
}

/**
 * WorkflowTimeline
 * Vertical step-by-step progress bar for an application.
 * Highlights the current step and marks completed steps green.
 *
 * Props
 *   status  — raw DB status string e.g. "under_review"
 *   events  — optional array of { label, date, actor } audit entries
 *             to render beneath completed steps
 */
export function WorkflowTimeline({ status, events = [] }) {
  const current = getStatus(status).step

  return (
    <div className="flex flex-col">
      {WORKFLOW_STEPS.map((step, i) => {
        const done    = step.n < current
        const active  = step.n === current
        const pending = step.n > current
        const event   = events[i]

        return (
          <div key={step.n} className="flex gap-4">
            {/* Left: connector + dot */}
            <div className="flex flex-col items-center w-8 shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                ${done   ? 'bg-emerald-500 text-white' :
                  active ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                           'bg-slate-100 text-slate-400'}`}>
                {done ? <CheckCircle2 size={14} /> : active ? '●' : step.n}
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className={`w-0.5 flex-1 min-h-[28px] my-1 rounded-full ${done ? 'bg-emerald-200' : 'bg-slate-100'}`} />
              )}
            </div>

            {/* Right: label + optional event */}
            <div className={`pb-5 ${i < WORKFLOW_STEPS.length - 1 ? '' : 'pb-1'}`}>
              <p className={`text-sm font-semibold leading-tight
                ${done ? 'text-slate-700' : active ? 'text-primary-700' : 'text-slate-400'}`}>
                {step.label}
              </p>
              <p className={`text-xs mt-0.5 ${active ? 'text-primary-500' : 'text-slate-400'}`}>
                {active ? '← Current stage' : step.desc}
              </p>
              {event && done && (
                <div className="mt-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                  <p className="text-xs font-medium text-slate-700">{event.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {event.date} &nbsp;·&nbsp; {event.actor}
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * AuditTrail
 * Chronological list of lifecycle events for a single instrument.
 * Used on the Digital Passport page and public QR verify page.
 *
 * Props
 *   events — array of { step, date, actor, note? }
 *   title  — optional section heading
 */
export function AuditTrail({ events = [], title = 'Instrument Lifecycle Audit Trail' }) {
  if (!events.length) {
    return (
      <div className="text-center py-8 text-slate-400">
        <p className="text-sm">No audit events yet.</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">{title}</p>
      )}
      <div className="space-y-0">
        {events.map((e, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* Dot + line */}
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-3 h-3 rounded-full shrink-0 mt-1
                ${i === 0 ? 'bg-primary-600' : 'bg-slate-300'}`} />
              {i < events.length - 1 && (
                <div className="w-px flex-1 bg-slate-200 min-h-[28px] my-1" />
              )}
            </div>
            {/* Content */}
            <div className={`pb-4 ${i < events.length - 1 ? '' : 'pb-1'}`}>
              <p className="text-sm font-semibold text-slate-800">{e.step}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {e.date} &nbsp;·&nbsp; Handled by: <span className="font-medium">{e.actor}</span>
              </p>
              {e.note && (
                <p className="text-xs text-slate-500 mt-1 italic">"{e.note}"</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * DigitalPassportTimeline (default export)
 * Full passport card with identity header + audit trail.
 * Drop it on any page that receives an instrument object.
 *
 * Props
 *   instrument — { id, name, owner, status, validUntil, history[] }
 */
export default function DigitalPassportTimeline({ instrument }) {
  const data = instrument ?? {
    id:         'MV-INS-98421',
    name:       'Electronic Counter Scale — 30 kg',
    owner:      'Rajesh General Stores, Chennai',
    status:     'valid',
    validUntil: '14 Oct 2029',
    history: [
      { step: 'Instrument Registered',             date: '12 Oct 2026', actor: 'Owner / Merchant' },
      { step: 'Digital Evidence Reviewed',         date: '14 Oct 2026', actor: 'Insp. Priya Sharma, LMO' },
      { step: 'QR Certificate Issued',             date: '14 Oct 2026', actor: 'Legal Metrology Dept., Tamil Nadu' },
    ],
  }

  const s = getStatus(data.status)

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-100">
      {/* ── Passport header ─────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
        <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold block mb-2">
          Official Digital Passport — MetroVerify
        </span>
        <h2 className="text-xl font-extrabold leading-tight">{data.name}</h2>
        <p className="text-slate-400 text-sm font-mono mt-1">ID: {data.id}</p>
      </div>

      {/* ── Details grid ────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50 border-b border-slate-100">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide block mb-0.5">Owner / Business</span>
          <span className="text-sm font-semibold text-slate-800">{data.owner}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide block mb-0.5">Current Status</span>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${s.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.title}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide block mb-0.5">Valid Until</span>
          <span className="text-sm font-semibold text-slate-800">{data.validUntil}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide block mb-0.5">What this means</span>
          <span className="text-xs text-slate-500 leading-relaxed">{s.description}</span>
        </div>
      </div>

      {/* ── Audit trail ─────────────────────────────────── */}
      <div className="p-5">
        <AuditTrail events={data.history} />
      </div>
    </div>
  )
}
