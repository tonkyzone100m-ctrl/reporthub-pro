import { Link } from 'react-router-dom'

type ReportStatus =
  | 'Submitted'
  | 'Under Review'
  | 'In Progress'
  | 'Resolved'

type Report = {
  reference: string
  category: string
  location: string
  submittedAt: string
  status: ReportStatus
}

const reports: Report[] = [
  {
    reference: 'RH-2026-00124',
    category: 'Road damage',
    location: 'Kigali',
    submittedAt: 'August 16, 2026',
    status: 'Under Review',
  },
  {
    reference: 'RH-2026-00118',
    category: 'Broken streetlight',
    location: 'Kicukiro',
    submittedAt: 'August 14, 2026',
    status: 'In Progress',
  },
]

function getStatusClass(status: ReportStatus) {
  switch (status) {
    case 'Resolved':
      return 'bg-success-subtle text-success'

    case 'In Progress':
      return 'bg-primary-subtle text-primary'

    case 'Under Review':
      return 'bg-warning-subtle text-warning-emphasis'

    default:
      return 'bg-secondary-subtle text-secondary'
  }
}

function MyReports() {
  return (
    <main>
      <section className="bg-light py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <p className="text-uppercase fw-semibold text-primary mb-2">
                My Reports
              </p>

              <h1 className="display-6 fw-bold mb-2">
                Your submitted reports
              </h1>

              <p className="text-secondary mb-0">
                Monitor the progress of infrastructure issues
                you have reported.
              </p>
            </div>

            <Link
              to="/report"
              className="btn btn-primary"
            >
              Report an Issue
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {reports.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <h2 className="h4 fw-bold">
                  No reports yet
                </h2>

                <p className="text-secondary mb-4">
                  You have not submitted any reports.
                </p>

                <Link
                  to="/report"
                  className="btn btn-primary"
                >
                  Submit Your First Report
                </Link>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Reference</th>
                        <th scope="col">Problem</th>
                        <th scope="col">Location</th>
                        <th scope="col">Submitted</th>
                        <th scope="col">Status</th>
                        <th scope="col">
                          <span className="visually-hidden">
                            Actions
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.reference}>
                          <td>
                            <span className="font-monospace fw-semibold">
                              {report.reference}
                            </span>
                          </td>

                          <td>{report.category}</td>

                          <td>{report.location}</td>

                          <td>{report.submittedAt}</td>

                          <td>
                            <span
                              className={`badge rounded-pill ${getStatusClass(
                                report.status,
                              )}`}
                            >
                              {report.status}
                            </span>
                          </td>

                          <td>
                            <Link
                              to={`/track?reference=${encodeURIComponent(
                                report.reference,
                              )}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Track
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default MyReports