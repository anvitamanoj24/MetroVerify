import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import { gatcSidebarItems } from './GATCDashboard'
import { ShieldCheck, CheckCircle2, AlertTriangle, Clock, Download } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from 'recharts'

const monthlyData = [
  { month: 'Apr', issued: 30, rejected: 3 },
  { month: 'May', issued: 36, rejected: 2 },
  { month: 'Jun', issued: 28, rejected: 4 },
  { month: 'Jul', issued: 40, rejected: 1 },
  { month: 'Aug', issued: 35, rejected: 3 },
  { month: 'Sep', issued: 38, rejected: 2 },
]

const turnaround = [
  { week: 'W1', hrs: 26 }, { week: 'W2', hrs: 31 },
  { week: 'W3', hrs: 22 }, { week: 'W4', hrs: 28 },
]

export default function GATCReports() {
  return (
    <DashboardLayout sidebarItems={gatcSidebarItems} role="gatc" title="Reports">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Centre Reports</h2>
            <p className="text-sm text-slate-500 mt-0.5">GATC Chennai &nbsp;·&nbsp; Last 6 months</p>
          </div>
          <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-50">
            <Download size={15} /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Inspections"   value="207" icon={ShieldCheck}  color="primary" trend={8}  trendLabel="vs last period" />
          <StatCard label="Certificates Issued" value="193" icon={CheckCircle2} color="accent"  trend={6}  trendLabel="vs last period" />
          <StatCard label="Rejection Rate"       value="6.8%" icon={AlertTriangle} color="warning" />
          <StatCard label="Avg Turnaround"       value="27 hrs" icon={Clock}       color="sky" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-1">Monthly Inspections</h3>
            <p className="text-xs text-slate-400 mb-4">Issued vs Rejected</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="issued" fill="#10b981" radius={[3,3,0,0]} name="Issued" />
                <Bar dataKey="rejected" fill="#ef4444" radius={[3,3,0,0]} name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-1">Average Turnaround (hrs)</h3>
            <p className="text-xs text-slate-400 mb-4">Inspection to certificate issuance</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={turnaround}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="hrs" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} name="Hours" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
