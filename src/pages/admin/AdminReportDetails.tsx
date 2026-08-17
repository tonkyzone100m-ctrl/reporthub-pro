import { Link, useParams } from 'react-router-dom'

function AdminReportDetails() {
  const { id } = useParams()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="text-primary small fw-bold text-uppercase">
            Report Details
          </div>

          <h2 className="fw-bold mb-1">
            {id}
          </h2>

          <p className="text-secondary mb-0">
            Review report information and coordinate action.
          </p>
        </div>

        <Link
          to="/admin/reports"
          className="btn btn-outline-secondary"
        >
          Back to Reports
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="h5 fw-bold">Report Information</h3>

              <hr />

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="text-secondary small">
                    Category
                  </div>
                  <div className="fw-semibold">
                    Road Damage
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="text-secondary small">
                    Status
                  </div>
                  <span className="badge text-bg-warning">
                    Under Review
                  </span>
                </div>

                <div className="col-12">
                  <div className="text-secondary small">
                    Location
                  </div>
                  <div className="fw-semibold">
                    Kigali, Rwanda
                  </div>
                </div>

                <div className="col-12">
                  <div className="text-secondary small">
                    Description
                  </div>
                  <p className="mb-0">
                    Citizen reported significant road damage requiring
                    assessment and possible repair.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="h5 fw-bold">
                Administrative Action
              </h3>

              <select className="form-select mb-3">
                <option>Under Review</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

              <select className="form-select mb-3">
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <button className="btn btn-primary w-100">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReportDetails
