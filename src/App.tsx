import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import AppShell from './components/AppShell'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ConnectPage from './pages/ConnectPage'
import PublishPage from './pages/PublishPage'
import EngagePage from './pages/EngagePage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/connect" element={<ConnectPage />} />
              <Route path="/publish" element={<PublishPage />} />
              <Route path="/engage" element={<EngagePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
