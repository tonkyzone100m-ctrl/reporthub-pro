import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Reports', path: '/admin/reports' },
  { label: 'Map Monitoring', path: '/admin/map' },
  { label: 'AI Analyzer', path: '/admin/ai-analyzer' },
  { label: 'Departments', path: '/admin/departments' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Analytics', path: '/admin/analytics' },
  { label: 'Notifications', path: '/admin/notifications' },
  { label: 'Settings', path: '/admin/settings' },
]

function AdminSidebar() {
  return (
    <aside
      className="bg-dark text-white d-none d-lg-flex flex-column"
      style={{ width: '260px', minHeight: '100vh' }}
    >
      <div className="p-4 border-bottom border-secondary">
        <div className="fw-bold fs-4">ReportHub</div>
        <div className="small text-white-50">
          Administration Portal
        </div>
      </div>

      <nav className="p-3 flex-grow-1">
        <div className="text-uppercase small text-white-50 fw-semibold mb-2">
          Management
        </div>

        <div className="d-grid gap-1">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `text-decoration-none rounded px-3 py-2 ${
                  isActive
                    ? 'bg-primary text-white fw-semibold'
                    : 'text-white-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-3 border-top border-secondary">
        <NavLink
          to="/"
          className="text-white-50 text-decoration-none small"
        >
          ? Return to ReportHub
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSidebar
