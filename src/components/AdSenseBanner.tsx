import { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  adSlot: string;
  style?: React.CSSProperties;
}

const AD_CLIENT = 'ca-pub-3754737230953398'; // Replace with your AdSense client ID if different

const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ adSlot, style }) => {
  const insRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Ignore errors
      }
    }
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', height: '60px', ...style }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={insRef as any}
      />
    </div>
  );
};

export default AdSenseBanner; 