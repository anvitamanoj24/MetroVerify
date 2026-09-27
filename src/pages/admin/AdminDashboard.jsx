import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3,
  Bell, Settings, AlertTriangle, CheckCircle2, Clock,
  TrendingUp, MapPin, Activity, ArrowUpRight, Zap, Globe
} from 'lucide-react'
import { useAdminStats } from '../../hooks/useAdminStats'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

const sidebarItems = [
  { label: 'Overview', links: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/map', label: 'Jurisdiction Map', icon: Globe },
  ]},
  { label: 'Management', links: [
    { to: '/admin/instruments', label: 'All Instruments', icon: Scale },
    { to: '/admin/users', label: 'Users & Officers', icon: Users },
    { to: '/admin/certificates', label: 'Certificates', icon: ShieldCheck },
    { to: '/admin/enforcement', label: 'Enforcement', icon: AlertTriangle },
  ]},
  { label: 'System', links: [
    { to: '/admin/notifications', label: 'Notifications', icon: Bell, badge: '5' },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ]},
]

const trendData = [
  { month: 'Apr', digital: 120, physical: 80 },
  { month: 'May', digital: 145, physical: 75 },
  { month: 'Jun', digital: 178, physical: 70 },
  { month: 'Jul', digital: 210, physical: 65 },
  { month: 'Aug', digital: 265, physical: 60 },
  { month: 'Sep', digital: 310, physical: 55 },
]

const districtData = [
  { name: 'Chennai', count: 312 },
  { name: 'Coimbatore', count: 198 },
  { name: 'Madurai', count: 154 },
  { name: 'Trichy', count: 132 },
  { name: 'Salem', count: 98 },
  { name: 'Others', count: 340 },
]

const pieData = [
  { name: 'Valid', value: 1842, color: '#10b981' },
  { name: 'Expiring', value: 284, color: '#f59e0b' },
  { name: 'Expired', value: 156, color: '#ef4444' },
  { name: 'Pending', value: 118, color: '#6366f1' },
]

const recentActivity = [
  { id: 'MV-2026-TN-004521', type: 'Certificate Issued', instrument: 'Platform Scale', owner: 'Karthik Stores', officer: 'Insp. Priya S.', time: '12 min ago', status: 'success' },
  { id: 'APP-2026-0419', type: 'Escalated to Physical', instrument: 'Fuel Dispenser', owner: 'HP Station', officer: 'Insp. Raj K.', time: '34 min ago', status: 'warning' },
  { id: 'APP-2026-0417', type: 'Application Rejected', instrument: 'Electronic Balance', owner: 'Lab Equip Co.', officer: 'Insp. Suresh M.', time: '1h ago', status: 'danger' },
  { id: 'MV-2026-TN-004520', type: 'Certificate Issued', instrument: 'Counter Scale', owner: 'Fresh Mart', officer: 'Insp. Priya S.', time: '2h ago', status: 'success' },
  { id: 'APP-2026-0415', type: 'New Application', instrument: 'Weighbridge 50T', owner: 'Port Authority', officer: '—', time: '2h ago', status: 'info' },
]

const statusStyle = { success: 'text-accent-600', warning: 'text-yellow-600', danger: 'text-red-500', info: 'text-primary-600' }

export default function AdminDashboard() {
  const { stats, loading: statsLoading } = useAdminStats()

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="State Administrator Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">State Overview</h2>
            <p className="text-sm text-slate-500 mt-0.5">Tamil Nadu Legal Metrology Department · {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-2 bg-accent-50 border border-accent-200 rounded-xl px-4 py-2">
            <Activity size={14} className="text-accent-600" />
            <span className="text-xs font-semibold text-accent-700">Live · Updated just now</span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Instruments"   value={statsLoading ? '…' : (stats?.totalInstruments ?? 0).toLocaleString()} icon={Scale}        color="primary" />
          <StatCard label="Valid Certificates"  value={statsLoading ? '…' : (stats?.validInstruments ?? 0).toLocaleString()}  icon={CheckCircle2} color="accent" />
          <StatCard label="Pending Applications"value={statsLoading ? '…' : (stats?.pendingApplications ?? 0).toString()}     icon={Clock}        color="warning" />
          <StatCard label="Expired Instruments" value={statsLoading ? '…' : (stats?.expiredInstruments ?? 0).toString()}       icon={AlertTriangle}color="danger" />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Verification trend */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-800">Verification Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">Digital vs Physical · Last 6 months</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-500 inline-block" />Digital</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />Physical</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="digital" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="physical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="digital" stroke="#6366f1" strokeWidth={2} fill="url(#digital)" />
                <Area type="monotone" dataKey="physical" stroke="#94a3b8" strokeWidth={2} fill="url(#physical)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Compliance pie */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-1">Compliance Status</h3>
            <p className="text-xs text-slate-400 mb-4">All registered instruments</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-[11px] text-slate-600">{d.name}: <strong>{d.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District bar + Activity */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-1">By District</h3>
            <p className="text-xs text-slate-400 mb-4">Applications this month</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={districtData} layout="vertical" margin={{ left: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={75} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">Recent Activity</h3>
              <button className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                    a.status === 'success' ? 'bg-accent-500' :
                    a.status === 'warning' ? 'bg-yellow-500' :
                    a.status === 'danger' ? 'bg-red-500' : 'bg-primary-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold ${statusStyle[a.status]}`}>{a.type}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-600">{a.instrument}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{a.owner} · {a.officer}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap mt-0.5">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Digital Verification Rate', value: '72.4%', sub: 'of all applications', color: 'text-primary-600', bg: 'bg-primary-50' },
            { label: 'Avg Turnaround (Digital)', value: '31 hrs', sub: 'vs 7 days physical', color: 'text-accent-600', bg: 'bg-accent-50' },
            { label: 'Anomalies Flagged by AI', value: '34', sub: 'this month', color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'QR Scans (Public)', value: '1,284', sub: 'citizen verifications', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((m) => (
            <div key={m.label} className={`${m.bg} rounded-2xl p-4 border border-white`}>
              <p className={`text-2xl font-extrabold ${m.color}`}>{m.value}</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">{m.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
