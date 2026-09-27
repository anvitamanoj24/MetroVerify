import { supabase } from '../lib/supabase'

const BUCKET = 'evidence'

// ── upload a file to Supabase Storage ──
export async function uploadEvidence(applicationId, file, fileType) {
  const { data: { user } } = await supabase.auth.getUser()
  const ext  = file.name.split('.').pop()
  const path = `${user.id}/${applicationId}/${fileType}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
  if (uploadError) throw uploadError

  // get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path)

  // record in DB
  const { data, error } = await supabase
    .from('evidence')
    .insert({
      application_id: applicationId,
      file_name:      file.name,
      file_type:      fileType,      // 'photo' | 'video' | 'document'
      storage_path:   path,
      public_url:     publicUrl,
      uploaded_by:    user.id,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── fetch evidence for an application ──
export async function getEvidence(applicationId) {
  const { data, error } = await supabase
    .from('evidence')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// ── delete a file ──
export async function deleteEvidence(id, storagePath) {
  await supabase.storage.from(BUCKET).remove([storagePath])
  const { error } = await supabase
    .from('evidence')
    .delete()
    .eq('id', id)
  if (error) throw error
}
