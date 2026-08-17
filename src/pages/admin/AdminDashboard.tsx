import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type ReportStatus =
  | 'Under Review'
  | 'In Progress'
  | 'Resolved'

type ReportPriority =
  | 'Critical'
  | 'High'
  | 'Medium'

type Report = {
  reference: string
  category: string
  location: string
  priority: ReportPriority
  status: ReportStatus
  submitted: string
}

type StatCardProps = {
  label: string
  value: string
  description: string
  icon: string
  iconClass: string
  href?: string
}

const recentReports: Report[] = [
  {
    reference: 'RPT-2026-0148',
    category: 'Water Supply',
    location: 'Kigali City',
    priority: 'Critical',
    status: 'Under Review',
    submitted: 'Today, 09:42',
  },
  {
    reference: 'RPT-2026-0147',
    category: 'Road Damage',
    location: 'Gasabo District',
    priority: 'High',
    status: 'In Progress',
    submitted: 'Today, 08:17',
  },
  {
    reference: 'RPT-2026-0146',
    category: 'Street Lighting',
    location: 'Kicukiro District',
    priority: 'Medium',
    status: 'In Progress',
    submitted: 'Yesterday, 16:35',
  },
  {
    reference: 'RPT-2026-0145',
    category: 'Waste Management',
    location: 'Nyarugenge District',
    priority: 'High',
    status: 'Under Review',
    submitted: 'Yesterday, 14:12',
  },
  {
    reference: 'RPT-2026-0144',
    category: 'Drainage',
    location: 'Gasabo District',
    priority: 'Medium',
    status: 'Resolved',
    submitted: 'Yesterday, 11:28',
  },
]

const reportTrend = [
  { month: 'Mar', submitted: 42, resolved: 31 },
  { month: 'Apr', submitted: 58, resolved: 44 },
  { month: 'May', submitted: 64, resolved: 49 },
  { month: 'Jun', submitted: 71, resolved: 55 },
  { month: 'Jul', submitted: 83, resolved: 67 },
  { month: 'Aug', submitted: 96, resolved: 72 },
]

const reportStatuses = [
  {
    name: 'Under Review',
    value: 64,
    color: '#ffc107',
  },
  {
    name: 'In Progress',
    value: 91,
    color: '#0d6efd',
  },
  {
    name: 'Resolved',
    value: 93,
    color: '#198754',
  },
]

const priorityReports = recentReports.filter(
  (report) =>
    report.priority === 'Critical' ||
    report.priority === 'High',
)

