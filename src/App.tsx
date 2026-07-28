import { Routes, Route } from 'react-router-dom'
import { CoverPage } from './pages/CoverPage'
import { InvitationPage } from './pages/InvitationPage'
import { AdminPage } from './pages/AdminPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/undangan" element={<InvitationPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
