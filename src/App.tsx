// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Redirect from './pages/Redirect'
import Error from './pages/Error'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/r/:encodedUrl" element={<Redirect />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            color: '#111827',
          },
        }}
      />
    </div>
  )
}

export default App