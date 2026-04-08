import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CookieConsent } from './components/CookieConsent.jsx'
import { InitialLoader } from './components/InitialLoader.jsx'
import { GroupHomePage } from './pages/GroupHomePage.jsx'
import { PlantationPage } from './pages/PlantationPage.jsx'
import { InvestmentsPage } from './pages/InvestmentsPage.jsx'
import { InvestmentFixedIncomePage } from './pages/InvestmentFixedIncomePage.jsx'
import { GreenSavingPlansPage } from './pages/GreenSavingPlansPage.jsx'
import { GreenSilverSavingPlanPage } from './pages/GreenSilverSavingPlanPage.jsx'
import { GoldSavingPlanPage } from './pages/GoldSavingPlanPage.jsx'
import { ContactUsPage } from './pages/ContactUsPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const SPLASH_MIN_MS = 2200

export default function App() {
  const [splashPhase, setSplashPhase] = useState('loading')

  useEffect(() => {
    const start = performance.now()
    let cancelled = false
    let timeoutId = 0

    const maybeFinish = () => {
      if (cancelled) return
      const elapsed = performance.now() - start
      const wait = Math.max(0, SPLASH_MIN_MS - elapsed)
      timeoutId = window.setTimeout(() => {
        if (!cancelled) setSplashPhase('exiting')
      }, wait)
    }

    if (document.readyState === 'complete') {
      maybeFinish()
    } else {
      window.addEventListener('load', maybeFinish, { once: true })
    }

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      window.removeEventListener('load', maybeFinish)
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      {splashPhase !== 'done' && (
        <InitialLoader
          exiting={splashPhase === 'exiting'}
          onExitComplete={() => setSplashPhase('done')}
        />
      )}
      <CookieConsent />
      <Routes>
        <Route path="/" element={<GroupHomePage />} />
        <Route path="/plantation" element={<PlantationPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/investments/fixed-income" element={<InvestmentFixedIncomePage />} />
        <Route path="/investments/green" element={<GreenSavingPlansPage />} />
        <Route path="/investments/silver" element={<GreenSilverSavingPlanPage />} />
        <Route path="/investments/gold" element={<GoldSavingPlanPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/investmerts" element={<Navigate to="/investments" replace />} />

        {/* Legacy static .html deep links */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/plantation.html" element={<Navigate to="/plantation" replace />} />
        <Route path="/investments.html" element={<Navigate to="/investments" replace />} />
        <Route
          path="/investment-fixed-income.html"
          element={<Navigate to="/investments/fixed-income" replace />}
        />
        <Route
          path="/green-saving-plans.html"
          element={<Navigate to="/investments/green" replace />}
        />
        <Route
          path="/green-silver-saving-plan.html"
          element={<Navigate to="/investments/silver" replace />}
        />
        <Route path="/gold-saving-plan.html" element={<Navigate to="/investments/gold" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
