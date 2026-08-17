import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { getReports } from '../../services/reportService'

import type {
  Report,
  ReportPriority,
} from '../../types/report'

/*
 * ============================================================
 * TYPES
 * ============================================================
 */

type CategorySummary = {
  name: string
  count: number
}

type AnalyticsStats = {
  total: number
  resolved: number
  inProgress: number
  underReview: number
  critical: number
  high: number
  medium: number
  low: number
  mapped: number
  resolutionRate: number
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function getPriorityClass(
  priority: ReportPriority,
): string {
  switch (priority) {
    case 'Critical':
      return 'danger'

    case 'High':
      return 'warning'

    case 'Medium':
      return 'primary'

    case 'Low':
      return 'secondary'

    default:
      return 'secondary'
  }
}

function formatDate(
  date?: string,
): string {
  if (!date) {
    return 'Date unavailable'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date unavailable'
  }

  return parsedDate.toLocaleDateString(
    undefined,
    {
      dateStyle: 'medium',
    },
  )
}

function getPercentage(
  value: number,
  total: number,
): number {
  if (
    total <= 0 ||
    value <= 0
  ) {
    return 0
  }

  return Math.round(
    (value / total) * 100,
  )
}

function isValidCoordinate(
  value: unknown,
): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value)
  )
}

/*
 * ============================================================
 * ADMIN ANALYTICS
 * ============================================================
 */

