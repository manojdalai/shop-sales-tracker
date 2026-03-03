import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SalesEntry from './pages/SalesEntry'
import SalesHistory from './pages/SalesHistory'
import Reports from './pages/Reports'
import Admin from './pages/Admin'
import { SalesProvider } from './context/SalesContext'

function App() {
  return (
    <SalesProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<SalesEntry />} />
              <Route path="/history" element={<SalesHistory />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SalesProvider>
  )
}

export default App
