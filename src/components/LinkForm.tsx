import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { encodeUrl, isValidWebsiteUrl } from '../utils/encode';
import { toast } from 'react-hot-toast';
import AdSenseBanner from './AdSenseBanner';

const LinkForm = ({ onSuccess }: { onSuccess: (shortUrl: string) => void }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsValid(isValidWebsiteUrl(url));
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    setIsLoading(true);
    
    try {
      const encoded = encodeUrl(url);
      const shortUrl = `${window.location.origin}/r/${encoded}`;
      
      // Simulate processing for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      onSuccess(shortUrl);
      
      await navigator.clipboard.writeText(shortUrl);
      toast.success('Link copied!', {
        position: 'bottom-center',
        style: {
          background: '#5A31F4',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(90, 49, 244, 0.2)'
        },
        iconTheme: {
          primary: 'white',
          secondary: '#5A31F4'
        }
      });
    } catch (error) {
      toast.error('Failed to generate link', {
        position: 'bottom-center'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        inputRef.current?.focus();
        toast('Pasted!', {
          position: 'bottom-center',
          icon: '📋'
        });
      }
    } catch (error) {
      console.log('Clipboard access denied');
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Google AdSense Horizontal Banner */}
      <div className="w-full flex justify-center mt-0">
                    <AdSenseBanner adSlot="YOUR_AD_SLOT_ID" style={{ width: '90%', height: '20px' }} />
                  </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <motion.div
            animate={{
              boxShadow: isValid 
                ? '0 0 0 3px rgba(74, 222, 128, 0.3)'
                : url && !isValid 
                ? '0 0 0 3px rgba(239, 68, 68, 0.3)'
                : '0 0 0 3px rgba(90, 49, 244, 0.1)'
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="rounded-xl overflow-hidden"
          >
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.yourwebsite.com/"
              className="w-full px-5 py-4 bg-white/95 text-gray-800 placeholder-gray-400 focus:outline-none text-sm font-medium border-0 shadow-sm"
              required
            />
          </motion.div>
          
          <AnimatePresence>
            {!url && (
              <motion.button
                type="button"
                onClick={handlePaste}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-3 top-2 transform -translate-y-1/2 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-xs font-semibold shadow-sm"
              >
                Paste
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {url && !isValid && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="overflow-hidden"
            >
              <div className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="ml-2 text-xs text-red-600">Please enter a valid URL</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          type="submit"
          disabled={!isValid || isLoading}
          whileHover={!isLoading ? { 
            scale: 1.02,
            boxShadow: '0 10px 25px -5px rgba(90, 49, 244, 0.3)'
          } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          className={`w-full px-6 py-4 rounded-xl font-bold text-white transition-all relative overflow-hidden ${
            isValid 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' 
              : 'bg-gray-300 cursor-not-allowed'
          } shadow-lg`}
        >
          {isLoading && (
            <motion.span
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="absolute top-0 h-full w-1/2 bg-white/20 skew-x-[-20deg]"
            />
          )}
          
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Create Magic Link
              </>
            )}
          </span>
        </motion.button>
        <div className="mt-3 text-xs text-gray-500 text-center">
          By creating a link, you accept our
          <button
            type="button"
            onClick={() => window.location.href = '/terms'}
            className="ml-1 text-purple-600 hover:underline font-semibold"
          >
            Terms and Conditions
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;
