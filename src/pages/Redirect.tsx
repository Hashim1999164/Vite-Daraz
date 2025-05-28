import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeUrl, isValidWebsiteUrl } from '../utils/encode';
import PreviewCard from '../components/PreviewCard';

const Redirect = () => {
  const { encodedUrl } = useParams<{ encodedUrl: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!encodedUrl) {
      navigate('/error');
      return;
    }
    
    try {
      const originalUrl = decodeUrl(encodedUrl);
      if (!isValidWebsiteUrl(originalUrl)) {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    }
  }, [encodedUrl, navigate]);
  
  if (!encodedUrl) return null;
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <PreviewCard encodedUrl={encodedUrl} />
    </div>
  );
};

export default Redirect;