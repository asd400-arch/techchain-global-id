const EXPRESS_BASE = 'https://express.techchainglobal.com';
const APP_BASE = 'https://app.techchainglobal.com';

function readLocale() {
  if (typeof window === 'undefined') return 'sg';
  return document.cookie.match(/locale=([^;]+)/)?.[1] || 'sg';
}

export const getExpressUrl = (path) => {
  const locale = readLocale();
  return locale === 'id' ? `${EXPRESS_BASE}/id${path}` : `${EXPRESS_BASE}${path}`;
};

export const getAppUrl = (path) => {
  const locale = readLocale();
  const cleanPath = path.startsWith('/id') ? path.slice(3) : path;
  return locale === 'id'
    ? `${APP_BASE}/id${cleanPath}`
    : `${APP_BASE}${cleanPath}`;
};
