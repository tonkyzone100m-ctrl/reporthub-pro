import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <NavLink
          to="/"
          className="navbar-brand fw-bold text-primary"
          end
        >
          ReportHub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#reportHubNavbar"
          aria-controls="reportHubNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="reportHubNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? 'active fw-semibold' : ''
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? 'active fw-semibold' : ''
                  }`
                }
              >
                Report an Issue
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/track"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? 'active fw-semibold' : ''
                  }`
                }
              >
                Track Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/my-reports"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? 'active fw-semibold' : ''
                  }`
                }
              >
                My Reports
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? 'active fw-semibold' : ''
                  }`
                }
              >
                Profile
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <NavLink
                to="/login"
                className="btn btn-primary px-3"
              >
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar