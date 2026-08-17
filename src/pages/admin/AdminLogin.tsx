function AdminLogin() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 fw-bold">Admin Sign In</h1>
              <p className="text-secondary">
                Sign in to access the ReportHub administration portal.
              </p>

              <form>
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="admin@example.com"
                />

                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control mb-4"
                  placeholder="Enter password"
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
