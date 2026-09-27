import { useState, useEffect, useCallback } from 'react'
import {
  getMyApplications, getApplicationQueue, getApplication,
  getAllApplications, submitApplication, updateApplicationStatus,
} from '../services/applications'

// ── Merchant: own applications ──
export function useMyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMyApplications()
      setApplications(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const submit = async (payload) => {
    const app = await submitApplication(payload)
    setApplications(prev => [app, ...prev])
    return app
  }

  return { applications, loading, error, reload: load, submit }
}

// ── Officer: pending queue ──
export function useApplicationQueue(type = 'all') {
  const [queue, setQueue]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getApplicationQueue({ type: type === 'all' ? undefined : type })
      setQueue(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [type])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id, payload) => {
    const updated = await updateApplicationStatus(id, payload)
    setQueue(prev => prev.filter(a => a.id !== id || !['approved','rejected'].includes(updated.status)))
    return updated
  }

  return { queue, loading, error, reload: load, updateStatus }
}

// ── Single application ──
export function useApplication(id) {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getApplication(id)
      .then(data => { setApplication(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [id])

  return { application, loading, error }
}

// ── Admin: all applications ──
export function useAllApplications(filters = {}) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllApplications(filters)
      setApplications(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { load() }, [load])

  return { applications, loading, error, reload: load }
}
