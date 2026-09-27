import { supabase } from '../lib/supabase'

// ── fetch all instruments owned by the logged-in merchant ──
export async function getMyInstruments() {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// ── fetch a single instrument by id ──
export async function getInstrument(id) {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// ── create a new instrument ──
export async function createInstrument(payload) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('instruments')
    .insert({ ...payload, owner_id: user.id })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── update instrument ──
export async function updateInstrument(id, payload) {
  const { data, error } = await supabase
    .from('instruments')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── all instruments (admin / officer view) ──
export async function getAllInstruments({ state, district, status } = {}) {
  let q = supabase
    .from('instruments')
    .select('*, profiles(full_name, organisation, email)')
    .order('created_at', { ascending: false })

  if (state)    q = q.eq('state', state)
  if (district) q = q.eq('district', district)
  if (status)   q = q.eq('status', status)

  const { data, error } = await q
  if (error) throw error
  return data
}
