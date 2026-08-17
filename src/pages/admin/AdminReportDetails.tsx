import { Link, useParams } from 'react-router-dom'

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

  function formatDate(date: string): string {
    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
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

  function getStatusClass(
    status: ReportStatus,
  ) {
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

  function getPriorityClass(
    priority: ReportPriority,
  ) {
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

  if (!report) {
    return (
      <div className="container-fluid py-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5 text-center">

            <div
              className="rounded-circle bg-danger-subtle text-danger d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '64px',
                height: '64px',
              }}
            >
              <i
                className="bi bi-file-earmark-x fs-3"
                aria-hidden="true"
              />
            </div>

            <h1 className="h4 fw-bold">
              Report not found
            </h1>

            <p className="text-secondary mb-4">
              We could not find a report with
              reference{' '}
              <strong>
                {id || 'unknown'}
              </strong>.
            </p>

            <Link
              to="/admin/reports"
              className="btn btn-primary"
            >
              <i className="bi bi-arrow-left me-2" />
              Back to Reports
            </Link>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid py-3 py-md-4">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

        <div className="min-width-0">
          <Link
            to="/admin/reports"
            className="text-decoration-none small"
          >
            <i className="bi bi-arrow-left me-1" />
            Back to Reports
          </Link>

          <div className="text-primary small fw-bold text-uppercase mt-3">
            Report Details
          </div>

          <h1 className="h3 fw-bold mb-1 text-break">
            {report.reference}
          </h1>

          <p className="text-secondary mb-0">
            Review report information and coordinate
            administrative action.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <span
            className={`badge ${getPriorityClass(
              report.priority,
            )} px-3 py-2`}
          >
            {report.priority} Priority
          </span>

          <span
            className={`badge ${getStatusClass(
              report.status,
            )} px-3 py-2`}
          >
            {report.status}
          </span>
        </div>

      </div>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="row g-4">

        {/* ====================================================
            LEFT COLUMN
        ==================================================== */}

        <div className="col-12 col-xl-8">

          {/* REPORT INFORMATION */}

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3 p-md-4">

              <div className="d-flex align-items-center gap-2 mb-4">
                <div
                  className="rounded bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                >
                  <i className="bi bi-file-text" />
                </div>

                <div>
                  <h2 className="h5 fw-bold mb-0">
                    Report Information
                  </h2>

                  <div className="small text-secondary">
                    Submitted report details
                  </div>
                </div>
              </div>

              <div className="row g-4">

                <div className="col-12 col-sm-6">
                  <div className="text-secondary small mb-1">
                    Category
                  </div>

                  <div className="fw-semibold">
                    {report.category}
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="text-secondary small mb-1">
                    Submitted
                  </div>

                  <div className="fw-semibold">
                    {formatDate(report.createdAt)}
                  </div>
                </div>

                <div className="col-12">
                  <div className="text-secondary small mb-1">
                    Location
                  </div>

                  <div className="fw-semibold text-break">
                    {report.location}
                  </div>

                  {report.latitude !== null &&
                    report.longitude !== null && (
                      <div className="small text-secondary mt-1">
                        <i className="bi bi-geo-alt me-1" />
                        {report.latitude},{' '}
                        {report.longitude}
                      </div>
                    )}
                </div>

                <div className="col-12">
                  <div className="text-secondary small mb-1">
                    Description
                  </div>

                  <div className="border rounded-3 bg-light p-3">
                    <p className="mb-0 text-break">
                      {report.description}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* REPORTER */}

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3 p-md-4">

              <h2 className="h5 fw-bold mb-4">
                Reporter Information
              </h2>

              <div className="row g-4">

                <div className="col-12 col-sm-6">
                  <div className="text-secondary small mb-1">
                    Name
                  </div>

                  <div className="fw-semibold text-break">
                    {report.reporter.name}
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="text-secondary small mb-1">
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

          <div className="card border-0 shadow-sm">
            <div className="card-body p-3 p-md-4">

              <h2 className="h5 fw-bold mb-4">
                Evidence
              </h2>

              {report.evidence.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {report.evidence.map(
                    (evidence) => (
                      <div
                        key={evidence}
                        className="border rounded-3 p-3"
                      >
                        <i className="bi bi-paperclip me-2" />
                        {evidence}
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="text-secondary">
                  No evidence files were submitted.
                </div>
              )}

            </div>
          </div>

        </div>

        {/* ====================================================
            RIGHT COLUMN
        ==================================================== */}

        <div className="col-12 col-xl-4">

          {/* ADMINISTRATIVE ACTION */}

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3 p-md-4">

              <h2 className="h5 fw-bold mb-1">
                Administrative Action
              </h2>

              <p className="small text-secondary mb-4">
                Review and update the operational
                state of this report.
              </p>

              <div className="mb-3">
                <label
                  htmlFor="report-status"
                  className="form-label fw-semibold"
                >
                  Status
                </label>

                <select
                  id="report-status"
                  className="form-select"
                  defaultValue={report.status}
                >
                  <option>
                    Under Review
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Resolved
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="report-priority"
                  className="form-label fw-semibold"
                >
                  Priority
                </label>

                <select
                  id="report-priority"
                  className="form-select"
                  defaultValue={report.priority}
                >
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
              >
                <i className="bi bi-check2-circle me-2" />
                Save Changes
              </button>

            </div>
          </div>

          {/* ASSIGNMENT */}

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3 p-md-4">

              <h2 className="h5 fw-bold mb-4">
                Assignment
              </h2>

              <div className="mb-3">
                <div className="text-secondary small mb-1">
                  Department
                </div>

                <div className="fw-semibold text-break">
                  {report.department ||
                    'Not assigned'}
                </div>
              </div>

              <div>
                <div className="text-secondary small mb-1">
                  Assigned To
                </div>

                <div className="fw-semibold text-break">
                  {report.assignedTo ||
                    'Not assigned'}
                </div>
              </div>

            </div>
          </div>

          {/* ADMINISTRATIVE NOTE */}

          <div className="card border-0 shadow-sm">
            <div className="card-body p-3 p-md-4">

              <h2 className="h5 fw-bold mb-3">
                Administrative Note
              </h2>

              <div className="border rounded-3 bg-light p-3">
                {report.administrativeNote ? (
                  <p className="mb-0 text-break">
                    {report.administrativeNote}
                  </p>
                ) : (
                  <span className="text-secondary">
                    No administrative note has been
                    added.
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminReportDetails