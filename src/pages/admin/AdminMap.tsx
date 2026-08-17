import { useEffect, useMemo, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

import { getReports } from '../../services/reportService'

import type {
  Report,
  ReportPriority,
} from '../../types/report'

/*
 * ============================================================
 * LEAFLET DEFAULT MARKER
 * ============================================================
 */

const defaultIcon = L.icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

/*
 * ============================================================
 * KIGALI CENTER
 * ============================================================
 */

const KIGALI_CENTER: [number, number] = [
  -1.9441,
  30.0619,
]

/*
 * ============================================================
 * MAP CONTROLLER
 * ============================================================
 */

function MapController({
  report,
}: {
  report: Report | null
}) {
  const map = useMap()

  useEffect(() => {
    if (
      !report ||
      report.latitude === null ||
      report.longitude === null
    ) {
      return
    }

    map.flyTo(
      [
        report.latitude,
        report.longitude,
      ],
      15,
      {
        duration: 0.8,
      },
    )
  }, [map, report])

  return null
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

  return parsedDate.toLocaleDateString(
    undefined,
    {
      dateStyle: 'medium',
    },
  )
}

/*
 * ============================================================
 * LEGEND ITEM
 * ============================================================
 */

function LegendItem({
  colorClass,
  label,
}: {
  colorClass: string
  label: string
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <span
        className={`rounded-circle ${colorClass}`}
        style={{
          width: '10px',
          height: '10px',
          display: 'inline-block',
        }}
      />

      <span>{label}</span>
    </div>
  )
}

/*
 * ============================================================
 * ADMIN MAP
 * ============================================================
 */

function AdminMap() {
  /*
   * ----------------------------------------------------------
   * LOAD REPORTS
   * ----------------------------------------------------------
   */

  const reports = useMemo(
    () => getReports(),
    [],
  )

  /*
   * ----------------------------------------------------------
   * REPORTS WITH VALID COORDINATES
   * ----------------------------------------------------------
   */

  const reportsWithCoordinates =
    useMemo(() => {
      return reports.filter(
        (report) =>
          typeof report.latitude === 'number' &&
          typeof report.longitude === 'number' &&
          Number.isFinite(report.latitude) &&
          Number.isFinite(report.longitude),
      )
    }, [reports])

  /*
   * ----------------------------------------------------------
   * SELECTED REPORT
   * ----------------------------------------------------------
   */

  const [
    selectedReport,
    setSelectedReport,
  ] = useState<Report | null>(
    reportsWithCoordinates[0] ?? null,
  )

  /*
   * ----------------------------------------------------------
   * PRIORITY FILTER
   * ----------------------------------------------------------
   */

  const [
    priorityFilter,
    setPriorityFilter,
  ] = useState<
    'All' | ReportPriority
  >('All')

  /*
   * ----------------------------------------------------------
   * FILTERED REPORTS
   * ----------------------------------------------------------
   */

  const filteredReports =
    useMemo(() => {
      if (
        priorityFilter === 'All'
      ) {
        return reportsWithCoordinates
      }

      return reportsWithCoordinates.filter(
        (report) =>
          report.priority ===
          priorityFilter,
      )
    }, [
      reportsWithCoordinates,
      priorityFilter,
    ])

  /*
   * ----------------------------------------------------------
   * KEEP SELECTED REPORT VALID
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (
      filteredReports.length === 0
    ) {
      setSelectedReport(null)
      return
    }

    const selectedStillExists =
      selectedReport !== null &&
      filteredReports.some(
        (report) =>
          report.reference ===
          selectedReport.reference,
      )

    if (!selectedStillExists) {
      setSelectedReport(
        filteredReports[0],
      )
    }
  }, [
    filteredReports,
    selectedReport,
  ])

  /*
   * ----------------------------------------------------------
   * STATISTICS
   * ----------------------------------------------------------
   */

  const criticalCount =
    reportsWithCoordinates.filter(
      (report) =>
        report.priority === 'Critical',
    ).length

  const highCount =
    reportsWithCoordinates.filter(
      (report) =>
        report.priority === 'High',
    ).length

  const mediumCount =
    reportsWithCoordinates.filter(
      (report) =>
        report.priority === 'Medium',
    ).length

  const inProgressCount =
    reportsWithCoordinates.filter(
      (report) =>
        report.status === 'In Progress',
    ).length

  const resolvedCount =
    reportsWithCoordinates.filter(
      (report) =>
        report.status === 'Resolved',
    ).length

  /*
   * ----------------------------------------------------------
   * RENDER
   * ----------------------------------------------------------
   */

  return (
    <div className="container-fluid px-0">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">

        <div className="min-width-0">

          <div className="text-primary small fw-bold text-uppercase mb-1">
            Operations
          </div>

          <h1 className="h2 fw-bold mb-2">
            Map Monitoring
          </h1>

          <p className="text-secondary mb-0">
            Monitor report locations and identify
            geographic concentrations of infrastructure
            issues.
          </p>

        </div>

        <Link
          to="/admin/reports"
          className="btn btn-outline-primary flex-shrink-0"
        >
          <i className="bi bi-file-earmark-text me-2" />
          View Reports
        </Link>

      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="row g-3 mb-4">

        {/* MAPPED REPORTS */}

        <div className="col-6 col-md-4 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-start gap-2">

                <div>

                  <div className="text-secondary small">
                    Mapped Reports
                  </div>

                  <div className="fs-3 fw-bold mt-1">
                    {
                      reportsWithCoordinates.length
                    }
                  </div>

                </div>

                <i className="bi bi-geo-alt text-primary fs-4" />

              </div>

            </div>

          </div>

        </div>

        {/* CRITICAL */}

        <div className="col-6 col-md-4 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-start gap-2">

                <div>

                  <div className="text-secondary small">
                    Critical
                  </div>

                  <div className="fs-3 fw-bold text-danger mt-1">
                    {criticalCount}
                  </div>

                </div>

                <i className="bi bi-exclamation-triangle text-danger fs-4" />

              </div>

            </div>

          </div>

        </div>

        {/* HIGH */}

        <div className="col-6 col-md-4 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-start gap-2">

                <div>

                  <div className="text-secondary small">
                    High Priority
                  </div>

                  <div className="fs-3 fw-bold text-warning mt-1">
                    {highCount}
                  </div>

                </div>

                <i className="bi bi-exclamation-circle text-warning fs-4" />

              </div>

            </div>

          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="col-6 col-md-4 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-start gap-2">

                <div>

                  <div className="text-secondary small">
                    In Progress
                  </div>

                  <div className="fs-3 fw-bold text-primary mt-1">
                    {inProgressCount}
                  </div>

                </div>

                <i className="bi bi-arrow-repeat text-primary fs-4" />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          MAP + REPORT LIST
      ====================================================== */}

      <div className="row g-4">

        {/* ====================================================
            MAP
        ==================================================== */}

        <div className="col-12 col-xl-8">

          <div className="card border-0 shadow-sm overflow-hidden">

            {/* MAP HEADER */}

            <div className="card-header bg-white border-0 p-3 p-md-4">

              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">

                <div>

                  <h2 className="h5 fw-bold mb-1">
                    Report Locations
                  </h2>

                  <p className="text-secondary small mb-0">
                    Select a marker to inspect a report.
                  </p>

                </div>

                <div className="d-flex align-items-center gap-2">

                  <label
                    htmlFor="priorityFilter"
                    className="small text-secondary text-nowrap"
                  >
                    Priority
                  </label>

                  <select
                    id="priorityFilter"
                    className="form-select form-select-sm"
                    value={priorityFilter}
                    onChange={(event) =>
                      setPriorityFilter(
                        event.target.value as
                          | 'All'
                          | ReportPriority,
                      )
                    }
                    style={{
                      minWidth: '130px',
                    }}
                  >

                    <option value="All">
                      All
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

            {/* MAP */}

            <div
              style={{
                height:
                  'clamp(400px, 60vh, 650px)',
                width: '100%',
              }}
            >

              <MapContainer
                center={KIGALI_CENTER}
                zoom={12}
                scrollWheelZoom
                className="w-100 h-100"
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController
                  report={selectedReport}
                />

                {filteredReports.map(
                  (report) => {

                    if (
                      report.latitude === null ||
                      report.longitude === null
                    ) {
                      return null
                    }

                    return (
                      <Marker
                        key={
                          report.reference
                        }
                        position={[
                          report.latitude,
                          report.longitude,
                        ]}
                        icon={
                          defaultIcon
                        }
                        eventHandlers={{
                          click: () =>
                            setSelectedReport(
                              report,
                            ),
                        }}
                      >

                        <Popup>

                          <div
                            style={{
                              minWidth:
                                '220px',
                            }}
                          >

                            <div className="fw-bold mb-1">
                              {
                                report.reference
                              }
                            </div>

                            <div className="small text-secondary mb-2">
                              {
                                report.category
                              }
                            </div>

                            <div className="mb-2">

                              <span
                                className={`badge text-bg-${getPriorityClass(
                                  report.priority,
                                )}`}
                              >
                                {
                                  report.priority
                                }
                              </span>

                            </div>

                            <div className="small mb-3">

                              <i className="bi bi-geo-alt me-1" />

                              {
                                report.location
                              }

                            </div>

                            <Link
                              to={`/admin/reports/${encodeURIComponent(
                                report.reference,
                              )}`}
                              className="btn btn-sm btn-primary w-100"
                            >
                              View Report
                            </Link>

                          </div>

                        </Popup>

                      </Marker>
                    )
                  },
                )}

              </MapContainer>

            </div>

            {/* MAP LEGEND */}

            <div className="card-footer bg-white border-0 p-3">

              <div className="d-flex flex-wrap gap-3 small">

                <LegendItem
                  colorClass="bg-danger"
                  label="Critical"
                />

                <LegendItem
                  colorClass="bg-warning"
                  label="High"
                />

                <LegendItem
                  colorClass="bg-primary"
                  label="Medium"
                />

                <LegendItem
                  colorClass="bg-secondary"
                  label="Low"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ====================================================
            REPORT LIST
        ==================================================== */}

        <div className="col-12 col-xl-4">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h2 className="h5 fw-bold mb-1">
                    Mapped Reports
                  </h2>

                  <div className="small text-secondary">
                    {filteredReports.length}{' '}
                    report
                    {filteredReports.length !==
                    1
                      ? 's'
                      : ''}
                  </div>

                </div>

                <i className="bi bi-list-ul text-primary fs-5" />

              </div>

            </div>

            <div
              className="card-body p-0"
              style={{
                maxHeight:
                  'clamp(400px, 60vh, 650px)',
                overflowY: 'auto',
              }}
            >

              {filteredReports.length ===
              0 ? (

                <div className="p-4 text-center text-secondary">

                  <i className="bi bi-geo-alt fs-1 d-block mb-3" />

                  <div className="fw-semibold">
                    No mapped reports
                  </div>

                  <div className="small mt-1">
                    No reports match the selected
                    priority filter.
                  </div>

                </div>

              ) : (

                <div className="list-group list-group-flush">

                  {filteredReports.map(
                    (report) => {

                      const isSelected =
                        selectedReport?.reference ===
                        report.reference

                      return (

                        <div
                          key={
                            report.reference
                          }
                          className={`list-group-item p-3 ${
                            isSelected
                              ? 'bg-primary-subtle'
                              : ''
                          }`}
                        >

                          <div className="d-flex justify-content-between align-items-start gap-2">

                            <button
                              type="button"
                              className="btn btn-link text-decoration-none text-start p-0 border-0 flex-grow-1"
                              onClick={() =>
                                setSelectedReport(
                                  report,
                                )
                              }
                            >

                              <div className="fw-bold font-monospace text-break">
                                {
                                  report.reference
                                }
                              </div>

                              <div className="small text-secondary mt-1">
                                {
                                  report.category
                                }
                              </div>

                            </button>

                            <span
                              className={`badge text-bg-${getPriorityClass(
                                report.priority,
                              )} flex-shrink-0`}
                            >
                              {
                                report.priority
                              }
                            </span>

                          </div>

                          <div className="small mt-2">

                            <i className="bi bi-geo-alt me-1 text-secondary" />

                            {
                              report.location
                            }

                          </div>

                          <div className="small text-secondary mt-1">

                            <i className="bi bi-clock me-1" />

                            {formatDate(
                              report.createdAt,
                            )}

                          </div>

                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">

                            <span className="badge text-bg-light border">
                              {
                                report.status
                              }
                            </span>

                            <Link
                              to={`/admin/reports/${encodeURIComponent(
                                report.reference,
                              )}`}
                              className="small fw-semibold text-decoration-none"
                            >
                              Details

                              <i className="bi bi-arrow-right ms-1" />
                            </Link>

                          </div>

                        </div>

                      )
                    },
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          ADDITIONAL STATISTICS
      ====================================================== */}

      <div className="row g-3 mt-1">

        <div className="col-12 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <div className="small text-secondary">
                    Resolved Reports
                  </div>

                  <div className="h4 fw-bold mb-0 mt-1">
                    {resolvedCount}
                  </div>

                </div>

                <i className="bi bi-check-circle text-success fs-4" />

              </div>

            </div>

          </div>

        </div>

        <div className="col-12 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <div className="small text-secondary">
                    Medium Priority
                  </div>

                  <div className="h4 fw-bold mb-0 mt-1">
                    {mediumCount}
                  </div>

                </div>

                <i className="bi bi-info-circle text-primary fs-4" />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          INFORMATION NOTE
      ====================================================== */}

      <div className="alert alert-info border-0 mt-4 mb-0">

        <div className="d-flex gap-3">

          <i className="bi bi-info-circle fs-5 flex-shrink-0" />

          <div>

            <div className="fw-semibold">
              Geographic monitoring
            </div>

            <div className="small mt-1">
              This map helps administrators identify
              where infrastructure reports are concentrated.
              It is a decision-support tool and does not
              automatically determine operational actions.
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminMap