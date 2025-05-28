import { motion } from 'framer-motion';

const useCases = [
  {
    title: 'Social Media Sharing',
    description: 'Share product or content links on platforms like Instagram, TikTok, or Facebook, ensuring they open in the right app.'
  },
  {
    title: 'E-commerce Promotions',
    description: 'Distribute product links that open directly in the Daraz app or website, improving conversion rates.'
  },
  {
    title: 'Marketing Campaigns',
    description: 'Track and optimize campaign links with branded, short URLs.'
  },
  {
    title: 'Content Creators',
    description: 'Share blog posts, videos, or articles with links that adapt to the user`s device.'
  },
  {
    title: 'Customer Support',
    description: 'Send troubleshooting or help links that work seamlessly across all platforms.'
  }
];

const UseCases = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
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
  </div>
);

export default UseCases; 