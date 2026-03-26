import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/group.css'

const TO_EMAIL = 'info@serendibgroups.com'

export function ContactUsPage() {
  const navigate = useNavigate()
  const [fromEmail, setFromEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [sending, setSending] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()

    const trimmed = fromEmail.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }

    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      setError('Please enter your message.')
      return
    }

    // Minimal email check for UX (browser also validates type="email")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setSuccess('')
    setSending(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromEmail: trimmed, message: trimmedMessage }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        setError(data?.error || 'Email sending failed. Please try again.')
        return
      }

      setFromEmail('')
      setMessage('')
      setSuccess('Email sent successfully. Please check your inbox for the confirmation email.')
    } catch {
      setError('Email sending failed. Please try again.')
    } finally {
      setSending(false)
    }
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
            Our email is <a href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>. Type your message and press
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

          <label className="contact-label" htmlFor="message" style={{ marginTop: '1rem' }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="contact-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={6}
            required
          />

          {success ? <div className="contact-success">{success}</div> : null}
          {error ? (
            <div className="contact-error" role="alert">
              {error}
            </div>
          ) : null}

          <div className="contact-actions">
            <button type="button" className="btn-ghost" onClick={() => navigate('/')}>
              Back Home
            </button>
            <button type="submit" className="btn-primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

