import { useMemo, useState } from 'react'

type DepartmentStatus = 'Active' | 'Inactive'

type Department = {
  id: string
  name: string
  description: string
  responsibility: string
  email: string
  phone: string
  members: number
  openReports: number
  resolvedReports: number
  status: DepartmentStatus
}

const initialDepartments: Department[] = [
  {
    id: 'DEP-001',
    name: 'Public Works',
    description:
      'Responsible for roads, drainage, public facilities, and other municipal infrastructure.',
    responsibility: 'Roads & public infrastructure',
    email: 'publicworks@reporthub.rw',
    phone: '+250 788 000 101',
    members: 14,
    openReports: 18,
    resolvedReports: 96,
    status: 'Active',
  },
  {
    id: 'DEP-002',
    name: 'Infrastructure',
    description:
      'Coordinates major infrastructure issues and supports technical assessment.',
    responsibility: 'Infrastructure assessment',
    email: 'infrastructure@reporthub.rw',
    phone: '+250 788 000 102',
    members: 11,
    openReports: 12,
    resolvedReports: 74,
    status: 'Active',
  },
  {
    id: 'DEP-003',
    name: 'Utilities',
    description:
      'Handles water, electricity, street lighting, and other utility-related reports.',
    responsibility: 'Utilities & public services',
    email: 'utilities@reporthub.rw',
    phone: '+250 788 000 103',
    members: 9,
    openReports: 9,
    resolvedReports: 61,
    status: 'Active',
  },
  {
    id: 'DEP-004',
    name: 'Environmental Services',
    description:
      'Coordinates environmental hazards, waste management, and related community reports.',
    responsibility: 'Environment & sanitation',
    email: 'environment@reporthub.rw',
    phone: '+250 788 000 104',
    members: 7,
    openReports: 5,
    resolvedReports: 43,
    status: 'Inactive',
  },
]

function AdminDepartments() {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments)

  const [searchTerm, setSearchTerm] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState<'All' | DepartmentStatus>('All')

  const [showForm, setShowForm] =
    useState(false)

  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null)

  const filteredDepartments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return departments.filter((department) => {
      const matchesSearch =
        query === '' ||
        department.name.toLowerCase().includes(query) ||
        department.responsibility
          .toLowerCase()
          .includes(query) ||
        department.email.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All' ||
        department.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [departments, searchTerm, statusFilter])

  const activeCount = departments.filter(
    (department) =>
      department.status === 'Active',
  ).length

  const inactiveCount = departments.filter(
    (department) =>
      department.status === 'Inactive',
  ).length

  const totalMembers = departments.reduce(
    (total, department) =>
      total + department.members,
    0,
  )

  const totalOpenReports = departments.reduce(
    (total, department) =>
      total + department.openReports,
    0,
  )

  const toggleDepartmentStatus = (
    id: string,
  ) => {
    setDepartments((current) =>
      current.map((department) =>
        department.id === id
          ? {
              ...department,
              status:
                department.status === 'Active'
                  ? 'Inactive'
                  : 'Active',
            }
          : department,
      ),
    )
  }

  return (
    <div className="container-fluid px-0">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">

        <div>
          <div className="text-primary small fw-bold text-uppercase mb-1">
            Administration
          </div>

          <h1 className="h2 fw-bold mb-2">
            Departments
          </h1>

          <p className="text-secondary mb-0">
            Manage operational departments responsible for
            reviewing and responding to community reports.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setShowForm((current) => !current)
          }
        >
          <i className="bi bi-plus-lg me-2" />
          Add Department
        </button>

      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="row g-3 mb-4">

        <SummaryCard
          label="Total Departments"
          value={departments.length}
          icon="bi-building"
          iconClass="text-primary"
        />

        <SummaryCard
          label="Active Departments"
          value={activeCount}
          icon="bi-check-circle"
          iconClass="text-success"
        />

        <SummaryCard
          label="Team Members"
          value={totalMembers}
          icon="bi-people"
          iconClass="text-info"
        />

        <SummaryCard
          label="Open Reports"
          value={totalOpenReports}
          icon="bi-file-earmark-text"
          iconClass="text-warning"
        />

      </div>

      {/* =====================================================
          ADD DEPARTMENT
      ===================================================== */}

      {showForm && (
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-header bg-white border-0 p-4">

            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h2 className="h5 fw-bold mb-1">
                  Add Department
                </h2>

                <p className="small text-secondary mb-0">
                  Create a new operational department.
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() =>
                  setShowForm(false)
                }
              />

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-3">

              <div className="col-md-6">
                <label
                  htmlFor="departmentName"
                  className="form-label fw-semibold"
                >
                  Department Name
                </label>

                <input
                  id="departmentName"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Transport"
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="departmentEmail"
                  className="form-label fw-semibold"
                >
                  Department Email
                </label>

                <input
                  id="departmentEmail"
                  type="email"
                  className="form-control"
                  placeholder="department@reporthub.rw"
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="departmentPhone"
                  className="form-label fw-semibold"
                >
                  Contact Number
                </label>

                <input
                  id="departmentPhone"
                  type="tel"
                  className="form-control"
                  placeholder="+250 788 000 000"
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="departmentResponsibility"
                  className="form-label fw-semibold"
                >
                  Primary Responsibility
                </label>

                <input
                  id="departmentResponsibility"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Transport infrastructure"
                />
              </div>

              <div className="col-12">
                <label
                  htmlFor="departmentDescription"
                  className="form-label fw-semibold"
                >
                  Description
                </label>

                <textarea
                  id="departmentDescription"
                  className="form-control"
                  rows={3}
                  placeholder="Describe the department's responsibilities..."
                />
              </div>

              <div className="col-12 d-flex justify-content-end gap-2">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  <i className="bi bi-check-lg me-2" />
                  Create Department
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body p-3 p-md-4">

          <div className="row g-3 align-items-end">

            <div className="col-12 col-lg-7">

              <label
                htmlFor="departmentSearch"
                className="form-label small fw-semibold"
              >
                Search Departments
              </label>

              <div className="input-group">

                <span className="input-group-text bg-white">
                  <i className="bi bi-search" />
                </span>

                <input
                  id="departmentSearch"
                  type="search"
                  className="form-control"
                  placeholder="Search by name, responsibility or email..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-3">

              <label
                htmlFor="departmentStatus"
                className="form-label small fw-semibold"
              >
                Status
              </label>

              <select
                id="departmentStatus"
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as
                      | 'All'
                      | DepartmentStatus,
                  )
                }
              >
                <option value="All">
                  All Departments
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>

            <div className="col-12 col-sm-6 col-lg-2">

              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('All')
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2" />
                Reset
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          DEPARTMENT TABLE
      ===================================================== */}

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white border-0 p-3 p-md-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">

            <div>
              <h2 className="h5 fw-bold mb-1">
                Department Directory
              </h2>

              <p className="small text-secondary mb-0">
                {filteredDepartments.length} department
                {filteredDepartments.length !== 1
                  ? 's'
                  : ''}{' '}
                displayed
              </p>
            </div>

            <span className="badge text-bg-light border">
              {inactiveCount} inactive
            </span>

          </div>

        </div>

        <div className="table-responsive">

          <table className="table align-middle mb-0">

            <thead className="table-light">

              <tr>
                <th className="px-4 py-3">
                  Department
                </th>

                <th className="py-3">
                  Responsibility
                </th>

                <th className="py-3">
                  Team
                </th>

                <th className="py-3">
                  Open Reports
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="text-end px-4 py-3">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredDepartments.map(
                (department) => (
                  <tr key={department.id}>

                    <td className="px-4">

                      <div className="d-flex align-items-center gap-3">

                        <div
                          className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: '44px',
                            height: '44px',
                          }}
                        >
                          <i className="bi bi-building fs-5" />
                        </div>

                        <div className="min-width-0">

                          <div className="fw-semibold">
                            {department.name}
                          </div>

                          <div className="small text-secondary">
                            {department.id}
                          </div>

                        </div>

                      </div>

                    </td>

                    <td>

                      <div className="fw-semibold small">
                        {department.responsibility}
                      </div>

                      <div
                        className="small text-secondary text-truncate"
                        style={{
                          maxWidth: '240px',
                        }}
                        title={department.description}
                      >
                        {department.description}
                      </div>

                    </td>

                    <td>

                      <div className="fw-semibold">
                        {department.members}
                      </div>

                      <div className="small text-secondary">
                        members
                      </div>

                    </td>

                    <td>

                      <span
                        className={
                          department.openReports > 15
                            ? 'fw-bold text-danger'
                            : department.openReports > 8
                              ? 'fw-bold text-warning'
                              : 'fw-semibold'
                        }
                      >
                        {department.openReports}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`badge text-bg-${
                          department.status === 'Active'
                            ? 'success'
                            : 'secondary'
                        }`}
                      >
                        {department.status}
                      </span>

                    </td>

                    <td className="text-end px-4">

                      <div className="dropdown">

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          title={`Actions for ${department.name}`}
                        >
                          <i className="bi bi-three-dots" />
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">

                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() =>
                                setSelectedDepartment(
                                  department,
                                )
                              }
                            >
                              <i className="bi bi-eye me-2" />
                              View Details
                            </button>
                          </li>

                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() =>
                                toggleDepartmentStatus(
                                  department.id,
                                )
                              }
                            >
                              <i
                                className={`bi ${
                                  department.status ===
                                  'Active'
                                    ? 'bi-pause-circle'
                                    : 'bi-play-circle'
                                } me-2`}
                              />

                              {department.status ===
                              'Active'
                                ? 'Deactivate'
                                : 'Activate'}
                            </button>
                          </li>

                          <li>
                            <hr className="dropdown-divider" />
                          </li>

                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                window.location.href =
                                  `mailto:${department.email}`
                              }}
                            >
                              <i className="bi bi-envelope me-2" />
                              Contact Department
                            </button>
                          </li>

                        </ul>

                      </div>

                    </td>

                  </tr>
                ),
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {filteredDepartments.length === 0 && (
          <div className="p-5 text-center">

            <div
              className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '64px',
                height: '64px',
              }}
            >
              <i className="bi bi-building text-secondary fs-3" />
            </div>

            <h3 className="h6 fw-bold">
              No departments found
            </h3>

            <p className="small text-secondary mb-3">
              Try changing your search or status filter.
            </p>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('All')
              }}
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>

      {/* =====================================================
          MANAGEMENT NOTE
      ===================================================== */}

      <div className="alert alert-info border-0 mt-4 mb-0">

        <div className="d-flex gap-3">

          <i className="bi bi-info-circle fs-5 flex-shrink-0" />

          <div>

            <div className="fw-semibold">
              Department management
            </div>

            <div className="small mt-1">
              Departments organize operational responsibility
              for submitted reports. Activating or deactivating
              a department should not remove historical reports
              or change previously recorded administrative actions.
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          DETAIL MODAL
      ===================================================== */}

      {selectedDepartment && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          style={{
            backgroundColor:
              'rgba(0, 0, 0, 0.45)',
          }}
          onClick={() =>
            setSelectedDepartment(null)
          }
        >

          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-content border-0 shadow">

              <div className="modal-header">

                <div>
                  <div className="small text-secondary">
                    {selectedDepartment.id}
                  </div>

                  <h2 className="modal-title h5 fw-bold mb-0">
                    {selectedDepartment.name}
                  </h2>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() =>
                    setSelectedDepartment(null)
                  }
                />

              </div>

              <div className="modal-body">

                <div className="row g-4">

                  <div className="col-md-8">

                    <div className="small text-secondary mb-1">
                      Responsibility
                    </div>

                    <div className="fw-semibold mb-3">
                      {selectedDepartment.responsibility}
                    </div>

                    <div className="small text-secondary mb-1">
                      Description
                    </div>

                    <p className="mb-0">
                      {selectedDepartment.description}
                    </p>

                  </div>

                  <div className="col-md-4">

                    <div className="small text-secondary mb-1">
                      Status
                    </div>

                    <span
                      className={`badge text-bg-${
                        selectedDepartment.status ===
                        'Active'
                          ? 'success'
                          : 'secondary'
                      }`}
                    >
                      {selectedDepartment.status}
                    </span>

                  </div>

                  <div className="col-md-4">

                    <div className="small text-secondary">
                      Team Members
                    </div>

                    <div className="fs-4 fw-bold">
                      {selectedDepartment.members}
                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="small text-secondary">
                      Open Reports
                    </div>

                    <div className="fs-4 fw-bold">
                      {selectedDepartment.openReports}
                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="small text-secondary">
                      Resolved Reports
                    </div>

                    <div className="fs-4 fw-bold text-success">
                      {selectedDepartment.resolvedReports}
                    </div>

                  </div>

                  <div className="col-12">

                    <hr />

                    <div className="row g-3">

                      <div className="col-md-6">

                        <div className="small text-secondary">
                          Email
                        </div>

                        <a
                          href={`mailto:${selectedDepartment.email}`}
                          className="text-decoration-none"
                        >
                          {selectedDepartment.email}
                        </a>

                      </div>

                      <div className="col-md-6">

                        <div className="small text-secondary">
                          Phone
                        </div>

                        <a
                          href={`tel:${selectedDepartment.phone}`}
                          className="text-decoration-none"
                        >
                          {selectedDepartment.phone}
                        </a>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setSelectedDepartment(null)
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    toggleDepartmentStatus(
                      selectedDepartment.id,
                    )
                  }
                >
                  <i
                    className={`bi ${
                      selectedDepartment.status ===
                      'Active'
                        ? 'bi-pause-circle'
                        : 'bi-play-circle'
                    } me-2`}
                  />

                  {selectedDepartment.status ===
                  'Active'
                    ? 'Deactivate'
                    : 'Activate'}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

/*
 * ============================================================
 * SUMMARY CARD
 * ============================================================
 */

function SummaryCard({
  label,
  value,
  icon,
  iconClass,
}: {
  label: string
  value: number
  icon: string
  iconClass: string
}) {
  return (
    <div className="col-6 col-md-4 col-xl-3">

      <div className="card border-0 shadow-sm h-100">

        <div className="card-body p-3 p-md-4">

          <div className="d-flex justify-content-between align-items-start gap-2">

            <div>
              <div className="text-secondary small">
                {label}
              </div>

              <div className="fs-3 fw-bold mt-1">
                {value}
              </div>
            </div>

            <i
              className={`bi ${icon} ${iconClass} fs-4`}
              aria-hidden="true"
            />

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDepartments