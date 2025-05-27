import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { decodeUrl } from '../utils/encode';
import { detectPlatform, isSafariOnIOS } from '../utils/detectPlatform';
import { useNavigate } from 'react-router-dom';

const PreviewCard = ({ encodedUrl }: { encodedUrl: string }) => {
  const [ogData, setOgData] = useState<{
    title?: string;
    image?: string;
    description?: string;
    price?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const platform = detectPlatform();
  const navigate = useNavigate();

  const originalUrl = decodeUrl(encodedUrl);

  useEffect(() => {
    const fetchOGData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulated API call
        setOgData({
          title: 'Premium Wireless Headphones (2024 Edition)',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
          description: 'Experience crystal clear sound with our premium wireless headphones. 40hr battery life, active noise cancellation.',
          price: 'Rs. 12,999',
        });
      } catch {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchOGData();
  }, [originalUrl]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        {loading ? (
          <div className="py-10 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="mx-auto w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mb-6"
            />
            <h3 className="text-lg font-bold text-gray-800">Fetching Product Details</h3>
            <p className="mt-2 text-gray-500">Preparing your shopping experience</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Product</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-medium rounded-lg"
            >
              Try Another Link
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              {ogData?.image && (
                <div className="w-full h-56 bg-white rounded-xl overflow-hidden shadow-md mb-5">
                  <img 
                    src={ogData.image} 
                    alt={ogData.title || 'Product image'}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-800 text-center">
                {ogData?.title || 'Daraz Product'}
              </h2>
              {ogData?.price && (
                <p className="mt-3 px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-full">
                  {ogData.price}
                </p>
              )}
              <p className="mt-3 text-gray-600 text-center">
                {ogData?.description || 'Product from Daraz'}
              </p>
            </div>

            {/* Platform-specific instructions */}
            {platform === 'ios' && isSafariOnIOS() ? (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-700 font-medium">
                  👉 Press & Hold the link below
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Then choose "Open in Safari" to escape TikTok browser.
                </p>
                <a
                  href={originalUrl}
                  className="mt-4 inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold rounded-xl shadow hover:shadow-lg transition-all"
                  rel="noopener noreferrer"
                >
                  {ogData?.title || 'Open Product'}
                </a>
              </div>
            ) : platform === 'android' ? (
              <div className="mt-6 text-center px-4">
                <p className="text-sm text-gray-700 font-medium">
                  📲 Tap <strong>⋮</strong> in the top-right corner
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Then choose <strong>"Open in browser"</strong> to continue.
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <button
                  onClick={() => window.location.href = originalUrl}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Open in Daraz
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PreviewCard;
