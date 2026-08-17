import { NavLink } from 'react-router-dom'

type NavigationItem = {
  label: string
  path: string
  icon: string
}

const overviewNavigation: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: 'bi-speedometer2',
  },
  {
    label: 'Analytics',
    path: '/admin/analytics',
    icon: 'bi-bar-chart-line',
  },
]

const operationsNavigation: NavigationItem[] = [
  {
    label: 'Reports',
    path: '/admin/reports',
    icon: 'bi-file-earmark-text',
  },
  {
    label: 'Map Monitoring',
    path: '/admin/map',
    icon: 'bi-geo-alt',
  },
  {
    label: 'AI Analyzer',
    path: '/admin/ai-analyzer',
    icon: 'bi-stars',
  },
  {
    label: 'Notifications',
    path: '/admin/notifications',
    icon: 'bi-bell',
  },
]

const administrationNavigation: NavigationItem[] = [
  {
    label: 'Departments',
    path: '/admin/departments',
    icon: 'bi-building',
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: 'bi-people',
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: 'bi-gear',
  },
]

function AdminSidebar() {
  const renderNavigation = (items: NavigationItem[]) => (
    <div className="d-grid gap-1">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/admin'}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? 'active' : ''}`
          }
        >
          <span
            className="admin-nav-icon"
            aria-hidden="true"
          >
            <i className={`bi ${item.icon}`} />
          </span>

          <span className="admin-nav-label">
            {item.label}
          </span>
        </NavLink>
      ))}
    </div>
  )

  return (
    <aside
      className="admin-sidebar"
      aria-label="Administration sidebar"
    >
      <div className="admin-brand">
        <div
          className="admin-brand-icon"
          aria-hidden="true"
        >
          <i className="bi bi-shield-check" />
        </div>

        <div className="admin-brand-text">
          <div className="admin-brand-name">
            ReportHub
          </div>

          <div className="admin-brand-subtitle">
            Administration
          </div>
        </div>
      </div>

      <nav
        className="admin-sidebar-nav"
        aria-label="Administration navigation"
      >
        <div className="admin-nav-section">
          <div className="admin-nav-section-label">
            Overview
          </div>

          {renderNavigation(overviewNavigation)}
        </div>

        <div className="admin-nav-section">
          <div className="admin-nav-section-label">
            Operations
          </div>

          {renderNavigation(operationsNavigation)}
        </div>

        <div className="admin-nav-section">
          <div className="admin-nav-section-label">
            Administration
          </div>

          {renderNavigation(administrationNavigation)}
        </div>
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-security-badge">
          <div
            className="admin-security-icon"
            aria-hidden="true"
          >
            <i className="bi bi-shield-lock" />
          </div>

          <div>
            <div className="fw-semibold">
              Secure Portal
            </div>

            <div className="small text-secondary">
              Administrative access
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar