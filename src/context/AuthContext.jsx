import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

// ── Detect whether real Supabase credentials are configured ──
const SUPABASE_CONFIGURED =
  import.meta.env.VITE_SUPABASE_URL &&
  !import.meta.env.VITE_SUPABASE_URL.includes('your-project-ref') &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_ANON_KEY.includes('your-anon')

// ── Demo user store (in-memory, survives the session) ──
const demoUsers = new Map()

function makeDemoProfile({ email, fullName, role, phone, state, organisation }) {
  return {
    id:           crypto.randomUUID(),
    email,
    full_name:    fullName || email.split('@')[0],
    role:         role || 'merchant',
    phone:        phone || '',
    state:        state || 'Tamil Nadu',
    organisation: organisation || '',
    is_active:    true,
    created_at:   new Date().toISOString(),
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // ── Fetch Supabase profile ────────────────────────────────────
  async function fetchProfile(userId) {
    if (!SUPABASE_CONFIGURED) return
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (!error && data) setProfile(data)
  }

  // ── On mount: restore session ─────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      // Restore demo session from sessionStorage
      const stored = sessionStorage.getItem('demo_profile')
      if (stored) {
        const p = JSON.parse(stored)
        setProfile(p)
        setUser({ id: p.id, email: p.email })
      }
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) await fetchProfile(session.user.id)
        else setProfile(null)
        setLoading(false)
      }
    )
    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sign up ───────────────────────────────────────────────────
  async function signUp({ email, password, fullName, role, phone, state, organisation }) {
    if (!SUPABASE_CONFIGURED) {
      // Demo mode: create a local profile and "log in"
      const p = makeDemoProfile({ email, fullName, role, phone, state, organisation })
      demoUsers.set(email.toLowerCase(), { ...p, password })
      sessionStorage.setItem('demo_profile', JSON.stringify(p))
      setProfile(p)
      setUser({ id: p.id, email: p.email })
      return { user: p }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    })
    if (error) throw error
    if (data.user) {
      await supabase.from('profiles').update({ phone, state, organisation })
        .eq('id', data.user.id)
    }
    return data
  }

  // ── Sign in ───────────────────────────────────────────────────
  async function signIn({ email, password, role }) {
    if (!SUPABASE_CONFIGURED) {
      // Demo mode: look up stored user OR auto-create one
      const key = email?.toLowerCase() || 'demo@metroverify.gov.in'
      let p = demoUsers.get(key)
      if (!p) {
        // Auto-create a demo profile so login always works without registration
        p = makeDemoProfile({
          email: key,
          fullName: key.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          role: role || 'merchant',
        })
        demoUsers.set(key, p)
      }
      sessionStorage.setItem('demo_profile', JSON.stringify(p))
      setProfile(p)
      setUser({ id: p.id, email: p.email })
      return { user: p }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  // ── Sign out ──────────────────────────────────────────────────
  async function logout() {
    if (!SUPABASE_CONFIGURED) {
      sessionStorage.removeItem('demo_profile')
      setUser(null)
      setProfile(null)
      return
    }
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    role:  profile?.role ?? null,
    name:  profile?.full_name ?? user?.email ?? 'User',
    isDemoMode: !SUPABASE_CONFIGURED,
    signUp,
    signIn,
    login: signIn,
    logout,
    refreshProfile: () => user && fetchProfile(user.id),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
