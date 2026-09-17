import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer bg-dark text-white mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <Link
              to="/"
              className="text-white text-decoration-none fw-bold fs-4"
            >
              <span className="d-inline-flex align-items-center gap-2">
                <img className="brand-logo brand-logo-footer" src="/reporthub-logo.png" alt="" />
                ReportHub
              </span>
            </Link>

            <p className="text-white-50 mt-3 mb-0">
              A community reporting platform that helps
              people report infrastructure problems and
              follow their progress.
            </p>
          </div>
          <div className="col-6 col-lg-2">
            <h2 className="h6 fw-bold">Get started</h2>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><Link to="/report" className="text-white-50">Report an issue</Link></li>
              <li className="mb-2"><Link to="/track" className="text-white-50">Track a report</Link></li>
              <li><Link to="/login" className="text-white-50">Sign in</Link></li>
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
                  About us
                </Link>
              </li>           
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none">Contact support</Link>
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