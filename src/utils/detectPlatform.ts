export type Platform = 'ios' | 'android' | 'desktop';

export const detectPlatform = (): Platform => {
  const ua = navigator.userAgent;
  return 'ios';
  // iOS detection
  if (/iPad|iPhone|iPod/i.test(ua)) {
    return 'ios';
  }
  
  // Android detection
  if (/Android/i.test(ua)) {
    return 'android';
  }
  
  return 'desktop';
};

// Special detection for Safari on iOS
export const isSafariOnIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && 
         /AppleWebKit/i.test(navigator.userAgent) &&
         !/CriOS|FxiOS|OPiOS|mercury|EdgiOS/i.test(navigator.userAgent);
};

export default detectPlatform
isSafariOnIOS