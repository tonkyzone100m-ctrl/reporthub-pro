import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

function AdminLayout() {
  return (
    <div className="min-vh-100 bg-light">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />

        <main className="p-3 p-lg-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
