// src/utils/encode.ts

export const encodeUrl = (url: string): string => {
  return btoa(encodeURIComponent(url))
}

export const decodeUrl = (encoded: string): string => {
  return decodeURIComponent(atob(encoded))
}

export const isValidWebsiteUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol) && !!urlObj.hostname
  } catch {
    return false
  }
}

export default decodeUrl
