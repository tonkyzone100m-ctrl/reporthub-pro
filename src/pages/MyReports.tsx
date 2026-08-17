import { Link } from 'react-router-dom'

type ReportStatus =
  | 'submitted'
  | 'under-review'
  | 'in-progress'
  | 'resolved'

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
    status: 'under-review',
  },
  {
    reference: 'RH-2026-00118',
    category: 'Broken streetlight',
    location: 'Kicukiro',
    submittedAt: 'August 14, 2026',
    status: 'in-progress',
  },
]

const STATUS_LABELS: Record<ReportStatus, string> = {
  submitted: 'Submitted',
  'under-review': 'Under Review',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
}

function getStatusClass(status: ReportStatus) {
  switch (status) {
    case 'resolved':
      return 'bg-success-subtle text-success'

    case 'in-progress':
      return 'bg-primary-subtle text-primary'

    case 'under-review':
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
                View the reports you have submitted and
                follow their progress.
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
                  You have no reports yet
                </h2>

                <p className="text-secondary mb-4">
                  When you report an infrastructure
                  problem, it will appear here.
                </p>

                <Link
                  to="/report"
                  className="btn btn-primary"
                >
                  Report an Issue
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-3 mb-4">
                <div className="col-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="text-secondary small">
                        Total Reports
                      </div>

                      <div className="fs-3 fw-bold mt-1">
                        {reports.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="text-secondary small">
                        Under Review
                      </div>

                      <div className="fs-3 fw-bold mt-1">
                        {
                          reports.filter(
                            (report) =>
                              report.status ===
                              'under-review',
                          ).length
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="text-secondary small">
                        In Progress
                      </div>

                      <div className="fs-3 fw-bold mt-1">
                        {
                          reports.filter(
                            (report) =>
                              report.status ===
                              'in-progress',
                          ).length
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="text-secondary small">
                        Resolved
                      </div>

                      <div className="fs-3 fw-bold mt-1">
                        {
                          reports.filter(
                            (report) =>
                              report.status ===
                              'resolved',
                          ).length
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">
                            Reference
                          </th>

                          <th scope="col">
                            Problem
                          </th>

                          <th scope="col">
                            Location
                          </th>

                          <th scope="col">
                            Submitted
                          </th>

                          <th scope="col">
                            Status
                          </th>

                          <th scope="col">
                            Action
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

                            <td>
                              {report.category}
                            </td>

                            <td>
                              {report.location}
                            </td>

                            <td>
                              {report.submittedAt}
                            </td>

                            <td>
                              <span
                                className={`badge rounded-pill ${getStatusClass(
                                  report.status,
                                )}`}
                              >
                                {
                                  STATUS_LABELS[
                                    report.status
                                  ]
                                }
                              </span>
                            </td>

                            <td>
                              <Link
                                to={`/track?reference=${encodeURIComponent(
                                  report.reference,
                                )}`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Status
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default MyReports