// src/components/PreviewCard.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { detectPlatform } from '../utils/detectPlatform'
import { decodeUrl } from '../utils/encode'
import { useNavigate } from 'react-router-dom'

const pulseAnimation = {
  scale: [1, 1.05, 1],
  boxShadow: [
    '0 0 0 0 rgba(90, 49, 244, 0.4)',
    '0 0 0 20px rgba(90, 49, 244, 0)',
    '0 0 0 0 rgba(90, 49, 244, 0)'
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut"
  }
}

const PreviewCard = ({ encodedUrl }: { encodedUrl: string }) => {
  const [ogData, setOgData] = useState<{
    title?: string
    image?: string
    description?: string
    price?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const platform = detectPlatform()
  const navigate = useNavigate()
  
  const originalUrl = decodeUrl(encodedUrl)

  useEffect(() => {
    const fetchOGData = async () => {
      try {
        // Simulate API call with beautiful loading animation
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        // Mock data - in production you'd fetch real OG tags
        setOgData({
          title: 'Premium Wireless Headphones (2024 Edition)',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description: 'Experience crystal clear sound with our premium wireless headphones. 40hr battery life, active noise cancellation.',
          price: 'Rs. 12,999'
        })
      } catch (err) {
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchOGData()
  }, [originalUrl])

  const handleRedirect = () => {
    navigate('/')
  }

  const getInstructions = () => {
    switch (platform) {
      case 'ios':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="ml-2 font-bold text-blue-800">iOS Instructions</h3>
            </div>
            <ol className="mt-3 space-y-3 text-blue-700">
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-2">1</span>
                <span>Long press on the link below</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-2">2</span>
                <span>Select "Open in Safari"</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-2">3</span>
                <span>It will automatically open in the Daraz app</span>
              </motion.li>
            </ol>
          </motion.div>
        )
      case 'android':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="ml-2 font-bold text-green-800">Android Instructions</h3>
            </div>
            <ol className="mt-3 space-y-3 text-green-700">
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-2">1</span>
                <span>Tap the ⋮ menu in your browser</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-2">2</span>
                <span>Select "Open in browser"</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-2">3</span>
                <span>It will automatically open in the Daraz app</span>
              </motion.li>
            </ol>
          </motion.div>
        )
      default:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-200 shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="ml-2 font-bold text-purple-800">Desktop Instructions</h3>
            </div>
            <p className="mt-3 text-purple-700">
              Click the button below to open the product directly in Daraz
            </p>
          </motion.div>
        )
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        {loading ? (
          <div className="py-10">
            <motion.div
              animate={{ 
                rotate: 360,
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="mx-auto w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mb-6"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-lg font-bold text-gray-800">Fetching Product Details</h3>
              <p className="mt-2 text-gray-500">Preparing your premium shopping experience</p>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="mt-6 h-1.5 bg-purple-100 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="h-full w-1/2 bg-gradient-to-r from-purple-400 to-purple-600"
                />
              </motion.div>
            </motion.div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Product</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRedirect}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-medium rounded-lg"
            >
              Try Another Link
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              {ogData?.image && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full h-56 bg-white rounded-xl overflow-hidden shadow-md mb-5 relative"
                >
                  <img 
                    src={ogData.image} 
                    alt={ogData.title || 'Product image'}
                    className="w-full h-full object-contain"
                  />
                  <motion.div 
                    animate={pulseAnimation}
                    className="absolute inset-0 rounded-xl pointer-events-none"
                  />
                </motion.div>
              )}
              
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-gray-800 text-center"
              >
                {ogData?.title || 'Daraz Product'}
              </motion.h2>
              
              {ogData?.price && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-full"
                >
                  {ogData.price}
                </motion.p>
              )}
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-gray-600 text-center"
              >
                {ogData?.description || 'Product from Daraz'}
              </motion.p>
            </motion.div>
            
            {getInstructions()}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <motion.a
                href={originalUrl}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
              >
                Open in Daraz
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center mx-auto"
              >
                {showInstructions ? 'Hide' : 'Show'} Advanced Instructions
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform ${showInstructions ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {showInstructions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-4 bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <p className="text-sm text-gray-600 mb-2">Or copy this link manually:</p>
                    <div className="p-2 bg-white rounded-md text-sm font-mono break-all">
                      {originalUrl}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default PreviewCard