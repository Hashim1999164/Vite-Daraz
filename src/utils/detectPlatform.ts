// src/utils/detectPlatform.ts
export type Platform = 'ios' | 'android' | 'desktop' | 'unknown'

export const detectPlatform = (): Platform => {
  const userAgent = navigator.userAgent || navigator.vendor
  
  if (/android/i.test(userAgent)) {
    return 'android'
  }
  
  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return 'ios'
  }
  
  if (/Macintosh|Windows|Linux/.test(userAgent)) {
    return 'desktop'
  }
  
  return 'unknown'
}

export default detectPlatform