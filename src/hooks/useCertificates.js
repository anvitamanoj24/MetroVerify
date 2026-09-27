import { useState, useEffect, useCallback } from 'react'
import {
  getMyCertificates, getCertificatesIssuedByMe,
  getAllCertificates, verifyCertificate, issueCertificate,
} from '../services/certificates'

// ── Merchant: own certs ──
export function useMyCertificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    getMyCertificates()
      .then(data => { setCertificates(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  return { certificates, loading, error }
}

// ── Officer: certs I issued ──
export function useIssuedCertificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    getCertificatesIssuedByMe()
      .then(data => { setCertificates(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  return { certificates, loading, error }
}

// ── Admin: all certs ──
export function useAllCertificates(filters = {}) {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAllCertificates(filters)
      setCertificates(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { load() }, [load])

  return { certificates, loading, error, reload: load }
}

// ── Public: verify ──
export function useVerifyCertificate(certNumber) {
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const verify = useCallback(async (num) => {
    if (!num?.trim()) return
    setLoading(true)
    setNotFound(false)
    setCertificate(null)
    const data = await verifyCertificate(num)
    if (data) setCertificate(data)
    else setNotFound(true)
    setLoading(false)
  }, [])

  return { certificate, loading, notFound, verify }
}
