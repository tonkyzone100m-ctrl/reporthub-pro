import { Link } from 'react-router-dom'
import ReactECharts from 'echarts-for-react'

type Priority = 'Critical' | 'High' | 'Medium'

type DashboardReport = {
  reference: string
  category: string
  location: string
  status: string
  priority: Priority
  age: string
}

const priorityStyles: Record<Priority, string> = {
  Critical: 'text-bg-danger',
  High: 'text-bg-warning',
  Medium: 'text-bg-info',
}

const reports: DashboardReport[] = [
  {
    reference: 'RH-001245',
    category: 'Road Damage',
    location: 'Gasabo',
    status: 'Under Review',
    priority: 'Critical',
    age: '2h',
  },
  {
    reference: 'RH-001246',
    category: 'Street Lighting',
    location: 'Kicukiro',
    status: 'In Progress',
    priority: 'High',
    age: '5h',
  },
  {
    reference: 'RH-001247',
    category: 'Drainage',
    location: 'Nyarugenge',
    status: 'Submitted',
    priority: 'High',
    age: '8h',
  },
  {
    reference: 'RH-001248',
    category: 'Road Damage',
    location: 'Gasabo',
    status: 'Under Review',
    priority: 'Medium',
    age: '1d',
  },
]

function AdminDashboard() {
  return (
    <div>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="text-primary text-uppercase small fw-bold mb-1">
            Administration
          </div>

          <h1 className="h2 fw-bold mb-1">
            Operations Dashboard
          </h1>

          <p className="text-secondary mb-0">
            Monitor infrastructure reports, priorities, and system activity.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
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
            Manage Reports
          </Link>
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="row g-3 mb-4">
        {/* Total Reports */}

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small fw-semibold">
                    Total Reports
                  </div>

                  <div className="display-6 fw-bold mt-2">
                    248
                  </div>

                  <div className="small text-success mt-2">
                    <i className="bi bi-arrow-up me-1" />
                    12% this month
                  </div>
                </div>

                <div className="rounded-3 bg-primary-subtle text-primary p-3">
                  <i className="bi bi-file-earmark-text fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Reports */}

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small fw-semibold">
                    Critical Reports
                  </div>

                  <div className="display-6 fw-bold mt-2 text-danger">
                    9
                  </div>

                  <div className="small text-danger mt-2">
                    <i className="bi bi-exclamation-triangle me-1" />
                    Requires attention
                  </div>
                </div>

                <div className="rounded-3 bg-danger-subtle text-danger p-3">
                  <i className="bi bi-exclamation-octagon fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress */}

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small fw-semibold">
                    In Progress
                  </div>

                  <div className="display-6 fw-bold mt-2">
                    67
                  </div>

                  <div className="small text-secondary mt-2">
                    Across active departments
                  </div>
                </div>

                <div className="rounded-3 bg-warning-subtle text-warning p-3">
                  <i className="bi bi-arrow-repeat fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resolution Rate */}

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-secondary small fw-semibold">
                    Resolution Rate
                  </div>

                  <div className="display-6 fw-bold mt-2">
                    78%
                  </div>

                  <div className="small text-success mt-2">
                    <i className="bi bi-arrow-up me-1" />
                    4.8% improvement
                  </div>
                </div>

                <div className="rounded-3 bg-success-subtle text-success p-3">
                  <i className="bi bi-check2-circle fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PRIORITY QUEUE + AI INTELLIGENCE
      ====================================================== */}

      <div className="row g-4 mb-4">
        {/* Priority Queue */}

        <div className="col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-0">
              <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Priority Queue
                  </h2>

                  <p className="small text-secondary mb-0">
                    Reports requiring administrative attention.
                  </p>
                </div>

                <Link
                  to="/admin/reports"
                  className="btn btn-sm btn-outline-primary"
                >
                  View all
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Report</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Age</th>
                      <th className="pe-4" />
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.reference}>
                        <td className="ps-4">
                          <div className="fw-semibold">
                            {report.reference}
                          </div>

                          <div className="small text-secondary">
                            {report.category}
                          </div>
                        </td>

                        <td>
                          {report.location}
                        </td>

                        <td>
                          <span className="small">
                            {report.status}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge ${priorityStyles[report.priority]}`}
                          >
                            {report.priority}
                          </span>
                        </td>

                        <td className="text-secondary">
                          {report.age}
                        </td>

                        <td className="pe-4">
                          <Link
                            to={`/admin/reports/${report.reference}`}
                            className="btn btn-sm btn-light"
                            aria-label={`View ${report.reference}`}
                          >
                            <i className="bi bi-chevron-right" />
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

        {/* AI Intelligence */}

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <div className="text-primary small fw-bold text-uppercase">
                    Decision Support
                  </div>

                  <h2 className="h5 fw-bold mt-1 mb-1">
                    AI Intelligence
                  </h2>

                  <p className="small text-secondary mb-0">
                    Signals detected from current report data.
                  </p>
                </div>

                <i className="bi bi-stars text-primary fs-4" />
              </div>

              {/* Critical AI signal */}

              <div className="alert alert-danger border-0 mb-3">
                <div className="d-flex gap-2">
                  <i className="bi bi-exclamation-octagon fs-5" />

                  <div>
                    <div className="fw-bold">
                      Critical area detected
                    </div>

                    <div className="small mt-1">
                      Road infrastructure reports are highly
                      concentrated in Gasabo.
                    </div>
                  </div>
                </div>
              </div>

              {/* Trend AI signal */}

              <div className="alert alert-warning border-0 mb-3">
                <div className="d-flex gap-2">
                  <i className="bi bi-graph-up-arrow fs-5" />

                  <div>
                    <div className="fw-bold">
                      Increasing report pattern
                    </div>

                    <div className="small mt-1">
                      Street-lighting reports increased during
                      the current reporting period.
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence */}

              <div className="border rounded-3 p-3">
                <div className="d-flex justify-content-between">
                  <span className="small text-secondary">
                    Analysis confidence
                  </span>

                  <strong>
                    87%
                  </strong>
                </div>

                <div
                  className="progress mt-2"
                  style={{ height: '6px' }}
                >
                  <div
                    className="progress-bar"
                    style={{ width: '87%' }}
                  />
                </div>
              </div>

              <div className="small text-secondary mt-3">
                <i className="bi bi-info-circle me-1" />

                AI recommendations support administrators.
                Final decisions remain under human control.
              </div>

              <Link
                to="/admin/ai-analyzer"
                className="btn btn-primary w-100 mt-3"
              >
                Open AI Analyzer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANALYTICS
      ====================================================== */}

      <div className="row g-4 mb-4">
        {/* Report Activity */}

        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Report Activity
                  </h2>

                  <p className="small text-secondary mb-0">
                    Report submission trend over the last six months.
                  </p>
                </div>

                <select
                  className="form-select form-select-sm"
                  style={{ width: '130px' }}
                  defaultValue="6"
                  aria-label="Report activity period"
                >
                  <option value="6">
                    6 months
                  </option>

                  <option value="12">
                    12 months
                  </option>
                </select>
              </div>

              <ReactECharts
                style={{ height: '300px' }}
                option={{
                  tooltip: {
                    trigger: 'axis',
                  },

                  grid: {
                    left: 40,
                    right: 20,
                    top: 20,
                    bottom: 35,
                  },

                  xAxis: {
                    type: 'category',

                    data: [
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                    ],

                    axisTick: {
                      show: false,
                    },
                  },

                  yAxis: {
                    type: 'value',

                    splitLine: {
                      lineStyle: {
                        type: 'dashed',
                      },
                    },
                  },

                  series: [
                    {
                      name: 'Reports',
                      type: 'line',

                      data: [
                        42,
                        58,
                        51,
                        73,
                        66,
                        84,
                      ],

                      smooth: true,

                      symbol: 'circle',

                      symbolSize: 8,

                      lineStyle: {
                        width: 3,
                      },

                      areaStyle: {
                        opacity: 0.08,
                      },
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>

        {/* Reports by Category */}

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-1">
                Reports by Category
              </h2>

              <p className="small text-secondary mb-3">
                Distribution of infrastructure issues.
              </p>

              <ReactECharts
                style={{ height: '300px' }}
                option={{
                  tooltip: {
                    trigger: 'item',
                  },

                  legend: {
                    orient: 'vertical',
                    right: 0,
                    top: 'center',
                  },

                  series: [
                    {
                      name: 'Reports',

                      type: 'pie',

                      radius: [
                        '52%',
                        '75%',
                      ],

                      center: [
                        '35%',
                        '50%',
                      ],

                      avoidLabelOverlap: true,

                      itemStyle: {
                        borderRadius: 6,
                        borderColor: '#fff',
                        borderWidth: 2,
                      },

                      label: {
                        show: false,
                      },

                      data: [
                        {
                          value: 94,
                          name: 'Road Damage',
                        },
                        {
                          value: 59,
                          name: 'Street Lighting',
                        },
                        {
                          value: 45,
                          name: 'Drainage',
                        },
                        {
                          value: 30,
                          name: 'Waste Management',
                        },
                        {
                          value: 20,
                          name: 'Other',
                        },
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DEPARTMENT WORKLOAD + RECENT ACTIVITY
      ====================================================== */}

      <div className="row g-4">
        {/* Department Workload */}

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Department Workload
                  </h2>

                  <p className="small text-secondary mb-0">
                    Active reports by responsible department.
                  </p>
                </div>

                <Link
                  to="/admin/departments"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Manage
                </Link>
              </div>

              {[
                {
                  name: 'Public Works',
                  reports: 31,
                },
                {
                  name: 'Infrastructure',
                  reports: 24,
                },
                {
                  name: 'Utilities',
                  reports: 18,
                },
                {
                  name: 'Environment',
                  reports: 11,
                },
              ].map((department) => (
                <div
                  key={department.name}
                  className="mb-3"
                >
                  <div className="d-flex justify-content-between small mb-1">
                    <span className="fw-semibold">
                      {department.name}
                    </span>

                    <span className="text-secondary">
                      {department.reports} active
                    </span>
                  </div>

                  <div
                    className="progress"
                    style={{ height: '8px' }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.min(
                          department.reports * 2.5,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Recent Activity
                  </h2>

                  <p className="small text-secondary mb-0">
                    Latest administrative events.
                  </p>
                </div>

                <Link
                  to="/admin/notifications"
                  className="btn btn-sm btn-outline-secondary"
                >
                  View all
                </Link>
              </div>

              <div className="list-group list-group-flush">
                {/* Activity 1 */}

                <div className="list-group-item px-0 d-flex gap-3">
                  <div className="rounded-circle bg-danger-subtle text-danger p-2 align-self-start">
                    <i className="bi bi-exclamation-triangle" />
                  </div>

                  <div>
                    <div className="small fw-semibold">
                      Critical report identified
                    </div>

                    <div className="small text-secondary">
                      RH-001245 was flagged for immediate review.
                    </div>

                    <div className="small text-secondary mt-1">
                      12 minutes ago
                    </div>
                  </div>
                </div>

                {/* Activity 2 */}

                <div className="list-group-item px-0 d-flex gap-3">
                  <div className="rounded-circle bg-primary-subtle text-primary p-2 align-self-start">
                    <i className="bi bi-person-check" />
                  </div>

                  <div>
                    <div className="small fw-semibold">
                      Report assigned
                    </div>

                    <div className="small text-secondary">
                      RH-001246 assigned to Infrastructure.
                    </div>

                    <div className="small text-secondary mt-1">
                      38 minutes ago
                    </div>
                  </div>
                </div>

                {/* Activity 3 */}

                <div className="list-group-item px-0 d-flex gap-3">
                  <div className="rounded-circle bg-success-subtle text-success p-2 align-self-start">
                    <i className="bi bi-check-circle" />
                  </div>

                  <div>
                    <div className="small fw-semibold">
                      Report resolved
                    </div>

                    <div className="small text-secondary">
                      RH-001239 was marked as resolved.
                    </div>

                    <div className="small text-secondary mt-1">
                      1 hour ago
                    </div>
                  </div>
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