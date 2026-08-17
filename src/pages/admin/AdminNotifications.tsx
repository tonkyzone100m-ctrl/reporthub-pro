function AdminNotifications() {
  return (
    <div>
      <h2 className="fw-bold">Notifications</h2>
      <p className="text-secondary">
        Review important system and report activity.
      </p>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <div className="alert alert-warning">
            <strong>Priority alert:</strong> Several critical
            reports require administrative review.
          </div>

          <div className="alert alert-info mb-0">
            <strong>AI analysis:</strong> New priority insights
            are available for review.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNotifications
