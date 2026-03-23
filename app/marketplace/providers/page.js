'use client';

import { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import MarketplaceNav from '../../components/MarketplaceNav';
import ProviderCard from '../../components/ProviderCard';
import { loadMarketplaceProvidersWithSeed } from '../../../lib/marketplace/loadProvidersClient';
import { TCG_APP_SIGNUP_CLIENT_URL } from '../../../lib/tcgAppUrls';

export default function MarketplaceProvidersPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSeed, setUsingSeed] = useState(false);

  useEffect(() => {
    document.cookie = 'locale=id;path=/;max-age=86400';
    let cancelled = false;
    loadMarketplaceProvidersWithSeed({ limit: 48 }, { maxItems: 48 }).then(({ vendors: v, usingSeed: u }) => {
      if (cancelled) return;
      setVendors(v);
      setUsingSeed(u);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ background: '#0d0f14', color: '#e8eaf0', fontFamily: "'Outfit', sans-serif", minHeight: '100vh' }}>
      <Nav />
      <MarketplaceNav />
      <section style={{ padding: '88px 24px 40px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '800', margin: '0 0 10px' }}>Semua penyedia</h1>
        <p style={{ color: '#7a8099', maxWidth: '560px', margin: '0 auto', lineHeight: '1.65' }}>
          Jelajahi penyedia terverifikasi di TCG Marketplace. Filter per kategori lewat menu di atas.
        </p>
      </section>
      <section style={{ padding: '40px 24px 72px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Daftar</h2>
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
              Data demo (API tidak tersedia)
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
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <a
            href={TCG_APP_SIGNUP_CLIENT_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            Daftarkan bisnis Anda →
          </a>
        </div>
      </section>
    </div>
  );
}
