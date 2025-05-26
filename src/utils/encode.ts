// src/utils/encode.ts
export const encodeUrl = (url: string): string => {
    return btoa(encodeURIComponent(url))
  }
  
  export const decodeUrl = (encoded: string): string => {
    return decodeURIComponent(atob(encoded))
  }
  
  export const isValidDarazUrl = (url: string): boolean => {
    const darazDomains = [
      'daraz.com',
      'daraz.com.bd',
      'daraz.com.lk',
      'daraz.com.np',
      'daraz.com.mm',
      'daraz.pk',
      'daraz.lk',
      'daraz.com.np',
      'daraz.com.mm'
    ]
    
    try {
      const urlObj = new URL(url)
      return darazDomains.some(domain => urlObj.hostname.includes(domain))
    } catch {
      return false
    }
  }


export default decodeUrl