const CONSENT_COOKIE = 'serendib_cookie_consent'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export function getCookie(name) {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`),
  )
  return match ? decodeURIComponent(match[1]) : null
}

export function setCookie(name, value, maxAgeSeconds = ONE_YEAR_SECONDS) {
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`
}

export function getCookieConsent() {
  const v = getCookie(CONSENT_COOKIE)
  if (v === 'accepted' || v === 'rejected') return v
  return null
}

export function setCookieConsent(value) {
  setCookie(CONSENT_COOKIE, value)
}

export { CONSENT_COOKIE }
