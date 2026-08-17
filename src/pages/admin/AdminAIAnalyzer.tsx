import {
  useMemo,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import {
  getReports,
} from '../../services/reportService'

import type {
  Report,
  ReportPriority,
} from '../../types/report'

/*
 * ============================================================
 * TYPES
 * ============================================================
 */

type InsightLevel =
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low'

type Insight = {
  id: string
  title: string
  level: InsightLevel
  category: string
  location: string
  explanation: string
  evidence: string[]
  confidence: number
  reportReferences: string[]
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function getLevelClass(
  level: InsightLevel,
): string {
  switch (level) {
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

function getConfidenceClass(
  confidence: number,
): string {
  if (confidence >= 85) {
    return 'success'
  }

  if (confidence >= 70) {
    return 'warning'
  }

  return 'secondary'
}

function getPriorityWeight(
  priority: ReportPriority,
): number {
  switch (priority) {
    case 'Critical':
      return 4

    case 'High':
      return 3

    case 'Medium':
      return 2

    case 'Low':
      return 1

    default:
      return 0
  }
}

/*
 * ============================================================
 * ADMIN AI ANALYZER
 * ============================================================
 */

function AdminAIAnalyzer() {
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
   * UI STATE
   * ----------------------------------------------------------
   */

  const [
    isAnalyzing,
    setIsAnalyzing,
  ] = useState(false)

  const [
    analysisComplete,
    setAnalysisComplete,
  ] = useState(true)

  const [
    insightFilter,
    setInsightFilter,
  ] = useState<
    'All' | InsightLevel
  >('All')

  /*
   * ----------------------------------------------------------
   * BASIC STATISTICS
   * ----------------------------------------------------------
   */

  const criticalReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          report.priority === 'Critical',
      ),
    [reports],
  )

  const highPriorityReports =
    useMemo(
      () =>
        reports.filter(
          (report) =>
            report.priority === 'High',
        ),
      [reports],
    )

  const inProgressReports =
    useMemo(
      () =>
        reports.filter(
          (report) =>
            report.status === 'In Progress',
        ),
      [reports],
    )

  const unresolvedReports =
    useMemo(
      () =>
        reports.filter(
          (report) =>
            report.status !== 'Resolved',
        ),
      [reports],
    )

  /*
   * ----------------------------------------------------------
   * CATEGORY ANALYSIS
   * ----------------------------------------------------------
   */

  const categoryGroups = useMemo(() => {
    const groups = new Map<
      string,
      Report[]
    >()

    reports.forEach((report) => {
      const existing =
        groups.get(report.category) ?? []

      groups.set(
        report.category,
        [
          ...existing,
          report,
        ],
      )
    })

    return Array.from(
      groups.entries(),
    )
      .map(
        ([
          category,
          categoryReports,
        ]) => ({
          category,
          reports: categoryReports,
          count: categoryReports.length,
          criticalCount:
            categoryReports.filter(
              (report) =>
                report.priority ===
                'Critical',
            ).length,
          highCount:
            categoryReports.filter(
              (report) =>
                report.priority ===
                'High',
            ).length,
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

  const locationGroups = useMemo(() => {
    const groups = new Map<
      string,
      Report[]
    >()

    reports.forEach((report) => {
      const location =
        report.location.trim()

      if (!location) {
        return
      }

      const existing =
        groups.get(location) ?? []

      groups.set(
        location,
        [
          ...existing,
          report,
        ],
      )
    })

    return Array.from(
      groups.entries(),
    )
      .map(
        ([
          location,
          locationReports,
        ]) => ({
          location,
          reports: locationReports,
          count: locationReports.length,
          criticalCount:
            locationReports.filter(
              (report) =>
                report.priority ===
                'Critical',
            ).length,
          highCount:
            locationReports.filter(
              (report) =>
                report.priority ===
                'High',
            ).length,
        }),
      )
      .sort(
        (a, b) =>
          b.count - a.count,
      )
  }, [reports])

  /*
   * ----------------------------------------------------------
   * GENERATE EXPLAINABLE INSIGHTS
   * ----------------------------------------------------------
   */

  const insights = useMemo<Insight[]>(
    () => {
      const generated: Insight[] = []

      /*
       * Critical reports
       */

      if (
        criticalReports.length > 0
      ) {
        generated.push({
          id: 'critical-reports',
          title:
            'Critical reports require immediate administrative review',
          level: 'Critical',
          category:
            'Priority assessment',
          location:
            'Multiple locations',
          explanation:
            'Several reports are currently marked as Critical. These cases should receive administrative attention before lower-priority cases.',
          evidence: [
            `${criticalReports.length} critical report${
              criticalReports.length !==
              1
                ? 's'
                : ''
            } detected.`,
            'Critical priority is already assigned in the report data.',
            'Recommendation is advisory and requires human review.',
          ],
          confidence: Math.min(
            98,
            80 +
              criticalReports.length *
                3,
          ),
          reportReferences:
            criticalReports
              .slice(0, 5)
              .map(
                (report) =>
                  report.reference,
              ),
        })
      }

      /*
       * Geographic concentration
       */

      locationGroups
        .filter(
          (group) =>
            group.count >= 2,
        )
        .slice(0, 3)
        .forEach(
          (group, index) => {
            const level: InsightLevel =
              group.criticalCount >
              0
                ? 'Critical'
                : group.highCount >
                    0
                  ? 'High'
                  : 'Medium'

            const confidence =
              Math.min(
                95,
                65 +
                  group.count * 7,
              )

            generated.push({
              id: `location-${index}`,
              title:
                'Geographic report concentration detected',
              level,
              category:
                'Geographic pattern',
              location:
                group.location,
              explanation:
                `${group.count} reports are associated with the same location. This may indicate a recurring or concentrated infrastructure issue.`,
              evidence: [
                `${group.count} related reports detected.`,
                group.criticalCount > 0
                  ? `${group.criticalCount} critical report${
                      group.criticalCount !==
                      1
                        ? 's'
                        : ''
                    } in this area.`
                  : 'No critical reports detected in this group.',
                group.highCount > 0
                  ? `${group.highCount} high-priority report${
                      group.highCount !==
                      1
                        ? 's'
                        : ''
                    } detected.`
                  : 'No high-priority reports detected in this group.',
              ],
              confidence,
              reportReferences:
                group.reports
                  .slice(0, 5)
                  .map(
                    (report) =>
                      report.reference,
                  ),
            })
          },
        )

      /*
       * Category concentration
       */

      categoryGroups
        .filter(
          (group) =>
            group.count >= 3,
        )
        .slice(0, 3)
        .forEach(
          (group, index) => {
            const level: InsightLevel =
              group.criticalCount >=
              2
                ? 'Critical'
                : group.highCount >=
                    2
                  ? 'High'
                  : 'Medium'

            generated.push({
              id: `category-${index}`,
              title:
                'Recurring infrastructure category detected',
              level,
              category:
                'Category pattern',
              location:
                'Multiple locations',
              explanation:
                `${group.count} reports belong to the ${group.category} category, indicating a recurring issue that may deserve administrative review.`,
              evidence: [
                `${group.count} reports in this category.`,
                `${group.criticalCount} critical report${
                  group.criticalCount !==
                  1
                    ? 's'
                    : ''
                }.`,
                `${group.highCount} high-priority report${
                  group.highCount !==
                  1
                    ? 's'
                    : ''
                }.`,
              ],
              confidence: Math.min(
                92,
                60 +
                  group.count * 5,
              ),
              reportReferences:
                group.reports
                  .sort(
                    (a, b) =>
                      getPriorityWeight(
                        b.priority,
                      ) -
                      getPriorityWeight(
                        a.priority,
                      ),
                  )
                  .slice(0, 5)
                  .map(
                    (report) =>
                      report.reference,
                  ),
            })
          },
        )

      /*
       * Unresolved workload
       */

      if (
        unresolvedReports.length >
          0 &&
        inProgressReports.length >
          0
      ) {
        generated.push({
          id: 'unresolved-workload',
          title:
            'Unresolved operational workload detected',
          level: 'Medium',
          category:
            'Operational pattern',
          location:
            'System-wide',
          explanation:
            'A number of reports remain unresolved while other reports are already in progress. Administrators may want to review workload distribution and aging cases.',
          evidence: [
            `${unresolvedReports.length} unresolved report${
              unresolvedReports.length !==
              1
                ? 's'
                : ''
            }.`,
            `${inProgressReports.length} report${
              inProgressReports.length !==
              1
                ? 's'
                : ''
            } currently in progress.`,
            'AI does not assign workload or departments automatically.',
          ],
          confidence: 78,
          reportReferences:
            inProgressReports
              .slice(0, 5)
              .map(
                (report) =>
                  report.reference,
              ),
        })
      }

      return generated
    },
    [
      reports,
      criticalReports,
      locationGroups,
      categoryGroups,
      unresolvedReports,
      inProgressReports,
    ],
  )

  /*
   * ----------------------------------------------------------
   * FILTERED INSIGHTS
   * ----------------------------------------------------------
   */

  const filteredInsights =
    useMemo(() => {
      if (
        insightFilter === 'All'
      ) {
        return insights
      }

      return insights.filter(
        (insight) =>
          insight.level ===
          insightFilter,
      )
    }, [
      insights,
      insightFilter,
    ])

  /*
   * ----------------------------------------------------------
   * OVERALL CONFIDENCE
   * ----------------------------------------------------------
   */

  const overallConfidence =
    useMemo(() => {
      if (insights.length === 0) {
        return 0
      }

      const total =
        insights.reduce(
          (sum, insight) =>
            sum +
            insight.confidence,
          0,
        )

      return Math.round(
        total / insights.length,
      )
    }, [insights])

  /*
   * ----------------------------------------------------------
   * RUN ANALYSIS
   * ----------------------------------------------------------
   */

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisComplete(false)

    window.setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 1200)
  }

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
            Decision Support
          </div>

          <h1 className="h2 fw-bold mb-2">
            AI Report Analyzer
          </h1>

          <p className="text-secondary mb-0">
            Analyze report patterns, identify
            risk signals, and support
            administrative prioritization.
          </p>

        </div>

        <button
          type="button"
          className="btn btn-primary flex-shrink-0"
          onClick={runAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              />

              Analyzing...
            </>
          ) : (
            <>
              <i className="bi bi-stars me-2" />

              Run Analysis
            </>
          )}
        </button>

      </div>

      {/* ====================================================
          AI SAFETY / HUMAN CONTROL
      ==================================================== */}

      <div className="alert alert-info border-0 shadow-sm mb-4">

        <div className="d-flex gap-3">

          <div className="flex-shrink-0">
            <i className="bi bi-shield-check fs-4" />
          </div>

          <div>

            <div className="fw-bold">
              Human decision remains in control
            </div>

            <div className="small mt-1">
              AI findings are advisory decision
              support. The system does not
              automatically approve, reject,
              assign, escalate, or resolve
              reports. Administrators remain
              responsible for final decisions.
            </div>

          </div>

        </div>

      </div>

      {/* ====================================================
          ANALYSIS STATUS
      ==================================================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body p-3 p-md-4">

          <div className="row g-3 align-items-center">

            <div className="col-12 col-lg-7">

              <div className="d-flex align-items-center gap-3">

                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center ${
                    analysisComplete
                      ? 'bg-success-subtle text-success'
                      : 'bg-warning-subtle text-warning'
                  }`}
                  style={{
                    width: '44px',
                    height: '44px',
                  }}
                >
                  <i
                    className={`bi ${
                      analysisComplete
                        ? 'bi-check-lg'
                        : 'bi-hourglass-split'
                    }`}
                  />
                </div>

                <div>

                  <div className="fw-semibold">
                    {analysisComplete
                      ? 'Analysis completed'
                      : 'Analysis in progress'}
                  </div>

                  <div className="small text-secondary">
                    {reports.length}{' '}
                    reports available
                    for analysis
                  </div>

                </div>

              </div>

            </div>

            <div className="col-12 col-lg-5">

              <div className="d-flex justify-content-lg-end align-items-center gap-3">

                <div className="text-lg-end">

                  <div className="small text-secondary">
                    Overall confidence
                  </div>

                  <div className="fw-bold">
                    {overallConfidence}%
                  </div>

                </div>

                <div
                  className="progress flex-grow-1"
                  style={{
                    maxWidth: '180px',
                    height: '8px',
                  }}
                  aria-label={`AI analysis confidence ${overallConfidence}%`}
                >
                  <div
                    className={`progress-bar bg-${getConfidenceClass(
                      overallConfidence,
                    )}`}
                    style={{
                      width: `${overallConfidence}%`,
                    }}
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================
          SUMMARY CARDS
      ==================================================== */}

      <div className="row g-3 mb-4">

        <SummaryCard
          label="Reports analyzed"
          value={reports.length}
          icon="bi-file-earmark-text"
          iconClass="text-primary"
        />

        <SummaryCard
          label="Critical signals"
          value={criticalReports.length}
          icon="bi-exclamation-triangle"
          iconClass="text-danger"
          valueClass="text-danger"
        />

        <SummaryCard
          label="High-priority reports"
          value={highPriorityReports.length}
          icon="bi-exclamation-circle"
          iconClass="text-warning"
          valueClass="text-warning"
        />

        <SummaryCard
          label="Detected patterns"
          value={insights.length}
          icon="bi-diagram-3"
          iconClass="text-primary"
        />

      </div>

      {/* ====================================================
          INSIGHTS
      ==================================================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-header bg-white border-0 p-3 p-md-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

            <div>

              <h2 className="h5 fw-bold mb-1">
                AI Priority Insights
              </h2>

              <p className="small text-secondary mb-0">
                Explainable findings generated
                from available report data.
              </p>

            </div>

            <select
              className="form-select form-select-sm"
              style={{
                maxWidth: '170px',
              }}
              value={insightFilter}
              onChange={(event) =>
                setInsightFilter(
                  event.target.value as
                    | 'All'
                    | InsightLevel,
                )
              }
              aria-label="Filter AI insights"
            >
              <option value="All">
                All insights
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

        <div className="card-body p-0">

          {filteredInsights.length ===
          0 ? (
            <div className="p-5 text-center text-secondary">

              <i className="bi bi-stars fs-1 d-block mb-3" />

              <div className="fw-semibold">
                No insights detected
              </div>

              <div className="small mt-1">
                There are currently no
                insights matching this
                filter.
              </div>

            </div>
          ) : (
            <div className="list-group list-group-flush">

              {filteredInsights.map(
                (insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                  />
                ),
              )}

            </div>
          )}

        </div>

      </div>

      {/* ====================================================
          CATEGORY + OPERATIONAL SIGNALS
      ==================================================== */}

      <div className="row g-4 mb-4">

        <div className="col-12 col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h2 className="h5 fw-bold mb-1">
                    Top Report Categories
                  </h2>

                  <p className="small text-secondary mb-0">
                    Most frequently reported
                    infrastructure issues.
                  </p>

                </div>

                <i className="bi bi-tags text-primary fs-5" />

              </div>

              {categoryGroups
                .slice(0, 5)
                .map((group) => (
                  <div
                    key={group.category}
                    className="mb-3"
                  >

                    <div className="d-flex justify-content-between gap-3 mb-1">

                      <span className="small fw-semibold text-truncate">
                        {group.category}
                      </span>

                      <span className="small text-secondary flex-shrink-0">
                        {group.count}
                      </span>

                    </div>

                    <div
                      className="progress"
                      style={{
                        height: '7px',
                      }}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${Math.min(
                            100,
                            (group.count /
                              Math.max(
                                reports.length,
                                1,
                              )) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>

                  </div>
                ))}

              {categoryGroups.length ===
                0 && (
                <div className="text-secondary small">
                  No category data available.
                </div>
              )}

            </div>

          </div>

        </div>

        <div className="col-12 col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h2 className="h5 fw-bold mb-1">
                    Operational Signals
                  </h2>

                  <p className="small text-secondary mb-0">
                    Current workload indicators.
                  </p>

                </div>

                <i className="bi bi-activity text-primary fs-5" />

              </div>

              <SignalRow
                label="Unresolved reports"
                value={
                  unresolvedReports.length
                }
                icon="bi-clock"
              />

              <SignalRow
                label="In progress"
                value={
                  inProgressReports.length
                }
                icon="bi-arrow-repeat"
              />

              <SignalRow
                label="Critical"
                value={
                  criticalReports.length
                }
                icon="bi-exclamation-triangle"
              />

              <SignalRow
                label="High priority"
                value={
                  highPriorityReports.length
                }
                icon="bi-exclamation-circle"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================
          AI LIMITATIONS
      ==================================================== */}

      <div className="card border-0 bg-light mb-4">

        <div className="card-body p-3 p-md-4">

          <div className="d-flex gap-3">

            <i className="bi bi-info-circle text-primary fs-5 flex-shrink-0" />

            <div>

              <div className="fw-semibold mb-1">
                How AI analysis should be used
              </div>

              <ul className="small text-secondary mb-0 ps-3">

                <li>
                  Review the evidence behind
                  every recommendation.
                </li>

                <li>
                  Verify important findings
                  against the original report.
                </li>

                <li>
                  Treat confidence scores as
                  indicators, not guarantees.
                </li>

                <li>
                  Administrators retain final
                  authority over all actions.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

/*
 * ============================================================
 * SUMMARY CARD
 * ============================================================
 */

function SummaryCard({
  label,
  value,
  icon,
  iconClass,
  valueClass = '',
}: {
  label: string
  value: number
  icon: string
  iconClass: string
  valueClass?: string
}) {
  return (
    <div className="col-6 col-xl-3">

      <div className="card border-0 shadow-sm h-100">

        <div className="card-body p-3 p-md-4">

          <div className="d-flex justify-content-between align-items-start gap-2">

            <div>

              <div className="small text-secondary">
                {label}
              </div>

              <div
                className={`fs-3 fw-bold mt-1 ${valueClass}`}
              >
                {value}
              </div>

            </div>

            <i
              className={`bi ${icon} fs-4 ${iconClass}`}
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
 * INSIGHT CARD
 * ============================================================
 */

function InsightCard({
  insight,
}: {
  insight: Insight
}) {
  const badgeClass =
    getLevelClass(insight.level)

  return (
    <div className="list-group-item p-3 p-md-4">

      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">

        <div className="min-width-0 flex-grow-1">

          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">

            <span
              className={`badge text-bg-${badgeClass}`}
            >
              {insight.level}
            </span>

            <span className="badge text-bg-light border text-secondary">
              {insight.category}
            </span>

          </div>

          <h3 className="h6 fw-bold mb-1">
            {insight.title}
          </h3>

          <div className="small text-secondary mb-2">
            <i className="bi bi-geo-alt me-1" />
            {insight.location}
          </div>

          <p className="small mb-3">
            {insight.explanation}
          </p>

          <div className="small">

            <div className="fw-semibold mb-2">
              Evidence
            </div>

            <ul className="text-secondary ps-3 mb-0">

              {insight.evidence.map(
                (item) => (
                  <li
                    key={item}
                    className="mb-1"
                  >
                    {item}
                  </li>
                ),
              )}

            </ul>

          </div>

        </div>

        <div
          className="flex-shrink-0"
          style={{
            minWidth: '170px',
          }}
        >

          <div className="small text-secondary mb-1">
            Confidence
          </div>

          <div className="d-flex align-items-center gap-2 mb-3">

            <div
              className="progress flex-grow-1"
              style={{
                height: '7px',
              }}
            >
              <div
                className={`progress-bar bg-${getConfidenceClass(
                  insight.confidence,
                )}`}
                style={{
                  width: `${insight.confidence}%`,
                }}
              />
            </div>

            <span className="small fw-semibold">
              {insight.confidence}%
            </span>

          </div>

          {insight.reportReferences
            .length > 0 && (
            <Link
              to={`/admin/reports/${encodeURIComponent(
                insight.reportReferences[0],
              )}`}
              className="btn btn-sm btn-outline-primary w-100"
            >
              Review Report
              <i className="bi bi-arrow-right ms-2" />
            </Link>
          )}

        </div>

      </div>

    </div>
  )
}

/*
 * ============================================================
 * SIGNAL ROW
 * ============================================================
 */

function SignalRow({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: string
}) {
  return (
    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">

      <div className="d-flex align-items-center gap-2">

        <i
          className={`bi ${icon} text-secondary`}
          aria-hidden="true"
        />

        <span className="small">
          {label}
        </span>

      </div>

      <span className="fw-bold">
        {value}
      </span>

    </div>
  )
}

export default AdminAIAnalyzer