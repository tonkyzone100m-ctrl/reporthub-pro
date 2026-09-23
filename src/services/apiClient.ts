import type { Report } from '../types/report'

const API_BASE_URL = 'https://reporthub.ifree.page/api';
type ApiResponse<T> = { data?: T; error?: string; message?: string }

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers)
  headers.set('Content-Type', 'application/json')
  const token = localStorage.getItem('reporthub_token')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const fullUrl = `${API_BASE_URL}${path}`
  console.log('REQUESTING URL:', fullUrl)

  let response: Response
  try {
    response = await fetch(fullUrl, { ...options, headers })
  } catch {
    throw new Error(`The ReportHub API is unavailable at ${API_BASE_URL}. Please check your connection or backend status.`)
  }
  if (!(response.headers.get('content-type') ?? '').includes('application/json')) {
    throw new Error(`The ReportHub API returned an invalid response from ${API_BASE_URL}.`)
  }
  const body = (await response.json()) as ApiResponse<T>
  if (!response.ok) throw new Error(body.error ?? 'The API request failed.')
  return (body.data ?? null) as T
}

export type CreateReportRequest = {
  category: Report['category']
  description: string
  location: string
  latitude: number | null
  longitude: number | null
  evidenceName: string | null
}

export function getReportFromApi(reference: string): Promise<Report> {
  return request<Report>(`/reports.php?reference=${encodeURIComponent(reference)}`)
}

export function getReportsFromApi(): Promise<Report[]> {
  return request<Report[]>('/reports.php')
}

export function updateReportFromApi(
  reference: string,
  changes: Pick<Report, 'status' | 'priority'>,
): Promise<Report> {
  return request<Report>(`/reports.php?reference=${encodeURIComponent(reference)}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
  })
}

export function getMyReportsFromApi(): Promise<Report[]> {
  return request<Report[]>('/reports.php?mine=1')
}

export type AdminUserRecord = {
  id: number
  name: string
  email: string
  role: 'citizen' | 'admin'
  createdAt: string
  reportCount: number
}

export function getUsersFromApi(): Promise<AdminUserRecord[]> {
  return request<AdminUserRecord[]>('/users.php')
}

export function createReportFromApi(report: CreateReportRequest): Promise<{ reference: string }> {
  return request<{ reference: string }>('/reports.php', {
    method: 'POST',
    body: JSON.stringify(report),
  })
}

export type AuthUser = {
  id: number
  name: string
  email: string
  role: 'citizen' | 'admin'
}

export async function loginWithApi(email: string, password: string): Promise<AuthUser> {
  // PHP returns { data: { user, token } }. The request wrapper unpacks outer 'data'.
  const result = await request<{ user: AuthUser; token: string }>('/auth.php?action=login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  if (!result || !result.user || !result.token) {
    throw new Error('Invalid login response from server.')
  }

  // Save the authentic token issued by the PHP backend
  localStorage.setItem('reporthub_token', result.token)

  return result.user
}

export function registerWithApi(name: string, email: string, password: string): Promise<null> {
  return request<null>('/auth.php?action=register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}