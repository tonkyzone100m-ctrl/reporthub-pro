export type ReportStatus =
  | 'Under Review'
  | 'In Progress'
  | 'Resolved'

export type ReportPriority =
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low'

export type ReportCategory =
  | 'Road Damage'
  | 'Street Lighting'
  | 'Water Supply'
  | 'Waste Management'
  | 'Drainage'
  | 'Other'

export type Report = {
  reference: string
  category: ReportCategory
  description: string

  location: string
  latitude: number | null
  longitude: number | null

  status: ReportStatus
  priority: ReportPriority

  createdAt: string

  reporter: {
    name: string
    email: string
  }

  department: string | null
  assignedTo: string | null

  evidence: string[]
  evidenceName: string | null

  administrativeNote: string
}