import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Badge from '../../components/ui/Badge'
import {
  LayoutDashboard, ClipboardList, Scale, Bell, QrCode,
  Calendar, BarChart3, MapPin, User, Clock,
  ChevronLeft, ChevronRight, Truck
} from 'lucide-react'

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

const visits = [
  { id: 'APP-2026-0405', owner: 'Gold Palace Jewellers', instrument: 'Jewellery Balance 200g', address: '12, Bazaar St, Salem', date: 'Sep 29, 2026', time: '10:00 AM', status: 'upcoming', district: 'Salem' },
  { id: 'APP-2026-0395', owner: "Farmers' Market", instrument: 'Platform Scale 100kg', address: 'Ariyamangalam Market, Trichy', date: 'Oct 1, 2026', time: '09:30 AM', status: 'upcoming', district: 'Trichy' },
  { id: 'APP-2026-0301', owner: 'Rajesh General Stores', instrument: 'Electronic Balance', address: 'T. Nagar, Chennai', date: 'Oct 3, 2026', time: '11:00 AM', status: 'upcoming', district: 'Chennai' },
  { id: 'APP-2026-0380', owner: 'City Hospital', instrument: 'Medical Weighing Scale', address: 'Adyar, Chennai', date: 'Oct 5, 2026', time: '02:00 PM', status: 'upcoming', district: 'Chennai' },
  { id: 'APP-2026-0350', owner: 'Chennai Port Trust', instrument: 'Crane Weighbridge', address: 'Royapuram, Chennai', date: 'Sep 25, 2026', time: '09:00 AM', status: 'completed', district: 'Chennai' },
  { id: 'APP-2026-0340', owner: 'Madurai Rice Mill', instrument: 'Industrial Scale 500kg', address: 'Palanganatham, Madurai', date: 'Sep 22, 2026', time: '10:30 AM', status: 'completed', district: 'Madurai' },
]

const days = ['Sep 27', 'Sep 28', 'Sep 29', 'Sep 30', 'Oct 1', 'Oct 2', 'Oct 3']
const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const visitsByDay = {
  'Sep 29': [visits[0]],
  'Oct 1': [visits[1]],
  'Oct 3': [visits[2]],
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Sep 29')
  const upcoming = visits.filter(v => v.status === 'upcoming')
  const completed = visits.filter(v => v.status === 'completed')

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="officer" title="Inspection Schedule">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Inspection Schedule</h2>
          <p className="text-sm text-slate-500 mt-0.5">Physical inspection visits · Chennai Division</p>
        </div>

        {/* Week strip */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Week of Sep 27 – Oct 3, 2026</h3>
            <div className="flex gap-1">
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"><ChevronLeft size={14} /></button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"><ChevronRight size={14} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => {
              const hasVisit = !!visitsByDay[day]
              return (
                <button key={day} onClick={() => setActiveDay(day)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors
                    ${activeDay === day ? 'bg-primary-600 text-white' : 'hover:bg-slate-50 text-slate-600'}`}>
                  <span className="text-[10px] font-medium opacity-70">{dayLabels[i]}</span>
                  <span className="text-sm font-bold">{day.split(' ')[1]}</span>
                  {hasVisit && (
                    <span className={`w-1.5 h-1.5 rounded-full ${activeDay === day ? 'bg-white/70' : 'bg-primary-500'}`} />
                  )}
                </button>
              )
            })}
          </div>

          {visitsByDay[activeDay] ? (
            <div className="mt-4 space-y-2">
              {visitsByDay[activeDay].map(v => (
                <div key={v.id} className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-xl p-3">
                  <Truck size={16} className="text-primary-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{v.instrument}</p>
                    <p className="text-xs text-slate-500">{v.owner} · {v.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary-700">{v.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-slate-400 mt-4 py-3">No visits scheduled for this day</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Upcoming */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">Upcoming Visits</h3>
              <Badge variant="warning">{upcoming.length}</Badge>
            </div>
            <div className="divide-y divide-slate-50">
              {upcoming.map(v => (
                <div key={v.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{v.instrument}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{v.owner}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={10} />{v.date}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} />{v.time}</span>
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin size={10} />{v.address}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">{v.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">Recently Completed</h3>
              <Badge variant="success">{completed.length}</Badge>
            </div>
            <div className="divide-y divide-slate-50">
              {completed.map(v => (
                <div key={v.id} className="px-5 py-3.5 opacity-75">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{v.instrument}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{v.owner}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={10} />{v.date}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{v.district}</span>
                      </div>
                    </div>
                    <Badge variant="success" className="text-[10px]">Done</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
