import { Link } from 'react-router-dom'
import {
  Scale, ShieldCheck, QrCode, Smartphone, BarChart3,
  ArrowRight, CheckCircle2, Clock, Globe, ChevronRight,
  Building2, Users, Award, FileText, Search, Bell,
  MapPin, Lock, Layers
} from 'lucide-react'

const portalCards = [
  {
    icon: Users,
    role: 'Owner / Merchant',
    desc: 'Register instruments, submit verification applications and track compliance status online.',
    to: '/login',
    accent: 'bg-blue-50 border-blue-200 text-blue-700',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Award,
    role: 'Legal Metrology Officer',
    desc: 'Review submitted applications, conduct inspections and issue digital certificates.',
    to: '/login',
    accent: 'bg-slate-50 border-slate-200 text-slate-700',
    iconBg: 'bg-slate-100',
  },
  {
    icon: Building2,
    role: 'Govt. Approved Test Centre',
    desc: 'Manage centre operations, inspection scheduling and compliance documentation.',
    to: '/login',
    accent: 'bg-teal-50 border-teal-200 text-teal-700',
    iconBg: 'bg-teal-100',
  },
  {
    icon: BarChart3,
    role: 'State Administrator',
    desc: 'Monitor jurisdiction-wide compliance, pendency and enforcement activities.',
    to: '/login',
    accent: 'bg-violet-50 border-violet-200 text-violet-700',
    iconBg: 'bg-violet-100',
  },
]

const features = [
  {
    icon: FileText,
    title: 'Online Application & Workflow',
    desc: 'Submit and track verification applications entirely online. No physical paperwork required at any stage of the process.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: QrCode,
    title: 'Digital Verification Certificate',
    desc: 'Receive a cryptographically signed certificate with a unique QR code. Validity and identity are verifiable by any citizen instantly.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Layers,
    title: 'Instrument Digital Passport',
    desc: 'Every registered instrument maintains a permanent digital record of its complete verification history, ownership and evidence.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Smartphone,
    title: 'Field Officer Mobile App',
    desc: 'Officers conduct and record physical inspections via mobile with offline support. Data synchronises automatically on connectivity.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Bell,
    title: 'Automated Expiry Alerts',
    desc: 'Instrument owners and officers receive timely SMS and email reminders before verification validity lapses, reducing non-compliance.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Globe,
    title: 'Cross-State Traceability',
    desc: 'Instruments are tracked throughout their lifecycle across jurisdictions, providing regulators a unified national view of compliance.',
    color: 'bg-sky-50 text-sky-600',
  },
]

const workflow = [
  { n: '01', title: 'Register & Apply', desc: 'Create an account, register your instrument and submit an application for verification online.' },
  { n: '02', title: 'Submit Evidence', desc: 'Upload guided inspection photographs and supporting documents through the secure portal.' },
  { n: '03', title: 'Officer Review', desc: 'A Legal Metrology Officer reviews the application, evidence and instrument details.' },
  { n: '04', title: 'Certificate Issued', desc: 'A digitally signed certificate with QR code is generated and dispatched to the owner instantly.' },
]

const stats = [
  { value: '2.4M+', label: 'Instruments Registered' },
  { value: '36', label: 'States & UTs Covered' },
  { value: '98.2%', label: 'Digital Processing Rate' },
  { value: '<48 hrs', label: 'Average Turnaround Time' },
]

