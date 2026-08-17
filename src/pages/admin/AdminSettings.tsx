function AdminSettings() {
  return (
    <div>
      <h2 className="fw-bold">Settings</h2>
      <p className="text-secondary">
        Configure administration and platform preferences.
      </p>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body p-4">
          <h3 className="h5 fw-bold">
            System configuration
          </h3>

          <div className="form-check form-switch mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked
              id="notifications"
            />

            <label
              className="form-check-label"
              htmlFor="notifications"
            >
              Enable administrator notifications
            </label>
          </div>

          <div className="form-check form-switch mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked
              id="ai"
            />

            <label
              className="form-check-label"
              htmlFor="ai"
            >
              Enable AI decision-support analysis
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
