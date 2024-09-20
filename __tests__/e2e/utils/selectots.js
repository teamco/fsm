export const SELECTORS = {
  landing: '#root > div[class^="app"]',
  pending: 'div[class*="pending"]:not([class*=cancel]):not([class*=disabled])',
  processing: 'div[class*="processing"]:not([class*=cancel]):not([class*=disabled])',
  shipped: 'div[class*="shipped"]:not([class*=disabled])',
  delivered: 'div[class*="delivered"]:not([class*=disabled])',
  cancel: 'div[class*="cancel"]:not([class*=disabled])',
  counter: 'div[class*="counter"]',
};