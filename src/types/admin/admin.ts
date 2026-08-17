export type AdminRole =
  | 'admin'
  | 'authority'
  | 'moderator'

export type AdminNavItem = {
  label: string
  path: string
  icon: string
}

export type AdminUser = {
  id: string
  name: string
  email: string
  role: AdminRole
}