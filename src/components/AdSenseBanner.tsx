import { useEffect } from 'react';

interface AdSenseBannerProps {
  style?: React.CSSProperties;
}

const AD_CLIENT = 'ca-pub-3754737230953398';

const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ style }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
    script.async = true;
    script.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', ...style }}>
      <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3754737230953398"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default AdSenseBanner; 