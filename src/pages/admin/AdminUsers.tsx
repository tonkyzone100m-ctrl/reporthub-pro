import { useMemo, useState } from 'react'

type UserRole =
  | 'Admin'
  | 'Authority'
  | 'Moderator'
  | 'Reporter'

type UserStatus =
  | 'Active'
  | 'Suspended'
  | 'Pending'

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  phone: string
  status: UserStatus
  lastActivity: string
  joinedAt: string
}

const initialUsers: User[] = [
  {
    id: 'USR-001',
    name: 'System Administrator',
    email: 'admin@reporthub.local',
    role: 'Admin',
    department: 'Administration',
    phone: '+250 788 000 001',
    status: 'Active',
    lastActivity: 'Today, 10:42 AM',
    joinedAt: 'Jan 12, 2026',
  },
  {
    id: 'USR-002',
    name: 'Infrastructure Officer',
    email: 'authority@reporthub.local',
    role: 'Authority',
    department: 'Infrastructure',
    phone: '+250 788 000 002',
    status: 'Active',
    lastActivity: 'Today, 09:18 AM',
    joinedAt: 'Feb 03, 2026',
  },
  {
    id: 'USR-003',
    name: 'Community Moderator',
    email: 'moderator@reporthub.local',
    role: 'Moderator',
    department: 'Public Works',
    phone: '+250 788 000 003',
    status: 'Active',
    lastActivity: 'Yesterday, 04:26 PM',
    joinedAt: 'Mar 18, 2026',
  },
  {
    id: 'USR-004',
    name: 'Jean Claude',
    email: 'jean@reporthub.local',
    role: 'Reporter',
    department: 'Community',
    phone: '+250 788 000 004',
    status: 'Active',
    lastActivity: 'Yesterday, 01:14 PM',
    joinedAt: 'Apr 07, 2026',
  },
  {
    id: 'USR-005',
    name: 'Operations Officer',
    email: 'operations@reporthub.local',
    role: 'Authority',
    department: 'Public Works',
    phone: '+250 788 000 005',
    status: 'Pending',
    lastActivity: 'Never',
    joinedAt: 'Aug 14, 2026',
  },
  {
    id: 'USR-006',
    name: 'Review Moderator',
    email: 'review@reporthub.local',
    role: 'Moderator',
    department: 'Administration',
    phone: '+250 788 000 006',
    status: 'Suspended',
    lastActivity: 'Aug 08, 2026',
    joinedAt: 'May 21, 2026',
  },
]

