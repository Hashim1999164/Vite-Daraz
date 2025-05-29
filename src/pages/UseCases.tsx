import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const useCases = [
  {
    title: 'Escape In-App Browsers',
    description: 'Guide users to open links outside of TikTok, Instagram, and other embedded browsers for a seamless experience.'
  },
  {
    title: 'Boost Affiliate Conversions',
    description: 'Ensure affiliate links open in the intended app or browser, so clicks and orders are tracked and rewarded.'
  },
  {
    title: 'E-commerce Success',
    description: 'Help users open Daraz and other shopping links in the real app, increasing the chance of successful purchases.'
  },
  {
    title: 'Smart Redirection',
    description: 'Automatically detect the user platform and provide step-by-step instructions to open links in the best app.'
  },
  {
    title: 'Universal Sharing',
    description: 'Share links anywhere—social media, messaging apps, or email—and know they will work as intended for everyone.'
  }
];

const UseCases = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
    <Header />
    <main className="flex-grow flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
      >
        Use Cases
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
        {useCases.map((useCase, idx) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-purple-700 mb-2">{useCase.title}</h2>
            <p className="text-gray-600">{useCase.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="text-lg font-semibold text-purple-700">100% Free & Completely Safe</p>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Link Wizard is free to use and does not store your personal data or URLs. Enjoy seamless, secure, and private link sharing for all your affiliate and e-commerce needs.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default UseCases; 