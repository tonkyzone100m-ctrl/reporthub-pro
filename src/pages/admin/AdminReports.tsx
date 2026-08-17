import { Link } from 'react-router-dom'

function AdminReports() {
  return (
    <div>
      <h2 className="fw-bold">Reports Management</h2>
      <p className="text-secondary">
        Review, prioritize, assign, and manage citizen reports.
      </p>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="fw-semibold">RH-001245</td>
                  <td>Road Damage</td>
                  <td>Kigali</td>
                  <td>
                    <span className="badge text-bg-warning">
                      Under Review
                    </span>
                  </td>
                  <td>
                    <span className="badge text-bg-danger">
                      Critical
                    </span>
                  </td>
                  <td>
                    <Link
                      to="/admin/reports/RH-001245"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>

                <tr>
                  <td className="fw-semibold">RH-001246</td>
                  <td>Street Lighting</td>
                  <td>Kicukiro</td>
                  <td>
                    <span className="badge text-bg-primary">
                      In Progress
                    </span>
                  </td>
                  <td>
                    <span className="badge text-bg-warning">
                      High
                    </span>
                  </td>
                  <td>
                    <Link
                      to="/admin/reports/RH-001246"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
