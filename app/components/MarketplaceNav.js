'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const BASE_LINKS = [
  { label: 'Browse All',       href: '/marketplace' },
  { label: '🏭 Warehouse',     href: '/marketplace/category/warehouse_space' },
  { label: '⚙️ Automation',    href: '/marketplace/category/automation' },
  { label: '🔧 Equipment',     href: '/marketplace/category/equipment_systems' },
  { label: '🚜 MHE',           href: '/marketplace/category/material_handling' },
  { label: '🚚 Logistics',     href: '/marketplace/category/logistics_services' },
  { label: 'All Providers',    href: '/marketplace/providers' },
  { label: 'List Your Business', href: '/marketplace/provider/register' },
  { label: 'Dashboard',        href: '/marketplace/provider/dashboard' },
  { label: '💳 Pricing',       href: '/marketplace/pricing' },
];

const ID_LINKS = [
  { label: '🏝️ Batam',  href: '/marketplace/batam' },
  { label: '🏙️ Jakarta', href: '/marketplace/jakarta' },
];

export default function MarketplaceNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);
  const [locale, setLocale] = useState('sg');

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
    setLocale(match ? match[1] : 'sg');
  }, []);

  const links = locale === 'id' ? [...BASE_LINKS, ...ID_LINKS] : BASE_LINKS;

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 900,
      background: '#13161e',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center',
      overflowX: 'auto', scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      <div style={{ display: 'flex', padding: '0 24px', minWidth: 'max-content', alignItems: 'center' }}>
        {links.map((link, i) => {
          const isActive = pathname === link.href || (link.href !== '/marketplace' && pathname.startsWith(link.href + '/'));
          const isDivider = link.href === '/marketplace/providers' || link.href === '/marketplace/provider/register' || (locale === 'id' && link.href === '/marketplace/batam');
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {isDivider && (
                <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
              )}
              <a
                href={link.href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textDecoration: 'none',
                  padding: '14px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  fontFamily: "'Outfit', sans-serif",
                  color: isActive ? '#e8b84b' : hovered === i ? '#e8eaf0' : 'rgba(232,234,240,0.55)',
                  borderBottom: isActive ? '2px solid #e8b84b' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
