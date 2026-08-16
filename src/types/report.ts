export type ReportStatus =
  | 'pending'
  | 'under-review'
  | 'action-taken'
  | 'resolved'

export type ReportCategory =
  | 'road'
  | 'street-light'
  | 'drainage'
  | 'water'
  | 'waste'
  | 'public-facility'
  | 'other'

export type Report = {
  reference: string
  category: ReportCategory
  description: string
  location: string
  latitude: number | null
  longitude: number | null
  evidenceName: string | null
  status: ReportStatus
  createdAt: string
}