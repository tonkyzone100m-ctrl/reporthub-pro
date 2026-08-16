function About() {
  return (
    <main>
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <p className="text-uppercase fw-semibold text-primary mb-2">
                About ReportHub
              </p>

              <h1 className="display-5 fw-bold mb-3">
                Making community problems easier to report and resolve.
              </h1>

              <p className="lead text-secondary mb-0">
                ReportHub connects citizens with the people and
                departments responsible for improving public
                infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="fs-2 mb-3">📝</div>

                  <h2 className="h4 fw-bold">
                    1. Report
                  </h2>

                  <p className="text-secondary mb-0">
                    Describe an infrastructure problem,
                    provide its location, and optionally
                    attach photo evidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="fs-2 mb-3">🔎</div>

                  <h2 className="h4 fw-bold">
                    2. Track
                  </h2>

                  <p className="text-secondary mb-0">
                    Use your report reference to follow
                    the progress of the issue after submission.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="fs-2 mb-3">🏗️</div>

                  <h2 className="h4 fw-bold">
                    3. Resolve
                  </h2>

                  <p className="text-secondary mb-0">
                    Authorities can review reports, assign
                    responsibility, and update their progress
                    toward resolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">
                Built around transparency
              </h2>

              <p className="text-secondary">
                ReportHub is designed to make infrastructure
                reporting more accessible while giving citizens
                visibility into what happens after a report is
                submitted.
              </p>

              <p className="text-secondary mb-0">
                The platform can support roads, drainage,
                streetlights, water infrastructure, public
                facilities, waste management, and other
                community issues.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-3">
                    Our principles
                  </h3>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <strong>Accessibility</strong>
                      <div className="text-secondary small">
                        Make reporting simple for everyone.
                      </div>
                    </li>

                    <li className="list-group-item px-0">
                      <strong>Transparency</strong>
                      <div className="text-secondary small">
                        Give citizens visibility into report progress.
                      </div>
                    </li>

                    <li className="list-group-item px-0">
                      <strong>Accountability</strong>
                      <div className="text-secondary small">
                        Help responsible teams manage issues efficiently.
                      </div>
                    </li>

                    <li className="list-group-item px-0 pb-0">
                      <strong>Community impact</strong>
                      <div className="text-secondary small">
                        Turn individual reports into better public infrastructure.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About