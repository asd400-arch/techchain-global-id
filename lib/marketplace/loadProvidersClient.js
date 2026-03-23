import { marketplaceProvidersUrl } from './api';
import { SEED_MARKETPLACE_PROVIDERS } from './seedProviders';

/**
 * Fetch marketplace providers; on error or empty response, use seed data (demo listings).
 * @param {Record<string, string | number>} queryParams — passed to marketplaceProvidersUrl
 * @param {{ maxItems?: number }} [opts]
 * @returns {Promise<{ vendors: typeof SEED_MARKETPLACE_PROVIDERS; usingSeed: boolean }>}
 */
export async function loadMarketplaceProvidersWithSeed(queryParams = {}, opts = {}) {
  const maxItems = opts.maxItems ?? 24;
  const seedSlice = () => SEED_MARKETPLACE_PROVIDERS.slice(0, maxItems);

  try {
    const r = await fetch(marketplaceProvidersUrl(queryParams));
    if (!r.ok) {
      return { vendors: seedSlice(), usingSeed: true };
    }
    let data;
    try {
      data = await r.json();
    } catch {
      return { vendors: seedSlice(), usingSeed: true };
    }
    const list = Array.isArray(data?.providers) ? data.providers : [];
    if (list.length === 0) {
      return { vendors: seedSlice(), usingSeed: true };
    }
    return { vendors: list.slice(0, maxItems), usingSeed: false };
  } catch {
    return { vendors: seedSlice(), usingSeed: true };
  }
}
