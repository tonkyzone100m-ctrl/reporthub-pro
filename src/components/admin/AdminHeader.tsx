import { Link } from 'react-router-dom'

function AdminHeader() {
  return (
    <header className="admin-header bg-white border-bottom">
      <div className="d-flex align-items-center justify-content-between px-3 px-lg-4 py-3">
        <div>
          <div className="small text-secondary">
            Administration
          </div>

          <h1 className="h5 fw-bold mb-0">
            ReportHub Control Center
          </h1>
        </div>

        <div className="d-flex align-items-center gap-3">
          <Link
            to="/admin/notifications"
            className="btn btn-light position-relative"
            aria-label="Notifications"
          >
            <i className="bi bi-bell" />
          </Link>

          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
              style={{ width: '40px', height: '40px' }}
            >
              A
            </div>

            <div className="d-none d-md-block">
              <div className="small fw-semibold">
                Administrator
              </div>

              <div className="small text-secondary">
                System Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
