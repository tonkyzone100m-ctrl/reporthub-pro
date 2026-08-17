import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

import Home from './pages/Home'
import Report from './pages/Report'
import Track from './pages/Track'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import MyReports from './pages/MyReports'
import Profile from './pages/Profile'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminReports from './pages/admin/AdminReports'
import AdminReportDetails from './pages/admin/AdminReportDetails'
import AdminMap from './pages/admin/AdminMap'
import AdminAIAnalyzer from './pages/admin/AdminAIAnalyzer'
import AdminDepartments from './pages/admin/AdminDepartments'
import AdminUsers from './pages/admin/AdminUsers'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSettings from './pages/admin/AdminSettings'

function NotFound() {
  return (
    <main className="container py-5">
      <div className="text-center">
        <div className="display-1 fw-bold text-primary">
          404
        </div>

        <h1 className="fw-bold">
          Page not found
        </h1>

        <p className="text-secondary">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public portal */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/track" element={<Track />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Administration portal */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="reports" element={<AdminReports />} />
          <Route
            path="reports/:id"
            element={<AdminReportDetails />}
          />
          <Route path="map" element={<AdminMap />} />
          <Route
            path="ai-analyzer"
            element={<AdminAIAnalyzer />}
          />
          <Route
            path="departments"
            element={<AdminDepartments />}
          />
          <Route
            path="users"
            element={<AdminUsers />}
          />
          <Route
            path="notifications"
            element={<AdminNotifications />}
          />
          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />
          <Route
            path="settings"
            element={<AdminSettings />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
