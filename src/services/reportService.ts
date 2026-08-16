import type {
  Report,
  ReportCategory,
} from '../types/report'

const REPORTS_STORAGE_KEY =
  'reporthub_reports'

type CreateReportData = {
  category: ReportCategory
  description: string
  location: string
  latitude: number | null
  longitude: number | null
  evidenceName: string | null
}

function getStoredReports(): Report[] {
  const storedReports =
    localStorage.getItem(REPORTS_STORAGE_KEY)

  if (!storedReports) {
    return []
  }

  try {
    const parsedReports: unknown =
      JSON.parse(storedReports)

    if (!Array.isArray(parsedReports)) {
      return []
    }

    return parsedReports as Report[]
  } catch {
    return []
  }
}

function saveStoredReports(
  reports: Report[],
): void {
  localStorage.setItem(
    REPORTS_STORAGE_KEY,
    JSON.stringify(reports),
  )
}

function normalizeReference(
  reference: string,
): string {
  return reference.trim().toUpperCase()
}

function generateReference(
  existingReports: Report[],
): string {
  let reference = ''

  do {
    const randomNumber = Math.floor(
      10000000 +
        Math.random() * 90000000,
    )

    reference = `RH-${randomNumber}`
  } while (
    existingReports.some(
      (report) =>
        report.reference === reference,
    )
  )

  return reference
}

export function createReport(
  data: CreateReportData,
): Report {
  const reports = getStoredReports()

  const report: Report = {
    reference: generateReference(reports),
    category: data.category,
    description: data.description.trim(),
    location: data.location.trim(),
    latitude: data.latitude,
    longitude: data.longitude,
    evidenceName: data.evidenceName,
    status: 'pending',
    createdAt:
      new Date().toISOString(),
  }

  reports.push(report)

  saveStoredReports(reports)

  return report
}

export function saveReport(
  report: Report,
): void {
  const reports = getStoredReports()

  const normalizedReference =
    normalizeReference(
      report.reference,
    )

  const existingIndex =
    reports.findIndex(
      (existingReport) =>
        normalizeReference(
          existingReport.reference,
        ) === normalizedReference,
    )

  if (existingIndex === -1) {
    reports.push({
      ...report,
      reference: normalizedReference,
    })
  } else {
    reports[existingIndex] = {
      ...report,
      reference: normalizedReference,
    }
  }

  saveStoredReports(reports)
}

export function getReportByReference(
  reference: string,
): Report | null {
  const normalizedReference =
    normalizeReference(reference)

  if (!normalizedReference) {
    return null
  }

  const reports = getStoredReports()

  return (
    reports.find(
      (report) =>
        normalizeReference(
          report.reference,
        ) === normalizedReference,
    ) ?? null
  )
}

export function getAllReports(): Report[] {
  return getStoredReports()
}

export function updateReportStatus(
  reference: string,
  status: Report['status'],
): Report | null {
  const normalizedReference =
    normalizeReference(reference)

  const reports = getStoredReports()

  const reportIndex =
    reports.findIndex(
      (report) =>
        normalizeReference(
          report.reference,
        ) === normalizedReference,
    )

  if (reportIndex === -1) {
    return null
  }

  const updatedReport: Report = {
    ...reports[reportIndex],
    status,
  }

  reports[reportIndex] = updatedReport

  saveStoredReports(reports)

  return updatedReport
}