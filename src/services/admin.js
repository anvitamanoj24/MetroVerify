import { supabase } from '../lib/supabase'

// ── state-wide stats for admin dashboard ──
export async function getAdminStats() {
  const [instruments, applications, certificates, enforcement] = await Promise.all([
    supabase.from('instruments').select('id, status', { count: 'exact' }),
    supabase.from('applications').select('id, status', { count: 'exact' }),
    supabase.from('certificates').select('id', { count: 'exact' }),
    supabase.from('enforcement_cases').select('id, status', { count: 'exact' }),
  ])

  const instData  = instruments.data  ?? []
  const appData   = applications.data ?? []

  return {
    totalInstruments: instData.length,
    validInstruments: instData.filter(i => i.status === 'valid').length,
    expiringInstruments: instData.filter(i => i.status === 'expiring').length,
    expiredInstruments:  instData.filter(i => i.status === 'expired').length,
    pendingApplications: appData.filter(a => ['submitted','under_review'].includes(a.status)).length,
    totalCertificates: certificates.data?.length ?? 0,
    activeEnforcement: (enforcement.data ?? []).filter(e => e.status !== 'resolved').length,
  }
}

// ── all users / officers ──
export async function getAllProfiles(role = null) {
  let q = supabase.from('profiles').select('*').order('created_at', { ascending: false })
  if (role) q = q.eq('role', role)
  const { data, error } = await q
  if (error) throw error
  return data
}

// ── enforcement cases ──
export async function getEnforcementCases({ status } = {}) {
  let q = supabase
    .from('enforcement_cases')
    .select('*, instruments(name, serial_number), profiles!reported_by(full_name)')
    .order('detected_at', { ascending: false })
  if (status) q = q.eq('status', status)
  const { data, error } = await q
  if (error) throw error
  return data
}

// ── create enforcement case ──
export async function createEnforcementCase(payload) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('enforcement_cases')
    .insert({ ...payload, reported_by: user.id })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── update enforcement case ──
export async function updateEnforcementCase(id, payload) {
  const { data, error } = await supabase
    .from('enforcement_cases')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── schedule management ──
export async function getScheduledInspections(officerId = null) {
  let q = supabase
    .from('scheduled_inspections')
    .select(`
      *,
      applications(app_number, pathway),
      profiles!officer_id(full_name)
    `)
    .order('scheduled_date', { ascending: true })
  if (officerId) q = q.eq('officer_id', officerId)
  const { data, error } = await q
  if (error) throw error
  return data
}

export async function scheduleInspection(payload) {
  const { data, error } = await supabase
    .from('scheduled_inspections')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}
