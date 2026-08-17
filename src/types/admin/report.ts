export type ReportStatus =
  | 'submitted'
  | 'under-review'
  | 'in-progress'
  | 'resolved'

export type ReportPriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export type AdminReport = {
  id: string
  reference: string
  category: string
  description: string
  location: string
  status: ReportStatus
  priority: ReportPriority
  submittedAt: string
  assignedDepartment: string
}