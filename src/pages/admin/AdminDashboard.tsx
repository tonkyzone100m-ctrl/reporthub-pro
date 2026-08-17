import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Link } from 'react-router-dom'

type Stat = {
  label: string
  value: string
  description: string
  icon: string
  iconClass: string
}

type CriticalReport = {
  reference: string
  category: string
  location: string
  priority: 'Critical' | 'High' | 'Medium'
  status: string
  age: string
}

const stats: Stat[] = [
  {
    label: 'Total Reports',
    value: '248',
    description: '+12% this month',
    icon: 'bi-file-earmark-text',
    iconClass: 'text-primary bg-primary-subtle',
  },
  {
    label: 'Critical Reports',
    value: '9',
    description: 'Requires attention',
    icon: 'bi-exclamation-triangle',
    iconClass: 'text-danger bg-danger-subtle',
  },
  {
    label: 'Under Review',
    value: '31',
    description: 'Awaiting assessment',
    icon: 'bi-search',
    iconClass: 'text-warning bg-warning-subtle',
  },
  {
    label: 'Resolved',
    value: '193',
    description: '78% resolution rate',
    icon: 'bi-check-circle',
    iconClass: 'text-success bg-success-subtle',
  },
]

const reportTrendData = [
  { month: 'Mar', reports: 42, resolved: 31 },
  { month: 'Apr', reports: 51, resolved: 38 },
  { month: 'May', reports: 47, resolved: 35 },
  { month: 'Jun', reports: 63, resolved: 49 },
  { month: 'Jul', reports: 72, resolved: 57 },
  { month: 'Aug', reports: 84, resolved: 65 },
]

const categoryData = [
  { category: 'Roads', reports: 76 },
  { category: 'Lighting', reports: 48 },
  { category: 'Drainage', reports: 39 },
  { category: 'Water', reports: 32 },
  { category: 'Waste', reports: 28 },
]

const priorityData = [
  { name: 'Critical', value: 9 },
  { name: 'High', value: 31 },
  { name: 'Medium', value: 82 },
  { name: 'Low', value: 126 },
]

const priorityColors = [
  '#dc3545',
  '#ffc107',
  '#0d6efd',
  '#6c757d',
]

const criticalReports: CriticalReport[] = [
  {
    reference: 'RH-001245',
    category: 'Road Damage',
    location: 'Kigali',
    priority: 'Critical',
    status: 'Under Review',
    age: '2 days',
  },
  {
    reference: 'RH-001251',
    category: 'Flooding',
    location: 'Gasabo',
    priority: 'Critical',
    status: 'Submitted',
    age: '1 day',
  },
  {
    reference: 'RH-001263',
    category: 'Street Lighting',
    location: 'Kicukiro',
    priority: 'High',
    status: 'Under Review',
    age: '3 days',
  },
  {
    reference: 'RH-001271',
    category: 'Road Damage',
    location: 'Nyarugenge',
    priority: 'High',
    status: 'In Progress',
    age: '4 days',
  },
]

