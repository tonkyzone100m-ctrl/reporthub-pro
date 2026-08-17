import { Link } from 'react-router-dom'

type AdminHeaderProps = {
  onMenuClick: () => void
}

function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="admin-header bg-white border-bottom">
      <div className="container-fluid px-3 px-md-4 py-3">
        <div className="d-flex align-items-center justify-content-between gap-3">

          <div className="d-flex align-items-center gap-3 min-width-0">

            <button
              type="button"
              className="admin-menu-button btn btn-light border"
              onClick={onMenuClick}
              aria-label="Open administration navigation"
            >
              <i
                className="bi bi-list fs-5"
                aria-hidden="true"
              />
            </button>

            <div className="min-width-0">
              <div className="fw-semibold text-truncate">
                Administration
              </div>

              <div className="small text-secondary text-truncate d-none d-sm-block">
                Monitor reports and coordinate infrastructure response.
              </div>
            </div>

          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">

            <Link
              to="/admin/notifications"
              className="btn btn-outline-secondary btn-sm"
              aria-label="Notifications"
            >
              <i
                className="bi bi-bell"
                aria-hidden="true"
              />

              <span className="d-none d-lg-inline ms-1">
                Notifications
              </span>
            </Link>

            <div className="text-end d-none d-md-block">
              <div className="fw-semibold small">
                System Administrator
              </div>

              <div className="text-secondary small">
                Administrator
              </div>
            </div>

            <div
              className="admin-avatar"
              aria-label="Administrator profile"
            >
              A
            </div>

          </div>

        </div>
      </div>
    </header>
  )
}

export default AdminHeader