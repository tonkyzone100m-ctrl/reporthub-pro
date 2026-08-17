function AdminUsers() {
  return (
    <div>
      <h2 className="fw-bold">Users</h2>
      <p className="text-secondary">
        Manage administrators, authorities, moderators, and citizens.
      </p>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>System Administrator</td>
                  <td>admin@reporthub.local</td>
                  <td>Admin</td>
                  <td>
                    <span className="badge text-bg-success">
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Infrastructure Officer</td>
                  <td>authority@reporthub.local</td>
                  <td>Authority</td>
                  <td>
                    <span className="badge text-bg-success">
                      Active
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
