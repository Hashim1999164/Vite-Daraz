import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Paste or Enter Your Link',
    description: 'Start by pasting or typing your long URL into the input box. The app validates your link instantly.'
  },
  {
    title: 'Generate Magic Link',
    description: 'Click the "Create Magic Link" button. The app encodes your URL and creates a short, shareable link.'
  },
  {
    title: 'Share Anywhere',
    description: 'Copy the generated link and share it on social media, messaging apps, or anywhere you want.'
  },
  {
    title: 'Smart Redirection',
    description: 'When someone clicks your link, Link Wizard detects their device and opens the link in the best app or browser.'
  },
  {
    title: 'Preview & Error Handling',
    description: 'Users see a preview of the destination or a helpful error message if the link is invalid or expired.'
  }
];

const HowItWorks = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
    >
      How It Works
    </motion.h1>
    <div className="max-w-2xl w-full space-y-8">
      {steps.map((step, idx) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-purple-700 mb-2">Step {idx + 1}: {step.title}</h2>
          <p className="text-gray-600">{step.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default HowItWorks; 