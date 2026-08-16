import { Link } from 'react-router-dom'

const processSteps = [
  {
    number: '01',
    title: 'Report the issue',
    description:
      'Describe the infrastructure problem and provide the affected location.',
  },
  {
    number: '02',
    title: 'Report is reviewed',
    description:
      'The responsible authority can review, verify, and prioritize the issue.',
  },
  {
    number: '03',
    title: 'Track progress',
    description:
      'Use your report reference to follow the status from submission to resolution.',
  },
]

const features = [
  {
    title: 'Structured reporting',
    description:
      'Capture the important information authorities need to understand and evaluate an infrastructure problem.',
  },
  {
    title: 'Location & evidence',
    description:
      'Provide a location and optional photo evidence to make your report clearer and easier to verify.',
  },
  {
    title: 'Report tracking',
    description:
      'Keep your unique reference and use it to monitor the progress of your submitted report.',
  },
]

const issueTypes = [
  'Road damage',
  'Streetlights',
  'Drainage',
  'Water infrastructure',
  'Waste',
  'Public facilities',
]

function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="container py-5">
        <div className="row align-items-center g-5 py-lg-5">
          <div className="col-lg-7">
            <div className="pe-lg-4">
              <p className="text-uppercase fw-bold text-primary small mb-3">
                ReportHub
              </p>

              <h1 className="display-3 fw-bold lh-sm mb-4">
                Turn infrastructure
                <span className="text-primary"> problems </span>
                into action.
              </h1>

              <p className="lead text-secondary mb-4">
                Report damaged roads, broken streetlights, drainage problems,
                waste, water infrastructure, and other public issues in your
                community.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link
                  to="/report"
                  className="btn btn-primary btn-lg px-4"
                >
                  Report an Issue
                </Link>

                <Link
                  to="/track"
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Track a Report
                </Link>
              </div>

              <div className="d-flex align-items-center gap-2 mt-4 text-secondary small">
                <span
                  className="rounded-circle bg-success"
                  style={{
                    width: '8px',
                    height: '8px',
                  }}
                  aria-hidden="true"
                />

                No account required to submit a report.
              </div>
            </div>
          </div>

          {/* Hero information card */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                <p className="text-uppercase fw-bold text-primary small mb-2">
                  Simple process
                </p>

                <h2 className="h3 fw-bold mb-4">
                  From problem to progress
                </h2>

                <div className="d-flex flex-column gap-4">
                  {processSteps.map((step) => (
                    <div
                      key={step.number}
                      className="d-flex gap-3"
                    >
                      <div
                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 fw-bold"
                        style={{
                          width: '44px',
                          height: '44px',
                        }}
                        aria-hidden="true"
                      >
                        {step.number}
                      </div>

                      <div>
                        <h3 className="h6 fw-bold mb-1">
                          {step.title}
                        </h3>

                        <p className="small text-secondary mb-0">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Issue types */}
      <section className="border-top bg-light">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <p className="text-uppercase fw-bold text-primary small mb-2">
                What can you report?
              </p>

              <h2 className="display-6 fw-bold mb-3">
                Help identify problems that affect everyday life.
              </h2>

              <p className="text-secondary mb-0">
                ReportHub provides a structured way to communicate public
                infrastructure issues instead of leaving problems unnoticed
                or difficult to follow up.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {issueTypes.map((issue) => (
                  <div
                    key={issue}
                    className="col-sm-6"
                  >
                    <div className="bg-white border rounded-3 p-3 h-100">
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: '36px',
                            height: '36px',
                          }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>

                        <span className="fw-semibold">
                          {issue}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <p className="text-uppercase fw-bold text-primary small mb-2">
            Why ReportHub?
          </p>

          <h2 className="display-6 fw-bold mb-3">
            Built around better reporting
          </h2>

          <p
            className="text-secondary mx-auto mb-0"
            style={{ maxWidth: '650px' }}
          >
            A good reporting system should make it easier to describe a
            problem, provide useful information, and understand what happens
            after submission.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div
              className="col-md-4"
              key={feature.title}
            >
              <article className="card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body p-4">
                  <span className="text-primary fw-bold small">
                    0{index + 1}
                  </span>

                  <h3 className="h5 fw-bold mt-3 mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-secondary mb-0">
                    {feature.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* Trust / explanation */}
      <section className="bg-light border-top">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="text-uppercase fw-bold text-primary small mb-2">
                Designed for communities
              </p>

              <h2 className="display-6 fw-bold mb-3">
                Make reporting simple, clear, and trackable.
              </h2>

              <p className="text-secondary mb-4">
                ReportHub is designed to connect citizens with the people
                responsible for addressing public infrastructure problems.
              </p>

              <Link
                to="/report"
                className="btn btn-primary btn-lg px-4"
              >
                Report an Issue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-5">
        <div className="py-4 text-center">
          <h2 className="fw-bold mb-3">
            See a problem that needs attention?
          </h2>

          <p className="text-secondary mb-4">
            Submit a report and help create a clearer picture of
            infrastructure needs in your community.
          </p>

          <div className="d-flex justify-content-center flex-column flex-sm-row gap-3">
            <Link
              to="/report"
              className="btn btn-primary btn-lg px-4"
            >
              Submit a Report
            </Link>

            <Link
              to="/track"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Track Existing Report
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home