function AdminUsers() {
  const [users, setUsers] =
    useState<User[]>(initialUsers)

  const [searchTerm, setSearchTerm] =
    useState('')

  const [roleFilter, setRoleFilter] =
    useState<'All' | UserRole>('All')

  const [statusFilter, setStatusFilter] =
    useState<'All' | UserStatus>('All')

  const [showCreateForm, setShowCreateForm] =
    useState(false)

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null)

  const filteredUsers = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        query === '' ||
        user.name
          .toLowerCase()
          .includes(query) ||
        user.email
          .toLowerCase()
          .includes(query) ||
        user.department
          .toLowerCase()
          .includes(query) ||
        user.id
          .toLowerCase()
          .includes(query)

      const matchesRole =
        roleFilter === 'All' ||
        user.role === roleFilter

      const matchesStatus =
        statusFilter === 'All' ||
        user.status === statusFilter

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      )
    })
  }, [
    users,
    searchTerm,
    roleFilter,
    statusFilter,
  ])

  const adminCount = users.filter(
    (user) =>
      user.role === 'Admin',
  ).length

  const authorityCount = users.filter(
    (user) =>
      user.role === 'Authority',
  ).length

  const moderatorCount = users.filter(
    (user) =>
      user.role === 'Moderator',
  ).length

  const reporterCount = users.filter(
    (user) =>
      user.role === 'Reporter',
  ).length

  const activeCount = users.filter(
    (user) =>
      user.status === 'Active',
  ).length

  const pendingCount = users.filter(
    (user) =>
      user.status === 'Pending',
  ).length

  const suspendedCount = users.filter(
    (user) =>
      user.status === 'Suspended',
  ).length

  const toggleUserStatus = (
    userId: string,
  ) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== userId) {
          return user
        }

        return {
          ...user,
          status:
            user.status === 'Active'
              ? 'Suspended'
              : 'Active',
        }
      }),
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
            Users
          </h1>

          <p className="text-secondary mb-0">
            Manage ReportHub accounts, roles, permissions,
            and account status.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setShowCreateForm(
              (current) => !current,
            )
          }
        >
          <i className="bi bi-person-plus me-2" />
          Add User
        </button>

      </div>

      {/* =====================================================
          SECURITY NOTICE
      ===================================================== */}

      <div className="alert alert-warning border-0 mb-4">

        <div className="d-flex gap-3">

          <i className="bi bi-shield-lock fs-5 flex-shrink-0" />

          <div>

            <div className="fw-semibold">
              Account and access management
            </div>

            <div className="small mt-1">
              User roles control access to administrative
              features. Only authorized administrators should
              modify roles, permissions, or account status.
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4">

        <UserSummaryCard
          label="Total Users"
          value={users.length}
          icon="bi-people"
          iconClass="text-primary"
        />

        <UserSummaryCard
          label="Active Users"
          value={activeCount}
          icon="bi-person-check"
          iconClass="text-success"
        />

        <UserSummaryCard
          label="Pending"
          value={pendingCount}
          icon="bi-person-plus"
          iconClass="text-warning"
        />

        <UserSummaryCard
          label="Suspended"
          value={suspendedCount}
          icon="bi-person-x"
          iconClass="text-danger"
        />

      </div>

      {/* =====================================================
          ROLE OVERVIEW
      ===================================================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body p-3 p-md-4">

          <div className="d-flex flex-column flex-md-row justify-content-between gap-3">

            <div>
              <h2 className="h5 fw-bold mb-1">
                Role Distribution
              </h2>

              <p className="small text-secondary mb-0">
                Current distribution of ReportHub user roles.
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">

              <RoleOverviewBadge
                role="Admin"
                count={adminCount}
                color="danger"
              />

              <RoleOverviewBadge
                role="Authority"
                count={authorityCount}
                color="primary"
              />

              <RoleOverviewBadge
                role="Moderator"
                count={moderatorCount}
                color="warning"
              />

              <RoleOverviewBadge
                role="Reporter"
                count={reporterCount}
                color="secondary"
              />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CREATE USER FORM
      ===================================================== */}

      {showCreateForm && (
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-header bg-white border-0 p-4">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h2 className="h5 fw-bold mb-1">
                  Create User Account
                </h2>

                <p className="small text-secondary mb-0">
                  Create an account and assign an appropriate
                  ReportHub role.
                </p>

              </div>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() =>
                  setShowCreateForm(false)
                }
              />

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-3">

              <div className="col-md-6">

                <label
                  htmlFor="userName"
                  className="form-label fw-semibold"
                >
                  Full Name
                </label>

                <input
                  id="userName"
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                />

              </div>

              <div className="col-md-6">

                <label
                  htmlFor="userEmail"
                  className="form-label fw-semibold"
                >
                  Email Address
                </label>

                <input
                  id="userEmail"
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                />

              </div>

              <div className="col-md-6">

                <label
                  htmlFor="userRole"
                  className="form-label fw-semibold"
                >
                  Role
                </label>

                <select
                  id="userRole"
                  className="form-select"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select role
                  </option>

                  <option value="Authority">
                    Authority
                  </option>

                  <option value="Moderator">
                    Moderator
                  </option>

                  <option value="Reporter">
                    Reporter
                  </option>

                  <option value="Admin">
                    Admin
                  </option>
                </select>

              </div>

              <div className="col-md-6">

                <label
                  htmlFor="userDepartment"
                  className="form-label fw-semibold"
                >
                  Department
                </label>

                <select
                  id="userDepartment"
                  className="form-select"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select department
                  </option>

                  <option value="Administration">
                    Administration
                  </option>

                  <option value="Public Works">
                    Public Works
                  </option>

                  <option value="Infrastructure">
                    Infrastructure
                  </option>

                  <option value="Utilities">
                    Utilities
                  </option>

                  <option value="Community">
                    Community
                  </option>
                </select>

              </div>

              <div className="col-md-6">

                <label
                  htmlFor="userPhone"
                  className="form-label fw-semibold"
                >
                  Phone Number
                </label>

                <input
                  id="userPhone"
                  type="tel"
                  className="form-control"
                  placeholder="+250 788 000 000"
                />

              </div>

              <div className="col-md-6">

                <label
                  htmlFor="userStatus"
                  className="form-label fw-semibold"
                >
                  Initial Status
                </label>

                <select
                  id="userStatus"
                  className="form-select"
                  defaultValue="Pending"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Active">
                    Active
                  </option>
                </select>

              </div>

              <div className="col-12">

                <div className="alert alert-light border mb-0">

                  <div className="small">

                    <i className="bi bi-info-circle me-2" />

                    New users should receive only the minimum
                    role and permissions required for their
                    responsibilities.

                  </div>

                </div>

              </div>

              <div className="col-12 d-flex justify-content-end gap-2">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowCreateForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setShowCreateForm(false)
                  }
                >
                  <i className="bi bi-person-plus me-2" />
                  Create Account
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

            <div className="col-12 col-lg-6">

              <label
                htmlFor="userSearch"
                className="form-label small fw-semibold"
              >
                Search Users
              </label>

              <div className="input-group">

                <span className="input-group-text bg-white">
                  <i className="bi bi-search" />
                </span>

                <input
                  id="userSearch"
                  type="search"
                  className="form-control"
                  placeholder="Search by name, email, department or ID..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value,
                    )
                  }
                />

              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-3">

              <label
                htmlFor="roleFilter"
                className="form-label small fw-semibold"
              >
                Role
              </label>

              <select
                id="roleFilter"
                className="form-select"
                value={roleFilter}
                onChange={(event) =>
                  setRoleFilter(
                    event.target.value as
                      | 'All'
                      | UserRole,
                  )
                }
              >
                <option value="All">
                  All Roles
                </option>

                <option value="Admin">
                  Admin
                </option>

                <option value="Authority">
                  Authority
                </option>

                <option value="Moderator">
                  Moderator
                </option>

                <option value="Reporter">
                  Reporter
                </option>
              </select>

            </div>

            <div className="col-12 col-sm-6 col-lg-3">

              <label
                htmlFor="statusFilter"
                className="form-label small fw-semibold"
              >
                Status
              </label>

              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as
                      | 'All'
                      | UserStatus,
                  )
                }
              >
                <option value="All">
                  All Statuses
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Suspended">
                  Suspended
                </option>
              </select>

            </div>

            <div className="col-12">

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setSearchTerm('')
                  setRoleFilter('All')
                  setStatusFilter('All')
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2" />
                Reset Filters
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          USER DIRECTORY
      ===================================================== */}

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white border-0 p-3 p-md-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">

            <div>

              <h2 className="h5 fw-bold mb-1">
                User Directory
              </h2>

              <p className="small text-secondary mb-0">
                {filteredUsers.length} user
                {filteredUsers.length !== 1
                  ? 's'
                  : ''}{' '}
                displayed
              </p>

            </div>

            <span className="badge text-bg-light border">
              {activeCount} active
            </span>

          </div>

        </div>

        <div className="table-responsive">

          <table className="table align-middle mb-0">

            <thead className="table-light">

              <tr>

                <th className="px-4 py-3">
                  User
                </th>

                <th className="py-3">
                  Role
                </th>

                <th className="py-3">
                  Department
                </th>

                <th className="py-3">
                  Last Activity
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

              {filteredUsers.map(
                (user) => (
                  <tr key={user.id}>

                    {/* USER */}

                    <td className="px-4">

                      <div className="d-flex align-items-center gap-3">

                        <div
                          className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                          style={{
                            width: '42px',
                            height: '42px',
                          }}
                        >
                          {getInitials(
                            user.name,
                          )}
                        </div>

                        <div className="min-width-0">

                          <div className="fw-semibold">
                            {user.name}
                          </div>

                          <div className="small text-secondary text-truncate">
                            {user.email}
                          </div>

                          <div className="small text-secondary">
                            {user.id}
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* ROLE */}

                    <td>
                      <RoleBadge
                        role={user.role}
                      />
                    </td>

                    {/* DEPARTMENT */}

                    <td>

                      <div className="small fw-semibold">
                        {user.department}
                      </div>

                    </td>

                    {/* ACTIVITY */}

                    <td>

                      <div className="small">
                        {user.lastActivity}
                      </div>

                    </td>

                    {/* STATUS */}

                    <td>

                      <StatusBadge
                        status={user.status}
                      />

                    </td>

                    {/* ACTIONS */}

                    <td className="text-end px-4">

                      <div className="dropdown">

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          title={`Actions for ${user.name}`}
                        >
                          <i className="bi bi-three-dots" />
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">

                          <li>

                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() =>
                                setSelectedUser(
                                  user,
                                )
                              }
                            >
                              <i className="bi bi-person me-2" />
                              View Profile
                            </button>

                          </li>

                          <li>

                            <button
                              type="button"
                              className="dropdown-item"
                            >
                              <i className="bi bi-pencil me-2" />
                              Edit User
                            </button>

                          </li>

                          <li>

                            <button
                              type="button"
                              className="dropdown-item"
                            >
                              <i className="bi bi-key me-2" />
                              Reset Password
                            </button>

                          </li>

                          <li>
                            <hr className="dropdown-divider" />
                          </li>

                          <li>

                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() =>
                                toggleUserStatus(
                                  user.id,
                                )
                              }
                            >

                              <i
                                className={`bi ${
                                  user.status ===
                                  'Active'
                                    ? 'bi-person-x'
                                    : 'bi-person-check'
                                } me-2`}
                              />

                              {user.status ===
                              'Active'
                                ? 'Suspend User'
                                : 'Activate User'}

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

        {/* EMPTY STATE */}

        {filteredUsers.length === 0 && (
          <div className="p-5 text-center">

            <div
              className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '64px',
                height: '64px',
              }}
            >
              <i className="bi bi-people text-secondary fs-3" />
            </div>

            <h3 className="h6 fw-bold">
              No users found
            </h3>

            <p className="small text-secondary mb-3">
              No accounts match your current search
              and filter settings.
            </p>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setSearchTerm('')
                setRoleFilter('All')
                setStatusFilter('All')
              }}
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>

      {/* =====================================================
          USER DETAIL MODAL
      ===================================================== */}

      {selectedUser && (
        <div
          className="modal d-block"
          role="dialog"
          aria-modal="true"
          onClick={() =>
            setSelectedUser(null)
          }
          style={{
            backgroundColor:
              'rgba(0, 0, 0, 0.45)',
          }}
        >

          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-content border-0 shadow">

              <div className="modal-header">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: '48px',
                      height: '48px',
                    }}
                  >
                    {getInitials(
                      selectedUser.name,
                    )}
                  </div>

                  <div>

                    <div className="small text-secondary">
                      {selectedUser.id}
                    </div>

                    <h2 className="modal-title h5 fw-bold mb-0">
                      {selectedUser.name}
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                />

              </div>

              <div className="modal-body">

                <div className="row g-4">

                  <div className="col-12">

                    <div className="small text-secondary">
                      Email
                    </div>

                    <div className="fw-semibold">
                      {selectedUser.email}
                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="small text-secondary">
                      Role
                    </div>

                    <div className="mt-1">
                      <RoleBadge
                        role={selectedUser.role}
                      />
                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="small text-secondary">
                      Status
                    </div>

                    <div className="mt-1">
                      <StatusBadge
                        status={
                          selectedUser.status
                        }
                      />
                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="small text-secondary">
                      Department
                    </div>

                    <div className="fw-semibold">
                      {selectedUser.department}
                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="small text-secondary">
                      Phone
                    </div>

                    <div className="fw-semibold">
                      {selectedUser.phone}
                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="small text-secondary">
                      Last Activity
                    </div>

                    <div className="fw-semibold">
                      {selectedUser.lastActivity}
                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="small text-secondary">
                      Joined
                    </div>

                    <div className="fw-semibold">
                      {selectedUser.joinedAt}
                    </div>

                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                >
                  <i className="bi bi-pencil me-2" />
                  Edit User
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          SECURITY NOTE
      ===================================================== */}

      <div className="alert alert-info border-0 mt-4 mb-0">

        <div className="d-flex gap-3">

          <i className="bi bi-shield-check fs-5 flex-shrink-0" />

          <div>

            <div className="fw-semibold">
              Least-privilege access
            </div>

            <div className="small mt-1">
              Assign each account only the permissions required
              for its role. Administrative actions should be
              logged so changes to accounts and access can be
              reviewed later.
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

