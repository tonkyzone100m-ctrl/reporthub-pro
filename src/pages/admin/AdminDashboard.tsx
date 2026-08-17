import { Link } from 'react-router-dom'

type Priority = 'Critical' | 'High' | 'Medium' | 'Low'

type Report = {
  reference: string
  category: string
  location: string
  status: string
  priority: Priority
  department: string
  age: string
}

const reports: Report[] = [
  {
    reference: 'RH-001245',
    category: 'Road Damage',
    location: 'Kigali',
    status: 'Under Review',
    priority: 'Critical',
    department: 'Public Works',
    age: '2 days',
  },
  {
    reference: 'RH-001246',
    category: 'Street Lighting',
    location: 'Kicukiro',
    status: 'In Progress',
    priority: 'High',
    department: 'Utilities',
    age: '4 days',
  },
  {
    reference: 'RH-001247',
    category: 'Drainage',
    location: 'Gasabo',
    status: 'Submitted',
    priority: 'High',
    department: 'Infrastructure',
    age: '1 day',
  },
  {
    reference: 'RH-001248',
    category: 'Waste Management',
    location: 'Nyarugenge',
    status: 'Under Review',
    priority: 'Medium',
    department: 'Public Works',
    age: '3 days',
  },
]

function priorityClass(priority: Priority) {
  switch (priority) {
    case 'Critical':
      return 'text-bg-danger'
    case 'High':
      return 'text-bg-warning'
    case 'Medium':
      return 'text-bg-primary'
    default:
      return 'text-bg-secondary'
  }
}

function statusClass(status: string) {
  switch (status) {
    case 'Resolved':
      return 'text-bg-success'
    case 'In Progress':
      return 'text-bg-primary'
    case 'Under Review':
      return 'text-bg-warning'
    default:
      return 'text-bg-secondary'
  }
}

