import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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