function StatCard({
  label,
  value,
  description,
  icon,
  iconClass,
  href,
}: StatCardProps) {
  const content = (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <div className="small text-secondary mb-2">
              {label}
            </div>

            <div className="display-6 fw-bold text-dark">
              {value}
            </div>

            <div className="small text-secondary mt-2">
              {description}
            </div>
          </div>

          <div className={`admin-stat-icon ${iconClass}`}>
            <i
              className={`bi ${icon}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  )

  if (!href) {
    return content
  }

  return (
    <Link
      to={href}
      className="text-decoration-none"
    >
      {content}
    </Link>
  )
}

function getPriorityClass(priority: ReportPriority) {
  switch (priority) {
    case 'Critical':
      return 'text-danger'

    case 'High':
      return 'text-warning'

    case 'Medium':
      return 'text-secondary'

    default:
      return 'text-secondary'
  }
}

function getPriorityBadgeClass(priority: ReportPriority) {
  switch (priority) {
    case 'Critical':
      return 'text-bg-danger'

    case 'High':
      return 'text-bg-warning'

    case 'Medium':
      return 'text-bg-secondary'

    default:
      return 'text-bg-secondary'
  }
}

function getStatusClass(status: ReportStatus) {
  switch (status) {
    case 'Under Review':
      return 'text-bg-warning'

    case 'In Progress':
      return 'text-bg-primary'

    case 'Resolved':
      return 'text-bg-success'

    default:
      return 'text-bg-secondary'
  }
}

function AdminDashboard() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'All' | ReportStatus
  >('All')
  const [priorityFilter, setPriorityFilter] = useState<
    'All' | ReportPriority
  >('All')

  const filteredReports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return recentReports.filter((report) => {
      const matchesSearch =
        normalizedSearch === '' ||
        report.reference.toLowerCase().includes(normalizedSearch) ||
        report.category.toLowerCase().includes(normalizedSearch) ||
        report.location.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'All' ||
        report.status === statusFilter

      const matchesPriority =
        priorityFilter === 'All' ||
        report.priority === priorityFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      )
    })
  }, [search, statusFilter, priorityFilter])

  const hasActiveFilters =
    search.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All'

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setPriorityFilter('All')
  }

  return (
    <div className="admin-dashboard">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="admin-dashboard-header mb-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">

          <div>
            <div className="section-label text-primary mb-2">
              Administration
            </div>

            <h1 className="fw-bold mb-2">
              Dashboard
            </h1>

            <p className="text-secondary mb-0">
              Monitor infrastructure reports, identify priority
              issues, and coordinate administrative response.
            </p>
          </div>

          <div className="admin-dashboard-actions d-flex flex-wrap gap-2">
            <Link
              to="/admin/reports"
              className="btn btn-primary"
            >
              <i
                className="bi bi-file-earmark-text me-2"
                aria-hidden="true"
              />
              Manage Reports
            </Link>

            <Link
              to="/admin/map"
              className="btn btn-outline-primary"
            >
              <i
                className="bi bi-geo-alt me-2"
                aria-hidden="true"
              />
              View Map
            </Link>
          </div>

        </div>
      </section>


      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <section className="mb-4">
        <div className="row g-4">

          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              label="Total Reports"
              value="248"
              description="All submitted reports"
              icon="bi-file-earmark-text"
              iconClass="admin-stat-primary"
              href="/admin/reports"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              label="Under Review"
              value="64"
              description="Awaiting administrative review"
              icon="bi-hourglass-split"
              iconClass="admin-stat-warning"
              href="/admin/reports"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              label="In Progress"
              value="91"
              description="Currently being addressed"
              icon="bi-arrow-repeat"
              iconClass="admin-stat-info"
              href="/admin/reports"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              label="Resolved"
              value="93"
              description="Successfully resolved reports"
              icon="bi-check-circle"
              iconClass="admin-stat-success"
              href="/admin/reports"
            />
          </div>

        </div>
      </section>


      {/* =====================================================
          FILTERS
          ===================================================== */}

      <section className="mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">

            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">

              <div>
                <h2 className="h5 fw-bold mb-1">
                  Report Overview
                </h2>

                <p className="small text-secondary mb-0">
                  Quickly search and filter recent infrastructure reports.
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn btn-sm btn-light align-self-start"
                  onClick={clearFilters}
                >
                  <i
                    className="bi bi-x-circle me-2"
                    aria-hidden="true"
                  />
                  Clear filters
                </button>
              )}

            </div>

            <div className="row g-3">

              <div className="col-12 col-lg-6">
                <label
                  htmlFor="dashboard-report-search"
                  className="visually-hidden"
                >
                  Search reports
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i
                      className="bi bi-search"
                      aria-hidden="true"
                    />
                  </span>

                  <input
                    id="dashboard-report-search"
                    type="search"
                    className="form-control"
                    placeholder="Search reference, issue, or location..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label
                  htmlFor="dashboard-status-filter"
                  className="visually-hidden"
                >
                  Filter by status
                </label>

                <select
                  id="dashboard-status-filter"
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as
                        | 'All'
                        | ReportStatus,
                    )
                  }
                >
                  <option value="All">
                    All statuses
                  </option>
                  <option value="Under Review">
                    Under Review
                  </option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Resolved">
                    Resolved
                  </option>
                </select>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label
                  htmlFor="dashboard-priority-filter"
                  className="visually-hidden"
                >
                  Filter by priority
                </label>

                <select
                  id="dashboard-priority-filter"
                  className="form-select"
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(
                      event.target.value as
                        | 'All'
                        | ReportPriority,
                    )
                  }
                >
                  <option value="All">
                    All priorities
                  </option>
                  <option value="Critical">
                    Critical
                  </option>
                  <option value="High">
                    High
                  </option>
                  <option value="Medium">
                    Medium
                  </option>
                </select>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          ANALYTICS
          ===================================================== */}

      <section className="mb-4">
        <div className="row g-4">

          <div className="col-12 col-xl-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start gap-3 mb-4">

                  <div>
                    <h2 className="h5 fw-bold mb-1">
                      Report Activity
                    </h2>

                    <p className="small text-secondary mb-0">
                      Monthly report submissions compared with resolutions.
                    </p>
                  </div>

                  <Link
                    to="/admin/analytics"
                    className="btn btn-sm btn-light"
                  >
                    View analytics
                  </Link>

                </div>

                <div
                  style={{
                    width: '100%',
                    height: 300,
                  }}
                >
                  <ResponsiveContainer>
                    <AreaChart data={reportTrend}>
                      <defs>
                        <linearGradient
                          id="submittedArea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#0d6efd"
                            stopOpacity={0.2}
                          />

                          <stop
                            offset="100%"
                            stopColor="#0d6efd"
                            stopOpacity={0}
                          />
                        </linearGradient>

                        <linearGradient
                          id="resolvedArea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#198754"
                            stopOpacity={0.18}
                          />

                          <stop
                            offset="100%"
                            stopColor="#198754"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="submitted"
                        name="Submitted"
                        stroke="#0d6efd"
                        strokeWidth={2.5}
                        fill="url(#submittedArea)"
                      />

                      <Area
                        type="monotone"
                        dataKey="resolved"
                        name="Resolved"
                        stroke="#198754"
                        strokeWidth={2.5}
                        fill="url(#resolvedArea)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </div>
          </div>


          <div className="col-12 col-xl-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <h2 className="h5 fw-bold mb-1">
                  Current Status
                </h2>

                <p className="small text-secondary mb-3">
                  Distribution of all submitted reports.
                </p>

                <div
                  className="position-relative"
                  style={{
                    height: 200,
                  }}
                >
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={reportStatuses}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={58}
                        outerRadius={82}
                        paddingAngle={3}
                      >
                        {reportStatuses.map((item) => (
                          <Cell
                            key={item.name}
                            fill={item.color}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="admin-donut-center">
                    <strong>
                      248
                    </strong>

                    <span>
                      Total reports
                    </span>
                  </div>
                </div>

                <div className="d-grid gap-3 mt-3">
                  {reportStatuses.map((item) => (
                    <div
                      key={item.name}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="admin-status-dot"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />

                        <span className="small">
                          {item.name}
                        </span>
                      </div>

                      <strong>
                        {item.value}
                      </strong>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          ATTENTION REQUIRED
          ===================================================== */}

      <section className="mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">

            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">

              <div>
                <div className="d-flex align-items-center gap-2">

                  <h2 className="h5 fw-bold mb-1">
                    Requires Attention
                  </h2>

                  <span className="badge text-bg-danger">
                    {priorityReports.length}
                  </span>

                </div>

                <p className="small text-secondary mb-0">
                  Critical and high-priority reports requiring administrative review.
                </p>
              </div>

              <Link
                to="/admin/reports"
                className="btn btn-sm btn-outline-primary align-self-start"
              >
                View all reports
              </Link>

            </div>

            <div className="row g-3">

              {priorityReports.slice(0, 3).map((report) => (
                <div
                  key={report.reference}
                  className="col-12 col-lg-4"
                >
                  <Link
                    to={`/admin/reports/${report.reference}`}
                    className="admin-alert-card h-100"
                  >
                    <div
                      className={`admin-alert-icon ${
                        report.priority === 'Critical'
                          ? 'admin-alert-danger'
                          : 'admin-alert-warning'
                      }`}
                    >
                      <i
                        className={
                          report.category === 'Water Supply'
                            ? 'bi bi-droplet'
                            : 'bi bi-exclamation-triangle'
                        }
                        aria-hidden="true"
                      />
                    </div>

                    <div className="flex-grow-1 min-width-0">

                      <div className="fw-semibold text-truncate">
                        {report.category}
                      </div>

                      <div className="small text-secondary">
                        {report.location} • {report.reference}
                      </div>

                      <div className="mt-2">
                        <span
                          className={`badge ${getPriorityBadgeClass(
                            report.priority,
                          )}`}
                        >
                          {report.priority}
                        </span>
                      </div>

                    </div>

                    <i
                      className="bi bi-chevron-right text-secondary"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          RECENT REPORTS
          ===================================================== */}

      <section className="mb-4">
        <div className="card border-0 shadow-sm">

          <div className="card-body p-0">

            <div className="p-4 border-bottom">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">

                <div>
                  <h2 className="h5 fw-bold mb-1">
                    Recent Reports
                  </h2>

                  <p className="small text-secondary mb-0">
                    Latest infrastructure issues submitted by citizens.
                  </p>
                </div>

                <Link
                  to="/admin/reports"
                  className="btn btn-sm btn-outline-primary align-self-start"
                >
                  Manage all reports
                </Link>

              </div>
            </div>

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead>
                  <tr>

                    <th className="ps-4">
                      Reference
                    </th>

                    <th>
                      Issue
                    </th>

                    <th>
                      Location
                    </th>

                    <th>
                      Priority
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Submitted
                    </th>

                    <th className="pe-4 text-end">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredReports.map((report) => (
                    <tr key={report.reference}>

                      <td className="ps-4">
                        <Link
                          to={`/admin/reports/${report.reference}`}
                          className="fw-semibold"
                        >
                          {report.reference}
                        </Link>
                      </td>

                      <td>
                        <div className="fw-medium">
                          {report.category}
                        </div>
                      </td>

                      <td>
                        <span className="small text-secondary">
                          <i
                            className="bi bi-geo-alt me-1"
                            aria-hidden="true"
                          />

                          {report.location}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`small fw-semibold ${getPriorityClass(
                            report.priority,
                          )}`}
                        >
                          {report.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${getStatusClass(
                            report.status,
                          )}`}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td className="small text-secondary">
                        {report.submitted}
                      </td>

                      <td className="pe-4 text-end">
                        <Link
                          to={`/admin/reports/${report.reference}`}
                          className="btn btn-sm btn-light"
                          aria-label={`View ${report.reference}`}
                        >
                          <i
                            className="bi bi-arrow-right"
                            aria-hidden="true"
                          />
                        </Link>
                      </td>

                    </tr>
                  ))}

                  {filteredReports.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-5"
                      >
                        <div className="text-secondary mb-2">
                          <i className="bi bi-search fs-3" />
                        </div>

                        <div className="fw-semibold">
                          No reports found
                        </div>

                        <div className="small text-secondary mt-1">
                          Try changing your search or filters.
                        </div>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary mt-3"
                          onClick={clearFilters}
                        >
                          Clear filters
                        </button>
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            <div className="px-4 py-3 border-top">
              <div className="small text-secondary">
                Showing{' '}
                <strong className="text-dark">
                  {filteredReports.length}
                </strong>{' '}
                of{' '}
                <strong className="text-dark">
                  {recentReports.length}
                </strong>{' '}
                recent reports
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          AI DECISION SUPPORT
          ===================================================== */}

      <section>
        <div className="card border-0 shadow-sm admin-ai-summary">

          <div className="card-body p-4">

            <div className="row align-items-center g-4">

              <div className="col-12 col-lg-8">

                <div className="d-flex gap-3">

                  <div className="admin-insight-icon flex-shrink-0">
                    <i
                      className="bi bi-stars"
                      aria-hidden="true"
                    />
                  </div>

                  <div>

                    <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">

                      <h2 className="h5 fw-bold mb-0">
                        AI Analyzer
                      </h2>

                      <span className="badge bg-primary-subtle text-primary">
                        Decision Support
                      </span>

                    </div>

                    <p className="small text-secondary mb-2">
                      Analyze report patterns, identify high-risk
                      areas, detect clusters, and prioritize issues
                      for human review.
                    </p>

                    <p className="small text-secondary mb-0">
                      AI recommendations do not approve, reject,
                      assign, or make operational decisions.
                      Administrators remain responsible for final
                      decisions.
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-12 col-lg-4 text-lg-end">

                <Link
                  to="/admin/ai-analyzer"
                  className="btn btn-primary"
                >
                  Open AI Analyzer

                  <i
                    className="bi bi-arrow-right ms-2"
                    aria-hidden="true"
                  />
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

export default AdminDashboard