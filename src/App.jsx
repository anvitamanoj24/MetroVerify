import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// Public
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyPublic from './pages/VerifyPublic'

// Merchant
import MerchantDashboard from './pages/merchant/MerchantDashboard'
import ApplyVerification from './pages/merchant/ApplyVerification'
import MyInstruments from './pages/merchant/MyInstruments'
import Applications from './pages/merchant/Applications'
import History from './pages/merchant/History'

// Officer (LMO)
import OfficerDashboard from './pages/officer/OfficerDashboard'
import OfficerQueue from './pages/officer/OfficerQueue'
import ReviewApplication from './pages/officer/ReviewApplication'
import Schedule from './pages/officer/Schedule'
import IssuedCertificates from './pages/officer/IssuedCertificates'
import OfficerAnalytics from './pages/officer/OfficerAnalytics'
import OfficerInstruments from './pages/officer/OfficerInstruments'

// GATC
import GATCDashboard from './pages/gatc/GATCDashboard'
import GATCQueue from './pages/gatc/GATCQueue'
import GATCReview from './pages/gatc/GATCReview'
import GATCReports from './pages/gatc/GATCReports'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'
import AllInstruments from './pages/admin/AllInstruments'
import UsersOfficers from './pages/admin/UsersOfficers'
import AdminCertificates from './pages/admin/AdminCertificates'
import Enforcement from './pages/admin/Enforcement'
import JurisdictionMap from './pages/admin/JurisdictionMap'
import AdminSettings from './pages/admin/AdminSettings'

// Shared
import InstrumentPassport from './pages/passport/InstrumentPassport'
import DigitalCertificate from './pages/certificate/DigitalCertificate'
import Notifications from './pages/Notifications'

// ── Route guard ──
function ProtectedRoute({ children, roles }) {
  const { user, profile, loading } = useAuth()

  // Still loading session / profile — show nothing to avoid flash
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  // If roles specified, enforce them once profile has loaded
  if (roles && profile && !roles.includes(profile.role)) {
    const home = { merchant: '/merchant', officer: '/officer', gatc: '/gatc', admin: '/admin' }
    return <Navigate to={home[profile.role] || '/'} replace />
  }

  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public ── */}
          <Route path="/"         element={<Landing />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify"   element={<VerifyPublic />} />
          <Route path="/passport/:id" element={<InstrumentPassport />} />

          {/* ── Merchant ── */}
          <Route path="/merchant"                  element={<ProtectedRoute roles={['merchant']}><MerchantDashboard /></ProtectedRoute>} />
          <Route path="/merchant/apply"            element={<ProtectedRoute roles={['merchant']}><ApplyVerification /></ProtectedRoute>} />
          <Route path="/merchant/instruments"      element={<ProtectedRoute roles={['merchant']}><MyInstruments /></ProtectedRoute>} />
          <Route path="/merchant/applications"     element={<ProtectedRoute roles={['merchant']}><Applications /></ProtectedRoute>} />
          <Route path="/merchant/history"          element={<ProtectedRoute roles={['merchant']}><History /></ProtectedRoute>} />
          <Route path="/merchant/certificates"     element={<ProtectedRoute roles={['merchant']}><DigitalCertificate /></ProtectedRoute>} />
          <Route path="/merchant/certificates/:id" element={<ProtectedRoute roles={['merchant']}><DigitalCertificate /></ProtectedRoute>} />
          <Route path="/merchant/notifications"    element={<ProtectedRoute roles={['merchant']}><Notifications /></ProtectedRoute>} />

          {/* ── LMO Officer ── */}
          <Route path="/officer"                     element={<ProtectedRoute roles={['officer']}><OfficerDashboard /></ProtectedRoute>} />
          <Route path="/officer/queue"               element={<ProtectedRoute roles={['officer']}><OfficerQueue /></ProtectedRoute>} />
          <Route path="/officer/review/:id"          element={<ProtectedRoute roles={['officer']}><ReviewApplication /></ProtectedRoute>} />
          <Route path="/officer/schedule"            element={<ProtectedRoute roles={['officer']}><Schedule /></ProtectedRoute>} />
          <Route path="/officer/instruments"         element={<ProtectedRoute roles={['officer']}><OfficerInstruments /></ProtectedRoute>} />
          <Route path="/officer/issued"              element={<ProtectedRoute roles={['officer']}><IssuedCertificates /></ProtectedRoute>} />
          <Route path="/officer/certificate/preview" element={<ProtectedRoute roles={['officer']}><DigitalCertificate /></ProtectedRoute>} />
          <Route path="/officer/analytics"           element={<ProtectedRoute roles={['officer']}><OfficerAnalytics /></ProtectedRoute>} />
          <Route path="/officer/notifications"       element={<ProtectedRoute roles={['officer']}><Notifications /></ProtectedRoute>} />

          {/* ── GATC ── */}
          <Route path="/gatc"               element={<ProtectedRoute roles={['gatc']}><GATCDashboard /></ProtectedRoute>} />
          <Route path="/gatc/queue"         element={<ProtectedRoute roles={['gatc']}><GATCQueue /></ProtectedRoute>} />
          <Route path="/gatc/review/:id"    element={<ProtectedRoute roles={['gatc']}><GATCReview /></ProtectedRoute>} />
          <Route path="/gatc/schedule"      element={<ProtectedRoute roles={['gatc']}><Schedule /></ProtectedRoute>} />
          <Route path="/gatc/instruments"   element={<ProtectedRoute roles={['gatc']}><OfficerInstruments /></ProtectedRoute>} />
          <Route path="/gatc/issued"        element={<ProtectedRoute roles={['gatc']}><IssuedCertificates /></ProtectedRoute>} />
          <Route path="/gatc/reports"       element={<ProtectedRoute roles={['gatc']}><GATCReports /></ProtectedRoute>} />
          <Route path="/gatc/notifications" element={<ProtectedRoute roles={['gatc']}><Notifications /></ProtectedRoute>} />

          {/* ── Admin ── */}
          <Route path="/admin"               element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/analytics"     element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/map"           element={<ProtectedRoute roles={['admin']}><JurisdictionMap /></ProtectedRoute>} />
          <Route path="/admin/instruments"   element={<ProtectedRoute roles={['admin']}><AllInstruments /></ProtectedRoute>} />
          <Route path="/admin/users"         element={<ProtectedRoute roles={['admin']}><UsersOfficers /></ProtectedRoute>} />
          <Route path="/admin/certificates"  element={<ProtectedRoute roles={['admin']}><AdminCertificates /></ProtectedRoute>} />
          <Route path="/admin/enforcement"   element={<ProtectedRoute roles={['admin']}><Enforcement /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute roles={['admin']}><Notifications /></ProtectedRoute>} />
          <Route path="/admin/settings"      element={<ProtectedRoute roles={['admin']}><AdminSettings /></ProtectedRoute>} />

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
