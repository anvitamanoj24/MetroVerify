import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Scale, User, Mail, Lock, Building2, Phone, MapPin,
  CheckCircle2, ArrowRight, ArrowLeft, AlertCircle
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const roles = [
  { id: 'merchant', label: 'Owner / Merchant',  desc: 'Register instruments, apply for verification',  icon: User },
  { id: 'officer',  label: 'LMO Officer',        desc: 'Review applications, issue certificates',        icon: Building2 },
  { id: 'gatc',     label: 'GATC',               desc: 'Government Approved Test Centre',                icon: Building2 },
]

const states = [
  'Andhra Pradesh','Delhi','Gujarat','Karnataka','Kerala',
  'Maharashtra','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','West Bengal',
]

export default function Register() {
  const [step, setStep]             = useState(1)
  const [selectedRole, setSelectedRole] = useState('')
  const [form, setForm]             = useState({
    name: '', email: '', phone: '', state: '', org: '', password: '', confirmPassword: '',
  })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()
  const navigate   = useNavigate()

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await signUp({
        email:        form.email,
        password:     form.password,
        fullName:     form.name,
        role:         selectedRole,
        phone:        form.phone,
        state:        form.state,
        organisation: form.org,
      })
      const routes = { merchant: '/merchant', officer: '/officer', gatc: '/gatc', admin: '/admin' }
      navigate(routes[selectedRole] || '/merchant')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Scale size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">MetroVerify — Legal Metrology Portal</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-7">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {step > s ? <CheckCircle2 size={14} /> : s}
              </div>
              <span className={`text-xs font-medium ${step >= s ? 'text-blue-600' : 'text-slate-400'}`}>
                {s === 1 ? 'Select Role' : 'Your Details'}
              </span>
              {s < 2 && <div className={`w-16 h-px ${step > s ? 'bg-blue-400' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
          {/* ── Step 1 ── */}
          {step === 1 && (
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-5">I am registering as a…</h2>
              <div className="flex flex-col gap-3 mb-7">
                {roles.map(r => (
                  <button key={r.id} type="button" onClick={() => setSelectedRole(r.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                      ${selectedRole === r.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                      ${selectedRole === r.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      <r.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{r.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                    </div>
                    {selectedRole === r.id && (
                      <CheckCircle2 size={18} className="text-blue-600 ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <button disabled={!selectedRole} onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl flex items-center
                  justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <button type="button" onClick={() => setStep(1)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 mb-1 w-fit">
                <ArrowLeft size={13} /> Back
              </button>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle size={15} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.name} onChange={set('name')} placeholder="Rajesh Kumar" required
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select value={form.state} onChange={set('state')} required
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-800">
                      <option value="">Select state</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Organisation</label>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.org} onChange={set('org')} placeholder="Business / Dept. name"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={form.password} onChange={set('password')}
                      placeholder="Min. 8 characters" required
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')}
                      placeholder="Repeat password" required
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl flex items-center
                  justify-center gap-2 hover:bg-blue-700 transition-colors mt-2
                  disabled:opacity-60 disabled:cursor-not-allowed">
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Create Account</span><ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>

        <p className="text-sm text-slate-500 mt-5 text-center">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
