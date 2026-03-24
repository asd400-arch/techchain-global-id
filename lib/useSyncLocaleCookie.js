'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { marketingLocaleFromPath } from './localePath';

/** Keeps `locale` cookie aligned with URL (/en/* → en). App deep links use Indonesia `/id` via `lib/tcgAppUrls.js`. */
export function useSyncLocaleCookie() {
  const pathname = usePathname();
  const locale = marketingLocaleFromPath(pathname);
  useEffect(() => {
    document.cookie = `locale=${locale};path=/;max-age=86400`;
  }, [locale]);
}
