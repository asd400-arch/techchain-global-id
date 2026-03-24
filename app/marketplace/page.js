'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from '../components/Nav';
import ProviderCard from '../components/ProviderCard';
import { VENDOR_CATEGORIES } from '../../lib/marketplace/config';
import { loadMarketplaceProvidersWithSeed } from '../../lib/marketplace/loadProvidersClient';
import { marketingLocaleFromPath, withLocalePrefix } from '../../lib/localePath';

const UI = {
  id: {
    sub: 'Gudang, otomasi, peralatan, dan layanan logistik di Asia — jelajahi penyedia terverifikasi. Submenu',
    subStrong: 'Marketplace',
    subAfter: 'di bilah atas untuk kategori & RFQ.',
    region: 'Kawasan ID:',
    rfq: 'Minta penawaran (RFQ) →',
    signup: 'Daftarkan bisnis Anda →',
    explore: 'Jelajahi kategori',
    featured: 'Penyedia unggulan',
    demo: 'Data demo (API tidak tersedia)',
  },
  en: {
    sub: 'Warehouses, automation, equipment, and logistics across Asia — browse verified providers. Use the',
    subStrong: 'Marketplace',
    subAfter: 'submenu in the top bar for categories & RFQ.',
    region: 'Indonesia hubs:',
    rfq: 'Request quote (RFQ) →',
    signup: 'List your business →',
    explore: 'Browse categories',
    featured: 'Featured providers',
    demo: 'Demo data (API unavailable)',
  },
};

export default function MarketplaceBrowsePage() {
  const pathname = usePathname();
  const locale = marketingLocaleFromPath(pathname);
  const t = UI[locale];
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSeed, setUsingSeed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadMarketplaceProvidersWithSeed({ limit: 24 }, { maxItems: 24 }).then(({ vendors: v, usingSeed: seed }) => {
      if (cancelled) return;
      setVendors(v);
      setUsingSeed(seed);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ background: '#0d0f14', color: '#e8eaf0', fontFamily: "'Outfit', sans-serif", minHeight: '100vh' }}>
      <Nav active="Marketplace" />

      <section
        style={{
          background: 'linear-gradient(160deg, #0d0f14 0%, #13161e 60%, #0d0f14 100%)',
          padding: '40px 24px 40px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: '800',
            margin: '0 0 12px',
            background: 'linear-gradient(135deg, #e8eaf0 0%, #e8b84b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          TCG Marketplace
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#7a8099', maxWidth: '560px', margin: '0 auto', lineHeight: '1.65' }}>
          {t.sub}{' '}
          <strong style={{ color: 'rgba(232,234,240,0.85)' }}>{t.subStrong}</strong> {t.subAfter}
        </p>
        <div
          style={{
            marginTop: '18px',
            fontSize: '13px',
            color: '#7a8099',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '6px 12px',
            alignItems: 'center',
          }}
        >
          <span style={{ opacity: 0.75 }}>{t.region}</span>
          <a href={withLocalePrefix('/marketplace/batam', locale)} style={{ color: '#3ecf8e', textDecoration: 'none', fontWeight: '600' }}>
            🏝️ Batam
          </a>
          <span style={{ opacity: 0.35 }}>·</span>
          <a href={withLocalePrefix('/marketplace/jakarta', locale)} style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600' }}>
            🏙️ Jakarta
          </a>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
          <a
            href={withLocalePrefix('/marketplace/rfq', locale)}
            style={{
              textDecoration: 'none',
              padding: '12px 22px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #e8b84b, #c49a2e)',
              color: '#0d0f14',
              fontWeight: '700',
              fontSize: '14px',
            }}
          >
            {t.rfq}
          </a>
          <a
            href={withLocalePrefix('/contact', locale)}
            style={{
              textDecoration: 'none',
              padding: '12px 22px',
              borderRadius: '10px',
              border: '1px solid rgba(232,184,75,0.45)',
              color: '#e8b84b',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            {t.signup}
          </a>
        </div>
      </section>

      <section style={{ padding: '0 24px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 18px', color: '#e8eaf0' }}>{t.explore}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
          {VENDOR_CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={withLocalePrefix(`/marketplace/category/${c.id}`, locale)}
              style={{
                display: 'block',
                textDecoration: 'none',
                padding: '20px 18px',
                borderRadius: '14px',
                background: '#1a1e28',
                border: `1px solid ${c.color}33`,
                transition: 'transform 0.2s, border-color 0.2s',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{c.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#e8eaf0', marginBottom: '6px' }}>{c.name}</div>
              <div style={{ fontSize: '13px', color: '#7a8099', lineHeight: '1.45' }}>{c.description}</div>
            </a>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 24px 72px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#e8eaf0' }}>{t.featured}</h2>
          {usingSeed ? (
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#a78bfa',
                border: '1px solid rgba(167,139,250,0.35)',
                borderRadius: '6px',
                padding: '4px 10px',
                background: 'rgba(167,139,250,0.08)',
              }}
            >
              {t.demo}
            </span>
          ) : null}
        </div>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  background: '#1a1e28',
                  borderRadius: '14px',
                  height: '200px',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {vendors.map((v) => (
              <ProviderCard key={v.id} vendor={v} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
