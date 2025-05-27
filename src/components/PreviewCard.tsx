import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { decodeUrl } from '../utils/encode';
import { detectPlatform, isSafariOnIOS } from '../utils/detectPlatform';
import { useNavigate } from 'react-router-dom';

// Util to detect TikTok in-app browser
const isTikTokBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor;
  return ua.toLowerCase().includes('tiktok');
};

const PreviewCard = ({ encodedUrl }: { encodedUrl: string }) => {
  const [ogData, setOgData] = useState<{
    title?: string;
    image?: string;
    description?: string;
    price?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [androidMsgIndex, setAndroidMsgIndex] = useState(0);

  const platform = detectPlatform();
  const navigate = useNavigate();
  const originalUrl = decodeUrl(encodedUrl);

  const isTikTok = true //isTikTokBrowser();

  useEffect(() => {
    // If NOT TikTok browser, force external open
    if (!isTikTok) {
      // Delay to allow React to mount cleanly
      setTimeout(() => {
        window.location.href = originalUrl;
      }, 500);
      return;
    }

    const fetchOG = async () => {
      try {
        const response = await fetch(`/api/fetch-og?url=${encodeURIComponent(originalUrl)}`);
        const data = await response.json();
        setOgData(data);
      } catch {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOG();
  }, [originalUrl, isTikTok]);

  useEffect(() => {
    if (platform === 'android' && isTikTok) {
      const interval = setInterval(() => {
        setAndroidMsgIndex(prev => (prev + 1) % 2);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [platform, isTikTok]);

  if (!isTikTok) {
    return null; // Prevent rendering anything if redirecting
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Android Top Message */}
      {platform === 'android' && isTikTok && (
      <motion.div
        className="fixed top-0 left-0 right-0 w-full z-50 flex flex-col items-center bg-white py-4 shadow-md"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={androidMsgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-gray-800"
          >
            {androidMsgIndex === 0
              ? 'Tap ⋮ in the top-right corner'
              : 'Then tap "Open in browser" to continue'}
          </motion.div>
        </AnimatePresence>

        <div className="mt-1 animate-bounce-slow text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7-7 7" />
          </svg>
        </div>
      </motion.div>
    )}


      <div className={`p-6 ${platform === 'android' ? 'pt-20' : ''}`}>
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

            {/* iOS Safari */}
            {platform === 'ios' && (
              <div className="mt-10 text-center">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  👉 Press & Hold the button below
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Then select "Open in Safari" to continue
                </p>
                <a
                  href={originalUrl}
                  className="inline-block px-8 py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition"
                  rel="noopener noreferrer"
                >
                  Open in Safari
                </a>
              </div>
            )}

            {/* Fallback / Desktop */}
            {(platform !== 'android' && !(platform === 'ios' && isSafariOnIOS())) && (
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