function AdminDashboard() {
  return (
    <div>
      {/* Page header */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="text-primary text-uppercase small fw-bold">
            Administration
          </div>

          <h1 className="h2 fw-bold mb-1">
            Dashboard
          </h1>

          <p className="text-secondary mb-0">
            Monitor infrastructure reports, operational risks,
            and response activity.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link
            to="/admin/ai-analyzer"
            className="btn btn-outline-primary"
          >
            <i className="bi bi-stars me-2" />
            AI Analyzer
          </Link>

          <Link
            to="/admin/reports"
            className="btn btn-primary"
          >
            <i className="bi bi-list-check me-2" />
            Review Reports
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small">
                    Total Reports
                  </div>

                  <div className="display-6 fw-bold mt-1">
                    248
                  </div>

                  <div className="small text-success mt-2">
                    <i className="bi bi-arrow-up me-1" />
                    12% this month
                  </div>
                </div>

                <div className="bg-primary-subtle text-primary rounded-3 p-3">
                  <i className="bi bi-file-earmark-text fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small">
                    Critical Reports
                  </div>

                  <div className="display-6 fw-bold text-danger mt-1">
                    9
                  </div>

                  <div className="small text-danger mt-2">
                    <i className="bi bi-exclamation-triangle me-1" />
                    Requires attention
                  </div>
                </div>

                <div className="bg-danger-subtle text-danger rounded-3 p-3">
                  <i className="bi bi-exclamation-octagon fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small">
                    In Progress
                  </div>

                  <div className="display-6 fw-bold text-primary mt-1">
                    37
                  </div>

                  <div className="small text-secondary mt-2">
                    Active interventions
                  </div>
                </div>

                <div className="bg-primary-subtle text-primary rounded-3 p-3">
                  <i className="bi bi-arrow-repeat fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small">
                    Resolved
                  </div>

                  <div className="display-6 fw-bold text-success mt-1">
                    202
                  </div>

                  <div className="small text-success mt-2">
                    81.4% resolution rate
                  </div>
                </div>

                <div className="bg-success-subtle text-success rounded-3 p-3">
                  <i className="bi bi-check-circle fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI + Risk overview */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <div className="text-primary small text-uppercase fw-bold">
                    Decision Support
                  </div>

                  <h2 className="h5 fw-bold mb-1">
                    AI Priority Insights
                  </h2>

                  <p className="text-secondary small mb-0">
                    AI-generated signals to help administrators
                    identify areas requiring attention.
                  </p>
                </div>

                <Link
                  to="/admin/ai-analyzer"
                  className="btn btn-sm btn-outline-primary"
                >
                  Open Analyzer
                </Link>
              </div>

              <div className="alert alert-info border-0 mb-4">
                <div className="d-flex gap-3">
                  <i className="bi bi-stars fs-4" />

                  <div>
                    <div className="fw-semibold">
                      Human decision remains in control
                    </div>

                    <div className="small mt-1">
                      AI recommendations support administrative
                      decisions. They do not automatically assign,
                      prioritize, or resolve reports.
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-3 p-3 mb-3">
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <div className="fw-semibold">
                      Road infrastructure — Kigali
                    </div>

                    <div className="small text-secondary mt-1">
                      High concentration of related reports
                      detected in a localized area.
                    </div>
                  </div>

                  <span className="badge text-bg-danger align-self-start">
                    Critical
                  </span>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-md-4">
                    <div className="small text-secondary">
                      Related reports
                    </div>

                    <div className="fw-bold">
                      17
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="small text-secondary">
                      Unresolved
                    </div>

                    <div className="fw-bold">
                      6
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="small text-secondary">
                      Signal strength
                    </div>

                    <div className="fw-bold">
                      87%
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-3 p-3">
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <div className="fw-semibold">
                      Street lighting — Kicukiro
                    </div>

                    <div className="small text-secondary mt-1">
                      Multiple reports are concentrated within
                      the same geographic area.
                    </div>
                  </div>

                  <span className="badge text-bg-warning align-self-start">
                    High
                  </span>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-md-4">
                    <div className="small text-secondary">
                      Related reports
                    </div>

                    <div className="fw-bold">
                      11
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="small text-secondary">
                      Unresolved
                    </div>

                    <div className="fw-bold">
                      4
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="small text-secondary">
                      Signal strength
                    </div>

                    <div className="fw-bold">
                      74%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-primary small text-uppercase fw-bold">
                Risk Overview
              </div>

              <h2 className="h5 fw-bold mt-1">
                Areas requiring attention
              </h2>

              <div className="mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">
                    Critical
                  </span>

                  <strong className="text-danger">
                    9
                  </strong>
                </div>

                <div className="progress mb-4" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: '25%' }}
                  />
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="small">
                    High
                  </span>

                  <strong className="text-warning">
                    31
                  </strong>
                </div>

                <div className="progress mb-4" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: '55%' }}
                  />
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="small">
                    Medium
                  </span>

                  <strong className="text-primary">
                    72
                  </strong>
                </div>

                <div className="progress mb-4" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: '70%' }}
                  />
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="small">
                    Low
                  </span>

                  <strong className="text-secondary">
                    136
                  </strong>
                </div>

                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-secondary"
                    style={{ width: '90%' }}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <Link
                to="/admin/map"
                className="btn btn-outline-primary w-100"
              >
                <i className="bi bi-geo-alt me-2" />
                View Risk Map
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent reports */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <div className="text-primary small text-uppercase fw-bold">
                Operations
              </div>

              <h2 className="h5 fw-bold mb-1">
                Recent Reports
              </h2>

              <p className="text-secondary small mb-0">
                Reports requiring monitoring and administrative action.
              </p>
            </div>

            <Link
              to="/admin/reports"
              className="btn btn-sm btn-outline-secondary"
            >
              View all
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
                  <th>Priority</th>
                  <th>Department</th>
                  <th>Age</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr key={report.reference}>
                    <td className="fw-semibold">
                      {report.reference}
                    </td>

                    <td>
                      {report.category}
                    </td>

                    <td>
                      {report.location}
                    </td>

                    <td>
                      <span className={`badge ${statusClass(report.status)}`}>
                        {report.status}
                      </span>
                    </td>

                    <td>
                      <span className={`badge ${priorityClass(report.priority)}`}>
                        {report.priority}
                      </span>
                    </td>

                    <td>
                      {report.department}
                    </td>

                    <td className="text-secondary">
                      {report.age}
                    </td>

                    <td>
                      <Link
                        to={`/admin/reports/${report.reference}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom operational panels */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <div className="text-primary small text-uppercase fw-bold">
                    Activity
                  </div>

                  <h2 className="h5 fw-bold mb-0">
                    Recent Activity
                  </h2>
                </div>

                <i className="bi bi-activity fs-4 text-primary" />
              </div>

              <div className="d-flex gap-3 mb-4">
                <div className="text-success">
                  <i className="bi bi-check-circle fs-5" />
                </div>

                <div>
                  <div className="fw-semibold">
                    Report RH-001239 resolved
                  </div>

                  <div className="small text-secondary">
                    Public Works marked the issue as resolved.
                  </div>

                  <div className="small text-muted mt-1">
                    18 minutes ago
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div className="text-primary">
                  <i className="bi bi-person-check fs-5" />
                </div>

                <div>
                  <div className="fw-semibold">
                    RH-001246 assigned
                  </div>

                  <div className="small text-secondary">
                    Assigned to Utilities for investigation.
                  </div>

                  <div className="small text-muted mt-1">
                    42 minutes ago
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3">
                <div className="text-warning">
                  <i className="bi bi-stars fs-5" />
                </div>

                <div>
                  <div className="fw-semibold">
                    New AI priority signal
                  </div>

                  <div className="small text-secondary">
                    A potential infrastructure cluster was detected.
                  </div>

                  <div className="small text-muted mt-1">
                    1 hour ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-primary small text-uppercase fw-bold">
                Quick Actions
              </div>

              <h2 className="h5 fw-bold mb-4">
                Administrative tools
              </h2>

              <div className="row g-3">
                <div className="col-sm-6">
                  <Link
                    to="/admin/reports"
                    className="btn btn-light border w-100 text-start p-3"
                  >
                    <i className="bi bi-file-earmark-text fs-5 d-block mb-2 text-primary" />
                    <span className="fw-semibold d-block">
                      Review Reports
                    </span>
                    <span className="small text-secondary">
                      Manage incoming issues
                    </span>
                  </Link>
                </div>

                <div className="col-sm-6">
                  <Link
                    to="/admin/ai-analyzer"
                    className="btn btn-light border w-100 text-start p-3"
                  >
                    <i className="bi bi-stars fs-5 d-block mb-2 text-primary" />
                    <span className="fw-semibold d-block">
                      AI Analyzer
                    </span>
                    <span className="small text-secondary">
                      Analyze priority signals
                    </span>
                  </Link>
                </div>

                <div className="col-sm-6">
                  <Link
                    to="/admin/map"
                    className="btn btn-light border w-100 text-start p-3"
                  >
                    <i className="bi bi-map fs-5 d-block mb-2 text-primary" />
                    <span className="fw-semibold d-block">
                      Map Monitoring
                    </span>
                    <span className="small text-secondary">
                      Explore geographic risks
                    </span>
                  </Link>
                </div>

                <div className="col-sm-6">
                  <Link
                    to="/admin/analytics"
                    className="btn btn-light border w-100 text-start p-3"
                  >
                    <i className="bi bi-bar-chart fs-5 d-block mb-2 text-primary" />
                    <span className="fw-semibold d-block">
                      Analytics
                    </span>
                    <span className="small text-secondary">
                      Measure performance
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
