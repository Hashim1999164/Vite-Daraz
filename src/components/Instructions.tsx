// src/components/Instructions.tsx
import { motion } from 'framer-motion'
import { detectPlatform } from '../utils/detectPlatform'

export default function Instructions() {
  const platform = detectPlatform()
  
  const getSteps = () => {
    switch (platform) {
      case 'ios':
        return [
          'Paste your Daraz product link',
          'Generate your short link',
          'Long press and open in Safari',
          'Automatically opens in Daraz app'
        ]
      case 'android':
        return [
          'Paste your Daraz product link',
          'Generate your short link',
          'Open menu and select "Open in browser"',
          'Automatically opens in Daraz app'
        ]
      default:
        return [
          'Paste your Daraz product link',
          'Generate your short link',
          'Share it with anyone',
          'It will open directly in Daraz'
        ]
    }
  }

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">How it works</h3>
      
      <div className="space-y-4">
        {getSteps().map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start"
          >
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
              {index + 1}
            </div>
            <div className="ml-3">
              <p className="text-gray-700">{step}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
