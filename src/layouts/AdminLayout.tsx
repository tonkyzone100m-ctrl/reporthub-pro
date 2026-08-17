import { Outlet } from 'react-router-dom'

import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

function AdminLayout() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <AdminSidebar />

      <div className="flex-grow-1 min-w-0">
        <AdminHeader />

        <main className="p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
