function AdminAnalytics() {
  return (
    <div>
      <h2 className="fw-bold">Analytics</h2>
      <p className="text-secondary">
        Understand report trends, response performance, and
        infrastructure demand.
      </p>

      <div className="row g-4 mt-1">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Resolution rate
              </div>
              <div className="display-6 fw-bold">
                78%
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Average response time
              </div>
              <div className="display-6 fw-bold">
                2.4d
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Reports this month
              </div>
              <div className="display-6 fw-bold">
                84
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics
