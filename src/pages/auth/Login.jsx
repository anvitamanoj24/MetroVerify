import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Scale, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const roles = [
  { id: 'merchant', label: 'Owner / Merchant', color: 'border-primary-500 bg-primary-50', dot: 'bg-primary-500' },
  { id: 'officer', label: 'LMO Officer', color: 'border-slate-500 bg-slate-50', dot: 'bg-slate-500' },
  { id: 'gatc', label: 'GATC', color: 'border-teal-500 bg-teal-50', dot: 'bg-teal-500' },
  { id: 'admin', label: 'Administrator', color: 'border-purple-500 bg-purple-50', dot: 'bg-purple-500' },
]

const demoUsers = {
  merchant: { name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'merchant' },
  officer: { name: 'Insp. Priya Sharma', email: 'priya.lmo@gov.in', role: 'officer' },
  gatc: { name: 'GATC Chennai', email: 'gatc.chn@gov.in', role: 'gatc' },
  admin: { name: 'Admin Kapoor', email: 'admin@lm.gov.in', role: 'admin' },
}

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('merchant')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = demoUsers[selectedRole]
    login(user)
    const routes = { merchant: '/merchant', officer: '/officer', gatc: '/gatc', admin: '/admin' }
    navigate(routes[selectedRole] || '/merchant')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] bg-gradient-to-br from-primary-950 to-primary-800 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <Scale size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg">MetroVerify</span>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-xs mb-8">
            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full"></span>
            Legal Metrology Act 2009
          </div>
          <h2 className="text-3xl font-extrabold leading-tight mb-4">
            Digital Verification for India's Weighing &amp; Measuring Instruments
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Unified platform connecting merchants, officers, GATCs and administrators for seamless compliance under Legal Metrology regulations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { v: '2.4M+', l: 'Instruments Registered' },
            { v: '98%', l: 'Digital Verification' },
            { v: '36', l: 'States Covered' },
            { v: '<48h', l: 'Avg Turnaround' },
          ].map((s) => (
            <div key={s.l} className="bg-white/8 border border-white/10 rounded-xl p-4">
              <p className="text-xl font-bold">{s.v}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Scale size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-slate-800">MetroVerify</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your portal</p>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Sign in as</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-150
                    ${selectedRole === r.id ? r.color : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}
                  `}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${selectedRole === r.id ? r.dot : 'bg-slate-300'}`} />
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-primary-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 mt-2"
            >
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-500">
              <span className="font-semibold">Demo:</span> Select any role above and click Sign In — no credentials needed for this prototype.
            </p>
          </div>

          <p className="text-sm text-slate-500 mt-6 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-medium hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
