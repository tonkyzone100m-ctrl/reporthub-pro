import { useState } from 'react'
import type {
  ChangeEvent,
  FormEvent,
} from 'react'
import { Link } from 'react-router-dom'

type ProfileFormData = {
  name: string
  email: string
  phone: string
  location: string
}

const initialProfile: ProfileFormData = {
  name: 'ReportHub User',
  email: 'user@example.com',
  phone: '',
  location: '',
}

function Profile() {
  const [profile, setProfile] =
    useState<ProfileFormData>(initialProfile)

  const [saved, setSaved] = useState(false)

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))

    setSaved(false)
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setSaved(true)
  }

  return (
    <main>
      <section className="bg-light py-5">
        <div className="container">
          <p className="text-uppercase fw-semibold text-primary mb-2">
            Account
          </p>

          <h1 className="display-6 fw-bold mb-2">
            Profile
          </h1>

          <p className="text-secondary mb-0">
            Manage your ReportHub account information.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div
                    className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center fw-bold mb-3"
                    style={{
                      width: '88px',
                      height: '88px',
                      fontSize: '2rem',
                    }}
                    aria-hidden="true"
                  >
                    {profile.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <h2 className="h4 fw-bold mb-1">
                    {profile.name}
                  </h2>

                  <p className="text-secondary mb-4">
                    {profile.email}
                  </p>

                  <div className="d-grid gap-2">
                    <Link
                      to="/my-reports"
                      className="btn btn-outline-primary"
                    >
                      My Reports
                    </Link>

                    <Link
                      to="/report"
                      className="btn btn-primary"
                    >
                      Report an Issue
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h4 fw-bold mb-4">
                    Personal information
                  </h2>

                  {saved && (
                    <div
                      className="alert alert-success"
                      role="alert"
                    >
                      Your profile has been updated.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="form-label fw-semibold"
                        >
                          Full name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="form-control"
                          value={profile.name}
                          onChange={handleChange}
                          autoComplete="name"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Email address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-control"
                          value={profile.email}
                          onChange={handleChange}
                          autoComplete="email"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="phone"
                          className="form-label fw-semibold"
                        >
                          Phone number
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="form-control"
                          value={profile.phone}
                          onChange={handleChange}
                          placeholder="Optional"
                          autoComplete="tel"
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="location"
                          className="form-label fw-semibold"
                        >
                          Location
                        </label>

                        <input
                          id="location"
                          name="location"
                          type="text"
                          className="form-control"
                          value={profile.location}
                          onChange={handleChange}
                          placeholder="City or area"
                          autoComplete="address-level2"
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">
                      <Link
                        to="/my-reports"
                        className="btn btn-outline-secondary"
                      >
                        Cancel
                      </Link>

                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card border-0 shadow-sm mt-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-2">
                    Account security
                  </h2>

                  <p className="text-secondary small mb-3">
                    Password changes and authentication
                    security will be connected to the
                    backend authentication system.
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile