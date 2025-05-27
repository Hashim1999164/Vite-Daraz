import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { decodeUrl } from '../utils/encode';
import { detectPlatform, isSafariOnIOS } from '../utils/detectPlatform';
import { useNavigate } from 'react-router-dom';

/**
 * Detects if the current browser is TikTok's in-app browser
 * @returns {boolean} True if running in TikTok's in-app browser
 */
const isTikTokBrowser = (): boolean => {
  // Safely get user agent and other properties
  const ua = (navigator.userAgent || navigator.vendor || '').toLowerCase();
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);

  // TikTok-specific detection patterns
  const tiktokPatterns = [
    // Standard identifiers
    'tiktok', 'musically', 'trill', 'aweme',
    // Android package parts
    'ss.android.ugc', 'zhiliaoapp', 'com.zhiliaoapp.musically',
    // SDK identifiers
    'snssdk1233', 'snssdk1235', 'snssdk1111',
    // Chinese variants
    'douyin', 'bytedance'
  ];

  // 1. Check user agent patterns
  if (tiktokPatterns.some(pattern => ua.includes(pattern))) {
    return true;
  }

  // 2. Check for TikTok-injected objects
  if ((window as any).__tiktok !== undefined || 
      (navigator as any).tiktok !== undefined ||
      (window as any).bytebridge !== undefined) {
    return true;
  }

  // 3. Check if in TikTok iframe
  try {
    if (window.self !== window.top) {
      const frameUrl = (document.referrer || '').toLowerCase();
      if (frameUrl.includes('tiktok.com') || 
          frameUrl.includes('tiktokcdn.com') ||
          frameUrl.includes('bytecdn.cn') ||
          frameUrl.includes('douyin.com')) {
        return true;
      }
    }
  } catch (e) {
    // Cross-origin iframe - likely TikTok
    return true;
  }

  // 4. Platform-specific WebView detection
  if (isAndroid) {
    // Android WebView characteristics
    const isAndroidWebView = (
      ua.includes('; wv)') || // Standard WebView marker
      (ua.includes('android') && !ua.includes('chrome')) || // Chrome missing
      (ua.includes('linux') && ua.includes('applewebkit') && !ua.includes('samsung'))
    );

    if (isAndroidWebView) {
      // Additional checks for TikTok's Android WebView
      try {
        if (navigator.plugins.length === 0 && 
            navigator.mimeTypes.length === 0 &&
            window.outerWidth === 0 && 
            window.outerHeight === 0) {
          return true;
        }
      } catch (e) {
        return true;
      }
    }
  } else if (isIOS) {
    // iOS WebView characteristics
    const isIOSWebView = (
      ua.includes('mobile/15e148') || // iOS WebKit version
      (ua.includes('applewebkit') && !ua.includes('safari/'))
    );

    if (isIOSWebView) {
      // Additional checks for TikTok's iOS WebView
      try {
        if (!window.indexedDB) {
          return true;
        }
        if (window.screen.width === 0 && window.screen.height === 0) {
          return true;
        }
      } catch (e) {
        return true;
      }
    }
  }

  // 5. Check for TikTok-specific behavior
  try {
    
    // TikTok sometimes modifies touch events
    if ('ontouchstart' in window && (window as any).TouchEvent.toString().includes('[native code]')) {
      return true;
    }
  } catch (e) {
    return true;
  }

  return false;
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

  const isTikTok = isTikTokBrowser();

  useEffect(() => {
    // If NOT TikTok browser, force external open
    if (!isTikTok) {
      // Delay to allow React to mount cleanly
      setTimeout(() => {
        window.location.href = originalUrl;
      }, 5000);
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

  function RedirectToDaraz({ originalUrl }: { originalUrl: string }) {
    useEffect(() => {
      if (originalUrl) {
        window.location.href = originalUrl;
      }
    }, [originalUrl]);
  
    return (
      <div className="mt-6">
        <p className="text-center text-gray-500">Redirecting you to Daraz...</p>
      </div>
    );
  }

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
    <div className="relative w-full h-full">
      {/* Android Top Message - Outside the card */}
      {platform === 'android' && isTikTok && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <motion.div
            className="absolute top-8 left-0 right-0 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={androidMsgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-bold text-gray-900"
              >
                {androidMsgIndex === 0
                  ? 'Tap the menu in the top-right corner'
                  : 'Then select "Open in browser"'}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Animated arrow pointing to 3 dots */}
          <div className="absolute top-4 right-4 flex flex-col items-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-orange-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7-7-7 7" />
              </svg>
            </motion.div>
            
            {/* Vertical 3 dots icon */}
            <div className="mt-2 text-gray-800">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Original Card Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md mx-auto mt-32 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className={`p-6 ${platform === 'android' ? 'pt-4' : ''}`}>
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
                <div className="mt-10 text-center flex flex-col items-center">
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    👉 Press & Hold the button below
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Then select "Open Link" to continue
                  </p>

                  <div className="relative w-32 h-32">
                    {/* Animated progress border */}
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500 animate-hold-progress z-0" />

                    {/* Button */}
                    <a
                      href={originalUrl}
                      className="w-32 h-32 flex items-center justify-center rounded-full bg-white border-4 border-purple-500 text-purple-600 text-lg font-extrabold animate-breathe relative z-10"
                      rel="noopener noreferrer"
                    >
                      Hold to open
                    </a>
                  </div>
                </div>
              )}

              {/* Fallback / Desktop */}
              {(platform !== 'android' && !(platform === 'ios')) && (
                <div className="mt-6">
                  <RedirectToDaraz originalUrl={originalUrl} />
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PreviewCard;