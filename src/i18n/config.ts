// Global Language Map
export const langMap: Record<string, string[]> = {
  'en': ['en-US'],
}

// Giscus Language Map
// https://giscus.app/
export const giscusLocaleMap: Record<string, string> = {
  'en': 'en',
}

// Twikoo Language Map
// https://github.com/twikoojs/twikoo/blob/main/src/client/utils/i18n/index.js
export const twikooLocaleMap: Record<string, string> = {
  'en': 'en',
}

// Waline Language Map
// https://waline.js.org/en/guide/features/i18n.html
export const walineLocaleMap: Record<string, string> = {
  'en': 'en-US',
}

// Supported Languages
export const supportedLangs = Object.keys(langMap).flat()
