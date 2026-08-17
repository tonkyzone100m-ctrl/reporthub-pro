function AdminMap() {
  return (
    <div>
      <h2 className="fw-bold">Map Monitoring</h2>
      <p className="text-secondary">
        Monitor report locations and identify geographic concentrations.
      </p>

      <div
        className="card border-0 shadow-sm mt-4"
        style={{ minHeight: '500px' }}
      >
        <div className="card-body d-flex align-items-center justify-content-center">
          <div className="text-center text-secondary">
            <i className="bi bi-geo-alt fs-1 text-primary" />
            <h3 className="h5 fw-bold mt-3">
              Infrastructure Monitoring Map
            </h3>
            <p className="mb-0">
              Interactive map integration will be connected here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMap
