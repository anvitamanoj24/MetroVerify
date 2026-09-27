import { supabase } from '../lib/supabase'

// ── fetch my notifications ──
export async function getMyNotifications() {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// ── mark single notification as read ──
export async function markAsRead(id) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
  if (error) throw error
}

// ── mark all as read ──
export async function markAllAsRead() {
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)
  if (error) throw error
}

// ── delete / dismiss notification ──
export async function dismissNotification(id) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── send a notification (officer/admin use) ──
export async function sendNotification({ userId, type, title, body, actionLabel, actionUrl }) {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id:      userId,
      type,
      title,
      body,
      action_label: actionLabel,
      action_url:   actionUrl,
    })
    .select()
    .single()
  if (error) throw error
  return data
}
