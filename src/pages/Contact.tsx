import { useState } from 'react'
import type {
  ChangeEvent,
  FormEvent,
} from 'react'

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData)

  const [submitted, setSubmitted] =
    useState(false)

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setSubmitted(false)
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setSubmitted(true)
  }

  return (
    <main>
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <p className="text-uppercase fw-semibold text-primary mb-2">
                Contact ReportHub
              </p>

              <h1 className="display-5 fw-bold mb-3">
                How can we help?
              </h1>

              <p className="lead text-secondary mb-0">
                Send us a message about ReportHub,
                feedback, or questions about the
                reporting process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h4 fw-bold mb-4">
                    Send us a message
                  </h2>

                  {submitted && (
                    <div
                      className="alert alert-success"
                      role="alert"
                    >
                      Your message has been received.
                      Thank you for contacting ReportHub.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="form-label fw-semibold"
                      >
                        Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label fw-semibold"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="subject"
                        className="form-label fw-semibold"
                      >
                        Subject
                      </label>

                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is your message about?"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="form-label fw-semibold"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-4"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-4">
                    ReportHub
                  </h2>

                  <p className="text-secondary">
                    For infrastructure issues, the
                    fastest way to get help is to submit
                    a report through the reporting form.
                  </p>

                  <div className="mb-4">
                    <h3 className="h6 fw-bold">
                      Need to report an issue?
                    </h3>

                    <p className="text-secondary small mb-0">
                      Submit the issue with its location
                      and supporting evidence.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="h6 fw-bold">
                      Already submitted?
                    </h3>

                    <p className="text-secondary small mb-0">
                      Use your tracking reference to
                      check the report status.
                    </p>
                  </div>

                  <div>
                    <h3 className="h6 fw-bold">
                      General feedback
                    </h3>

                    <p className="text-secondary small mb-0">
                      We welcome suggestions that can
                      make ReportHub easier and more
                      useful for communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact