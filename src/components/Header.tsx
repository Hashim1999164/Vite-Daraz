import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const useCases = [
    { title: 'Social Media', description: 'Create shareable links for your social media posts' },
    { title: 'E-commerce', description: 'Generate product links that open in specific apps' },
    { title: 'Marketing', description: 'Track and optimize your marketing campaigns' },
    { title: 'Content', description: 'Share your content with custom branded links' }
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Link Wizard
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <button className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors">
                  {useCase.title}
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-600">{useCase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 