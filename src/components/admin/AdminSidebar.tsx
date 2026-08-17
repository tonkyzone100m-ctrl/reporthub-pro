import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Dashboard', path: '/admin', icon: 'bi-speedometer2' },
  { label: 'Reports', path: '/admin/reports', icon: 'bi-file-earmark-text' },
  { label: 'Map Monitoring', path: '/admin/map', icon: 'bi-geo-alt' },
  { label: 'AI Analyzer', path: '/admin/ai-analyzer', icon: 'bi-stars' },
  { label: 'Departments', path: '/admin/departments', icon: 'bi-building' },
  { label: 'Users', path: '/admin/users', icon: 'bi-people' },
  { label: 'Analytics', path: '/admin/analytics', icon: 'bi-bar-chart' },
  { label: 'Notifications', path: '/admin/notifications', icon: 'bi-bell' },
  { label: 'Settings', path: '/admin/settings', icon: 'bi-gear' },
]

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="p-4 border-bottom">
        <div className="fw-bold fs-4 text-primary">
          ReportHub
        </div>

        <div className="small text-secondary">
          Administration Portal
        </div>
      </div>

      <nav className="p-3">
        <div className="small text-uppercase fw-semibold text-secondary px-3 mb-2">
          Management
        </div>

        <div className="d-grid gap-1">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default AdminSidebar
