import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="text-primary small fw-bold text-uppercase">
            Overview
          </div>

          <h2 className="fw-bold mb-1">
            Dashboard
          </h2>

          <p className="text-secondary mb-0">
            Monitor reports, infrastructure issues, and administrative activity.
          </p>
        </div>

        <Link
          to="/admin/reports"
          className="btn btn-primary"
        >
          <i className="bi bi-file-earmark-text me-2" />
          Manage Reports
        </Link>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small mb-2">
                Total Reports
              </div>

              <div className="display-6 fw-bold">
                248
              </div>

              <div className="small text-success mt-2">
                <i className="bi bi-arrow-up me-1" />
                12% this month
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small mb-2">
                Under Review
              </div>

              <div className="display-6 fw-bold">
                42
              </div>

              <div className="small text-warning mt-2">
                Requires attention
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small mb-2">
                Critical Reports
              </div>

              <div className="display-6 fw-bold text-danger">
                9
              </div>

              <div className="small text-danger mt-2">
                Immediate review recommended
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small mb-2">
                Resolved
              </div>

              <div className="display-6 fw-bold text-success">
                197
              </div>

              <div className="small text-success mt-2">
                79% resolution rate
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="h5 fw-bold mb-1">
                    Priority Overview
                  </h3>

                  <p className="small text-secondary mb-0">
                    Reports requiring administrative attention.
                  </p>
                </div>

                <Link
                  to="/admin/ai-analyzer"
                  className="btn btn-sm btn-outline-primary"
                >
                  AI Insights
                </Link>
              </div>

              <div className="list-group list-group-flush">
                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">
                        Road infrastructure — Kigali
                      </div>

                      <div className="small text-secondary">
                        18 related reports
                      </div>
                    </div>

                    <span className="badge text-bg-danger align-self-start">
                      Critical
                    </span>
                  </div>
                </div>

                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">
                        Street lighting — Kicukiro
                      </div>

                      <div className="small text-secondary">
                        11 related reports
                      </div>
                    </div>

                    <span className="badge text-bg-warning align-self-start">
                      High
                    </span>
                  </div>
                </div>

                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">
                        Drainage — Gasabo
                      </div>

                      <div className="small text-secondary">
                        7 related reports
                      </div>
                    </div>

                    <span className="badge text-bg-warning align-self-start">
                      High
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-stars text-primary fs-4" />

                <h3 className="h5 fw-bold mb-0">
                  AI Decision Support
                </h3>
              </div>

              <p className="small text-secondary">
                AI analysis identifies patterns and recommends areas
                that may require attention. Administrators remain
                responsible for final decisions.
              </p>

              <div className="alert alert-info small">
                <strong>9 critical areas</strong> identified for review.
              </div>

              <Link
                to="/admin/ai-analyzer"
                className="btn btn-outline-primary w-100"
              >
                Open AI Analyzer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
