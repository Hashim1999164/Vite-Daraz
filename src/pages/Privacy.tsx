import { motion } from 'framer-motion';

const Privacy = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
    >
      Privacy Policy
    </motion.h1>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl w-full text-left"
    >
      <h2 className="text-xl font-bold text-purple-700 mb-4">Your Privacy Matters</h2>
      <p className="text-gray-700 mb-4">
        Link Wizard is committed to protecting your privacy. We only collect the minimum information necessary to provide our service and never share your data with third parties.
      </p>
      <ul className="list-disc pl-6 text-gray-600 mb-4">
        <li>We do not store your original URLs or personal data after link creation.</li>
        <li>We use cookies only for essential site functionality.</li>
        <li>We do not track your browsing activity or sell your data.</li>
        <li>All data transmission is encrypted using HTTPS.</li>
      </ul>
      <p className="text-gray-500 text-sm">
        For questions or concerns, please contact us at <a href="mailto:support@linkwizard.com" className="text-purple-600 hover:underline">support@linkwizard.com</a>.
      </p>
    </motion.div>
  </div>
);

export default Privacy; 