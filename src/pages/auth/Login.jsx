import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Scale, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const roles = [
  { id: 'merchant', label: 'Owner / Merchant',      dot: 'bg-blue-500',   border: 'border-blue-400 bg-blue-50'   },
  { id: 'officer',  label: 'LMO Officer',            dot: 'bg-slate-500',  border: 'border-slate-400 bg-slate-50'  },
  { id: 'gatc',     label: 'GATC',                   dot: 'bg-teal-500',   border: 'border-teal-400 bg-teal-50'   },
  { id: 'admin',    label: 'Administrator',           dot: 'bg-violet-500', border: 'border-violet-400 bg-violet-50'},
]

const stats = [
  { v: '2.4M+', l: 'Instruments Registered' },
  { v: '98%',   l: 'Digital Processing Rate' },
  { v: '36',    l: 'States Covered' },
  { v: '<48h',  l: 'Avg Turnaround' },
]

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('merchant')
  const [showPass, setShowPass]         = useState(false)
  const [form, setForm]                 = useState({ email: '', password: '' })
  const [error, setError]               = useState('')
  const [loading, setLoading]           = useState(false)

  const { signIn } = useAuth()
  const navigate   = useNavigate()

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn({ email: form.email, password: form.password, role: selectedRole })
      const routes = { merchant: '/merchant', officer: '/officer', gatc: '/gatc', admin: '/admin' }
      navigate(routes[selectedRole] || '/merchant')
    } catch (err) {
      setError(err.message || 'Sign in failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] bg-gradient-to-br from-blue-950 to-blue-800 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <Scale size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">MetroVerify</p>
            <p className="text-[10px] text-white/50 tracking-widest uppercase">Legal Metrology Portal</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-4">
            Department of Consumer Affairs · Government of India
          </p>
          <h2 className="text-3xl font-extrabold leading-tight mb-4">
            Unified Digital Platform for Weighing &amp; Measuring Instrument Verification
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Secure, centralised system for online registration, verification scheduling,
            digital certification and lifecycle management under the Legal Metrology Act, 2009.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(s => (
            <div key={s.l} className="bg-white/8 border border-white/10 rounded-xl p-4">
              <p className="text-xl font-bold">{s.v}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Scale size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-slate-800">MetroVerify</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-7">Sign in to your portal</p>

          {/* Role hint */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Signing in as</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => (
                <button key={r.id} type="button" onClick={() => setSelectedRole(r.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-medium transition-all
                    ${selectedRole === r.id ? r.border + ' border-2' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${selectedRole === r.id ? r.dot : 'bg-slate-300'}`} />
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <AlertCircle size={15} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" value={form.email} onChange={set('email')} required
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} required
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700
                transition-colors flex items-center justify-center gap-2 mt-1
                disabled:opacity-60 disabled:cursor-not-allowed">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">Register here</Link>
          </p>

          {/* Demo mode hint — shown when Supabase isn't configured */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-xs text-blue-700 text-center">
              <span className="font-semibold">Demo mode:</span> Select any role above and click Sign In —
              no real credentials needed. The app runs fully offline.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
