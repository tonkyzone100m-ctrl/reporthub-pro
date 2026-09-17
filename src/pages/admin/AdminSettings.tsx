import { useEffect, useState } from 'react'

type AdminPreferences = {
  notifications: boolean
  aiAnalysis: boolean
  weeklyDigest: boolean
  compactTables: boolean
  darkMode: boolean
}

const SETTINGS_KEY = 'reporthub_admin_preferences'

const defaultPreferences: AdminPreferences = {
  notifications: true,
  aiAnalysis: true,
  weeklyDigest: true,
  compactTables: false,
  darkMode: false,
}

function readPreferences(): AdminPreferences {
  const stored = localStorage.getItem(SETTINGS_KEY)
  if (!stored) return defaultPreferences

  try {
    const parsed = JSON.parse(stored) as Partial<AdminPreferences>
    return {
      ...defaultPreferences,
      ...parsed,
    }
  } catch {
    return defaultPreferences
  }
}

function AdminSettings() {
  const [preferences, setPreferences] = useState<AdminPreferences>(readPreferences)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(preferences))
  }, [preferences])

  function updatePreference(key: keyof AdminPreferences, value: boolean) {
    setPreferences((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  function updateTheme(value: boolean) {
    updatePreference('darkMode', value)
    document.documentElement.dataset.theme = value ? 'dark' : 'light'
    localStorage.setItem('reporthub_admin_dark_mode', String(value))
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(preferences))
    setSaved(true)
  }

  function resetSettings() {
    setPreferences(defaultPreferences)
    updateTheme(false)
    setSaved(false)
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="text-primary small fw-bold text-uppercase mb-1">Administration</div>
          <h1 className="h2 fw-bold mb-2">Settings</h1>
          <p className="text-secondary mb-0">
            Control operational alerts, decision support, and the administration workspace.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={resetSettings}>
            Reset defaults
          </button>
          <button type="button" className="btn btn-primary" onClick={saveSettings}>
            <i className="bi bi-check2 me-2" aria-hidden="true" />
            Save settings
          </button>
        </div>
      </div>

      {saved && (
        <div className="alert alert-success d-flex align-items-center gap-2 border-0" role="status">
          <i className="bi bi-check-circle-fill" aria-hidden="true" />
          Settings saved for this administration account.
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded bg-primary-subtle text-primary d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
                  <i className="bi bi-sliders" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="h5 fw-bold mb-1">Workspace preferences</h2>
                  <p className="small text-secondary mb-0">These preferences apply to this browser.</p>
                </div>
              </div>

              {([
                ['notifications', 'Administrator notifications', 'Show alerts for critical reports and operational events.'],
                ['aiAnalysis', 'AI decision-support analysis', 'Allow the analyzer page to surface priority and trend insights.'],
                ['weeklyDigest', 'Weekly performance digest', 'Prepare a weekly summary of unresolved and resolved reports.'],
                ['compactTables', 'Compact data tables', 'Display more rows in reports and user management tables.'],
              ] as const).map(([key, label, description]) => (
                <div key={key} className="d-flex justify-content-between align-items-start gap-3 border-bottom py-3">
                  <div>
                    <div className="fw-semibold">{label}</div>
                    <div className="small text-secondary mt-1">{description}</div>
                  </div>
                  <div className="form-check form-switch flex-shrink-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`setting-${key}`}
                      checked={preferences[key]}
                      onChange={(event) => updatePreference(key, event.target.checked)}
                    />
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-start gap-3 py-3">
                <div>
                  <div className="fw-semibold">Dark mode</div>
                  <div className="small text-secondary mt-1">Use a darker, low-glare administration workspace.</div>
                </div>
                <div className="form-check form-switch flex-shrink-0">
                  <input className="form-check-input" type="checkbox" role="switch" id="setting-darkMode" checked={preferences.darkMode} onChange={(event) => updateTheme(event.target.checked)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-3">System status</h2>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-secondary">Administration portal</span>
                <span className="badge text-bg-success">Operational</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-secondary">Report data service</span>
                <span className="badge text-bg-success">Connected</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span className="text-secondary">Last preference update</span>
                <span className="small fw-semibold">{saved ? 'Just now' : 'No pending changes'}</span>
              </div>
            </div>
          </div>

          <div className="alert alert-warning border-0 mb-0">
            <div className="d-flex gap-2">
              <i className="bi bi-shield-exclamation fs-5" aria-hidden="true" />
              <div>
                <div className="fw-semibold">Security reminder</div>
                <div className="small mt-1">
                  Use a dedicated database account and rotate administrator credentials before production deployment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
