/**
 * TCG Express — app.techchainglobal.id (Indonesia .id domain)
 *
 * The .id TLD inherently serves the Indonesia app; no `/id/` prefix or
 * `locale=id` query needed.
 *
 * Override login only: NEXT_PUBLIC_TCG_LOGIN_URL (full URL).
 */
export const TCG_APP_ORIGIN = 'https://app.techchainglobal.id';

export const TCG_APP_SIGNUP_CLIENT_URL = `${TCG_APP_ORIGIN}/signup?role=client`;
export const TCG_APP_SIGNUP_DRIVER_URL = `${TCG_APP_ORIGIN}/signup?role=driver`;
export const TCG_APP_SIGNUP_URL        = `${TCG_APP_ORIGIN}/signup`;
export const TCG_APP_CLIENT_JOBS_NEW_URL = `${TCG_APP_ORIGIN}/client/jobs/new`;
export const TCG_APP_CORP_PREMIUM_URL  = `${TCG_APP_ORIGIN}/corp-premium`;

/** PWA entry Indonesia */
export const TCG_EXPRESS_PWA_URL_ID = 'https://express.techchainglobal.id';

const DEFAULT_TCG_LOGIN_URL = `${TCG_APP_ORIGIN}/login`;

export const TCG_APP_LOGIN_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_TCG_LOGIN_URL?.trim()) ||
  DEFAULT_TCG_LOGIN_URL;
