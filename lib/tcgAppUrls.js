/**
 * TCG Express — app.techchainglobal.com (Indonesia-only from this marketing site)
 *
 * All exported URLs use the `/id/...` app stack (+62). Do not use bare `/signup`, `/login`, etc. (SG +65).
 * `locale=id` is appended so the SPA prefers Indonesia before any client navigation.
 *
 * Override login only: NEXT_PUBLIC_TCG_LOGIN_URL (full URL).
 */
export const TCG_APP_ORIGIN = 'https://app.techchainglobal.com';

/** Query hint for Indonesia locale (appended to paths that already have `?` use `&`) */
export const TCG_APP_LOCALE_ID = 'locale=id';

const withLocale = (pathAndQuery) => {
  const hasQuery = pathAndQuery.includes('?');
  const sep = hasQuery ? '&' : '?';
  return `${TCG_APP_ORIGIN}${pathAndQuery}${sep}${TCG_APP_LOCALE_ID}`;
};

export const TCG_APP_SIGNUP_CLIENT_URL = withLocale('/id/signup?role=client');
export const TCG_APP_SIGNUP_DRIVER_URL = withLocale('/id/signup?role=driver');
export const TCG_APP_SIGNUP_URL = withLocale('/id/signup');
export const TCG_APP_CLIENT_JOBS_NEW_URL = withLocale('/id/client/jobs/new');
/** No `/id/corp-premium` route on server — locale query only */
export const TCG_APP_CORP_PREMIUM_URL = withLocale('/corp-premium');

/** PWA entry Indonesia (+62) */
export const TCG_EXPRESS_PWA_URL_ID = 'https://express.techchainglobal.com/id';

const DEFAULT_TCG_LOGIN_URL = withLocale('/id/login');

export const TCG_APP_LOGIN_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_TCG_LOGIN_URL?.trim()) ||
  DEFAULT_TCG_LOGIN_URL;