/*
 * ============================================================
 * SUMMARY CARD
 * ============================================================
 */

function UserSummaryCard({
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
    <div className="col-6 col-md-3">

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

/*
 * ============================================================
 * ROLE BADGE
 * ============================================================
 */

function RoleBadge({
  role,
}: {
  role: UserRole
}) {
  const roleClass: Record<
    UserRole,
    string
  > = {
    Admin: 'danger',
    Authority: 'primary',
    Moderator: 'warning',
    Reporter: 'secondary',
  }

  return (
    <span
      className={`badge text-bg-${roleClass[role]}`}
    >
      {role}
    </span>
  )
}

/*
 * ============================================================
 * STATUS BADGE
 * ============================================================
 */

function StatusBadge({
  status,
}: {
  status: UserStatus
}) {
  const statusClass: Record<
    UserStatus,
    string
  > = {
    Active: 'success',
    Pending: 'warning',
    Suspended: 'danger',
  }

  return (
    <span
      className={`badge text-bg-${statusClass[status]}`}
    >
      {status}
    </span>
  )
}

/*
 * ============================================================
 * ROLE OVERVIEW BADGE
 * ============================================================
 */

function RoleOverviewBadge({
  role,
  count,
  color,
}: {
  role: UserRole
  count: number
  color: string
}) {
  return (
    <span
      className={`badge text-bg-${color} px-3 py-2`}
    >
      {role}: {count}
    </span>
  )
}

/*
 * ============================================================
 * INITIALS
 * ============================================================
 */

function getInitials(
  name: string,
): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (part) =>
        part.charAt(0).toUpperCase(),
    )
    .join('')
}

export default AdminUsers