function AdminDashboard() {
  return (
    <div>
      {/* Page heading */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="text-primary small fw-bold text-uppercase mb-1">
            Administration
          </div>

          <h1 className="h2 fw-bold mb-1">
            Dashboard
          </h1>

          <p className="text-secondary mb-0">
            Monitor infrastructure reports, operational priorities,
            and community issues.
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
            <i className="bi bi-file-earmark-text me-2" />
            View Reports
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat) => (
          <div
            className="col-sm-6 col-xl-3"
            key={stat.label}
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="text-secondary small mb-2">
                      {stat.label}
                    </div>

                    <div className="display-6 fw-bold">
                      {stat.value}
                    </div>

                    <div className="small text-secondary mt-2">
                      {stat.description}
                    </div>
                  </div>

                  <div
                    className={`rounded-3 d-flex align-items-center justify-content-center ${stat.iconClass}`}
                    style={{
                      width: '46px',
                      height: '46px',
                    }}
                  >
                    <i className={`bi ${stat.icon} fs-5`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI decision-support banner */}
      <div className="card border-0 shadow-sm mb-4 overflow-hidden">
        <div className="card-body p-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                  }}
                >
                  <i className="bi bi-stars fs-4" />
                </div>

                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h2 className="h5 fw-bold mb-0">
                      AI Decision-Support
                    </h2>

                    <span className="badge text-bg-primary">
                      Advisory
                    </span>
                  </div>

                  <p className="mb-2">
                    The latest analysis identified
                    <strong> 9 critical areas</strong> requiring
                    administrative review.
                  </p>

                  <p className="small text-secondary mb-0">
                    AI analyzes report patterns, location
                    concentration, severity, and activity trends.
                    It does not make final administrative decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end">
              <Link
                to="/admin/ai-analyzer"
                className="btn btn-primary"
              >
                Review AI Insights
                <i className="bi bi-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Report Activity
                  </h2>

                  <p className="small text-secondary mb-0">
                    Submitted and resolved reports over time
                  </p>
                </div>

                <span className="badge text-bg-light">
                  Last 6 months
                </span>
              </div>

              <div style={{ height: '320px' }}>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={reportTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="reports"
                      name="Reports"
                      stroke="#0d6efd"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="resolved"
                      name="Resolved"
                      stroke="#198754"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="mb-3">
                <h2 className="h5 fw-bold mb-1">
                  Priority Distribution
                </h2>

                <p className="small text-secondary mb-0">
                  Current report severity levels
                </p>
              </div>

              <div style={{ height: '280px' }}>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={priorityData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {priorityData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={priorityColors[index]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category chart + AI critical areas */}
      <div className="row g-4 mb-4">
        <div className="col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-1">
                Reports by Category
              </h2>

              <p className="small text-secondary mb-4">
                Infrastructure issues reported across the platform
              </p>

              <div style={{ height: '300px' }}>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="category" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="reports"
                      name="Reports"
                      fill="#0d6efd"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Critical Areas
                  </h2>

                  <p className="small text-secondary mb-0">
                    AI-detected areas for review
                  </p>
                </div>

                <Link
                  to="/admin/ai-analyzer"
                  className="small text-decoration-none"
                >
                  View all
                </Link>
              </div>

              <div className="list-group list-group-flush">
                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between gap-3">
                    <div>
                      <div className="fw-semibold">
                        Road Infrastructure
                      </div>

                      <div className="small text-secondary">
                        Kigali
                      </div>
                    </div>

                    <span className="badge text-bg-danger align-self-start">
                      Critical
                    </span>
                  </div>

                  <div className="small text-secondary mt-2">
                    14 related reports detected in a concentrated
                    area.
                  </div>
                </div>

                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between gap-3">
                    <div>
                      <div className="fw-semibold">
                        Drainage
                      </div>

                      <div className="small text-secondary">
                        Gasabo
                      </div>
                    </div>

                    <span className="badge text-bg-danger align-self-start">
                      Critical
                    </span>
                  </div>

                  <div className="small text-secondary mt-2">
                    Increasing reports suggest a developing
                    infrastructure concern.
                  </div>
                </div>

                <div className="list-group-item px-0">
                  <div className="d-flex justify-content-between gap-3">
                    <div>
                      <div className="fw-semibold">
                        Street Lighting
                      </div>

                      <div className="small text-secondary">
                        Kicukiro
                      </div>
                    </div>

                    <span className="badge text-bg-warning align-self-start">
                      High
                    </span>
                  </div>

                  <div className="small text-secondary mt-2">
                    Multiple reports have been submitted recently.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports requiring attention */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
            <div>
              <h2 className="h5 fw-bold mb-1">
                Reports Requiring Attention
              </h2>

              <p className="small text-secondary mb-0">
                Highest-priority reports currently awaiting action
              </p>
            </div>

            <Link
              to="/admin/reports"
              className="btn btn-sm btn-outline-primary"
            >
              Manage Reports
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Issue</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Age</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {criticalReports.map((report) => (
                  <tr key={report.reference}>
                    <td className="fw-semibold">
                      {report.reference}
                    </td>

                    <td>{report.category}</td>

                    <td>{report.location}</td>

                    <td>
                      <span
                        className={`badge ${
                          report.priority === 'Critical'
                            ? 'text-bg-danger'
                            : report.priority === 'High'
                              ? 'text-bg-warning'
                              : 'text-bg-primary'
                        }`}
                      >
                        {report.priority}
                      </span>
                    </td>

                    <td>
                      <span className="badge text-bg-light border">
                        {report.status}
                      </span>
                    </td>

                    <td className="text-secondary">
                      {report.age}
                    </td>

                    <td className="text-end">
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
    </div>
  )
}

export default AdminDashboard