import { useEffect, useState } from 'react'
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

const STATUS_LABELS: Record<
  ReportStatus,
  string
> = {
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

  const [error, setError] =
    useState('')

  const [isSearching, setIsSearching] =
    useState(false)

  useEffect(() => {
    if (!referenceFromUrl) {
      return
    }

    setReference(referenceFromUrl)

    const storedReport =
      getReportByReference(referenceFromUrl)

    if (!storedReport) {
      setReport(null)
      setError(
        'We could not find a report with that tracking reference.',
      )
      return
    }

    setReport(storedReport as TrackedReport)
    setError('')
  }, [referenceFromUrl])

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const cleanedReference =
      reference.trim().toUpperCase()

    if (!cleanedReference) {
      setError(
        'Please enter your tracking reference.',
      )
      setReport(null)
      return
    }

    setIsSearching(true)
    setError('')

    setSearchParams({
      reference: cleanedReference,
    })

    const storedReport =
      getReportByReference(cleanedReference)

    if (!storedReport) {
      setReport(null)
      setError(
        'We could not find a report with that tracking reference. Please check the reference and try again.',
      )
    } else {
      setReport(
        storedReport as TrackedReport,
      )
    }

    setIsSearching(false)
  }

  function formatCategory(
    category: string,
  ) {
    return category
      .split('-')
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1),
      )
      .join(' ')
  }

  function formatDate(
    date: string,
  ) {
    const parsedDate = new Date(date)

    if (
      Number.isNaN(parsedDate.getTime())
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

  function getStatusIndex(
    status: ReportStatus,
  ) {
    return STATUS_STEPS.indexOf(status)
  }

  return (
    <main>
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <header className="mb-5">
              <p className="text-uppercase fw-semibold text-primary mb-2">
                ReportHub
              </p>

              <h1 className="display-6 fw-bold">
                Track your report
              </h1>

              <p className="lead text-secondary mb-0">
                Enter your tracking reference to
                see the latest status of your
                report.
              </p>
            </header>

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <form
                  onSubmit={handleSubmit}
                >
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
                      placeholder="Example: RH-ABC12345"
                      value={reference}
                      onChange={(event) => {
                        setReference(
                          event.target.value,
                        )
                        setError('')
                      }}
                      autoComplete="off"
                    />

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg text-nowrap"
                      disabled={isSearching}
                    >
                      {isSearching
                        ? 'Searching...'
                        : 'Track Report'}
                    </button>
                  </div>

                  <div className="form-text">
                    Use the reference you received
                    after submitting your report.
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
              <div>
                {/* Report summary */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body p-4 p-md-5">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-4">
                      <div>
                        <div className="text-secondary small text-uppercase fw-semibold mb-1">
                          Tracking Reference
                        </div>

                        <div className="fs-3 fw-bold font-monospace">
                          {report.reference}
                        </div>
                      </div>

                      <span className="badge text-bg-primary fs-6 px-3 py-2">
                        {
                          STATUS_LABELS[
                            report.status
                          ]
                        }
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-5">
                      <h2 className="h5 fw-bold mb-4">
                        Report progress
                      </h2>

                      <div className="row g-3">
                        {STATUS_STEPS.map(
                          (
                            step,
                            index,
                          ) => {
                            const currentIndex =
                              getStatusIndex(
                                report.status,
                              )

                            const completed =
                              index <=
                              currentIndex

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
                                    {index +
                                      1}
                                  </div>

                                  <div className="fw-semibold">
                                    {
                                      STATUS_LABELS[
                                        step
                                      ]
                                    }
                                  </div>
                                </div>
                              </div>
                            )
                          },
                        )}
                      </div>
                    </div>

                    <hr />

                    {/* Details */}
                    <div className="row g-4 mt-1">
                      <div className="col-md-6">
                        <div className="text-secondary small mb-1">
                          Category
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
                              GPS:{' '}
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
                            Evidence
                          </div>

                          <div className="fw-semibold">
                            {report.evidenceName}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Current status message */}
                <div className="alert alert-info">
                  <div className="fw-semibold">
                    What happens next?
                  </div>

                  <div className="mt-1">
                    Your report can now be reviewed
                    and assigned to the appropriate
                    authority for action.
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mt-5">
              <Link
                to="/report"
                className="btn btn-outline-primary"
              >
                Report Another Issue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Track