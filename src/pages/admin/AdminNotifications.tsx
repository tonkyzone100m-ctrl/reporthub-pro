import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type NotificationType = 'Critical' | 'Information' | 'Success'

type Notification = {
  id: number
  type: NotificationType
  title: string
  message: string
  time: string
  reference?: string
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'Critical', title: 'Critical report requires review', message: 'A water supply report has been waiting for triage.', time: '12 minutes ago', reference: 'RH-001245' },
  { id: 2, type: 'Information', title: 'New reports received', message: 'Five reports were submitted since the last check.', time: '1 hour ago', reference: 'reports' },
  { id: 3, type: 'Success', title: 'Department update completed', message: 'The Public Works team marked a report as resolved.', time: 'Yesterday', reference: 'RH-001248' },
]

const typeClass: Record<NotificationType, string> = {
  Critical: 'danger',
  Information: 'primary',
  Success: 'success',
}

function AdminNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'All' | NotificationType>('All')

  const visibleNotifications = useMemo(
    () => filter === 'All' ? notifications : notifications.filter((item) => item.type === filter),
    [filter, notifications],
  )

  function dismiss(id: number) {
    setNotifications((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="text-primary small fw-bold text-uppercase mb-1">Operations</div>
          <h1 className="h2 fw-bold mb-2">Notifications</h1>
          <p className="text-secondary mb-0">Stay on top of critical reports and team activity.</p>
        </div>
        <div className="btn-group" role="group" aria-label="Notification filter">
          {(['All', 'Critical', 'Information', 'Success'] as const).map((value) => (
            <button key={value} type="button" className={`btn btn-sm ${filter === value ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter(value)}>
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h5 fw-bold mb-1">Activity inbox</h2>
            <p className="small text-secondary mb-0">{visibleNotifications.length} notification{visibleNotifications.length === 1 ? '' : 's'} shown</p>
          </div>
          {notifications.length > 0 && (
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setNotifications([])}>
              Clear all
            </button>
          )}
        </div>
        <div className="list-group list-group-flush">
          {visibleNotifications.length === 0 ? (
            <div className="p-5 text-center text-secondary">
              <i className="bi bi-check2-circle fs-1 d-block mb-2 text-success" aria-hidden="true" />
              You are all caught up.
            </div>
          ) : visibleNotifications.map((item) => (
            <div key={item.id} className="list-group-item p-4">
              <div className="d-flex gap-3">
                <div className={`rounded-circle bg-${typeClass[item.type]}-subtle text-${typeClass[item.type]} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 42, height: 42 }}>
                  <i className={`bi ${item.type === 'Critical' ? 'bi-exclamation-triangle' : item.type === 'Success' ? 'bi-check2' : 'bi-info-circle'}`} aria-hidden="true" />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                    <h3 className="h6 fw-bold mb-1">{item.title}</h3>
                    <span className="small text-secondary">{item.time}</span>
                  </div>
                  <p className="text-secondary mb-2">{item.message}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {item.reference && (item.reference === 'reports' ? (
                      <Link to="/admin/reports" className="btn btn-sm btn-outline-primary">View reports</Link>
                    ) : (
                      <Link to={`/admin/reports/${item.reference}`} className="btn btn-sm btn-outline-primary">Open report</Link>
                    ))}
                    <button type="button" className="btn btn-sm btn-link text-secondary px-0" onClick={() => dismiss(item.id)}>Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminNotifications
