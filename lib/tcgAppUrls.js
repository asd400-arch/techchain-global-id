/**
 * TCG Express — app.techchainglobal.com
 *
 * Indonesian flows MUST use the `/id` segment before the page name, e.g. `/id/signup`.
 * - `https://app.techchainglobal.com/signup`  → SG default (+65) — do not use for Indonesia.
 * - `https://app.techchainglobal.com/id/signup` → intended Indonesia flow (+62 in Express UI).
 *
 * If the browser still shows +65 while the address bar is `/id/signup`, that is a bug in the
 * Express app (signup bundle), not something this marketing site can fix by URL alone.
 * Known issues to fix in Express: (1) Sign In link uses `href="/login"` and drops `/id`;
 * (2) minified signup has `function u` + `const [u,h] = useState` name collision risk.
 */
export const TCG_APP_ORIGIN = 'https://app.techchainglobal.com';

export const TCG_APP_SIGNUP_CLIENT_URL = `${TCG_APP_ORIGIN}/id/signup?role=client`;
export const TCG_APP_SIGNUP_DRIVER_URL = `${TCG_APP_ORIGIN}/id/signup?role=driver`;
export const TCG_APP_SIGNUP_URL = `${TCG_APP_ORIGIN}/id/signup`;
export const TCG_APP_CLIENT_JOBS_NEW_URL = `${TCG_APP_ORIGIN}/id/client/jobs/new`;
export const TCG_APP_CORP_PREMIUM_URL = `${TCG_APP_ORIGIN}/corp-premium`;

/** Indonesia marketing site: use `/id/login` for +62 Express flow. */
export const TCG_APP_LOGIN_URL = `${TCG_APP_ORIGIN}/id/login`;
