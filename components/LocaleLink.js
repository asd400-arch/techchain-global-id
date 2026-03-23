'use client';
import { useState, useEffect } from 'react';

export default function LocaleLink({ sgHref, idHref, children, style, target, rel }) {
  const [href, setHref] = useState(idHref);

  useEffect(() => {
    const locale = document.cookie.match(/locale=([^;]+)/)?.[1] || 'id';
    setHref(locale === 'id' ? idHref : sgHref);
  }, [sgHref, idHref]);

  return (
    <a href={href} style={style} target={target} rel={rel}>
      {children}
    </a>
  );
}
