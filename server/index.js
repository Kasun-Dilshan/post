import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
app.use(express.json({ limit: '200kb' }))
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
)

const PORT = Number(process.env.PORT || 5174)
const TO_EMAIL = process.env.TO_EMAIL || 'info@serendibgroups.com'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function createTransporter() {
  const host = requireEnv('SMTP_HOST')
  const port = Number(process.env.SMTP_PORT || 587)
  const user = requireEnv('SMTP_USER')
  const pass = requireEnv('SMTP_PASS')

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  try {
    const { fromEmail, message } = req.body || {}

    const safeFrom = String(fromEmail || '').trim()
    const safeMessage = String(message || '').trim()

    if (!safeFrom) return res.status(400).json({ ok: false, error: 'Email is required.' })
    if (!isValidEmail(safeFrom))
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
    if (!safeMessage) return res.status(400).json({ ok: false, error: 'Message is required.' })
    if (safeMessage.length > 5000)
      return res.status(400).json({ ok: false, error: 'Message is too long.' })

    const transporter = createTransporter()
    const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER

    // 1) Email to your company
    await transporter.sendMail({
      from: fromAddress,
      to: TO_EMAIL,
      replyTo: safeFrom,
      subject: 'New message from website contact form',
      text: `From: ${safeFrom}\n\nMessage:\n${safeMessage}\n`,
    })

    // 2) Confirmation email to user
    await transporter.sendMail({
      from: fromAddress,
      to: safeFrom,
      subject: 'We received your message',
      text:
        `Thanks for contacting Serendib Groups.\n\n` +
        `We received your message and will reply soon.\n\n` +
        `Your message:\n${safeMessage}\n\n` +
        `--\nSerendib Groups\n${TO_EMAIL}\n`,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    const msg = err instanceof Error ? err.message : ''
    if (msg.startsWith('Missing environment variable:')) {
      res.status(500).json({
        ok: false,
        error: `${msg}. Create a .env file (see .env.example) and restart the server.`,
      })
      return
    }

    res.status(500).json({ ok: false, error: 'Email sending failed. Please try again later.' })
  }
})

app.listen(PORT, () => {
  console.log(`Email API listening on http://localhost:${PORT}`)
})

