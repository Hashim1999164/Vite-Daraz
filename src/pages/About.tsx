import { motion } from 'framer-motion';

const About = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
    >
      About Link Wizard
    </motion.h1>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl w-full text-center"
    >
      <p className="text-lg text-gray-700 mb-4">
        <b>Link Wizard</b> is a modern link management tool designed to make sharing and opening links seamless across all platforms. Whether you're a marketer, content creator, or everyday user, Link Wizard ensures your links open in the right app, every time.
      </p>
      <p className="text-gray-600 mb-4">
        Our mission is to simplify the way people share and access content, bridging the gap between web and mobile experiences. We believe in a world where links just work—no matter where you share them.
      </p>
      <p className="text-gray-600 mb-4">
        Built with React, TypeScript, and Tailwind CSS, Link Wizard is fast, secure, and user-friendly. Our team is passionate about building tools that empower users and enhance digital experiences.
      </p>
      <p className="text-gray-500 text-sm">
        Want to get in touch or contribute? Visit our <a href="/contact" className="text-purple-600 hover:underline">Contact</a> page or check us out on <a href="https://github.com/linkwizard" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </motion.div>
  </div>
);

export default About; 