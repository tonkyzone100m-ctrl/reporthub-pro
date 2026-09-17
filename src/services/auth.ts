export type AuthUser = {
  id: number
  name: string
  email: string
  role: 'citizen' | 'admin'
}

const USER_KEY = 'reporthub_user'

export function getCurrentUser(): AuthUser | null {
  const value = localStorage.getItem(USER_KEY)
  if (!value) return null

  try {
    const user = JSON.parse(value) as Partial<AuthUser>
    if (
      typeof user.id !== 'number' ||
      typeof user.name !== 'string' ||
      typeof user.email !== 'string' ||
      (user.role !== 'citizen' && user.role !== 'admin')
    ) {
      return null
    }
    return user as AuthUser
  } catch {
    return null
  }
}

export function saveCurrentUser(user: AuthUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  localStorage.setItem('reporthub_token', `reporthub-${user.id}-${user.email}`)
}

export function signOut(): void {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem('reporthub_token')
}
