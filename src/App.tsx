import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Report from './pages/Report'
import Track from './pages/Track'
import About from './pages/About'
import Contact from './pages/Contact'

function NotFound() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 text-center">
          <div
            className="mb-4 text-primary"
            style={{ fontSize: '4rem' }}
            aria-hidden="true"
          >
            404
          </div>

          <h1 className="display-5 fw-bold">
            Page not found
          </h1>

          <p className="lead text-secondary mt-3">
            The page you are looking for does not exist
            or may have been moved.
          </p>

          <Link
            to="/"
            className="btn btn-primary btn-lg mt-3 px-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/report"
            element={<Report />}
          />

          <Route
            path="/track"
            element={<Track />}
          />

          <Route
            path="/about"
            element={<About />}
          />
          <Route 
          path="/contact"
          element={<Contact />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App