import { motion } from 'framer-motion';

const features = [
  {
    title: 'Smart Link Shortening',
    description: 'Generate short, branded links that open in the intended app or browser, with platform-aware redirection.'
  },
  {
    title: 'Universal Platform Detection',
    description: 'Automatically detects iOS, Android, and desktop to provide the best user experience for every device.'
  },
  {
    title: 'Clipboard & Paste Support',
    description: 'Paste URLs directly from your clipboard and instantly generate magic links.'
  },
  {
    title: 'Open Graph Previews',
    description: 'Fetches product or page details for a beautiful preview before redirecting.'
  },
  {
    title: 'Error Handling',
    description: 'Graceful error messages and fallback flows for invalid or expired links.'
  },
  {
    title: 'Modern UI/UX',
    description: 'Sleek, animated, and responsive design with glassmorphism and gradient themes.'
  }
];

const Features = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
    >
      Features
    </motion.h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
      {features.map((feature, idx) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-purple-700 mb-2">{feature.title}</h2>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Features; 