import { supabase } from '../lib/supabase'

// ── merchant: fetch own applications ──
export async function getMyApplications() {
  const { data, error } = await supabase
    .from('applications_view')
    .select('*')
    .order('submitted_at', { ascending: false })
  if (error) throw error
  return data
}

// ── merchant: submit a new application ──
export async function submitApplication({
  instrumentId, pathway, feeAmount, notes,
}) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('applications')
    .insert({
      instrument_id: instrumentId,
      applicant_id:  user.id,
      pathway,
      fee_amount:    feeAmount,
      notes,
      status:        'submitted',
    })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── officer: fetch pending queue ──
export async function getApplicationQueue({ type } = {}) {
  let q = supabase
    .from('applications_view')
    .select('*')
    .in('status', ['submitted', 'under_review', 'evidence_requested'])
    .order('submitted_at', { ascending: true })

  if (type && type !== 'all') q = q.eq('pathway', type)

  const { data, error } = await q
  if (error) throw error
  return data
}

// ── officer: fetch single application ──
export async function getApplication(id) {
  const { data, error } = await supabase
    .from('applications_view')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// ── officer: update application status ──
export async function updateApplicationStatus(id, { status, remarks }) {
  const { data, error } = await supabase
    .from('applications')
    .update({
      status,
      remarks,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── admin: all applications ──
export async function getAllApplications({ status, district } = {}) {
  let q = supabase
    .from('applications_view')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (status)   q = q.eq('status', status)
  if (district) q = q.eq('instrument_district', district)

  const { data, error } = await q
  if (error) throw error
  return data
}

// ── get inspection readings for an application ──
export async function getInspectionReadings(applicationId) {
  const { data, error } = await supabase
    .from('inspection_readings')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// ── save inspection readings ──
export async function saveInspectionReadings(applicationId, readings) {
  // delete old readings first, then insert fresh
  await supabase
    .from('inspection_readings')
    .delete()
    .eq('application_id', applicationId)

  const rows = readings.map(r => ({ ...r, application_id: applicationId }))
  const { data, error } = await supabase
    .from('inspection_readings')
    .insert(rows)
    .select()
  if (error) throw error
  return data
}
