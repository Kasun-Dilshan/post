import { useState } from 'react'
import { getCookieConsent, setCookieConsent } from '../utils/cookies.js'
import './CookieConsent.css'

export function CookieConsent() {
  const [visible, setVisible] = useState(() => getCookieConsent() === null)

  function accept() {
    setCookieConsent('accepted')
    setVisible(false)
  }

  function reject() {
    setCookieConsent('rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="cookie-consent"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="cookie-consent__inner">
        <p className="cookie-consent__text">
          We use cookies to remember your preferences and improve your experience. You can accept all
          cookies or reject non-essential ones.
        </p>
        <div className="cookie-consent__actions">
          <button type="button" className="cookie-consent__btn cookie-consent__btn--ghost" onClick={reject}>
            Reject
          </button>
          <button type="button" className="cookie-consent__btn cookie-consent__btn--primary" onClick={accept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
