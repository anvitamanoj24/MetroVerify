import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // Supabase auth user
  const [profile, setProfile] = useState(null)   // our profiles row
  const [loading, setLoading] = useState(true)

  // ── fetch profile row from public.profiles ──
  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (!error && data) setProfile(data)
  }

  // ── listen for auth state changes ──
  useEffect(() => {
    // get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    // subscribe to future changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  // ── sign up ──
  async function signUp({ email, password, fullName, role, phone, state, organisation }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },   // picked up by handle_new_user trigger
      },
    })
    if (error) throw error

    // Update the rest of the profile fields the trigger doesn't set
    if (data.user) {
      await supabase.from('profiles').update({
        phone, state, organisation,
      }).eq('id', data.user.id)
    }
    return data
  }

  // ── sign in ──
  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  // ── sign out ──
  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  // ── convenience helpers consumed by components ──
  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    // expose role from profile (falls back gracefully)
    role: profile?.role ?? null,
    // legacy shim – some pages still read user.name / user.role
    name: profile?.full_name ?? user?.email ?? 'User',
    signUp,
    signIn,
    login: signIn,   // alias kept for backward compat
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
