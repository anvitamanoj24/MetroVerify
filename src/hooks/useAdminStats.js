import { useState, useEffect } from 'react'
import { getAdminStats, getAllProfiles, getEnforcementCases, getScheduledInspections } from '../services/admin'

export function useAdminStats() {
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    getAdminStats()
      .then(data => { setStats(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  return { stats, loading, error }
}

export function useAllProfiles(role = null) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    getAllProfiles(role)
      .then(data => { setProfiles(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [role])

  return { profiles, loading, error }
}

export function useEnforcementCases(filters = {}) {
  const [cases, setCases]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    getEnforcementCases(filters)
      .then(data => { setCases(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [JSON.stringify(filters)])

  return { cases, loading, error }
}

export function useScheduledInspections(officerId = null) {
  const [inspections, setInspections] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    getScheduledInspections(officerId)
      .then(data => { setInspections(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [officerId])

  return { inspections, loading, error }
}
