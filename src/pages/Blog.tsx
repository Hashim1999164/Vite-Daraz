import { motion } from 'framer-motion';

const posts = [
  {
    title: 'Introducing Link Wizard',
    date: '2024-06-01',
    excerpt: 'Learn how Link Wizard is changing the way you share and open links across platforms.'
  },
  {
    title: 'Best Practices for Smart Linking',
    date: '2024-06-05',
    excerpt: 'Tips and tricks for creating links that always open in the right app.'
  },
  {
    title: 'Building with React, TypeScript & Tailwind',
    date: '2024-06-10',
    excerpt: 'A behind-the-scenes look at the tech stack powering Link Wizard.'
  }
];

const Blog = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
    >
      Blog
    </motion.h1>
    <div className="max-w-2xl w-full space-y-8">
      {posts.map((post, idx) => (
        <motion.div
          key={post.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-2">{post.title}</h2>
          <p className="text-xs text-gray-400 mb-2">{post.date}</p>
          <p className="text-gray-600 mb-2">{post.excerpt}</p>
          <a href="#" className="text-purple-600 hover:underline text-sm">Read more</a>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Blog; 