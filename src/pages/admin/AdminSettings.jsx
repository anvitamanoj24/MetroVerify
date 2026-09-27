import DashboardLayout from '../../components/layout/DashboardLayout'
import {
  LayoutDashboard, Scale, Users, ShieldCheck, BarChart3, Bell,
  Settings, AlertTriangle, Globe, Lock, Mail, Smartphone,
  Database, Shield, RefreshCw, Save
} from 'lucide-react'

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

const sections = [
  {
    icon: Bell, title: 'Notification Settings',
    items: [
      { label: 'Send expiry reminder 90 days before', type: 'toggle', value: true },
      { label: 'Send expiry reminder 30 days before', type: 'toggle', value: true },
      { label: 'Send expiry reminder 7 days before', type: 'toggle', value: true },
      { label: 'Email officer on new application', type: 'toggle', value: true },
      { label: 'SMS alerts to merchants', type: 'toggle', value: false },
    ],
  },
  {
    icon: Shield, title: 'AI Analysis Settings',
    items: [
      { label: 'Enable AI video analysis', type: 'toggle', value: true },
      { label: 'Auto-escalate if AI confidence < 60%', type: 'toggle', value: true },
      { label: 'Require officer review for all AI flags', type: 'toggle', value: true },
      { label: 'Min AI confidence threshold (%)', type: 'input', value: '65' },
    ],
  },
  {
    icon: Lock, title: 'Security & Access',
    items: [
      { label: 'Enforce MFA for all officer logins', type: 'toggle', value: true },
      { label: 'Session timeout (minutes)', type: 'input', value: '60' },
      { label: 'Enable audit logging', type: 'toggle', value: true },
      { label: 'IP allowlist for admin access', type: 'toggle', value: false },
    ],
  },
  {
    icon: Database, title: 'Data & Certificates',
    items: [
      { label: 'Certificate validity period (years)', type: 'input', value: '3' },
      { label: 'Auto-archive expired certificates after (days)', type: 'input', value: '365' },
      { label: 'Enable cross-state instrument tracking', type: 'toggle', value: true },
      { label: 'DigiLocker integration', type: 'toggle', value: false },
    ],
  },
]

export default function AdminSettings() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin" title="System Settings">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">System Settings</h2>
            <p className="text-sm text-slate-500 mt-0.5">Configure platform behaviour for Tamil Nadu LMD</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
            <Save size={15} /> Save Changes
          </button>
        </div>

        {sections.map(section => (
          <div key={section.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <section.icon size={16} className="text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-800">{section.title}</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {section.items.map(item => (
                <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  {item.type === 'toggle' ? (
                    <div className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors ${item.value ? 'bg-primary-600' : 'bg-slate-200'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.value ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                  ) : (
                    <input defaultValue={item.value}
                      className="w-24 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-right outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 font-mono" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">System Version</p>
            <p className="text-xs text-slate-400 mt-0.5">MetroVerify v1.0.0 · Legal Metrology Platform · NIC</p>
          </div>
          <button className="flex items-center gap-2 text-xs text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white">
            <RefreshCw size={13} /> Check Updates
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
