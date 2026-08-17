import type {
  Report,
  ReportCategory,
  ReportPriority,
  ReportStatus,
} from '../types/report'

/*
 * ============================================================
 * MOCK REPORT DATA
 * ============================================================
 */

export const mockReports: Report[] = [
  {
    reference: 'RH-001245',
    category: 'Road Damage',
    description:
      'Citizen reported significant road damage requiring assessment and possible repair.',
    location: 'Kigali, Rwanda',
    latitude: -1.9441,
    longitude: 30.0619,
    status: 'Under Review',
    priority: 'Critical',
    createdAt: '2026-08-17T09:42:00',
    reporter: {
      name: 'Jean Claude',
      email: 'jean.claude@example.com',
    },
    department: 'Infrastructure',
    assignedTo: null,
    evidence: [],
    evidenceName: null,
    administrativeNote: '',
  },

  {
    reference: 'RH-001246',
    category: 'Street Lighting',
    description:
      'Several street lights are not functioning along the reported road section.',
    location: 'Kicukiro, Kigali',
    latitude: -1.9706,
    longitude: 30.1044,
    status: 'In Progress',
    priority: 'High',
    createdAt: '2026-08-16T16:20:00',
    reporter: {
      name: 'Alice Mukamana',
      email: 'alice.mukamana@example.com',
    },
    department: 'Public Lighting',
    assignedTo: 'Kicukiro Maintenance Team',
    evidence: [],
    evidenceName: null,
    administrativeNote:
      'Maintenance team has been notified and inspection is pending.',
  },

  {
    reference: 'RH-001247',
    category: 'Water Supply',
    description:
      'Residents reported interruption of water supply affecting several households.',
    location: 'Gasabo, Kigali',
    latitude: -1.897,
    longitude: 30.104,
    status: 'Under Review',
    priority: 'High',
    createdAt: '2026-08-16T11:15:00',
    reporter: {
      name: 'Eric Niyonzima',
      email: 'eric.niyonzima@example.com',
    },
    department: 'Water Services',
    assignedTo: null,
    evidence: [],
    evidenceName: null,
    administrativeNote: '',
  },

  {
    reference: 'RH-001248',
    category: 'Waste Management',
    description:
      'Uncollected waste has accumulated at the reported location.',
    location: 'Nyarugenge, Kigali',
    latitude: -1.9501,
    longitude: 30.0588,
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '2026-08-15T10:00:00',
    reporter: {
      name: 'Marie Uwase',
      email: 'marie.uwase@example.com',
    },
    department: 'Waste Management',
    assignedTo: 'Nyarugenge Collection Team',
    evidence: [],
    evidenceName: null,
    administrativeNote:
      'Collection completed and issue marked resolved.',
  },

  {
    reference: 'RH-001249',
    category: 'Drainage',
    description:
      'Blocked drainage is causing water accumulation near the reported area.',
    location: 'Remera, Gasabo',
    latitude: -1.9447,
    longitude: 30.1168,
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '2026-08-14T10:00:00',
    reporter: {
      name: 'Patrick Habimana',
      email: 'patrick.habimana@example.com',
    },
    department: 'Infrastructure',
    assignedTo: 'Drainage Response Team',
    evidence: [],
    evidenceName: null,
    administrativeNote: '',
  },
]

/*
 * ============================================================
 * REPORT FILTERS
 * ============================================================
 */

export type ReportFilters = {
  search: string
  status: 'All' | ReportStatus
  priority: 'All' | ReportPriority
  category: 'All' | ReportCategory
}

/*
 * ============================================================
 * GET REPORTS
 * ============================================================
 */

export function getReports(
  filters?: Partial<ReportFilters>,
): Report[] {
  const search =
    filters?.search?.trim().toLowerCase() ?? ''

  const status = filters?.status ?? 'All'
  const priority = filters?.priority ?? 'All'
  const category = filters?.category ?? 'All'

  return mockReports.filter((report) => {
    const matchesSearch =
      !search ||
      report.reference
        .toLowerCase()
        .includes(search) ||
      report.category
        .toLowerCase()
        .includes(search) ||
      report.location
        .toLowerCase()
        .includes(search) ||
      report.description
        .toLowerCase()
        .includes(search)

    const matchesStatus =
      status === 'All' ||
      report.status === status

    const matchesPriority =
      priority === 'All' ||
      report.priority === priority

    const matchesCategory =
      category === 'All' ||
      report.category === category

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory
    )
  })
}

/*
 * ============================================================
 * GET REPORT BY REFERENCE
 * ============================================================
 */

export function getReportByReference(
  reference: string,
): Report | undefined {
  const cleanedReference =
    reference.trim().toUpperCase()

  return mockReports.find(
    (report) =>
      report.reference.toUpperCase() ===
      cleanedReference,
  )
}

/*
 * ============================================================
 * CREATE REPORT
 * ============================================================
 */

type CreateReportInput = {
  category: ReportCategory
  description: string
  location: string
  latitude: number | null
  longitude: number | null
  evidenceName: string | null
}

export function createReport(
  input: CreateReportInput,
): Report {
  const now = new Date()

  /*
   * Find the highest existing report number
   * and generate the next reference.
   */
  const nextNumber =
    mockReports.reduce((max, report) => {
      const number = Number(
        report.reference.replace('RH-', ''),
      )

      return Number.isNaN(number)
        ? max
        : Math.max(max, number)
    }, 0) + 1

  const report: Report = {
    reference: `RH-${String(nextNumber).padStart(6, '0')}`,

    category: input.category,

    description: input.description,

    location: input.location,

    latitude: input.latitude,

    longitude: input.longitude,

    status: 'Under Review',

    priority: 'Medium',

    createdAt: now.toISOString(),

    reporter: {
      name: 'Anonymous Reporter',
      email: 'anonymous@example.com',
    },

    department: null,

    assignedTo: null,

    evidence: input.evidenceName
      ? [input.evidenceName]
      : [],

    evidenceName: input.evidenceName,

    administrativeNote: '',
  }

  mockReports.unshift(report)

  return report
}