import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  Calendar, BarChart3, CheckCircle2, Clock, AlertTriangle, ShieldCheck
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from 'recharts'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/officer', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/queue', label: 'Review Queue', icon: ClipboardList, badge: '8' },
    { to: '/officer/schedule', label: 'Schedule', icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments', icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued', label: 'Issued Certificates', icon: QrCode },
    { to: '/officer/notifications', label: 'Notifications', icon: Bell, badge: '2' },
    { to: '/officer/analytics', label: 'Analytics', icon: BarChart3 },
  ]},
]

const monthlyData = [
  { month: 'Apr', issued: 38, escalated: 5, rejected: 2 },
  { month: 'May', issued: 42, escalated: 4, rejected: 3 },
  { month: 'Jun', issued: 35, escalated: 7, rejected: 1 },
  { month: 'Jul', issued: 50, escalated: 3, rejected: 2 },
  { month: 'Aug', issued: 44, escalated: 6, rejected: 4 },
  { month: 'Sep', issued: 47, escalated: 4, rejected: 1 },
]

const turnaroundData = [
  { week: 'W1', digital: 22, physical: 118 },
  { week: 'W2', digital: 28, physical: 132 },
  { week: 'W3', digital: 19, physical: 95 },
  { week: 'W4', digital: 31, physical: 140 },
]

export default function OfficerAnalytics() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="My Analytics">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">My Performance Analytics</h2>
          <p className="text-sm text-slate-500 mt-0.5">Insp. Priya Sharma · Chennai Division · Last 6 months</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Certificates Issued" value="256" icon={ShieldCheck} color="accent" trend={9} trendLabel="vs last period" />
          <StatCard label="Avg Review Time" value="4.2h" icon={Clock} color="primary" trend={-15} trendLabel="faster" />
          <StatCard label="Escalated" value="29" icon={AlertTriangle} color="warning" />
          <StatCard label="Approval Rate" value="91%" icon={CheckCircle2} color="accent" trend={2} trendLabel="vs last period" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-1">Monthly Certificate Activity</h3>
            <p className="text-xs text-slate-400 mb-4">Issued · Escalated · Rejected</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="issued" fill="#10b981" radius={[3, 3, 0, 0]} name="Issued" />
                <Bar dataKey="escalated" fill="#f59e0b" radius={[3, 3, 0, 0]} name="Escalated" />
                <Bar dataKey="rejected" fill="#ef4444" radius={[3, 3, 0, 0]} name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-1">Average Turnaround Time (hrs)</h3>
            <p className="text-xs text-slate-400 mb-4">Digital vs Physical by week</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={turnaroundData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="digital" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} name="Digital" />
                <Line type="monotone" dataKey="physical" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} name="Physical" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Instrument Type Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Counter Scales', count: 88, pct: 34 },
              { type: 'Weighbridges', count: 52, pct: 20 },
              { type: 'Fuel Dispensers', count: 44, pct: 17 },
              { type: 'Balances', count: 38, pct: 15 },
              { type: 'Medical Scales', count: 20, pct: 8 },
              { type: 'Others', count: 14, pct: 6 },
            ].map(item => (
              <div key={item.type} className="bg-slate-50 rounded-xl p-3">
                <p className="text-lg font-extrabold text-slate-800">{item.count}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.type}</p>
                <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.pct * 2}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{item.pct}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
