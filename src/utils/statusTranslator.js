/**
 * statusTranslator.js
 * Single source of truth for every status code used across MetroVerify.
 * Maps raw DB values → plain-language title + description + badge style.
 */

export const STATUS_MAP = {
  // ── Instrument ────────────────────────────────────────────────
  unverified: {
    title: 'Instrument Registered',
    description: 'Your instrument is on record. Apply for verification to activate your Digital Passport.',
    badge: 'bg-slate-100 text-slate-600 border border-slate-200',
    dot:   'bg-slate-400',
    step:  0,
    icon:  'circle',
  },
  valid: {
    title: 'Certificate Active',
    description: 'This instrument holds a valid verification certificate from the Legal Metrology Department.',
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot:   'bg-emerald-500',
    step:  4,
    icon:  'check',
  },
  expiring: {
    title: 'Expiring Within 30 Days',
    description: 'The certificate expires soon. Apply for re-verification before the deadline to stay compliant.',
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot:   'bg-amber-500',
    step:  4,
    icon:  'clock',
  },
  expired: {
    title: 'Certificate Expired',
    description: 'Verification has lapsed. This instrument must not be used until re-verified and stamped.',
    badge: 'bg-red-50 text-red-700 border border-red-200',
    dot:   'bg-red-500',
    step:  0,
    icon:  'x',
  },

  // ── Application workflow ──────────────────────────────────────
  submitted: {
    title: 'Application Submitted',
    description: 'Your application has been received and is queued for officer assignment.',
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    dot:   'bg-blue-500',
    step:  1,
    icon:  'circle',
  },
  under_review: {
    title: 'Documents Under Review',
    description: 'The Legal Metrology Officer is inspecting your uploaded documents and verification evidence.',
    badge: 'bg-violet-50 text-violet-700 border border-violet-200',
    dot:   'bg-violet-500',
    step:  2,
    icon:  'search',
  },
  evidence_requested: {
    title: 'Additional Evidence Required',
    description: 'The officer needs more photos or documents. Please upload the requested items promptly.',
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot:   'bg-amber-500',
    step:  2,
    icon:  'upload',
  },
  escalated: {
    title: 'Physical Inspection Scheduled',
    description: 'Remote verification was inconclusive. A Legal Metrology Officer will visit your premises.',
    badge: 'bg-orange-50 text-orange-700 border border-orange-200',
    dot:   'bg-orange-500',
    step:  3,
    icon:  'truck',
  },
  approved: {
    title: 'Verification Approved',
    description: 'Verification complete. Your digitally signed QR certificate and Digital Passport are now active.',
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot:   'bg-emerald-500',
    step:  4,
    icon:  'check',
  },
  rejected: {
    title: 'Application Rejected',
    description: 'This application did not meet verification requirements. Review the officer remarks and re-apply.',
    badge: 'bg-red-50 text-red-700 border border-red-200',
    dot:   'bg-red-500',
    step:  0,
    icon:  'x',
  },
}

/** Full status object, with safe fallback */
export function getStatus(code) {
  return STATUS_MAP[code] ?? {
    title:       'Processing',
    description: 'Your application is moving through the verification workflow.',
    badge: 'bg-slate-100 text-slate-600 border border-slate-200',
    dot:   'bg-slate-400',
    step:  1,
    icon:  'circle',
  }
}

/** Just the Tailwind badge classes */
export function getStatusBadge(code) { return getStatus(code).badge }

/** Just the human-readable title */
export function getStatusTitle(code) { return getStatus(code).title }

/** Just the description sentence */
export function getStatusDesc(code) { return getStatus(code).description }

/**
 * Ordered workflow steps for the application progress timeline.
 * step n maps directly to STATUS_MAP[*].step values.
 */
export const WORKFLOW_STEPS = [
  { n: 0, label: 'Registered',            desc: 'Instrument on record in the system' },
  { n: 1, label: 'Application Submitted', desc: 'Awaiting officer assignment' },
  { n: 2, label: 'Evidence Under Review', desc: 'Officer reviewing documents & photos' },
  { n: 3, label: 'Inspection',            desc: 'Physical or digital verification' },
  { n: 4, label: 'Certificate Issued',    desc: 'Digital Passport is active' },
]
