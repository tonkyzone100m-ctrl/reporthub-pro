import {
  Link,
  useParams,
} from 'react-router-dom'

import {
  getReportByReference,
} from '../../services/reportService'

import type {
  ReportPriority,
  ReportStatus,
} from '../../types/report'

function AdminReportDetails() {
  const { id } = useParams<{
    id: string
  }>()

  const report = id
    ? getReportByReference(id)
    : undefined

  /*
   * ============================================================
   * FORMAT DATE
   * ============================================================
   */

  function formatDate(
    date: string,
  ): string {
    const parsedDate = new Date(date)

    if (
      Number.isNaN(
        parsedDate.getTime(),
      )
    ) {
      return 'Date unavailable'
    }

    return parsedDate.toLocaleString(
      undefined,
      {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    )
  }

  /*
   * ============================================================
   * STATUS BADGE
   * ============================================================
   */

  function getStatusClass(
    status: ReportStatus,
  ): string {
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
        return 'text-bg-danger'

      case 'High':
        return 'text-bg-warning'

      case 'Medium':
        return 'text-bg-info'

      case 'Low':
        return 'text-bg-secondary'

      default:
        return 'text-bg-secondary'
    }
  }

  /*
   * ============================================================
   * REPORT NOT FOUND
   * ============================================================
   */

  if (!report) {
    return (
      <div>

        <div className="mb-4">
          <Link
            to="/admin/reports"
            className="text-decoration-none small"
          >
            ← Back to Reports
          </Link>
        </div>

        <div
          className="alert alert-danger"
          role="alert"
        >
          <h1 className="h5 fw-bold">
            Report not found
          </h1>

          <p className="mb-3">
            We could not find a report with
            reference{' '}
            <strong>
              {id ?? 'unknown'}
            </strong>.
          </p>

          <Link
            to="/admin/reports"
            className="btn btn-outline-danger"
          >
            Back to Reports
          </Link>
        </div>

      </div>
    )
  }

  /*
   * ============================================================
   * REPORT DETAILS
   * ============================================================
   */

  return (
    <div>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

        <div>

          <Link
            to="/admin/reports"
            className="text-decoration-none small"
          >
            ← Back to Reports
          </Link>

          <div className="text-primary small fw-bold text-uppercase mt-2">
            Report Details
          </div>

          <h1 className="h3 fw-bold mb-1">
            {report.reference}
          </h1>

          <p className="text-secondary mb-0">
            Review report information and coordinate
            appropriate action.
          </p>

        </div>

        <div className="d-flex gap-2 flex-wrap">

          <span
            className={`badge px-3 py-2 ${getStatusClass(
              report.status,
            )}`}
          >
            {report.status}
          </span>

          <span
            className={`badge px-3 py-2 ${getPriorityClass(
              report.priority,
            )}`}
          >
            {report.priority} Priority
          </span>

        </div>

      </div>

      <div className="row g-4">

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="col-lg-8">

          {/* REPORT INFORMATION */}

          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body p-4">

              <h2 className="h5 fw-bold mb-4">
                Report Information
              </h2>

              <div className="row g-4">

                {/* CATEGORY */}

                <div className="col-md-6">

                  <div className="text-secondary small">
                    Category
                  </div>

                  <div className="fw-semibold">
                    {report.category}
                  </div>

                </div>

                {/* SUBMITTED */}

                <div className="col-md-6">

                  <div className="text-secondary small">
                    Submitted
                  </div>

                  <div className="fw-semibold">
                    {formatDate(
                      report.createdAt,
                    )}
                  </div>

                </div>

                {/* STATUS */}

                <div className="col-md-6">

                  <div className="text-secondary small">
                    Status
                  </div>

                  <div>
                    <span
                      className={`badge ${getStatusClass(
                        report.status,
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>

                </div>

                {/* PRIORITY */}

                <div className="col-md-6">

                  <div className="text-secondary small">
                    Priority
                  </div>

                  <div>
                    <span
                      className={`badge ${getPriorityClass(
                        report.priority,
                      )}`}
                    >
                      {report.priority}
                    </span>
                  </div>

                </div>

                {/* LOCATION */}

                <div className="col-12">

                  <div className="text-secondary small">
                    Location
                  </div>

                  <div className="fw-semibold">
                    {report.location}
                  </div>

                  {report.latitude !== null &&
                    report.longitude !== null && (
                      <div className="text-secondary small mt-1">
                        GPS coordinates:{' '}
                        {report.latitude},{' '}
                        {report.longitude}
                      </div>
                    )}

                </div>

                {/* DESCRIPTION */}

                <div className="col-12">

                  <div className="text-secondary small mb-1">
                    Description
                  </div>

                  <p className="mb-0">
                    {report.description}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* REPORTER */}

          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body p-4">

              <h2 className="h5 fw-bold mb-4">
                Reporter Information
              </h2>

              <div className="row g-4">

                <div className="col-md-6">

                  <div className="text-secondary small">
                    Name
                  </div>

                  <div className="fw-semibold">
                    {report.reporter.name}
                  </div>

                </div>

                <div className="col-md-6">

                  <div className="text-secondary small">
                    Email
                  </div>

                  <div className="fw-semibold text-break">
                    {report.reporter.email}
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* EVIDENCE */}

          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body p-4">

              <h2 className="h5 fw-bold mb-4">
                Evidence
              </h2>

              {report.evidence.length === 0 ? (
                <p className="text-secondary mb-0">
                  No evidence was attached to this
                  report.
                </p>
              ) : (
                <div className="list-group">

                  {report.evidence.map(
                    (evidence, index) => (
                      <div
                        key={`${evidence}-${index}`}
                        className="list-group-item"
                      >
                        {evidence}
                      </div>
                    ),
                  )}

                </div>
              )}

            </div>

          </div>

          {/* ADMINISTRATIVE NOTE */}

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <h2 className="h5 fw-bold mb-4">
                Administrative Note
              </h2>

              {report.administrativeNote ? (
                <p className="mb-0">
                  {report.administrativeNote}
                </p>
              ) : (
                <p className="text-secondary mb-0">
                  No administrative note has been
                  added.
                </p>
              )}

            </div>

          </div>

        </div>

        {/* ====================================================
            ADMINISTRATION SIDEBAR
        ==================================================== */}

        <div className="col-lg-4">

          {/* ADMINISTRATION */}

          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body p-4">

              <h2 className="h5 fw-bold mb-4">
                Administration
              </h2>

              <div className="mb-3">

                <div className="text-secondary small">
                  Department
                </div>

                <div className="fw-semibold">
                  {report.department ??
                    'Not assigned'}
                </div>

              </div>

              <div>

                <div className="text-secondary small">
                  Assigned To
                </div>

                <div className="fw-semibold">
                  {report.assignedTo ??
                    'Not assigned'}
                </div>

              </div>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <h2 className="h5 fw-bold mb-4">
                Administrative Action
              </h2>

              <label
                htmlFor="status"
                className="form-label fw-semibold"
              >
                Status
              </label>

              <select
                id="status"
                className="form-select mb-3"
                defaultValue={report.status}
              >
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

              <label
                htmlFor="priority"
                className="form-label fw-semibold"
              >
                Priority
              </label>

              <select
                id="priority"
                className="form-select mb-3"
                defaultValue={report.priority}
              >
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

              <label
                htmlFor="department"
                className="form-label fw-semibold"
              >
                Department
              </label>

              <select
                id="department"
                className="form-select mb-3"
                defaultValue={
                  report.department ?? ''
                }
              >
                <option value="">
                  Not assigned
                </option>

                <option value="Infrastructure">
                  Infrastructure
                </option>

                <option value="Public Lighting">
                  Public Lighting
                </option>

                <option value="Water Services">
                  Water Services
                </option>

                <option value="Waste Management">
                  Waste Management
                </option>
              </select>

              <label
                htmlFor="administrativeNote"
                className="form-label fw-semibold"
              >
                Administrative Note
              </label>

              <textarea
                id="administrativeNote"
                className="form-control mb-3"
                rows={4}
                defaultValue={
                  report.administrativeNote
                }
                placeholder="Add an internal administrative note..."
              />

              <button
                type="button"
                className="btn btn-primary w-100"
                disabled
              >
                Save Changes
              </button>

              <div className="form-text mt-2">
                Changes will be enabled when the
                backend persistence workflow is
                connected.
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminReportDetails