function AdminDepartments() {
  return (
    <div>
      <h2 className="fw-bold">Departments</h2>
      <p className="text-secondary">
        Manage departments responsible for responding to reports.
      </p>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <div className="list-group list-group-flush">
            <div className="list-group-item px-0 d-flex justify-content-between">
              <span className="fw-semibold">
                Public Works
              </span>
              <span className="badge text-bg-success">
                Active
              </span>
            </div>

            <div className="list-group-item px-0 d-flex justify-content-between">
              <span className="fw-semibold">
                Infrastructure
              </span>
              <span className="badge text-bg-success">
                Active
              </span>
            </div>

            <div className="list-group-item px-0 d-flex justify-content-between">
              <span className="fw-semibold">
                Utilities
              </span>
              <span className="badge text-bg-success">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDepartments
