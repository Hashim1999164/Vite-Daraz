// src/pages/Home.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LinkForm from '../components/LinkForm'
import Instructions from '../components/Instructions'

const Home = () => {
  const [shortUrl, setShortUrl] = useState('')
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-center mb-8 max-w-lg"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block mb-4"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
        >
          Daraz Link Redirector
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          Create beautiful short links that open directly in the Daraz app
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        {shortUrl ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-block mb-6 p-5 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Premium Link is Ready!</h3>
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 inline-block max-w-full overflow-hidden"
              >
                <a 
                  href={shortUrl} 
                  className="text-purple-600 font-medium break-all hover:text-purple-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortUrl}
                </a>
              </motion.div>
              
              <p className="mt-3 text-sm text-gray-500">
                (Already copied to your clipboard)
              </p>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShortUrl('')}
              className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg border border-purple-200 hover:bg-purple-50 transition-all"
            >
              Create Another Link
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <LinkForm onSuccess={setShortUrl} />
          </motion.div>
        )}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 w-full max-w-2xl"
      >
        <Instructions />
      </motion.div>
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center text-sm text-gray-500"
      >
        © {new Date().getFullYear()} Daraz Link Redirector. Not affiliated with Daraz.
      </motion.footer>
    </div>
  )
}

export default Home