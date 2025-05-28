import { motion } from 'framer-motion';

const Cookies = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
    >
      Cookie Policy
    </motion.h1>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl w-full text-left"
    >
      <h2 className="text-xl font-bold text-purple-700 mb-4">How We Use Cookies</h2>
      <ul className="list-disc pl-6 text-gray-600 mb-4">
        <li>We use cookies only for essential site functionality, such as remembering your preferences.</li>
        <li>We do not use cookies for advertising or tracking purposes.</li>
        <li>You can disable cookies in your browser settings, but some features may not work as intended.</li>
      </ul>
      <p className="text-gray-500 text-sm">
        For more information, contact <a href="mailto:support@linkwizard.com" className="text-purple-600 hover:underline">support@linkwizard.com</a>.
      </p>
    </motion.div>
  </div>
);

export default Cookies; 