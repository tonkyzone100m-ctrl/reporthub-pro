import { useState } from 'react'
import type {
  ChangeEvent,
  FormEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { createReport } from '../services/reportService'
import type { ReportCategory } from '../types/report'

type ReportFormData = {
  category: ReportCategory | ''
  description: string
  location: string
  latitude: number | null
  longitude: number | null
  evidence: File | null
}

type SubmittedReport = {
  reference: string
}

const MAX_DESCRIPTION_LENGTH = 1000
const MIN_DESCRIPTION_LENGTH = 20
const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const initialFormData: ReportFormData = {
  category: '',
  description: '',
  location: '',
  latitude: null,
  longitude: null,
  evidence: null,
}

function Report() {
  const navigate = useNavigate()

  const [formData, setFormData] =
    useState<ReportFormData>(initialFormData)

  const [submittedReport, setSubmittedReport] =
    useState<SubmittedReport | null>(null)

  const [isLocating, setIsLocating] =
    useState(false)

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [locationError, setLocationError] =
    useState('')

  const [evidenceError, setEvidenceError] =
    useState('')

  const [formError, setFormError] =
    useState('')

  /*
   * Handle normal form fields.
   */
  function handleChange(
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target

    setFormError('')

    if (name === 'location') {
      setLocationError('')

      setFormData((current) => ({
        ...current,
        location: value,
        latitude: null,
        longitude: null,
      }))

      return
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  /*
   * Handle evidence upload.
   */
  function handleEvidenceChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] ?? null

    setEvidenceError('')
    setFormError('')

    if (!file) {
      setFormData((current) => ({
        ...current,
        evidence: null,
      }))

      return
    }

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        file.type,
      )
    ) {
      setEvidenceError(
        'Please select a JPG, PNG, or WebP image.',
      )

      event.target.value = ''

      setFormData((current) => ({
        ...current,
        evidence: null,
      }))

      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setEvidenceError(
        'The image must be smaller than 5 MB.',
      )

      event.target.value = ''

      setFormData((current) => ({
        ...current,
        evidence: null,
      }))

      return
    }

    setFormData((current) => ({
      ...current,
      evidence: file,
    }))
  }

  /*
   * Capture the user's current GPS location.
   */
  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setLocationError(
        'Location services are not supported by this browser.',
      )

      return
    }

    setIsLocating(true)
    setLocationError('')
    setFormError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
        } = position.coords

        setFormData((current) => ({
          ...current,
          latitude,
          longitude,
          location: `${latitude.toFixed(
            6,
          )}, ${longitude.toFixed(6)}`,
        }))

        setIsLocating(false)
      },
      (error) => {
        let message =
          'We could not access your location. Please enter it manually.'

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          message =
            'Location permission was denied. Please allow location access or enter the location manually.'
        } else if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {
          message =
            'Your location is currently unavailable. Please enter the location manually.'
        } else if (
          error.code === error.TIMEOUT
        ) {
          message =
            'Finding your location took too long. Please try again.'
        }

        setLocationError(message)
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  /*
   * Submit report.
   */
  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setFormError('')

    const cleanedDescription =
      formData.description.trim()

    const cleanedLocation =
      formData.location.trim()

    /*
     * Validate category.
     */
    if (!formData.category) {
      setFormError(
        'Please select the type of problem you are reporting.',
      )

      return
    }

    /*
     * Validate description.
     */
    if (
      cleanedDescription.length <
      MIN_DESCRIPTION_LENGTH
    ) {
      setFormError(
        `Please provide at least ${MIN_DESCRIPTION_LENGTH} characters describing the problem.`,
      )

      return
    }

    /*
     * Validate location.
     */
    if (!cleanedLocation) {
      setFormError(
        'Please provide the location of the problem.',
      )

      return
    }

    setIsSubmitting(true)

    try {
      /*
       * Create and store the report.
       */
      const report = createReport({
        category: formData.category,
        description: cleanedDescription,
        location: cleanedLocation,
        latitude: formData.latitude,
        longitude: formData.longitude,
        evidenceName:
          formData.evidence?.name ?? null,
      })

      /*
       * Show success screen.
       */
      setSubmittedReport({
        reference: report.reference,
      })
    } catch {
      setFormError(
        'We could not submit your report. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  /*
   * Reset the form.
   */
  function handleSubmitAnother() {
    setFormData({
      ...initialFormData,
    })

    setLocationError('')
    setEvidenceError('')
    setFormError('')
    setSubmittedReport(null)
  }

  /*
   * Copy tracking reference.
   */
  async function handleCopyReference() {
    if (!submittedReport) {
      return
    }

    try {
      await navigator.clipboard.writeText(
        submittedReport.reference,
      )
    } catch {
      /*
       * Clipboard access may not be available.
       */
    }
  }

  /*
   * Navigate directly to the tracking page.
   */
  function handleTrackReport() {
    if (!submittedReport) {
      return
    }

    navigate(
      `/track?reference=${encodeURIComponent(
        submittedReport.reference,
      )}`,
    )
  }

  const descriptionLength =
    formData.description.length

  /*
   * SUCCESS SCREEN
   */
  if (submittedReport) {
    return (
      <main>
        <section className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="text-center mb-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success mb-4"
                  style={{
                    width: '72px',
                    height: '72px',
                    fontSize: '2rem',
                  }}
                  aria-hidden="true"
                >
                  ✓
                </div>

                <h1 className="display-6 fw-bold">
                  Report submitted
                </h1>

                <p className="lead text-secondary">
                  Thank you for helping improve your
                  community.
                </p>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <div className="alert alert-success mb-4">
                    <div className="fw-semibold">
                      Your report has been submitted
                      successfully.
                    </div>

                    <div className="mt-2">
                      Keep your tracking reference
                      safe. You can use it to check
                      the status of your report later.
                    </div>
                  </div>

                  <div className="border rounded-3 p-4 mb-4 text-center">
                    <div className="text-secondary small text-uppercase fw-semibold mb-2">
                      Tracking Reference
                    </div>

                    <div className="fs-3 fw-bold font-monospace">
                      {submittedReport.reference}
                    </div>

                    <div className="small text-secondary mt-2">
                      Use this reference on the Track
                      Report page.
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={
                        handleCopyReference
                      }
                    >
                      Copy Reference
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={
                        handleTrackReport
                      }
                    >
                      Track This Report
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={
                        handleSubmitAnother
                      }
                    >
                      Submit Another Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  /*
   * REPORT FORM
   */
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
                Report an infrastructure issue
              </h1>

              <p className="lead text-secondary mb-0">
                Tell us what happened and where the
                problem is. You do not need an account
                to submit a report.
              </p>
            </header>

            {formError && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {formError}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="form-label fw-semibold"
                >
                  What type of problem are you
                  reporting?
                </label>

                <select
                  id="category"
                  name="category"
                  className="form-select form-select-lg"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a category
                  </option>

                  <option value="road">
                    Road damage
                  </option>

                  <option value="street-light">
                    Broken streetlight
                  </option>

                  <option value="drainage">
                    Drainage problem
                  </option>

                  <option value="water">
                    Water infrastructure
                  </option>

                  <option value="waste">
                    Waste or illegal dumping
                  </option>

                  <option value="public-facility">
                    Public facility damage
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="form-label fw-semibold"
                >
                  Describe the problem
                </label>

                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows={6}
                  maxLength={
                    MAX_DESCRIPTION_LENGTH
                  }
                  minLength={
                    MIN_DESCRIPTION_LENGTH
                  }
                  placeholder="Describe what you observed..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  aria-describedby="descriptionHelp descriptionCount"
                />

                <div className="d-flex justify-content-between align-items-start mt-2 gap-3">
                  <div
                    id="descriptionHelp"
                    className="form-text"
                  >
                    Include details such as severity,
                    surrounding area, or potential
                    danger.
                  </div>

                  <small
                    id="descriptionCount"
                    className="text-secondary text-nowrap"
                  >
                    {descriptionLength}/
                    {MAX_DESCRIPTION_LENGTH}
                  </small>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="form-label fw-semibold"
                >
                  Where is the problem?
                </label>

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Street, area, landmark, or address"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-primary text-nowrap"
                    onClick={
                      handleUseMyLocation
                    }
                    disabled={isLocating}
                  >
                    {isLocating
                      ? 'Finding location...'
                      : 'Use my location'}
                  </button>
                </div>

                {formData.latitude !== null &&
                  formData.longitude !== null && (
                    <div className="form-text text-success mt-2">
                      GPS coordinates captured
                      successfully.
                    </div>
                  )}

                {locationError && (
                  <div
                    className="form-text text-danger mt-2"
                    role="alert"
                  >
                    {locationError}
                  </div>
                )}

                <div className="form-text">
                  You can enter the location manually
                  or use your current GPS location.
                </div>
              </div>

              {/* Evidence */}
              <div className="mb-4">
                <label
                  htmlFor="evidence"
                  className="form-label fw-semibold"
                >
                  Add photo evidence
                </label>

                <input
                  id="evidence"
                  name="evidence"
                  type="file"
                  className="form-control"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handleEvidenceChange
                  }
                  aria-describedby="evidenceHelp"
                />

                <div
                  id="evidenceHelp"
                  className="form-text"
                >
                  Optional. JPG, PNG, or WebP images
                  up to 5 MB.
                </div>

                {evidenceError && (
                  <div
                    className="form-text text-danger mt-2"
                    role="alert"
                  >
                    {evidenceError}
                  </div>
                )}

                {formData.evidence && (
                  <div className="mt-2 text-secondary small">
                    Selected:{' '}
                    {formData.evidence.name}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="d-flex justify-content-end pt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Report