function AdminAnalytics() {
  /*
   * ----------------------------------------------------------
   * REPORT DATA
   * ----------------------------------------------------------
   */

  const reports = useMemo<Report[]>(
    () => getReports(),
    [],
  )

  /*
   * ----------------------------------------------------------
   * CORE STATISTICS
   * ----------------------------------------------------------
   */

  const stats = useMemo<AnalyticsStats>(() => {
    const total = reports.length

    let resolved = 0
    let inProgress = 0
    let underReview = 0

    let critical = 0
    let high = 0
    let medium = 0
    let low = 0

    let mapped = 0

    reports.forEach((report) => {
      /*
       * Status
       */

      if (report.status === 'Resolved') {
        resolved += 1
      }

      if (report.status === 'In Progress') {
        inProgress += 1
      }

      if (report.status === 'Under Review') {
        underReview += 1
      }

      /*
       * Priority
       */

      switch (report.priority) {
        case 'Critical':
          critical += 1
          break

        case 'High':
          high += 1
          break

        case 'Medium':
          medium += 1
          break

        case 'Low':
          low += 1
          break
      }

      /*
       * Coordinates
       */

      if (
        isValidCoordinate(report.latitude) &&
        isValidCoordinate(report.longitude)
      ) {
        mapped += 1
      }
    })

    return {
      total,
      resolved,
      inProgress,
      underReview,
      critical,
      high,
      medium,
      low,
      mapped,
      resolutionRate:
        getPercentage(
          resolved,
          total,
        ),
    }
  }, [reports])

  /*
   * ----------------------------------------------------------
   * CATEGORY ANALYSIS
   * ----------------------------------------------------------
   */

  const categoryData =
    useMemo<CategorySummary[]>(() => {
      const counts =
        new Map<string, number>()

      reports.forEach((report) => {
        const category =
          report.category?.trim() ||
          'Uncategorized'

        counts.set(
          category,
          (counts.get(category) ?? 0) + 1,
        )
      })

      return Array.from(
        counts.entries(),
      )
        .map(
          ([name, count]) => ({
            name,
            count,
          }),
        )
        .sort(
          (a, b) =>
            b.count - a.count,
        )
    }, [reports])

  /*
   * ----------------------------------------------------------
   * LOCATION ANALYSIS
   * ----------------------------------------------------------
   */

  const locationData =
    useMemo<CategorySummary[]>(() => {
      const counts =
        new Map<string, number>()

      reports.forEach((report) => {
        const location =
          report.location?.trim() ||
          'Unknown location'

        counts.set(
          location,
          (counts.get(location) ?? 0) + 1,
        )
      })

      return Array.from(
        counts.entries(),
      )
        .map(
          ([name, count]) => ({
            name,
            count,
          }),
        )
        .sort(
          (a, b) =>
            b.count - a.count,
        )
        .slice(0, 5)
    }, [reports])

  /*
   * ----------------------------------------------------------
   * RECENT REPORTS
   * ----------------------------------------------------------
   */

  const recentReports =
    useMemo<Report[]>(() => {
      return [...reports]
        .sort((a, b) => {
          const dateA =
            new Date(
              a.createdAt,
            ).getTime()

          const dateB =
            new Date(
              b.createdAt,
            ).getTime()

          return (
            (Number.isNaN(dateB)
              ? 0
              : dateB) -
            (Number.isNaN(dateA)
              ? 0
              : dateA)
          )
        })
        .slice(0, 6)
    }, [reports])

  /*
   * ----------------------------------------------------------
   * PRIORITY DATA
   * ----------------------------------------------------------
   */

  const priorityData = [
    {
      label: 'Critical',
      count: stats.critical,
      className: 'danger',
    },
    {
      label: 'High',
      count: stats.high,
      className: 'warning',
    },
    {
      label: 'Medium',
      count: stats.medium,
      className: 'primary',
    },
    {
      label: 'Low',
      count: stats.low,
      className: 'secondary',
    },
  ]

  /*
   * ----------------------------------------------------------
   * TOP CATEGORY
   * ----------------------------------------------------------
   */

  const topCategory =
    categoryData[0] ?? null

  /*
   * ----------------------------------------------------------
   * RENDER
   * ----------------------------------------------------------
   */

  return (
    <div className="container-fluid px-0">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">

        <div className="min-width-0">

          <div className="text-primary small fw-bold text-uppercase mb-1">
            Overview
          </div>

          <h1 className="h2 fw-bold mb-2">
            Analytics
          </h1>

          <p className="text-secondary mb-0">
            Understand reporting trends, operational
            workload, priorities, geographic concentration,
            and resolution performance.
          </p>

        </div>

        <div className="d-flex flex-wrap gap-2">

          <Link
            to="/admin/map"
            className="btn btn-outline-primary"
          >
            <i
              className="bi bi-geo-alt me-2"
              aria-hidden="true"
            />
            Open Map
          </Link>

          <Link
            to="/admin/reports"
            className="btn btn-primary"
          >
            <i
              className="bi bi-file-earmark-text me-2"
              aria-hidden="true"
            />
            View Reports
          </Link>

        </div>

      </div>

      {/* ====================================================
          DECISION SUPPORT NOTICE
      ==================================================== */}

      <div className="alert alert-info border-0 shadow-sm mb-4">

        <div className="d-flex gap-3">

          <i
            className="bi bi-bar-chart-line fs-5 flex-shrink-0"
            aria-hidden="true"
          />

          <div>

            <div className="fw-semibold">
              Administrative decision support
            </div>

            <div className="small mt-1">
              Analytics summarize information already
              submitted to ReportHub. They help administrators
              identify patterns and workload priorities.
              Final operational decisions remain under human
              administrative control.
            </div>

          </div>

        </div>

      </div>

      {/* ====================================================
          PRIMARY KPI CARDS
      ==================================================== */}

      <div className="row g-3 mb-4">

        <MetricCard
          label="Total Reports"
          value={stats.total}
          icon="bi-file-earmark-text"
          iconClass="text-primary"
        />

        <MetricCard
          label="Resolved"
          value={stats.resolved}
          icon="bi-check-circle"
          iconClass="text-success"
          footer={`${stats.resolutionRate}% resolution rate`}
        />

        <MetricCard
          label="In Progress"
          value={stats.inProgress}
          icon="bi-arrow-repeat"
          iconClass="text-primary"
        />

        <MetricCard
          label="Critical"
          value={stats.critical}
          icon="bi-exclamation-triangle"
          iconClass="text-danger"
          footer={
            stats.critical > 0
              ? 'Requires attention'
              : 'No critical reports'
          }
        />

      </div>

      {/* ====================================================
          SECONDARY METRICS
      ==================================================== */}

      <div className="row g-3 mb-4">

        <SmallMetricCard
          label="Under Review"
          value={stats.underReview}
          icon="bi-search"
          iconClass="text-warning"
        />

        <SmallMetricCard
          label="High Priority"
          value={stats.high}
          icon="bi-exclamation-circle"
          iconClass="text-warning"
        />

        <SmallMetricCard
          label="Categories"
          value={categoryData.length}
          icon="bi-grid"
          iconClass="text-primary"
        />

        <SmallMetricCard
          label="Mapped Reports"
          value={stats.mapped}
          icon="bi-geo-alt"
          iconClass="text-success"
        />

      </div>

      {/* ====================================================
          MAIN ANALYTICS
      ==================================================== */}

      <div className="row g-4 mb-4">

        {/* CATEGORY ANALYSIS */}

        <div className="col-12 col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-4">

              <h2 className="h5 fw-bold mb-1">
                Reports by Category
              </h2>

              <p className="small text-secondary mb-0">
                Most frequently reported infrastructure
                issues.
              </p>

            </div>

            <div className="card-body pt-0">

              {categoryData.length === 0 ? (
                <EmptyState
                  icon="bi-bar-chart"
                  text="No category data available."
                />
              ) : (
                categoryData
                  .slice(0, 6)
                  .map((category) => {
                    const percentage =
                      getPercentage(
                        category.count,
                        stats.total,
                      )

                    return (
                      <div
                        key={category.name}
                        className="mb-4"
                      >

                        <div className="d-flex justify-content-between align-items-center gap-3 mb-2">

                          <span className="small fw-semibold text-truncate">
                            {category.name}
                          </span>

                          <span className="small text-secondary flex-shrink-0">
                            {category.count}{' '}
                            ({percentage}%)
                          </span>

                        </div>

                        <div
                          className="progress"
                          style={{
                            height: '8px',
                          }}
                        >

                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${percentage}%`,
                            }}
                            aria-valuenow={
                              percentage
                            }
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${category.name}: ${percentage}%`}
                          />

                        </div>

                      </div>
                    )
                  })
              )}

            </div>

          </div>

        </div>

        {/* STATUS ANALYSIS */}

        <div className="col-12 col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-4">

              <h2 className="h5 fw-bold mb-1">
                Report Status
              </h2>

              <p className="small text-secondary mb-0">
                Current operational workload distribution.
              </p>

            </div>

            <div className="card-body pt-0">

              <StatusRow
                label="Resolved"
                value={stats.resolved}
                total={stats.total}
                color="bg-success"
              />

              <StatusRow
                label="In Progress"
                value={stats.inProgress}
                total={stats.total}
                color="bg-primary"
              />

              <StatusRow
                label="Under Review"
                value={stats.underReview}
                total={stats.total}
                color="bg-warning"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================
          PRIORITY + GEOGRAPHIC ANALYSIS
      ==================================================== */}

      <div className="row g-4 mb-4">

        {/* PRIORITY */}

        <div className="col-12 col-lg-5">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-4">

              <h2 className="h5 fw-bold mb-1">
                Priority Distribution
              </h2>

              <p className="small text-secondary mb-0">
                Breakdown of report urgency levels.
              </p>

            </div>

            <div className="card-body pt-0">

              {priorityData.map(
                (priority) => {
                  const percentage =
                    getPercentage(
                      priority.count,
                      stats.total,
                    )

                  return (
                    <div
                      key={priority.label}
                      className="mb-4"
                    >

                      <div className="d-flex align-items-center gap-2 mb-2">

                        <span
                          className={`rounded-circle bg-${priority.className}`}
                          style={{
                            width: '10px',
                            height: '10px',
                          }}
                          aria-hidden="true"
                        />

                        <span className="small fw-semibold flex-grow-1">
                          {priority.label}
                        </span>

                        <span className="small text-secondary">
                          {priority.count}
                        </span>

                      </div>

                      <div
                        className="progress"
                        style={{
                          height: '7px',
                        }}
                      >

                        <div
                          className={`progress-bar bg-${priority.className}`}
                          role="progressbar"
                          style={{
                            width: `${percentage}%`,
                          }}
                          aria-valuenow={
                            percentage
                          }
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />

                      </div>

                    </div>
                  )
                },
              )}

            </div>

          </div>

        </div>

        {/* LOCATION */}

        <div className="col-12 col-lg-7">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">

                <div>

                  <h2 className="h5 fw-bold mb-1">
                    Geographic Concentration
                  </h2>

                  <p className="small text-secondary mb-0">
                    Areas with the highest report volume.
                  </p>

                </div>

                <Link
                  to="/admin/map"
                  className="small fw-semibold text-decoration-none flex-shrink-0"
                >
                  Open Map
                  <i
                    className="bi bi-arrow-right ms-1"
                    aria-hidden="true"
                  />
                </Link>

              </div>

            </div>

            <div className="card-body pt-0">

              {locationData.length === 0 ? (
                <EmptyState
                  icon="bi-geo-alt"
                  text="No location data available."
                />
              ) : (
                locationData.map(
                  (location, index) => {
                    const percentage =
                      getPercentage(
                        location.count,
                        stats.total,
                      )

                    return (
                      <div
                        key={location.name}
                        className="d-flex align-items-center gap-3 py-3 border-bottom"
                      >

                        <div
                          className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                          style={{
                            width: '36px',
                            height: '36px',
                          }}
                        >
                          {index + 1}
                        </div>

                        <div className="flex-grow-1 min-width-0">

                          <div className="fw-semibold text-truncate">
                            {location.name}
                          </div>

                          <div className="small text-secondary">
                            {percentage}% of reports
                          </div>

                        </div>

                        <span className="badge text-bg-light border flex-shrink-0">
                          {location.count}
                        </span>

                      </div>
                    )
                  },
                )
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================
          OPERATIONAL INSIGHTS
      ==================================================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-header bg-white border-0 p-4">

          <div className="d-flex gap-3">

            <div
              className="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: '40px',
                height: '40px',
              }}
            >
              <i
                className="bi bi-lightbulb"
                aria-hidden="true"
              />
            </div>

            <div>

              <h2 className="h5 fw-bold mb-1">
                Operational Insights
              </h2>

              <p className="small text-secondary mb-0">
                Automatically calculated observations from
                current report data.
              </p>

            </div>

          </div>

        </div>

        <div className="card-body pt-0">

          <div className="row g-3">

            <InsightCard
              icon="bi-exclamation-triangle"
              title="Priority attention"
              text={
                stats.critical > 0
                  ? `${stats.critical} critical report${
                      stats.critical === 1
                        ? ''
                        : 's'
                    } require administrative attention.`
                  : 'No critical reports are currently recorded.'
              }
              className={
                stats.critical > 0
                  ? 'danger'
                  : 'success'
              }
            />

            <InsightCard
              icon="bi-bar-chart-line"
              title="Top issue category"
              text={
                topCategory
                  ? `${topCategory.name} is currently the most frequently reported category with ${topCategory.count} report${
                      topCategory.count === 1
                        ? ''
                        : 's'
                    }.`
                  : 'There is not enough category data to identify a leading issue.'
              }
              className="primary"
            />

            <InsightCard
              icon="bi-check-circle"
              title="Resolution performance"
              text={
                stats.total > 0
                  ? `${stats.resolutionRate}% of recorded reports are currently resolved.`
                  : 'No reports are available to calculate resolution performance.'
              }
              className="success"
            />

          </div>

        </div>

      </div>

      {/* ====================================================
          RECENT REPORTS
      ==================================================== */}

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white border-0 p-4">

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">

            <div>

              <h2 className="h5 fw-bold mb-1">
                Recent Reports
              </h2>

              <p className="small text-secondary mb-0">
                Latest reports recorded in ReportHub.
              </p>

            </div>

            <Link
              to="/admin/reports"
              className="small fw-semibold text-decoration-none"
            >
              View all
              <i
                className="bi bi-arrow-right ms-1"
                aria-hidden="true"
              />
            </Link>

          </div>

        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

              <tr>

                <th className="ps-4">
                  Reference
                </th>

                <th>
                  Category
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

                <th className="pe-4">
                  Submitted
                </th>

              </tr>

            </thead>

            <tbody>

              {recentReports.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-5"
                  >

                    <EmptyState
                      icon="bi-file-earmark-text"
                      text="No reports available."
                    />

                  </td>

                </tr>

              ) : (

                recentReports.map(
                  (report) => (
                    <tr
                      key={report.reference}
                    >

                      <td className="ps-4">

                        <Link
                          to={`/admin/reports/${encodeURIComponent(
                            report.reference,
                          )}`}
                          className="fw-semibold text-decoration-none font-monospace"
                        >
                          {report.reference}
                        </Link>

                      </td>

                      <td>
                        {report.category}
                      </td>

                      <td className="text-secondary">
                        {report.location}
                      </td>

                      <td>

                        <span
                          className={`badge text-bg-${getPriorityClass(
                            report.priority,
                          )}`}
                        >
                          {report.priority}
                        </span>

                      </td>

                      <td>

                        <span className="badge text-bg-light border">
                          {report.status}
                        </span>

                      </td>

                      <td className="pe-4 text-secondary small">
                        {formatDate(
                          report.createdAt,
                        )}
                      </td>

                    </tr>
                  ),
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

/*
 * ============================================================
 * METRIC CARD
 * ============================================================
 */

function MetricCard({
  label,
  value,
  icon,
  iconClass,
  footer,
}: {
  label: string
  value: number
  icon: string
  iconClass: string
  footer?: string
}) {
  return (
    <div className="col-6 col-md-6 col-xl-3">

      <div className="card border-0 shadow-sm h-100">

        <div className="card-body p-3 p-md-4">

          <div className="d-flex justify-content-between align-items-start gap-3">

            <div className="min-width-0">

              <div className="small text-secondary">
                {label}
              </div>

              <div className="display-6 fw-bold mt-1">
                {value}
              </div>

              {footer && (
                <div className="small text-secondary mt-1">
                  {footer}
                </div>
              )}

            </div>

            <div
              className={`fs-4 ${iconClass} flex-shrink-0`}
            >
              <i
                className={`bi ${icon}`}
                aria-hidden="true"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

/*
 * ============================================================
 * SMALL METRIC CARD
 * ============================================================
 */

function SmallMetricCard({
  label,
  value,
  icon,
  iconClass,
}: {
  label: string
  value: number
  icon: string
  iconClass: string
}) {
  return (
    <div className="col-6 col-lg-3">

      <div className="card border-0 shadow-sm h-100">

        <div className="card-body p-3">

          <div className="d-flex justify-content-between align-items-center gap-3">

            <div>

              <div className="small text-secondary">
                {label}
              </div>

              <div className="h3 fw-bold mt-1 mb-0">
                {value}
              </div>

            </div>

            <i
              className={`bi ${icon} ${iconClass} fs-4 flex-shrink-0`}
              aria-hidden="true"
            />

          </div>

        </div>

      </div>

    </div>
  )
}

/*
 * ============================================================
 * STATUS ROW
 * ============================================================
 */

function StatusRow({
  label,
  value,
  total,
  color,
}: {
  label: string
  value: number
  total: number
  color: string
}) {
  const percentage =
    getPercentage(
      value,
      total,
    )

  return (
    <div className="mb-4">

      <div className="d-flex justify-content-between align-items-center mb-2">

        <span className="small fw-semibold">
          {label}
        </span>

        <span className="small text-secondary">
          {value} ({percentage}%)
        </span>

      </div>

      <div
        className="progress"
        style={{
          height: '8px',
        }}
      >

        <div
          className={`progress-bar ${color}`}
          role="progressbar"
          style={{
            width: `${percentage}%`,
          }}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${percentage}%`}
        />

      </div>

    </div>
  )
}

/*
 * ============================================================
 * INSIGHT CARD
 * ============================================================
 */

function InsightCard({
  icon,
  title,
  text,
  className,
}: {
  icon: string
  title: string
  text: string
  className: string
}) {
  return (
    <div className="col-12 col-lg-4">

      <div
        className={`border rounded-3 p-3 h-100 bg-${className}-subtle`}
      >

        <div className="d-flex gap-3">

          <i
            className={`bi ${icon} text-${className} fs-5 flex-shrink-0`}
            aria-hidden="true"
          />

          <div className="min-width-0">

            <div className="fw-semibold">
              {title}
            </div>

            <div className="small text-secondary mt-1">
              {text}
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

/*
 * ============================================================
 * EMPTY STATE
 * ============================================================
 */

function EmptyState({
  icon,
  text,
}: {
  icon: string
  text: string
}) {
  return (
    <div className="text-center text-secondary py-4">

      <i
        className={`bi ${icon} fs-2 d-block mb-2`}
        aria-hidden="true"
      />

      <div className="small">
        {text}
      </div>

    </div>
  )
}

export default AdminAnalytics