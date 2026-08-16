import {
  useEffect,
  useState,
} from 'react'

import type { FormEvent } from 'react'

import { useSearchParams } from 'react-router-dom'

import { getReportByReference } from '../services/reportService'

import type {
  Report,
  ReportStatus,
} from '../types/report'

type StatusStep = {
  status: ReportStatus
  title: string
  description: string
}

type StepState =
  | 'completed'
  | 'current'
  | 'upcoming'

const STATUS_STEPS: StatusStep[] = [
  {
    status: 'pending',
    title: 'Report submitted',
    description:
      'Your report has been received by ReportHub.',
  },
  {
    status: 'under-review',
    title: 'Under review',
    description:
      'The report is being reviewed and prioritized.',
  },
  {
    status: 'action-taken',
    title: 'Action taken',
    description:
      'Work has started to address the reported issue.',
  },
  {
    status: 'resolved',
    title: 'Resolved',
    description:
      'The reported issue has been resolved.',
  },
]

const REFERENCE_PATTERN =
  /^RH-[A-Z0-9]{8}$/i

function Track() {
  const [searchParams, setSearchParams] =
    useSearchParams()

  const [reference, setReference] =
    useState('')

  const [searchedReference, setSearchedReference] =
    useState('')

  const [report, setReport] =
    useState<Report | null>(null)

  const [error, setError] =
    useState('')

  const [isSearching, setIsSearching] =
    useState(false)

  /*
   * Search for a report in localStorage.
   */
  function searchReport(
    reportReference: string,
  ) {
    const cleanedReference =
      reportReference.trim().toUpperCase()

    setError('')

    if (!cleanedReference) {
      setError(
        'Please enter your report reference.',
      )

      setReport(null)
      setSearchedReference('')

      return
    }

    if (
      !REFERENCE_PATTERN.test(
        cleanedReference,
      )
    ) {
      setError(
        'Please enter a valid report reference, for example RH-12345678.',
      )

      setReport(null)
      setSearchedReference(
        cleanedReference,
      )

      return
    }

    setIsSearching(true)

    const foundReport =
      getReportByReference(
        cleanedReference,
      )

    if (!foundReport) {
      setError(
        `No report was found with reference ${cleanedReference}. Please check the reference and try again.`,
      )

      setReport(null)
      setSearchedReference(
        cleanedReference,
      )
      setIsSearching(false)

      return
    }

    setReport(foundReport)
    setSearchedReference(
      cleanedReference,
    )
    setIsSearching(false)
  }

  /*
   * Read the report reference from the URL.
   *
   * Example:
   * /track?reference=RH-12345678
   */
  useEffect(() => {
    const queryReference =
      searchParams.get('reference')

    if (!queryReference) {
      return
    }

    const cleanedReference =
      queryReference.trim().toUpperCase()

    setReference(cleanedReference)

    searchReport(cleanedReference)

    // searchReport is intentionally used here
    // when the URL reference changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  /*
   * Submit tracking form.
   */
  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const cleanedReference =
      reference.trim().toUpperCase()

    setError('')

    if (!cleanedReference) {
      setError(
        'Please enter your report reference.',
      )

      setReport(null)
      setSearchedReference('')

      return
    }

    if (
      !REFERENCE_PATTERN.test(
        cleanedReference,
      )
    ) {
      setError(
        'Please enter a valid report reference, for example RH-12345678.',
      )

      setReport(null)
      setSearchedReference(
        cleanedReference,
      )

      return
    }

    setReference(cleanedReference)

    setSearchParams({
      reference: cleanedReference,
    })
  }

  /*
   * Handle reference input changes.
   */
  function handleReferenceChange(
    value: string,
  ) {
    setReference(value)

    setError('')
    setReport(null)
    setSearchedReference('')
  }

  /*
   * Find the current status step.
   */
  const currentStepIndex =
    report === null
      ? -1
      : STATUS_STEPS.findIndex(
          (step) =>
            step.status === report.status,
        )

  const currentStep =
    currentStepIndex >= 0
      ? STATUS_STEPS[currentStepIndex]
      : null

  /*
   * Number of completed/current steps.
   */
  const completedSteps =
    currentStepIndex >= 0
      ? currentStepIndex + 1
      : 0

  /*
   * Progress percentage.
   */
  const progressPercentage =
    currentStepIndex >= 0
      ? Math.round(
          (completedSteps /
            STATUS_STEPS.length) *
            100,
        )
      : 0

  /*
   * Get timeline state.
   */
  function getStepState(
    index: number,
  ): StepState {
    if (index < currentStepIndex) {
      return 'completed'
    }

    if (index === currentStepIndex) {
      return 'current'
    }

    return 'upcoming'
  }

  /*
   * Get Bootstrap styling.
   */
  function getStepClass(
    state: StepState,
  ): string {
    switch (state) {
      case 'completed':
        return 'border-success-subtle bg-success-subtle'

      case 'current':
        return 'border-primary bg-primary-subtle'

      default:
        return 'border-light bg-light'
    }
  }

  /*
   * Get timeline status label.
   */
  function getStepLabel(
    state: StepState,
  ): string {
    switch (state) {
      case 'completed':
        return 'Completed'

      case 'current':
        return 'Current'

      default:
        return 'Pending'
    }
  }

  /*
   * Format submitted date.
   */
  function formatDate(
    dateString: string,
  ): string {
    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
      return 'Unknown date'
    }

    return new Intl.DateTimeFormat(
      undefined,
      {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    ).format(date)
  }

  return (
    <main>
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* Header */}
            <header className="text-center mb-5">
              <p className="text-uppercase fw-semibold text-primary mb-2">
                ReportHub
              </p>

              <h1 className="display-6 fw-bold mb-3">
                Track your report
              </h1>

              <p className="lead text-secondary mb-0">
                Enter your report reference to see
                the current progress of your issue.
              </p>
            </header>

            {/* Search Card */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <label
                    htmlFor="reference"
                    className="form-label fw-semibold"
                  >
                    Report reference
                  </label>

                  <div className="input-group input-group-lg">
                    <input
                      id="reference"
                      name="reference"
                      type="text"
                      className={`form-control ${
                        error
                          ? 'is-invalid'
                          : ''
                      }`}
                      placeholder="RH-12345678"
                      value={reference}
                      onChange={(event) =>
                        handleReferenceChange(
                          event.target.value,
                        )
                      }
                      aria-describedby="reference-help reference-error"
                      aria-invalid={
                        error
                          ? 'true'
                          : 'false'
                      }
                      autoComplete="off"
                      required
                    />

                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      disabled={isSearching}
                    >
                      {isSearching
                        ? 'Searching...'
                        : 'Track Report'}
                    </button>
                  </div>

                  {error && (
                    <div
                      id="reference-error"
                      className="text-danger small mt-2"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <div
                    id="reference-help"
                    className="form-text mt-2"
                  >
                    Enter the reference provided after
                    submitting your report.
                    <br />
                    Example: RH-12345678
                  </div>
                </form>
              </div>
            </div>

            {/* Report Result */}
            {report && currentStep && (
              <section
                className="card border-0 shadow-sm mt-4"
                aria-labelledby="tracking-result-title"
              >
                <div className="card-body p-4 p-md-5">

                  {/* Result Header */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
                    <div>
                      <p className="text-secondary mb-1">
                        Report reference
                      </p>

                      <h2
                        id="tracking-result-title"
                        className="h4 fw-bold mb-0 font-monospace"
                      >
                        {report.reference}
                      </h2>
                    </div>

                    <span className="badge text-bg-warning align-self-start px-3 py-2">
                      {currentStep.title}
                    </span>
                  </div>

                  <hr className="my-4" />

                  {/* Report Details */}
                  <div className="row g-3 mb-4">

                    {/* Category */}
                    <div className="col-md-6">
                      <div className="border rounded-3 p-3 h-100">
                        <div className="small text-secondary mb-1">
                          Category
                        </div>

                        <div className="fw-semibold text-capitalize">
                          {report.category.replace(
                            /-/g,
                            ' ',
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submitted */}
                    <div className="col-md-6">
                      <div className="border rounded-3 p-3 h-100">
                        <div className="small text-secondary mb-1">
                          Submitted
                        </div>

                        <div className="fw-semibold">
                          {formatDate(
                            report.createdAt,
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-12">
                      <div className="border rounded-3 p-3">
                        <div className="small text-secondary mb-1">
                          Location
                        </div>

                        <div className="fw-semibold">
                          {report.location}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Description */}
                  <div className="border rounded-3 p-3 mb-4">
                    <div className="small text-secondary mb-1">
                      Description
                    </div>

                    <p className="mb-0">
                      {report.description}
                    </p>
                  </div>

                  {/* GPS Coordinates */}
                  {report.latitude !== null &&
                    report.longitude !== null && (
                      <div className="border rounded-3 p-3 mb-4">
                        <div className="small text-secondary mb-1">
                          GPS coordinates
                        </div>

                        <div className="font-monospace small">
                          {report.latitude.toFixed(
                            6,
                          )}
                          ,{' '}
                          {report.longitude.toFixed(
                            6,
                          )}
                        </div>
                      </div>
                    )}

                  {/* Current Status */}
                  <div className="mb-4">
                    <p className="text-uppercase small fw-semibold text-primary mb-2">
                      Current status
                    </p>

                    <h3 className="h5 fw-bold">
                      {currentStep.title}
                    </h3>

                    <p className="text-secondary mb-0">
                      {currentStep.description}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="h5 fw-bold mb-0">
                        Report progress
                      </h3>

                      <span className="small text-secondary">
                        {completedSteps} of{' '}
                        {STATUS_STEPS.length}{' '}
                        completed
                      </span>
                    </div>

                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Report progress"
                      aria-valuenow={
                        progressPercentage
                      }
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{
                        height: '8px',
                      }}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${progressPercentage}%`,
                        }}
                      />
                    </div>

                    <div className="text-end small text-secondary mt-1">
                      {progressPercentage}%
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="h5 fw-bold mb-3">
                      Status timeline
                    </h3>

                    <div className="d-flex flex-column gap-3">
                      {STATUS_STEPS.map(
                        (step, index) => {
                          const state =
                            getStepState(index)

                          const isCurrent =
                            state === 'current'

                          const isCompleted =
                            state ===
                            'completed'

                          return (
                            <div
                              key={step.status}
                              className={`border rounded-3 p-3 ${getStepClass(
                                state,
                              )}`}
                            >
                              <div className="d-flex align-items-start gap-3">

                                {/* Indicator */}
                                <div
                                  className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                                    isCurrent
                                      ? 'bg-primary text-white'
                                      : isCompleted
                                      ? 'bg-success text-white'
                                      : 'bg-secondary-subtle text-secondary'
                                  }`}
                                  style={{
                                    width: '36px',
                                    height: '36px',
                                  }}
                                  aria-hidden="true"
                                >
                                  {isCompleted
                                    ? '✓'
                                    : index + 1}
                                </div>

                                {/* Content */}
                                <div className="flex-grow-1">
                                  <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                                    <h4 className="h6 fw-bold mb-1">
                                      {
                                        step.title
                                      }
                                    </h4>

                                    <span
                                      className={
                                        isCurrent
                                          ? 'small text-primary fw-semibold'
                                          : isCompleted
                                          ? 'small text-success fw-semibold'
                                          : 'small text-secondary'
                                      }
                                    >
                                      {getStepLabel(
                                        state,
                                      )}
                                    </span>
                                  </div>

                                  <p className="small text-secondary mb-0">
                                    {
                                      step.description
                                    }
                                  </p>
                                </div>

                              </div>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>

                  {/* Evidence */}
                  {report.evidenceName && (
                    <div className="border rounded-3 p-3 mt-4">
                      <div className="small text-secondary mb-1">
                        Evidence
                      </div>

                      <div className="fw-semibold">
                        {report.evidenceName}
                      </div>
                    </div>
                  )}

                  {/* Prototype Notice */}
                  <div className="alert alert-info mt-4 mb-0">
                    <strong>
                      Prototype:
                    </strong>{' '}
                    Report data is currently stored
                    in your browser's local storage.
                    Real-time updates will be connected
                    to the ReportHub backend later.
                  </div>

                </div>
              </section>
            )}

            {/* Report Not Found */}
            {!report &&
              searchedReference &&
              error && (
                <div
                  className="card border-0 shadow-sm mt-4"
                  role="status"
                >
                  <div className="card-body p-4 text-center">

                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning-subtle text-warning mb-3"
                      style={{
                        width: '56px',
                        height: '56px',
                        fontSize: '1.5rem',
                      }}
                      aria-hidden="true"
                    >
                      !
                    </div>

                    <h2 className="h5 fw-bold">
                      Report not found
                    </h2>

                    <p className="text-secondary mb-0">
                      We could not find a report
                      matching{' '}
                      <span className="fw-semibold">
                        {searchedReference}
                      </span>
                      .
                    </p>

                  </div>
                </div>
              )}

          </div>
        </div>
      </section>
    </main>
  )
}

export default Track