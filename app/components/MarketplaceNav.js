'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { marketingLocaleFromPath, stripLocalePrefix, withLocalePrefix } from '../../lib/localePath';
import useMobile from './useMobile';

const BASE_LINKS = [
  { id: { label: 'Semua' },        en: { label: 'All' },          href: '/marketplace' },
  { id: { label: '🏭 Gudang' },    en: { label: '🏭 Warehouse' }, href: '/marketplace/category/warehouse_space' },
  { id: { label: '⚙️ Otomasi' },   en: { label: '⚙️ Automation' }, href: '/marketplace/category/automation' },
  { id: { label: '🔧 Peralatan' }, en: { label: '🔧 Equipment' }, href: '/marketplace/category/equipment_systems' },
  { id: { label: '🚜 MHE' },       en: { label: '🚜 MHE' },       href: '/marketplace/category/material_handling' },
  { id: { label: '🚚 Logistik' },  en: { label: '🚚 Logistics' }, href: '/marketplace/category/logistics_services' },
  { id: { label: 'Penyedia' },     en: { label: 'Providers' },    href: '/marketplace/providers' },
  { id: { label: '💳 Harga' },     en: { label: '💳 Pricing' },   href: '/marketplace/pricing' },
  { id: { label: '🏝️ Batam' },    en: { label: '🏝️ Batam' },    href: '/marketplace/batam' },
  { id: { label: '🏙️ Jakarta' },  en: { label: '🏙️ Jakarta' },  href: '/marketplace/jakarta' },
];

/**
 * Second row of the marketplace header — must sit inside the same fixed container as Nav
 * (main row on top, this row below). Do not use a separate position:fixed strip.
 */
export function MarketplaceSubnavStrip() {
  const pathname = usePathname();
  const locale = marketingLocaleFromPath(pathname);
  const basePath = stripLocalePrefix(pathname);
  const [hovered, setHovered] = useState(null);
  const m = useMobile();

  const links = BASE_LINKS;
  const padX = m ? '12px' : '20px';

  return (
    <div
      role="navigation"
      aria-label="Marketplace"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        background: '#13161e',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        minHeight: '40px',
        maxHeight: '40px',
      }}
    >
      <div style={{ display: 'flex', padding: `0 ${padX}`, minWidth: 'max-content', alignItems: 'center', flexShrink: 0, height: '40px' }}>
        {links.map((link, i) => {
          const href = withLocalePrefix(link.href, locale);
          const label = link[locale]?.label || link.en.label;
          const isActive = basePath === link.href || (link.href !== '/marketplace' && basePath.startsWith(link.href + '/'));
          const isDivider =
            link.href === '/marketplace/providers' ||
            link.href === '/marketplace/batam';
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {isDivider && (
                <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
              )}
              <a
                href={href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textDecoration: 'none',
                  padding: '10px 11px',
                  fontSize: '13px',
                  fontWeight: '500',
                  fontFamily: "'Outfit', sans-serif",
                  color: isActive ? '#e8b84b' : hovered === i ? '#e8eaf0' : 'rgba(232,234,240,0.55)',
                  borderBottom: isActive ? '2px solid #e8b84b' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
