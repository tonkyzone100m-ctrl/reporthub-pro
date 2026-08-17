import type {
  ReportPriority,
} from './report'

export type AIInsight = {
  id: string
  area: string
  issueCount: number
  priority: ReportPriority
  reason: string
  recommendedAction: string
  confidence: number
}

export type AIAnalysisSummary = {
  analyzedReports: number
  criticalAreas: number
  highPriorityReports: number
  generatedAt: string
  insights: AIInsight[]
}