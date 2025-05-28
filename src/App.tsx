import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
import Error from './pages/Error';
import { Toaster } from 'react-hot-toast';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import UseCases from './pages/UseCases';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Security from './pages/Security';
import Cookies from './pages/Cookies';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/r/:encodedUrl" element={<Redirect />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            color: '#111827',
          },
        }}
      />
    </div>
  );
}

export default App;