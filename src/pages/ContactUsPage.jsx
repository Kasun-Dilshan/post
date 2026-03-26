import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/group.css'

const TO_EMAIL = 'info@serendibgroups.com'

export function ContactUsPage() {
  const navigate = useNavigate()
  const [fromEmail, setFromEmail] = useState('')
  const [error, setError] = useState('')

  const mailtoHref = useMemo(() => {
    const subject = 'Contact Serendib Groups'
    const body = `From: ${fromEmail || '(not provided)'}`
    return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [fromEmail])

  function onSubmit(e) {
    e.preventDefault()

    const trimmed = fromEmail.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }

    // Minimal email check for UX (browser also validates type="email")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    window.location.href = mailtoHref
  }

  return (
    <div className="contact-page">
      <div className="section-inner contact-inner">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">CONTACT</div>
          <h2 className="section-title">
            Send an <span className="gradient-text">Email</span>
          </h2>
          <p className="section-desc" style={{ maxWidth: 720 }}>
            Our email is <a href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>. Enter your email and press
            send.
          </p>
        </div>

        <form className="contact-card" onSubmit={onSubmit}>
          <label className="contact-label" htmlFor="fromEmail">
            Your email
          </label>
          <input
            id="fromEmail"
            name="fromEmail"
            type="email"
            className="contact-input"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            placeholder="name@example.com"
            required
            autoComplete="email"
          />

          {error ? (
            <div className="contact-error" role="alert">
              {error}
            </div>
          ) : null}

          <div className="contact-actions">
            <button type="button" className="btn-ghost" onClick={() => navigate('/')}>
              Back Home
            </button>
            <button type="submit" className="btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

