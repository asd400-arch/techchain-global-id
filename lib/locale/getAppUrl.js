/**
 * Build URLs to the TCG Express app on app.techchainglobal.id.
 * The .id domain inherently serves Indonesia — no `/id/` prefix needed.
 */
const EXPRESS_BASE = 'https://express.techchainglobal.id';
const APP_BASE = 'https://app.techchainglobal.id';

/** @param {string} path path starting with /, e.g. `/signup` or `/client/jobs/new` */
export const getExpressUrl = (path) => `${EXPRESS_BASE}${path.startsWith('/') ? path : `/${path}`}`;

/** @param {string} path path starting with / */
export const getAppUrl = (path) => `${APP_BASE}${path.startsWith('/') ? path : `/${path}`}`;
