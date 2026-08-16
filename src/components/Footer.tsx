import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-top bg-light mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <Link
              to="/"
              className="text-decoration-none fw-bold fs-5 text-primary"
            >
              ReportHub
            </Link>

            <p className="text-secondary mt-3 mb-0">
              A community-focused platform for reporting
              and tracking public infrastructure problems.
            </p>
          </div>

          <div className="col-md-3">
            <h2 className="h6 fw-bold mb-3">
              Platform
            </h2>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/report"
                  className="text-secondary text-decoration-none"
                >
                  Report an Issue
                </Link>
              </li>

              <li>
                <Link
                  to="/track"
                  className="text-secondary text-decoration-none"
                >
                  Track a Report
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h2 className="h6 fw-bold mb-3">
              About
            </h2>

            <p className="text-secondary small mb-0">
              ReportHub helps organize infrastructure
              reports so problems can be communicated,
              reviewed, and tracked more effectively.
            </p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
          <p className="text-secondary small mb-0">
            © {currentYear} ReportHub. All rights reserved.
          </p>

          <p className="text-secondary small mb-0">
            Community reporting platform
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer