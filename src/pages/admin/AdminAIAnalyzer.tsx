function AdminAIAnalyzer() {
  return (
    <div>
      <div className="mb-4">
        <div className="text-primary small fw-bold text-uppercase">
          Decision Support
        </div>

        <h2 className="fw-bold">AI Report Analyzer</h2>

        <p className="text-secondary mb-0">
          Analyze report patterns to identify critical areas and support
          administrative prioritization.
        </p>
      </div>

      <div className="alert alert-info">
        <div className="fw-bold">
          Human decision remains in control
        </div>

        <div className="small mt-1">
          AI recommendations are advisory. Administrators make the final
          decisions on priorities, assignments, and actions.
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Reports analyzed
              </div>
              <div className="display-6 fw-bold">248</div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small">
                Critical areas
              </div>
              <div className="display-6 fw-bold text-danger">
                9
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="text-secondary small">
                High-priority reports
              </div>
              <div className="display-6 fw-bold text-warning">
                31
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body p-4">
          <h3 className="h5 fw-bold">
            AI Priority Insights
          </h3>

          <div className="list-group list-group-flush">
            <div className="list-group-item px-0">
              <div className="d-flex justify-content-between">
                <strong>Road infrastructure — Kigali</strong>

                <span className="badge text-bg-danger">
                  Critical
                </span>
              </div>

              <p className="small text-secondary mb-0 mt-2">
                High concentration of related reports suggests elevated
                infrastructure risk.
              </p>
            </div>

            <div className="list-group-item px-0">
              <div className="d-flex justify-content-between">
                <strong>Street lighting — Kicukiro</strong>

                <span className="badge text-bg-warning">
                  High
                </span>
              </div>

              <p className="small text-secondary mb-0 mt-2">
                Multiple reports have been submitted within a concentrated
                geographic area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAIAnalyzer
