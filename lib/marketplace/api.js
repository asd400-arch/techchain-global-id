/**
 * Use same-origin paths so requests match the current host (e.g. www vs apex)
 * and avoid cross-origin + redirect CORS issues with hardcoded techchainglobal.com.
 */
export function marketplaceProvidersUrl(params = {}) {
  const q = new URLSearchParams(params);
  return `/api/marketplace/providers?${q}`;
}

export const MARKETPLACE_RFQ_URL = '/api/marketplace/rfq';
export const MARKETPLACE_ENQUIRIES_URL = '/api/marketplace/enquiries';
