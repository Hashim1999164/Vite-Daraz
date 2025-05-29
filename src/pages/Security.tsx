import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Security = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
    <Header />
    <main className="flex-grow flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
      >
        Security
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl w-full text-left"
      >
        <h2 className="text-xl font-bold text-purple-700 mb-4">Our Commitment to Security</h2>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>All data is transmitted over secure HTTPS connections.</li>
          <li>We do not store sensitive user data or original URLs after link creation.</li>
          <li>Clipboard and browser APIs are used securely and with user consent.</li>
          <li>We regularly update dependencies to patch vulnerabilities.</li>
        </ul>
        <p className="text-gray-500 text-sm">
          If you discover a security issue, please report it to <a href="mailto:contact@linkwizard.app" className="text-purple-600 hover:underline">contact@linkwizard.app</a>.
        </p>
      </motion.div>
    </main>
    <Footer />
  </div>
);

export default Security; 