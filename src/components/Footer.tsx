import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <Link
              to="/"
              className="text-white text-decoration-none fw-bold fs-4"
            >
              ReportHub
            </Link>

            <p className="text-white-50 mt-3 mb-0">
              A community reporting platform that helps
              people report infrastructure problems and
              follow their progress.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="h6 fw-bold">
              Platform
            </h2>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/report"
                  className="text-white-50 text-decoration-none"
                >
                  Report an Issue
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/track"
                  className="text-white-50 text-decoration-none"
                >
                  Track Report
                </Link>
              </li>

              <li>
                <Link
                  to="/my-reports"
                  className="text-white-50 text-decoration-none"
                >
                  My Reports
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="h6 fw-bold">
              Account
            </h2>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/login"
                  className="text-white-50 text-decoration-none"
                >
                  Sign In
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/register"
                  className="text-white-50 text-decoration-none"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-white-50 text-decoration-none"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h2 className="h6 fw-bold">
              About ReportHub
            </h2>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-white-50 text-decoration-none"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-white-50 text-decoration-none"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
          <p className="text-white-50 small mb-0">
            © 2026 ReportHub. All rights reserved.
          </p>

          <p className="text-white-50 small mb-0">
            Making community problems easier to report
            and follow.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer