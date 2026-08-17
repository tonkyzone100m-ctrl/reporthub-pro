import { Outlet } from 'react-router-dom'

import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />

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