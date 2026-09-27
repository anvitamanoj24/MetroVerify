import { useState, useEffect, useCallback } from 'react'
import { getMyInstruments, getAllInstruments, createInstrument, updateInstrument } from '../services/instruments'

// ── Merchant: own instruments ──
export function useMyInstruments() {
  const [instruments, setInstruments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMyInstruments()
      setInstruments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { instruments, loading, error, reload: load }
}

// ── Admin/Officer: all instruments ──
export function useAllInstruments(filters = {}) {
  const [instruments, setInstruments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllInstruments(filters)
      setInstruments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { load() }, [load])

  const create = async (payload) => {
    const item = await createInstrument(payload)
    setInstruments(prev => [item, ...prev])
    return item
  }

  const update = async (id, payload) => {
    const item = await updateInstrument(id, payload)
    setInstruments(prev => prev.map(i => i.id === id ? item : i))
    return item
  }

  return { instruments, loading, error, reload: load, create, update }
}
