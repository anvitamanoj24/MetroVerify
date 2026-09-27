import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
  getMyNotifications, markAsRead, markAllAsRead, dismissNotification,
} from '../services/notifications'

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // initial load
  useEffect(() => {
    getMyNotifications()
      .then(data => { setNotifications(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  // ── real-time subscription ──
  useEffect(() => {
    const channel = supabase
      .channel('notifications-rt')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const unreadCount = notifications.filter(n => !n.is_read).length

  const markRead = async (id) => {
    await markAsRead(id)
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    )
  }

  const markAllRead = async () => {
    await markAllAsRead()
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
  }

  const dismiss = async (id) => {
    await dismissNotification(id)
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markRead,
    markAllRead,
    dismiss,
  }
}
