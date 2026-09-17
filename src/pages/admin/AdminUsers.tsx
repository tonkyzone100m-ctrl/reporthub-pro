import { useEffect, useMemo, useState } from 'react'
import { getUsersFromApi, type AdminUserRecord } from '../../services/apiClient'

function AdminUsers() {
  const [users, setUsers] = useState<AdminUserRecord[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getUsersFromApi().then(setUsers).catch((requestError: unknown) => {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load users.')
    })
  }, [])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return users.filter((user) => !query || `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query))
  }, [search, users])

  return (
    <div className="container-fluid px-0">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="text-primary small fw-bold text-uppercase mb-1">Administration</div>
          <h1 className="h2 fw-bold mb-2">Users</h1>
          <p className="text-secondary mb-0">Review every registered account and the reports linked to it.</p>
        </div>
        <div className="badge text-bg-primary fs-6">{users.length} accounts</div>
      </div>

      {error && <div className="alert alert-danger border-0" role="alert">{error}</div>}

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 p-4">
          <label htmlFor="user-search" className="form-label fw-semibold">Search users</label>
          <input id="user-search" type="search" className="form-control" placeholder="Search by name, email, or role..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light"><tr><th>User</th><th>Role</th><th>Joined</th><th>Submitted Reports</th></tr></thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td><div className="fw-semibold">{user.name}</div><div className="small text-secondary">{user.email}</div></td>
                  <td><span className={`badge ${user.role === 'admin' ? 'text-bg-danger' : 'text-bg-primary'}`}>{user.role}</span></td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td><span className="fw-semibold">{user.reportCount}</span></td>
                </tr>
              ))}
              {filteredUsers.length === 0 && <tr><td colSpan={4} className="text-center text-secondary py-5">No users match your search.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
