import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
      <div className="mb-4">
        <div className="text-primary small text-uppercase fw-bold">
          Overview
        </div>

        <h1 className="h2 fw-bold mb-1">
          Administration Dashboard
        </h1>

        <p className="text-secondary mb-0">
          Monitor citizen reports, identify priority areas,
          and coordinate response across departments.
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Total Reports
              </div>
              <div className="display-6 fw-bold mt-1">
                248
              </div>
              <div className="small text-success mt-2">
                +12% this month
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Under Review
              </div>
              <div className="display-6 fw-bold mt-1">
                42
              </div>
              <div className="small text-secondary mt-2">
                Awaiting assessment
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small">
                High Priority
              </div>
              <div className="display-6 fw-bold text-warning mt-1">
                31
              </div>
              <div className="small text-secondary mt-2">
                Requires attention
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Resolved
              </div>
              <div className="display-6 fw-bold text-success mt-1">
                175
              </div>
              <div className="small text-secondary mt-2">
                Successfully completed
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Recent Reports
                  </h2>
                  <p className="text-secondary small mb-0">
                    Latest citizen infrastructure reports.
                  </p>
                </div>

                <Link
                  to="/admin/reports"
                  className="btn btn-sm btn-outline-primary"
                >
                  View All
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="fw-semibold">
                        RH-001245
                      </td>
                      <td>Road Damage</td>
                      <td>Kigali</td>
                      <td>
                        <span className="badge text-bg-warning">
                          Under Review
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="fw-semibold">
                        RH-001246
                      </td>
                      <td>Street Lighting</td>
                      <td>Kicukiro</td>
                      <td>
                        <span className="badge text-bg-primary">
                          In Progress
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="fw-semibold">
                        RH-001247
                      </td>
                      <td>Drainage</td>
                      <td>Gasabo</td>
                      <td>
                        <span className="badge text-bg-danger">
                          Critical
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-primary small text-uppercase fw-bold">
                    Decision Support
                  </div>

                  <h2 className="h5 fw-bold mt-1">
                    AI Priority Insights
                  </h2>
                </div>

                <span className="badge text-bg-info">
                  Advisory
                </span>
              </div>

              <p className="text-secondary small">
                AI identifies patterns and potential critical
                areas. Administrators retain final authority.
              </p>

              <div className="border rounded-3 p-3 mb-3">
                <div className="d-flex justify-content-between">
                  <strong className="small">
                    Road infrastructure
                  </strong>

                  <span className="badge text-bg-danger">
                    Critical
                  </span>
                </div>

                <p className="small text-secondary mb-0 mt-2">
                  High concentration of related reports detected.
                </p>
              </div>

              <div className="border rounded-3 p-3 mb-3">
                <div className="d-flex justify-content-between">
                  <strong className="small">
                    Street lighting
                  </strong>

                  <span className="badge text-bg-warning">
                    High
                  </span>
                </div>

                <p className="small text-secondary mb-0 mt-2">
                  Multiple reports detected in the same area.
                </p>
              </div>

              <Link
                to="/admin/ai-analyzer"
                className="btn btn-primary w-100"
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
