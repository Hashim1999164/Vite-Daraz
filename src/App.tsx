// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Redirect from './pages/Redirect'
import Error from './pages/Error'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/r/:encodedUrl" element={<Redirect />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </div>
  )
}

export default App