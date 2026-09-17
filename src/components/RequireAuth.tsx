import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getCurrentUser } from '../services/auth'

type RequireAuthProps = {
  role?: 'citizen' | 'admin'
}

function RequireAuth({ role }: RequireAuthProps) {
  const location = useLocation()
  const user = getCurrentUser()

  if (!user) {
    return (
      <Navigate
        to={role === 'admin' ? '/admin/login' : '/login'}
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/my-reports'} replace />
  }

  return <Outlet />
}

export default RequireAuth
