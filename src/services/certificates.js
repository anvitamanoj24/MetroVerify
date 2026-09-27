import { supabase } from '../lib/supabase'

// ── officer: issue a certificate ──
export async function issueCertificate({
  applicationId, instrumentId, issuedTo, verificationMethod,
  validFrom, validUntil,
}) {
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('certificates')
    .insert({
      application_id:       applicationId,
      instrument_id:        instrumentId,
      issued_to:            issuedTo,
      issued_by:            user.id,
      verification_method:  verificationMethod,
      valid_from:           validFrom,
      valid_until:          validUntil,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── merchant: my certificates ──
export async function getMyCertificates() {
  const { data, error } = await supabase
    .from('certificates_view')
    .select('*')
    .eq('issued_to', (await supabase.auth.getUser()).data.user?.id)
    .order('issued_at', { ascending: false })
  if (error) throw error
  return data
}

// ── officer: certificates I issued ──
export async function getCertificatesIssuedByMe() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('certificates_view')
    .select('*')
    .eq('issued_by', user.id)
    .order('issued_at', { ascending: false })
  if (error) throw error
  return data
}

// ── public: verify by cert_number (no auth needed) ──
export async function verifyCertificate(certNumber) {
  const { data, error } = await supabase
    .from('certificates_view')
    .select('*')
    .eq('cert_number', certNumber.trim().toUpperCase())
    .single()
  if (error) return null
  return data
}

// ── admin: all certificates ──
export async function getAllCertificates({ district } = {}) {
  let q = supabase
    .from('certificates_view')
    .select('*')
    .order('issued_at', { ascending: false })

  if (district) q = q.eq('instrument_district', district)

  const { data, error } = await q
  if (error) throw error
  return data
}
