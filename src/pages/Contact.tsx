import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
      >
        Contact Us
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100 max-w-lg w-full"
      >
        {submitted ? (
          <div className="text-center">
            <h2 className="text-xl font-bold text-green-600 mb-2">Thank you!</h2>
            <p className="text-gray-600">Your message has been sent. We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all">Send Message</button>
          </form>
        )}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Or email us at <a href="mailto:support@linkwizard.com" className="text-purple-600 hover:underline">support@linkwizard.com</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact; 