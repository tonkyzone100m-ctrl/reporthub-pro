import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('reporthub_admin_dark_mode') === 'true')

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('reporthub_admin_dark_mode', String(darkMode))
    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [darkMode])

  function closeSidebar() {
    setSidebarOpen(false)
  }

  return (
    <div
      className={`admin-layout ${
        sidebarOpen ? 'admin-sidebar-open' : ''
      }`}
    >
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Close administration navigation"
          onClick={closeSidebar}
        />
      )}

      <div className="admin-main">
        <AdminHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode((current) => !current)}
        />

        <main
          className="admin-content"
          role="main"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout