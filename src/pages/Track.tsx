import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { getReportByReference } from '../services/reportService'

type ReportStatus =
  | 'submitted'
  | 'under-review'
  | 'in-progress'
  | 'resolved'

type TrackedReport = {
  reference: string
  category: string
  description: string
  location: string
  latitude: number | null
  longitude: number | null
  evidenceName: string | null
  status: ReportStatus
  createdAt: string
}

const STATUS_LABELS: Record<ReportStatus, string> = {
  submitted: 'Submitted',
  'under-review': 'Under Review',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
}

const STATUS_STEPS: ReportStatus[] = [
  'submitted',
  'under-review',
  'in-progress',
  'resolved',
]

function Track() {
  const [searchParams, setSearchParams] =
    useSearchParams()

  const referenceFromUrl =
    searchParams.get('reference') ?? ''

  const [reference, setReference] =
    useState(referenceFromUrl)

  const [report, setReport] =
    useState<TrackedReport | null>(null)

  const [error, setError] = useState('')

  const [isSearching, setIsSearching] =
    useState(false)

  useEffect(() => {
    if (!referenceFromUrl) {
      setReport(null)
      setError('')
      return
    }

    const cleanedReference =
      referenceFromUrl.trim().toUpperCase()

    setReference(cleanedReference)

    const storedReport =
      getReportByReference(cleanedReference)

    if (!storedReport) {
      setReport(null)
      setError(
        'We could not find a report with that tracking reference. Please check the reference and try again.',
      )
      return
    }

    setReport(storedReport as TrackedReport)
    setError('')
  }, [referenceFromUrl])

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const cleanedReference =
      reference.trim().toUpperCase()

    if (!cleanedReference) {
      setReport(null)
      setError(
        'Please enter the tracking reference from your report confirmation.',
      )
      return
    }

    setIsSearching(true)
    setError('')

    const storedReport =
      getReportByReference(cleanedReference)

    if (!storedReport) {
      setReport(null)
      setError(
        'We could not find a report with that tracking reference. Please check the reference and try again.',
      )
    } else {
      setReport(storedReport as TrackedReport)
      setSearchParams({
        reference: cleanedReference,
      })
    }

    setIsSearching(false)
  }

  function formatCategory(category: string) {
    return category
      .split('-')
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1),
      )
      .join(' ')
  }

  function formatDate(date: string) {
    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Date unavailable'
    }

    return parsedDate.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  function getStatusIndex(status: ReportStatus) {
    return STATUS_STEPS.indexOf(status)
  }

  function getStatusMessage(status: ReportStatus) {
    switch (status) {
      case 'submitted':
        return 'Your report has been received and is waiting for review.'

      case 'under-review':
        return 'Your report is being reviewed and will be assigned to the appropriate team.'

      case 'in-progress':
        return 'Action is currently being taken to address the reported problem.'

      case 'resolved':
        return 'The reported problem has been marked as resolved.'
    }
  }

  const currentStatusIndex = report
    ? getStatusIndex(report.status)
    : -1

  return (
    <main>
      <section className="bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="text-uppercase fw-semibold text-primary mb-2">
                ReportHub
              </p>

              <h1 className="display-6 fw-bold mb-3">
                Track your report
              </h1>

              <p className="lead text-secondary mb-0">
                Enter your tracking reference to see
                the current status and details of your
                report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h5 fw-bold mb-3">
                    Find your report
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <label
                      htmlFor="reference"
                      className="form-label fw-semibold"
                    >
                      Tracking reference
                    </label>

                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <input
                        id="reference"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="e.g. RH-ABC12345"
                        value={reference}
                        onChange={(event) => {
                          setReference(
                            event.target.value,
                          )
                          setError('')
                        }}
                        autoComplete="off"
                        required
                      />

                      <button
                        type="submit"
                        className="btn btn-primary btn-lg text-nowrap"
                        disabled={isSearching}
                      >
                        {isSearching
                          ? 'Checking...'
                          : 'Check Status'}
                      </button>
                    </div>

                    <div className="form-text">
                      Your tracking reference was provided
                      when you submitted the report.
                    </div>
                  </form>
                </div>
              </div>

              {error && (
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  <div className="fw-semibold">
                    Report not found
                  </div>

                  <div className="mt-1">
                    {error}
                  </div>
                </div>
              )}

              {report && (
                <>
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4 p-md-5">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
                        <div>
                          <div className="text-secondary small text-uppercase fw-semibold mb-1">
                            Tracking reference
                          </div>

                          <div className="fs-3 fw-bold font-monospace">
                            {report.reference}
                          </div>
                        </div>

                        <span className="badge text-bg-primary fs-6 px-3 py-2">
                          {STATUS_LABELS[
                            report.status
                          ]}
                        </span>
                      </div>

                      <hr className="my-4" />

                      <h2 className="h5 fw-bold mb-4">
                        Report progress
                      </h2>

                      <div className="row g-3">
                        {STATUS_STEPS.map(
                          (step, index) => {
                            const completed =
                              index <=
                              currentStatusIndex

                            const current =
                              index ===
                              currentStatusIndex

                            return (
                              <div
                                className="col-6 col-md-3"
                                key={step}
                              >
                                <div
                                  className={`border rounded-3 p-3 h-100 ${
                                    completed
                                      ? 'border-primary bg-primary-subtle'
                                      : ''
                                  }`}
                                >
                                  <div
                                    className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${
                                      completed
                                        ? 'bg-primary text-white'
                                        : 'bg-light text-secondary'
                                    }`}
                                    style={{
                                      width: '36px',
                                      height: '36px',
                                    }}
                                  >
                                    {index + 1}
                                  </div>

                                  <div className="fw-semibold">
                                    {
                                      STATUS_LABELS[
                                        step
                                      ]
                                    }
                                  </div>

                                  {current && (
                                    <div className="small text-primary mt-1">
                                      Current status
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          },
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4 p-md-5">
                      <h2 className="h5 fw-bold mb-4">
                        Report details
                      </h2>

                      <div className="row g-4">
                        <div className="col-md-6">
                          <div className="text-secondary small mb-1">
                            Problem type
                          </div>

                          <div className="fw-semibold">
                            {formatCategory(
                              report.category,
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="text-secondary small mb-1">
                            Submitted
                          </div>

                          <div className="fw-semibold">
                            {formatDate(
                              report.createdAt,
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="text-secondary small mb-1">
                            Location
                          </div>

                          <div className="fw-semibold">
                            {report.location}
                          </div>

                          {report.latitude !==
                            null &&
                            report.longitude !==
                              null && (
                              <div className="text-secondary small mt-1">
                                GPS coordinates:{' '}
                                {
                                  report.latitude
                                }
                                ,{' '}
                                {
                                  report.longitude
                                }
                              </div>
                            )}
                        </div>

                        <div className="col-12">
                          <div className="text-secondary small mb-1">
                            Description
                          </div>

                          <p className="mb-0">
                            {report.description}
                          </p>
                        </div>

                        {report.evidenceName && (
                          <div className="col-12">
                            <div className="text-secondary small mb-1">
                              Photo evidence
                            </div>

                            <div className="fw-semibold">
                              {report.evidenceName}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info mb-4">
                    <div className="fw-semibold">
                      Current update
                    </div>

                    <div className="mt-1">
                      {getStatusMessage(
                        report.status,
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-4">
                <Link
                  to="/report"
                  className="btn btn-primary"
                >
                  Report Another Issue
                </Link>

                <Link
                  to="/my-reports"
                  className="btn btn-outline-primary"
                >
                  View My Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Track