const useCases = [
  'Petrol pump dispensers & EV charging equipment',
  'Retail & grocery weighing scales',
  'Jewellery & bullion weighing instruments',
  'Agricultural market weighbridges',
  'Logistics & freight weighing systems',
  'Healthcare measuring instruments',
  'Industrial platform scales',
  'Taxi meters & fare meters',
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Scale size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900 tracking-tight">MetroVerify</p>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">LEGAL METROLOGY PORTAL</p>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7 text-sm text-slate-500 font-medium">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#portals" className="hover:text-blue-600 transition-colors">Portals</a>
            <a href="#verify" className="hover:text-blue-600 transition-colors">Verify Certificate</a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/login"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors px-2 py-1.5 hidden sm:block">
              Sign In
            </Link>
            <Link to="/register"
              className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Government Banner ── */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <p className="text-xs text-blue-700 font-medium">
            Government of India &nbsp;·&nbsp; Department of Consumer Affairs &nbsp;·&nbsp; Legal Metrology Division
          </p>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-blue-600">
            <Lock size={11} />
            <span>Secure Government Portal</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-700 mb-7 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              Legal Metrology Act, 2009 &nbsp;·&nbsp; Department of Consumer Affairs, India
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-5">
              Unified Digital Platform for<br />
              <span className="text-blue-600">Weighing &amp; Measuring</span><br />
              Instrument Verification
            </h1>
            <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto mb-9">
              A centralised, secure web-based system for online registration, verification scheduling, digital certification and lifecycle management of weighing and measuring instruments under the Legal Metrology Act, 2009.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm">
                Register as Owner / Merchant <ArrowRight size={15} />
              </Link>
              <a href="#verify"
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                <QrCode size={15} /> Verify a Certificate
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {stats.map(s => (
              <div key={s.label} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-blue-600">{s.value}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portal Cards ── */}
      <section id="portals" className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Stakeholder Portals</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Who Uses This Platform?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portalCards.map(card => (
              <div key={card.role} className={`border rounded-2xl p-5 bg-white hover:shadow-md transition-shadow`}>
                <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-4`}>
                  <card.icon size={19} className={card.accent.split(' ')[2]} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{card.role}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{card.desc}</p>
                <Link to={card.to}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Access Portal <ChevronRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Platform Capabilities</p>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Key Features</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Designed to digitise every step of the Legal Metrology verification process — from application submission to certificate issuance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon size={18} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section id="workflow" className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Process Overview</p>
            <h2 className="text-2xl font-extrabold text-slate-900">How Verification Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connector line desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-slate-200" />
            {workflow.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex flex-col items-center justify-center mb-5 relative z-10 shadow-sm">
                  <span className="text-xs font-bold text-blue-400 leading-none">{s.n}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QR Verify ── */}
      <section id="verify" className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <ShieldCheck size={26} className="text-blue-600" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Public Certificate Verification</p>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Verify an Instrument Certificate</h2>
          <p className="text-sm text-slate-500 mb-7 leading-relaxed">
            Any citizen, regulator or business can instantly verify the authenticity and validity of any instrument's certificate by entering the certificate number below.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Certificate No. e.g. MV-2026-TN-004521"
                className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white placeholder:text-slate-400 font-mono placeholder:font-sans"
              />
            </div>
            <Link to="/verify"
              className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
              Verify
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            You can also scan the QR code printed on the physical verification stamp or digital certificate.
          </p>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Scope of Application</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Covered Instrument Categories</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {useCases.map(u => (
              <div key={u} className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                <CheckCircle2 size={14} className="text-teal-500 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-600 font-medium leading-snug">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Banner ── */}
      <section className="py-14 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xl font-extrabold text-white mb-2">Ready to Digitise Your Compliance?</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Register on the platform and submit your first verification application online. The process is fully paperless.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
              Register Now <ArrowRight size={14} />
            </Link>
            <Link to="/login"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Scale size={14} className="text-white" />
                </div>
                <span className="font-bold text-white">MetroVerify</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A digital verification and certification platform for weighing &amp; measuring instruments under the Legal Metrology Act, 2009.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Links</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Register', to: '/register' },
                  { label: 'Sign In', to: '/login' },
                  { label: 'Verify Certificate', to: '/verify' },
                ].map(l => (
                  <Link key={l.label} to={l.to} className="text-xs text-slate-400 hover:text-white transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Legal &amp; Policy</p>
              <div className="flex flex-col gap-2">
                {['Privacy Policy', 'Terms of Use', 'Accessibility Statement', 'Help & Support'].map(l => (
                  <a key={l} href="#" className="text-xs text-slate-400 hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500 text-center sm:text-left">
              © 2026 Department of Consumer Affairs, Government of India. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span>Legal Metrology Act, 2009</span>
              <span>·</span>
              <span>Ministry of Consumer Affairs, Food &amp; Public Distribution</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
