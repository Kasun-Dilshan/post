import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GroupHomePage } from './pages/GroupHomePage.jsx'
import { PlantationPage } from './pages/PlantationPage.jsx'
import { InvestmentsPage } from './pages/InvestmentsPage.jsx'
import { InvestmentFixedIncomePage } from './pages/InvestmentFixedIncomePage.jsx'
import { GreenSavingPlansPage } from './pages/GreenSavingPlansPage.jsx'
import { GreenSilverSavingPlanPage } from './pages/GreenSilverSavingPlanPage.jsx'
import { GoldSavingPlanPage } from './pages/GoldSavingPlanPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroupHomePage />} />
        <Route path="/plantation" element={<PlantationPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/investments/fixed-income" element={<InvestmentFixedIncomePage />} />
        <Route path="/investments/green" element={<GreenSavingPlansPage />} />
        <Route path="/investments/silver" element={<GreenSilverSavingPlanPage />} />
        <Route path="/investments/gold" element={<GoldSavingPlanPage />} />

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
