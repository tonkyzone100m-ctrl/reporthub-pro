import { Link } from 'react-router-dom'

function AdminHeader() {
  return (
    <header className="admin-header bg-white border-bottom">
      <div className="container-fluid px-3 px-md-4 py-3">
        <div className="d-flex justify-content-between align-items-center gap-3">

          <div className="min-width-0">
            <div className="fw-semibold">
              Administration
            </div>

            <div className="small text-secondary text-truncate">
              Monitor reports and coordinate infrastructure response.
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">

            <Link
              to="/admin/notifications"
              className="btn btn-outline-secondary btn-sm"
            >
              <i
                className="bi bi-bell me-1"
                aria-hidden="true"
              />
              <span className="d-none d-sm-inline">
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
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{
                width: '40px',
                height: '40px',
              }}
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