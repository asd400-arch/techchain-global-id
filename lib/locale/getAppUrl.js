/**
 * Build URLs to the TCG Express app on app.techchainglobal.com.
 * This marketing site always targets the Indonesia `/id` stack, regardless of
 * marketing page language (/en vs Bahasa) or cookies.
 */
const EXPRESS_BASE = 'https://express.techchainglobal.com';
const APP_BASE = 'https://app.techchainglobal.com';

function ensureIdPath(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p.startsWith('/id')) return p;
  return `/id${p === '/' ? '' : p}`;
}

/** @param {string} path path starting with /, e.g. `/signup` or `/id/client` */
export const getExpressUrl = (path) => `${EXPRESS_BASE}${ensureIdPath(path)}`;

/** @param {string} path path starting with / */
export const getAppUrl = (path) => `${APP_BASE}${ensureIdPath(path)}`;
