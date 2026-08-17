import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { getReports } from '../../services/reportService'

import type {
  Report,
  ReportPriority,
  ReportStatus,
} from '../../types/report'

/*
 * ============================================================
 * FILTER TYPES
 * ============================================================
 */

type StatusFilter = 'All' | ReportStatus
type PriorityFilter = 'All' | ReportPriority

/*
 * ============================================================
 * STATUS BADGE
 * ============================================================
 */

function getStatusClass(status: ReportStatus): string {
  switch (status) {
    case 'Under Review':
      return 'warning'

    case 'In Progress':
      return 'primary'

    case 'Resolved':
      return 'success'

    default:
      return 'secondary'
  }
}

/*
 * ============================================================
 * PRIORITY BADGE
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

/*
 * ============================================================
 * DATE FORMATTER
 * ============================================================
 */

function formatDate(date: string): string {
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

/*
 * ============================================================
 * ADMIN REPORTS
 * ============================================================
 */

function AdminReports() {
  /*
   * ----------------------------------------------------------
   * REPORT DATA
   * ----------------------------------------------------------
   */

  const reports = useMemo(
    () => getReports(),
    [],
  )

  /*
   * ----------------------------------------------------------
   * FILTER STATE
   * ----------------------------------------------------------
   */

  const [searchTerm, setSearchTerm] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('All')

  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>('All')

  /*
   * ----------------------------------------------------------
   * SUMMARY STATISTICS
   * ----------------------------------------------------------
   */

  const totalReports =
    reports.length

  const criticalCount =
    reports.filter(
      (report) =>
        report.priority === 'Critical',
    ).length

  const underReviewCount =
    reports.filter(
      (report) =>
        report.status === 'Under Review',
    ).length

  const inProgressCount =
    reports.filter(
      (report) =>
        report.status === 'In Progress',
    ).length

  const resolvedCount =
    reports.filter(
      (report) =>
        report.status === 'Resolved',
    ).length

  const mappedCount =
    reports.filter(
      (report) =>
        typeof report.latitude === 'number' &&
        Number.isFinite(report.latitude) &&
        typeof report.longitude === 'number' &&
        Number.isFinite(report.longitude),
    ).length

  /*
   * ----------------------------------------------------------
   * RESOLUTION RATE
   * ----------------------------------------------------------
   */

  const resolutionRate =
    totalReports === 0
      ? 0
      : Math.round(
          (resolvedCount / totalReports) * 100,
        )

  /*
   * ----------------------------------------------------------
   * FILTER REPORTS
   * ----------------------------------------------------------
   */

  const filteredReports = useMemo(() => {
    const normalizedSearch =
      searchTerm
        .trim()
        .toLowerCase()

    return reports.filter((report) => {
      const reference =
        String(
          report.reference ?? '',
        ).toLowerCase()

      const category =
        String(
          report.category ?? '',
        ).toLowerCase()

      const location =
        String(
          report.location ?? '',
        ).toLowerCase()

      const description =
        String(
          report.description ?? '',
        ).toLowerCase()

      const matchesSearch =
        normalizedSearch === '' ||
        reference.includes(
          normalizedSearch,
        ) ||
        category.includes(
          normalizedSearch,
        ) ||
        location.includes(
          normalizedSearch,
        ) ||
        description.includes(
          normalizedSearch,
        )

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
  }, [
    reports,
    searchTerm,
    statusFilter,
    priorityFilter,
  ])

  /*
   * ----------------------------------------------------------
   * FILTER STATE
   * ----------------------------------------------------------
   */

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All'

  /*
   * ----------------------------------------------------------
   * CLEAR FILTERS
   * ----------------------------------------------------------
   */

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    setPriorityFilter('All')
  }

  /*
   * ----------------------------------------------------------
   * RENDER
   * ----------------------------------------------------------
   */

  return (
    <div className="container-fluid px-0">

      {/* ====================================================
          PAGE HEADER
      ==================================================== */}

      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">

        <div className="min-width-0">

          <div className="text-primary small fw-bold text-uppercase mb-1">
            Operations
          </div>

          <h1 className="h2 fw-bold mb-2">
            Reports Management
          </h1>

          <p className="text-secondary mb-0">
            Review, prioritize, assign, and
            manage citizen infrastructure
            reports.
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
            Map Monitoring
          </Link>

          <Link
            to="/admin/analytics"
            className="btn btn-primary"
          >
            <i
              className="bi bi-bar-chart-line me-2"
              aria-hidden="true"
            />
            Analytics
          </Link>

        </div>

      </div>

      {/* ====================================================
          MAIN KPI CARDS
      ==================================================== */}

      <div className="row g-3 mb-4">

        <MetricCard
          label="Total Reports"
          value={totalReports}
          icon="bi-file-earmark-text"
          iconClass="text-primary"
        />

        <MetricCard
          label="Critical"
          value={criticalCount}
          icon="bi-exclamation-triangle"
          iconClass="text-danger"
          footer={
            criticalCount > 0
              ? 'Requires attention'
              : 'No critical reports'
          }
        />

        <MetricCard
          label="Under Review"
          value={underReviewCount}
          icon="bi-hourglass-split"
          iconClass="text-warning"
        />

        <MetricCard
          label="Resolved"
          value={resolvedCount}
          icon="bi-check-circle"
          iconClass="text-success"
          footer={`${resolutionRate}% resolution rate`}
        />

      </div>

      {/* ====================================================
          SECONDARY METRICS
      ==================================================== */}

      <div className="row g-3 mb-4">

        <SmallMetricCard
          label="In Progress"
          value={inProgressCount}
          icon="bi-arrow-repeat"
          iconClass="text-primary"
        />

        <SmallMetricCard
          label="Mapped Reports"
          value={mappedCount}
          icon="bi-geo-alt"
          iconClass="text-success"
        />

        <SmallMetricCard
          label="Visible Results"
          value={filteredReports.length}
          icon="bi-filter"
          iconClass="text-secondary"
        />

        <SmallMetricCard
          label="Resolution Rate"
          value={resolutionRate}
          suffix="%"
          icon="bi-graph-up"
          iconClass="text-success"
        />

      </div>

      {/* ====================================================
          REPORT MANAGEMENT CARD
      ==================================================== */}

      <div className="card border-0 shadow-sm">

        {/* ==================================================
            CARD HEADER
        ================================================== */}

        <div className="card-header bg-white border-0 p-3 p-md-4">

          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">

            <div>

              <h2 className="h5 fw-bold mb-1">
                All Reports
              </h2>

              <div className="small text-secondary">
                Showing{' '}
                <span className="fw-semibold text-dark">
                  {filteredReports.length}
                </span>{' '}
                of{' '}
                <span className="fw-semibold text-dark">
                  {totalReports}
                </span>{' '}
                reports
              </div>

            </div>

            {hasActiveFilters && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary align-self-start"
                onClick={clearFilters}
              >
                <i
                  className="bi bi-x-circle me-1"
                  aria-hidden="true"
                />
                Clear Filters
              </button>
            )}

          </div>

        </div>

        {/* ==================================================
            FILTER BAR
        ================================================== */}

        <div className="border-top border-bottom bg-light-subtle p-3 p-md-4">

          <div className="row g-3">

            {/* SEARCH */}

            <div className="col-12 col-lg-6">

              <label
                htmlFor="reportSearch"
                className="form-label small fw-semibold"
              >
                Search reports
              </label>

              <div className="input-group">

                <span
                  className="input-group-text bg-white"
                  aria-hidden="true"
                >
                  <i className="bi bi-search" />
                </span>

                <input
                  id="reportSearch"
                  type="search"
                  className="form-control"
                  placeholder="Reference, category, location, or description..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value,
                    )
                  }
                  aria-label="Search reports"
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setSearchTerm('')
                    }
                    aria-label="Clear search"
                  >
                    <i
                      className="bi bi-x-lg"
                      aria-hidden="true"
                    />
                  </button>
                )}

              </div>

            </div>

            {/* STATUS */}

            <div className="col-12 col-md-6 col-lg-3">

              <label
                htmlFor="statusFilter"
                className="form-label small fw-semibold"
              >
                Status
              </label>

              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target
                      .value as StatusFilter,
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

            {/* PRIORITY */}

            <div className="col-12 col-md-6 col-lg-3">

              <label
                htmlFor="priorityFilter"
                className="form-label small fw-semibold"
              >
                Priority
              </label>

              <select
                id="priorityFilter"
                className="form-select"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(
                    event.target
                      .value as PriorityFilter,
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

                <option value="Low">
                  Low
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* ==================================================
            ACTIVE FILTER SUMMARY
        ================================================== */}

        {hasActiveFilters && (
          <div className="px-3 px-md-4 py-3 border-bottom bg-white">

            <div className="d-flex flex-wrap align-items-center gap-2">

              <span className="small fw-semibold text-secondary">
                Active filters:
              </span>

              {searchTerm.trim() !== '' && (
                <span className="badge text-bg-light border">
                  Search: "{searchTerm.trim()}"
                </span>
              )}

              {statusFilter !== 'All' && (
                <span className="badge text-bg-light border">
                  Status: {statusFilter}
                </span>
              )}

              {priorityFilter !== 'All' && (
                <span className="badge text-bg-light border">
                  Priority: {priorityFilter}
                </span>
              )}

            </div>

          </div>
        )}

        {/* ==================================================
            TABLE
        ================================================== */}

        <div className="card-body p-0">

          {filteredReports.length === 0 ? (

            <EmptyState
              hasActiveFilters={
                hasActiveFilters
              }
              onClear={clearFilters}
            />

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">

                  <tr>

                    <th className="ps-3 ps-md-4 text-nowrap">
                      Reference
                    </th>

                    <th className="text-nowrap">
                      Report
                    </th>

                    <th className="text-nowrap">
                      Location
                    </th>

                    <th className="text-nowrap">
                      Status
                    </th>

                    <th className="text-nowrap">
                      Priority
                    </th>

                    <th className="text-nowrap">
                      Submitted
                    </th>

                    <th className="text-end pe-3 pe-md-4">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredReports.map(
                    (report: Report) => {

                      const hasCoordinates =
                        typeof report.latitude ===
                          'number' &&
                        Number.isFinite(
                          report.latitude,
                        ) &&
                        typeof report.longitude ===
                          'number' &&
                        Number.isFinite(
                          report.longitude,
                        )

                      return (
                        <tr
                          key={
                            report.reference
                          }
                        >

                          {/* REFERENCE */}

                          <td className="ps-3 ps-md-4">

                            <Link
                              to={`/admin/reports/${encodeURIComponent(
                                report.reference,
                              )}`}
                              className="fw-bold font-monospace text-decoration-none"
                              title="Open report details"
                            >
                              {
                                report.reference
                              }
                            </Link>

                          </td>

                          {/* REPORT */}

                          <td>

                            <div className="fw-semibold">
                              {
                                report.category
                              }
                            </div>

                            <div
                              className="small text-secondary text-truncate"
                              style={{
                                maxWidth:
                                  '260px',
                              }}
                              title={
                                report.description
                              }
                            >
                              {
                                report.description
                              }
                            </div>

                          </td>

                          {/* LOCATION */}

                          <td>

                            <div className="d-flex align-items-center gap-2">

                              <i
                                className="bi bi-geo-alt text-secondary flex-shrink-0"
                                aria-hidden="true"
                              />

                              <span
                                className="text-truncate"
                                style={{
                                  maxWidth:
                                    '180px',
                                }}
                                title={
                                  report.location
                                }
                              >
                                {
                                  report.location
                                }
                              </span>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`badge text-bg-${getStatusClass(
                                report.status,
                              )}`}
                            >
                              {
                                report.status
                              }
                            </span>

                          </td>

                          {/* PRIORITY */}

                          <td>

                            <span
                              className={`badge text-bg-${getPriorityClass(
                                report.priority,
                              )}`}
                            >
                              {
                                report.priority
                              }
                            </span>

                          </td>

                          {/* DATE */}

                          <td className="text-secondary small text-nowrap">

                            {formatDate(
                              report.createdAt,
                            )}

                          </td>

                          {/* ACTION */}

                          <td className="text-end pe-3 pe-md-4">

                            <div className="d-flex justify-content-end gap-2">

                              <Link
                                to={`/admin/reports/${encodeURIComponent(
                                  report.reference,
                                )}`}
                                className="btn btn-sm btn-outline-primary"
                                title="View report details"
                                aria-label={`View ${report.reference}`}
                              >
                                <i
                                  className="bi bi-eye me-1"
                                  aria-hidden="true"
                                />

                                <span className="d-none d-md-inline">
                                  View
                                </span>

                              </Link>

                              {hasCoordinates && (
                                <Link
                                  to={`/admin/map?reference=${encodeURIComponent(
                                    report.reference,
                                  )}`}
                                  className="btn btn-sm btn-outline-secondary"
                                  title="View report on map"
                                  aria-label={`View ${report.reference} on map`}
                                >
                                  <i
                                    className="bi bi-geo-alt"
                                    aria-hidden="true"
                                  />
                                </Link>
                              )}

                            </div>

                          </td>

                        </tr>
                      )
                    },
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        {filteredReports.length > 0 && (
          <div className="card-footer bg-white border-0 p-3 p-md-4">

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">

              <div className="small text-secondary">

                Showing{' '}
                <span className="fw-semibold text-dark">
                  {filteredReports.length}
                </span>{' '}
                matching report
                {filteredReports.length !==
                1
                  ? 's'
                  : ''}

              </div>

              <div className="small text-secondary">

                {hasActiveFilters
                  ? 'Filters are currently active.'
                  : 'Use filters to narrow the operational workload.'}

              </div>

            </div>

          </div>
        )}

      </div>

      {/* ====================================================
          ADMINISTRATIVE NOTE
      ==================================================== */}

      <div className="alert alert-info border-0 mt-4 mb-0">

        <div className="d-flex gap-3">

          <i
            className="bi bi-info-circle fs-5 flex-shrink-0"
            aria-hidden="true"
          />

          <div>

            <div className="fw-semibold">
              Administrative review
            </div>

            <div className="small mt-1">
              Report prioritization, assignment,
              and operational actions remain under
              administrator control. This interface
              supports review, coordination, and
              decision-making rather than making
              autonomous operational decisions.
            </div>

          </div>

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
    <div className="col-6 col-xl-3">

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
 * SMALL METRIC CARD
 * ============================================================
 */

function SmallMetricCard({
  label,
  value,
  suffix = '',
  icon,
  iconClass,
}: {
  label: string
  value: number
  suffix?: string
  icon: string
  iconClass: string
}) {
  return (
    <div className="col-6 col-md-3">

      <div className="card border-0 shadow-sm h-100">

        <div className="card-body p-3">

          <div className="d-flex justify-content-between align-items-center gap-2">

            <div className="min-width-0">

              <div className="small text-secondary">
                {label}
              </div>

              <div className="h4 fw-bold mb-0 mt-1">
                {value}
                {suffix}
              </div>

            </div>

            <i
              className={`bi ${icon} ${iconClass} fs-5 flex-shrink-0`}
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
 * EMPTY STATE
 * ============================================================
 */

function EmptyState({
  hasActiveFilters,
  onClear,
}: {
  hasActiveFilters: boolean
  onClear: () => void
}) {
  return (
    <div className="text-center p-5">

      <div className="text-secondary mb-3">

        <i
          className="bi bi-inbox fs-1"
          aria-hidden="true"
        />

      </div>

      <h3 className="h5 fw-bold">
        No reports found
      </h3>

      <p className="text-secondary mb-3">
        {hasActiveFilters
          ? 'No reports match your current search or filters.'
          : 'There are currently no reports available.'}
      </p>

      {hasActiveFilters && (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onClear}
        >
          <i
            className="bi bi-arrow-counterclockwise me-1"
            aria-hidden="true"
          />
          Clear Filters
        </button>
      )}

    </div>
  )
}

export default AdminReports