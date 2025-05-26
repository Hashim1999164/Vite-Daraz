// src/pages/Error.tsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
        <p className="text-gray-600 mb-6">
          The link you're trying to access is invalid or expired. Please check the link or create a new one.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-500 transition-all"
        >
          Create New Link
        </button>
      </motion.div>
    </div>
  )
}