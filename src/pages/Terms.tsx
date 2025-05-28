import { motion } from 'framer-motion';

const Terms = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
    >
      Terms of Service
    </motion.h1>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl w-full text-left"
    >
      <h2 className="text-xl font-bold text-purple-700 mb-4">User Agreement</h2>
      <ul className="list-disc pl-6 text-gray-600 mb-4">
        <li>Do not use Link Wizard for malicious, illegal, or spam activities.</li>
        <li>We reserve the right to block or remove links that violate our policies.</li>
        <li>Service is provided as-is, without warranties of any kind.</li>
        <li>By using Link Wizard, you agree to these terms and our privacy policy.</li>
      </ul>
      <p className="text-gray-500 text-sm">
        For questions, contact <a href="mailto:support@linkwizard.com" className="text-purple-600 hover:underline">support@linkwizard.com</a>.
      </p>
    </motion.div>
  </div>
);

export default Terms; 