import { marketplaceProvidersUrl } from './api';
import { SEED_MARKETPLACE_PROVIDERS } from './seedProviders';

function filterByCategory(list, categoryId) {
  if (!categoryId) return list;
  const filtered = list.filter((v) => v.category_id === categoryId);
  return filtered.length > 0 ? filtered : list;
}

/**
 * Fetch marketplace providers; on error or empty response, use seed data (demo listings).
 * @param {Record<string, string | number>} queryParams — passed to marketplaceProvidersUrl
 * @param {{ maxItems?: number; categoryId?: string }} [opts]
 * @returns {Promise<{ vendors: typeof SEED_MARKETPLACE_PROVIDERS; usingSeed: boolean }>}
 */
export async function loadMarketplaceProvidersWithSeed(queryParams = {}, opts = {}) {
  const maxItems = opts.maxItems ?? 24;
  const categoryId = opts.categoryId;
  const seedSlice = () => filterByCategory(SEED_MARKETPLACE_PROVIDERS, categoryId).slice(0, maxItems);

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
    const sliced = list.slice(0, maxItems);
    let vendors = categoryId ? filterByCategory(sliced, categoryId) : sliced;
    if (categoryId && vendors.length === 0) {
      return { vendors: seedSlice(), usingSeed: true };
    }
    return { vendors, usingSeed: false };
  } catch {
    return { vendors: seedSlice(), usingSeed: true };
  }
}
