import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyReportsConnected } from '../services/reportService'
import type { Report } from '../types/report'

function MyReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    getMyReportsConnected().then(setReports).catch((requestError) => {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load your reports.')
    })
  }, [])

  const count = (status: Report['status']) => reports.filter((report) => report.status === status).length

  return (
    <main>
      <section className="bg-light py-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-2">My Reports</p>
            <h1 className="display-6 fw-bold mb-2">Your submitted reports</h1>
            <p className="text-secondary mb-0">View reports submitted from your account and follow their progress.</p>
          </div>
          <Link to="/report" className="btn btn-primary">Report an Issue</Link>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="row g-3 mb-4">
            {[
              ['Total Reports', reports.length, 'text-primary'],
              ['Under Review', count('Under Review'), 'text-warning'],
              ['In Progress', count('In Progress'), 'text-info'],
              ['Resolved', count('Resolved'), 'text-success'],
            ].map(([label, value, color]) => (
              <div className="col-6 col-lg-3" key={label}>
                <div className="card border-0 shadow-sm h-100"><div className="card-body">
                  <div className="text-secondary small">{label}</div>
                  <div className={`fs-3 fw-bold mt-1 ${color}`}>{value}</div>
                </div></div>
              </div>
            ))}
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 p-4">
              <h2 className="h5 fw-bold mb-1">Your report history</h2>
              <p className="small text-secondary mb-0">Only reports linked to your authenticated account appear here.</p>
            </div>
            {reports.length === 0 ? (
              <div className="card-body text-center py-5">
                <i className="bi bi-file-earmark-check fs-1 text-secondary d-block mb-3" aria-hidden="true" />
                <h3 className="h5 fw-bold">You have no reports yet</h3>
                <p className="text-secondary">Submit an issue and it will appear in this workspace.</p>
                <Link to="/report" className="btn btn-primary">Report an Issue</Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light"><tr><th>Reference</th><th>Problem</th><th>Location</th><th>Submitted</th><th>Status</th><th /></tr></thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.reference}>
                        <td className="font-monospace fw-semibold">{report.reference}</td>
                        <td>{report.category}</td>
                        <td>{report.location}</td>
                        <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                        <td><span className="badge text-bg-light border">{report.status}</span></td>
                        <td><Link to={`/track?reference=${encodeURIComponent(report.reference)}`} className="btn btn-sm btn-outline-primary">View Status</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default MyReports
