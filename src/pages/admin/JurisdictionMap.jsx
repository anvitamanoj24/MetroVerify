import DashboardLayout from '../../components/layout/DashboardLayout'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3, Bell,
  Settings, AlertTriangle, Globe, MapPin, CheckCircle2, Clock
} from 'lucide-react'
import Badge from '../../components/ui/Badge'

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

const districts = [
  { name: 'Chennai', instruments: 312, valid: 290, expiring: 14, expired: 8, officers: 3 },
  { name: 'Coimbatore', instruments: 198, valid: 185, expiring: 10, expired: 3, officers: 2 },
  { name: 'Madurai', instruments: 154, valid: 140, expiring: 9, expired: 5, officers: 2 },
  { name: 'Trichy', instruments: 132, valid: 120, expiring: 8, expired: 4, officers: 1 },
  { name: 'Salem', instruments: 98, valid: 92, expiring: 5, expired: 1, officers: 1 },
  { name: 'Vellore', instruments: 87, valid: 81, expiring: 4, expired: 2, officers: 1 },
  { name: 'Tirunelveli', instruments: 76, valid: 70, expiring: 4, expired: 2, officers: 1 },
  { name: 'Erode', instruments: 65, valid: 61, expiring: 3, expired: 1, officers: 1 },
  { name: 'Thanjavur', instruments: 60, valid: 55, expiring: 3, expired: 2, officers: 1 },
  { name: 'Others', instruments: 218, valid: 198, expiring: 14, expired: 6, officers: 5 },
]

export default function JurisdictionMap() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="Jurisdiction Map">
      <div className="max-w-6xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Jurisdiction Map</h2>
          <p className="text-sm text-slate-500 mt-0.5">Compliance overview across districts · Tamil Nadu</p>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-80 flex items-center justify-center relative">
            {/* Decorative district blobs */}
            <div className="absolute inset-0 overflow-hidden opacity-60">
              {[
                { t: '15%', l: '50%', w: '18%', h: '22%', label: 'Chennai', color: 'bg-accent-400' },
                { t: '38%', l: '20%', w: '16%', h: '18%', label: 'Coimbatore', color: 'bg-primary-400' },
                { t: '55%', l: '45%', w: '15%', h: '16%', label: 'Madurai', color: 'bg-accent-400' },
                { t: '35%', l: '55%', w: '13%', h: '14%', label: 'Trichy', color: 'bg-primary-300' },
                { t: '28%', l: '38%', w: '12%', h: '14%', label: 'Salem', color: 'bg-yellow-400' },
              ].map(d => (
                <div key={d.label} className="absolute flex flex-col items-center"
                  style={{ top: d.t, left: d.l, width: d.w, height: d.h }}>
                  <div className={`w-full h-full ${d.color} rounded-2xl opacity-40`} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <MapPin size={14} className="text-slate-700" />
                    <span className="text-[10px] font-bold text-slate-700 whitespace-nowrap">{d.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative text-center z-10 bg-white/70 backdrop-blur-sm rounded-xl p-4">
              <Globe size={32} className="text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">Interactive Map</p>
              <p className="text-xs text-slate-400">GIS map integration in production deployment</p>
            </div>
          </div>
        </div>

        {/* District table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">District-wise Compliance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['District', 'Total Instruments', 'Valid', 'Expiring', 'Expired', 'Officers', 'Compliance'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 first:pl-5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {districts.map(d => {
                  const pct = Math.round((d.valid / d.instruments) * 100)
                  return (
                    <tr key={d.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 pl-5 py-3 font-semibold text-slate-800 text-xs">{d.name}</td>
                      <td className="px-4 py-3 text-xs font-bold text-slate-700">{d.instruments}</td>
                      <td className="px-4 py-3 text-xs text-accent-600 font-semibold">{d.valid}</td>
                      <td className="px-4 py-3 text-xs text-yellow-600 font-semibold">{d.expiring}</td>
                      <td className="px-4 py-3 text-xs text-red-500 font-semibold">{d.expired}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{d.officers}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${pct >= 90 ? 'bg-accent-500' : pct >= 75 ? 'bg-yellow-400' : 'bg-red-400'}`}
                              style={{ width: `${pct}%` }} />
                          </div>
                          <span className={`text-xs font-semibold ${pct >= 90 ? 'text-accent-600' : pct >= 75 ? 'text-yellow-600' : 'text-red-500'}`}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
