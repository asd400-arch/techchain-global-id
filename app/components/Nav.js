'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import useMobile from './useMobile';
import { marketingLocaleFromPath, stripLocalePrefix, withLocalePrefix } from '../../lib/localePath';
import { MarketplaceSubnavStrip } from './MarketplaceNav';

const MARKETPLACE_LINKS = [
  { id: '🏭 Ruang Gudang',          en: '🏭 Warehouse Space',      href: '/marketplace/category/warehouse_space' },
  { id: '⚙️ Solusi Otomasi',        en: '⚙️ Automation',           href: '/marketplace/category/automation' },
  { id: '🔧 Peralatan & Sistem',    en: '🔧 Equipment & Systems',  href: '/marketplace/category/equipment_systems' },
  { id: '🚜 Material Handling',     en: '🚜 Material Handling',    href: '/marketplace/category/material_handling' },
  { id: '🚚 Layanan Logistik',      en: '🚚 Logistics Services',   href: '/marketplace/category/logistics_services' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mktOpen, setMktOpen] = useState(false);
  const navRef = useRef(null);
  const scrolledRef = useRef(false);
  const menuOpenRef = useRef(false);
  const isMobile = useMobile();
  const pathname = usePathname();
  const locale = marketingLocaleFromPath(pathname);
  const basePath = stripLocalePrefix(pathname);
  const isMarketplaceSection = basePath === '/marketplace' || basePath.startsWith('/marketplace/');

  const applyNavStyles = (scrolled, open) => {
    if (!navRef.current) return;
    const active = scrolled || open;
    navRef.current.style.background = active ? 'rgba(10,22,40,0.95)' : 'transparent';
    navRef.current.style.backdropFilter = active ? 'blur(20px)' : 'none';
    navRef.current.style.borderBottom = scrolled ? '1px solid rgba(0,212,255,0.1)' : 'none';
  };

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        if (scrolled !== scrolledRef.current) {
          scrolledRef.current = scrolled;
          applyNavStyles(scrolled, menuOpenRef.current);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    applyNavStyles(scrolledRef.current, menuOpen);
  }, [menuOpen, isMarketplaceSection]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const sync = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--tcg-nav-height', `${h}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty('--tcg-nav-height');
    };
  }, [isMobile, isMarketplaceSection]);

  const NAV = {
    id: {
      home: 'Beranda',
      services: 'Layanan',
      marketplace: 'Marketplace',
      about: 'Tentang',
      esg: 'ESG',
      blog: 'Blog',
      contactCta: 'Hubungi Kami',
    },
    en: {
      home: 'Home',
      services: 'Services',
      marketplace: 'Marketplace',
      about: 'About',
      esg: 'ESG',
      blog: 'Blog',
      contactCta: 'Contact',
    },
  };
  const t = NAV[locale];

  const links = [
    { label: t.home, href: '/' },
    { label: t.services, href: '/services' },
    { label: t.marketplace, href: '/marketplace' },
    { label: t.about, href: '/about' },
    { label: t.esg, href: '/esg' },
    { label: t.blog, href: '/blog' },
  ];

  const contactHref = withLocalePrefix('/contact', locale);
  const contactLabel = t.contactCta;

  const isActive = (link) =>
    basePath === link.href || (link.href !== '/' && basePath.startsWith(link.href + '/'));

  const langToggleToIdHref = locale === 'en'
    ? (basePath === '/' ? '/' : basePath)
    : null;
  const langToggleToEnHref = locale === 'id'
    ? withLocalePrefix(basePath, 'en')
    : null;

  /** ID | EN — active locale highlighted; other language is the link (URL is source of truth: /en/* = English). */
  const LangSwitcher = () => (
    <span
      role="group"
      aria-label={locale === 'en' ? 'Language: English. Switch to Indonesian.' : 'Bahasa Indonesia. Switch to English.'}
      style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
    >
      {locale === 'en' ? (
        <a href={langToggleToIdHref} style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
          ID
        </a>
      ) : (
        <span style={{ color: '#00d4ff', fontWeight: 700 }}>ID</span>
      )}
      <span style={{ color: 'rgba(255,255,255,0.2)', userSelect: 'none' }} aria-hidden>|</span>
      {locale === 'id' ? (
        <a href={langToggleToEnHref} style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
          EN
        </a>
      ) : (
        <span style={{ color: '#00d4ff', fontWeight: 700 }}>EN</span>
      )}
    </span>
  );

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10050,
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          minWidth: 0,
          background: 'transparent',
          backdropFilter: 'none',
          borderBottom: 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <nav
          aria-label="Main"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            minWidth: 0,
            width: '100%',
            padding: isMobile ? '15px 16px' : '18px 28px',
            boxSizing: 'border-box',
          }}
        >
        <a href={withLocalePrefix('/', locale)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, minWidth: 0 }}>
          <img src="/logo-512-dark.png" alt="Tech Chain Global" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
          <span style={{ fontSize: isMobile ? '17px' : '22px', fontWeight: '700', color: 'white', whiteSpace: 'nowrap' }}>Tech Chain <span style={{ color: '#00d4ff' }}>Global</span></span>
        </a>

        {!isMobile && (
          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 'clamp(10px, 1.5vw, 22px)',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: '1 1 0',
            minWidth: 0,
            overflow: 'hidden',
          }}>
            {links.map((link, i) => {
              if (link.href === '/marketplace') {
                const isAct = basePath === '/marketplace' || basePath.startsWith('/marketplace/');
                return (
                  <div key={i}
                    style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                    onMouseEnter={() => setMktOpen(true)}
                    onMouseLeave={() => setMktOpen(false)}
                  >
                    <a href={withLocalePrefix(link.href, locale)} style={{
                      textDecoration: 'none', fontSize: '15px', fontWeight: '500',
                      color: isAct ? '#00d4ff' : 'rgba(255,255,255,0.7)',
                      whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      {link.label}
                      <span style={{ fontSize: '10px', opacity: 0.6 }}>▾</span>
                    </a>
                    {mktOpen && (
                      <div style={{
                        position: 'absolute', top: '100%', left: '0',
                        paddingTop: '8px',
                        zIndex: 9999,
                        minWidth: '240px',
                      }}>
                      <div style={{
                        background: '#13161e',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px',
                        padding: '8px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                      }}>
                        <a href={withLocalePrefix('/marketplace', locale)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', color: '#00d4ff', borderRadius: '6px', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          {locale === 'id' ? '🌏 Semua Kategori' : '🌏 All Categories'}
                        </a>
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '6px 0' }} />
                        {MARKETPLACE_LINKS.map((ml, mi) => (
                          <a key={mi} href={withLocalePrefix(ml.href, locale)} style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '10px 14px', textDecoration: 'none',
                            fontSize: '14px', color: '#e8eaf0', borderRadius: '6px', whiteSpace: 'nowrap',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            {ml[locale] || ml.en}
                          </a>
                        ))}
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '6px 0' }} />
                        <a href={withLocalePrefix('/marketplace/providers', locale)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', textDecoration: 'none', fontSize: '14px', color: '#e8eaf0', borderRadius: '6px', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          {locale === 'id' ? '🏪 Semua Penyedia' : '🏪 All Providers'}
                        </a>
                        <a href={withLocalePrefix('/marketplace/rfq', locale)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', textDecoration: 'none', fontSize: '14px', color: '#e8eaf0', borderRadius: '6px', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          {locale === 'id' ? '📋 Minta Penawaran' : '📋 Request Quote'}
                        </a>
                      </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a key={i} href={withLocalePrefix(link.href, locale)} style={{
                  textDecoration: 'none', fontSize: '15px', fontWeight: '500',
                  color: isActive(link) ? '#00d4ff' : 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap',
                }}>{link.label}</a>
              );
            })}
            <LangSwitcher />
            <a href={contactHref} style={{
              textDecoration: 'none', padding: '10px 24px',
              background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
              color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: '600',
              whiteSpace: 'nowrap',
            }}>{contactLabel}</a>
          </div>
        )}

        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LangSwitcher />
            <div onClick={() => setMenuOpen(!menuOpen)} style={{
              display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer',
              padding: '8px', zIndex: 1002,
            }}>
              <div style={{ width: '24px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
              <div style={{ width: '24px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }}></div>
              <div style={{ width: '24px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
            </div>
          </div>
        )}
        </nav>

        {isMarketplaceSection && <MarketplaceSubnavStrip />}
      </header>

      {isMarketplaceSection && (
        <div
          aria-hidden
          style={{
            height: 'var(--tcg-nav-height, 80px)',
            minHeight: 'var(--tcg-nav-height, 80px)',
            width: '100%',
            flexShrink: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 10040, background: 'rgba(10,22,40,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '30px',
        }}>
          {links.map((link, i) => (
            <a key={i} href={withLocalePrefix(link.href, locale)} style={{
              textDecoration: 'none', fontSize: '24px', fontWeight: '600',
              color: isActive(link) ? '#00d4ff' : 'rgba(255,255,255,0.8)',
            }}>{link.label}</a>
          ))}
          <a href={contactHref} style={{
            textDecoration: 'none', padding: '14px 40px', marginTop: '10px',
            background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
            color: 'white', borderRadius: '12px', fontSize: '18px', fontWeight: '700',
          }}>{contactLabel}</a>
        </div>
      )}
    </>
  );
}
