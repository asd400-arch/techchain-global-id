'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import useMobile from './useMobile';

const MARKETPLACE_LINKS = [
  { label: '🏭 Warehouse Space',    href: '/marketplace/category/warehouse_space' },
  { label: '⚙️ Automation',         href: '/marketplace/category/automation' },
  { label: '🔧 Equipment & Systems', href: '/marketplace/category/equipment_systems' },
  { label: '🚜 Material Handling',   href: '/marketplace/category/material_handling' },
  { label: '🚚 Logistics Services',  href: '/marketplace/category/logistics_services' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mktOpen, setMktOpen] = useState(false);
  const navRef = useRef(null);
  const scrolledRef = useRef(false);
  const menuOpenRef = useRef(false);
  const isMobile = useMobile();
  const pathname = usePathname();


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
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Beranda',     href: '/' },
    { label: 'Layanan',     href: '/services' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Tentang',     href: '/about' },
    { label: 'ESG',         href: '/esg' },
    { label: 'Blog',        href: '/blog' },
  ];

  const contactHref = '/contact';
  const contactLabel = 'Hubungi Kami';

  const isActive = (link) => pathname === link.href;

  const LangSwitcher = () => (
    <a href="https://techchainglobal.com" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>🌐 EN</a>
  );

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 1000,
        width: '100%', maxWidth: '100%', boxSizing: 'border-box',
        padding: isMobile ? '15px 16px' : '18px 50px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'transparent',
        backdropFilter: 'none',
        borderBottom: 'none',
        transition: 'all 0.4s ease',
      }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <img src="/logo-512-dark.png" alt="Tech Chain Global" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
          <span style={{ fontSize: isMobile ? '17px' : '22px', fontWeight: '700', color: 'white', whiteSpace: 'nowrap' }}>Tech Chain <span style={{ color: '#00d4ff' }}>Global</span></span>
        </a>

        {!isMobile && (
          <div style={{ display: 'flex', gap: '35px', alignItems: 'center', flexShrink: 0 }}>
            {links.map((link, i) => {
              if (link.label === 'Marketplace') {
                const isAct = pathname.startsWith('/marketplace');
                return (
                  <div key={i}
                    style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                    onMouseEnter={() => setMktOpen(true)}
                    onMouseLeave={() => setMktOpen(false)}
                  >
                    <a href={link.href} style={{
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
                        <a href="/marketplace" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', color: '#00d4ff', borderRadius: '6px', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          🌏 All Categories
                        </a>
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '6px 0' }} />
                        {MARKETPLACE_LINKS.map((ml, mi) => (
                          <a key={mi} href={ml.href} style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '10px 14px', textDecoration: 'none',
                            fontSize: '14px', color: '#e8eaf0', borderRadius: '6px', whiteSpace: 'nowrap',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            {ml.label}
                          </a>
                        ))}
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '6px 0' }} />
                        <a href="/marketplace/providers" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', textDecoration: 'none', fontSize: '14px', color: '#e8eaf0', borderRadius: '6px', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          🏪 All Providers
                        </a>
                        <a href="/marketplace/rfq" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', textDecoration: 'none', fontSize: '14px', color: '#e8eaf0', borderRadius: '6px', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a1e28'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          📋 Request Quote
                        </a>
                      </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a key={i} href={link.href} style={{
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

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 999, background: 'rgba(10,22,40,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '30px',
        }}>
          {links.map((link, i) => (
            <a key={i} href={link.href} style={{
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
