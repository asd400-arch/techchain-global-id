/**
 * Marketing site locale from URL: Indonesian at /, English under /en (same domain).
 * No cookie required — pathname is the source of truth.
 */

const EN_PREFIX = '/en';

/** @param {string | null | undefined} pathname */
export function marketingLocaleFromPath(pathname) {
  if (!pathname) return 'id';
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  return 'id';
}

/**
 * Canonical path without /en prefix.
 * /en → /, /en/services → /services
 * @param {string | null | undefined} pathname
 */
export function stripLocalePrefix(pathname) {
  if (!pathname || pathname === '/') return '/';
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) {
    const rest = pathname.slice(3);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}

/**
 * @param {string} canonicalPath path without locale, e.g. '/', '/services', '/marketplace/foo'
 * @param {'en'|'id'} locale
 */
export function withLocalePrefix(canonicalPath, locale) {
  if (locale !== 'en') {
    return canonicalPath === '' ? '/' : canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  }
  if (canonicalPath === '/' || canonicalPath === '') return '/en';
  const p = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  return `${EN_PREFIX}${p}`;
}

/**
 * Language toggle: same page in the other language.
 * @param {string | null | undefined} pathname
 */
export function languageToggleHref(pathname) {
  const loc = marketingLocaleFromPath(pathname);
  const canonical = stripLocalePrefix(pathname);
  if (loc === 'en') {
    return canonical === '/' ? '/' : canonical;
  }
  return withLocalePrefix(canonical, 'en');
}
