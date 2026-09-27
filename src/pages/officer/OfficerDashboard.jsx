import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  CheckCircle2, AlertTriangle, Clock, Eye,
  ArrowUpRight, MapPin, User, Calendar,
  Truck, BarChart3, ShieldCheck, FileSearch
} from 'lucide-react'

const sidebarItems = [
  { label: 'Main', links: [
    { to: '/officer',             label: 'Dashboard',          icon: LayoutDashboard },
    { to: '/officer/queue',       label: 'Application Queue',  icon: ClipboardList, badge: '8' },
    { to: '/officer/schedule',    label: 'Inspection Schedule',icon: Calendar },
    { to: '/officer/instruments', label: 'Instruments',        icon: Scale },
  ]},
  { label: 'Certificates', links: [
    { to: '/officer/issued',        label: 'Issued Certificates',icon: QrCode },
    { to: '/officer/analytics',     label: 'Analytics',          icon: BarChart3 },
    { to: '/officer/notifications', label: 'Notifications',      icon: Bell, badge: '2' },
  ]},
]

const recentApps = [
  { id: 'APP-2026-0412', owner: 'Rajesh Kumar',  instrument: 'Counter Scale 5kg',  type: 'digital',   priority: 'high',   received: '2h ago',  district: 'Chennai',     evidenceScore: 92 },
  { id: 'APP-2026-0418', owner: 'Meena Textiles',instrument: 'Platform Weighbridge',type: 'digital',   priority: 'medium', received: '4h ago',  district: 'Coimbatore',  evidenceScore: 78 },
  { id: 'APP-2026-0405', owner: 'Gold Palace Jwlrs',instrument: 'Jewellery Balance',type: 'physical',  priority: 'low',    received: '1d ago',  district: 'Salem',       evidenceScore: null },
  { id: 'APP-2026-0399', owner: 'HP Petrol Pump',instrument: 'Fuel Dispenser',     type: 'digital',   priority: 'high',   received: '1d ago',  district: 'Madurai',     evidenceScore: 55 },
]

const priorityMap = {
  high:   { label: 'High',   variant: 'danger'  },
  medium: { label: 'Medium', variant: 'warning' },
  low:    { label: 'Low',    variant: 'neutral' },
}

export default function OfficerDashboard() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Dashboard">
      <div className="max-w-6xl mx-auto space-y-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">Officer Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">Tamil Nadu Legal Metrology Department &nbsp;·&nbsp; Chennai Division</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pending Review"    value="8"  icon={Clock}        color="warning" sub="Applications" />
          <StatCard label="Reviewed Today"    value="5"  icon={CheckCircle2} color="accent"  trend={12} trendLabel="vs yesterday" />
          <StatCard label="Escalated"         value="2"  icon={AlertTriangle}color="danger" />
          <StatCard label="Issued This Month" value="47" icon={ShieldCheck}  color="primary" trend={8}  trendLabel="vs last month" />
        </div>

        {/* Evidence pending notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <FileSearch size={20} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-800 text-sm">Evidence Review Pending</p>
            <p className="text-xs text-slate-500 mt-0.5">
              3 digital applications have submitted inspection evidence and are awaiting officer review. Application APP-2026-0399 requires careful verification — evidence quality is low.
            </p>
          </div>
          <Link to="/officer/queue"
            className="text-xs font-semibold text-blue-700 border border-blue-300 bg-white px-3 py-1.5 rounded-lg hover:bg-blue-50 whitespace-nowrap transition-colors">
            Open Queue
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Recent Applications</h3>
            <Link to="/officer/queue" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              View full queue <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-slate-50">
            {recentApps.map((app) => (
              <div key={app.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                  ${app.type === 'digital' ? 'bg-blue-50' : 'bg-slate-100'}`}>
                  {app.type === 'digital'
                    ? <FileSearch size={16} className="text-blue-600" />
                    : <Truck size={16} className="text-slate-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{app.instrument}</span>
                    <Badge variant={priorityMap[app.priority].variant} className="text-[10px]">
                      {priorityMap[app.priority].label}
                    </Badge>
                    {app.evidenceScore !== null && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold
                        ${app.evidenceScore >= 80 ? 'bg-teal-50 text-teal-700'
                        : app.evidenceScore >= 65 ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-600'}`}>
                        Evidence: {app.evidenceScore}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-slate-400 flex items-center gap-1"><User size={10} />{app.owner}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{app.district}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} />{app.received}</span>
                  </div>
                </div>
                <Link to={`/officer/review/${app.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors shrink-0">
                  <Eye size={13} /> Review
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled inspections */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Upcoming Physical Inspections</h3>
            <Link to="/officer/schedule" className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              View calendar <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { id: 'APP-2026-0405', owner: 'Gold Palace Jewellers', location: 'Salem',  instrument: 'Jewellery Balance',  date: 'Sep 29, 2026', time: '10:00 AM' },
              { id: 'APP-2026-0395', owner: "Farmers' Market",       location: 'Trichy', instrument: 'Platform Scale 100kg',date: 'Oct 1, 2026',  time: '09:30 AM' },
            ].map((v) => (
              <div key={v.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{v.instrument}</p>
                  <p className="text-xs text-slate-400">{v.owner} &nbsp;·&nbsp; {v.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-700">{v.date}</p>
                  <p className="text-xs text-slate-400">{v.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}
