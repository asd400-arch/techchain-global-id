'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound, usePathname } from 'next/navigation';
import Nav from '../../../components/Nav';
import CategoryHub from '../../../components/CategoryHub';
import ProviderCard from '../../../components/ProviderCard';
import { getVendorCategory } from '../../../../lib/marketplace/config';
import { loadMarketplaceProvidersWithSeed } from '../../../../lib/marketplace/loadProvidersClient';
import { TCG_APP_SIGNUP_CLIENT_URL } from '../../../../lib/tcgAppUrls';
import { marketingLocaleFromPath } from '../../../../lib/localePath';

const HEADING = { id: 'Penyedia terkait', en: 'Related providers' };
const DEMO = { id: 'Data demo (API tidak tersedia)', en: 'Demo data (API unavailable)' };

export default function MarketplaceCategoryPage() {
  const pathname = usePathname();
  const locale = marketingLocaleFromPath(pathname);
  const params = useParams();
  const raw = params?.category;
  const categoryId = Array.isArray(raw) ? raw[0] : raw;
  const meta = categoryId ? getVendorCategory(categoryId) : null;

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSeed, setUsingSeed] = useState(false);
  const [activeSub, setActiveSub] = useState(null);

  useEffect(() => {
    if (!meta) return;
    let cancelled = false;
    loadMarketplaceProvidersWithSeed({ limit: 48 }, { maxItems: 48, categoryId: meta.id }).then(({ vendors: v, usingSeed: u }) => {
      if (cancelled) return;
      setVendors(v);
      setUsingSeed(u);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [meta?.id]);

  if (!categoryId || !meta) {
    notFound();
  }

  return (
    <div style={{ background: '#0d0f14', color: '#e8eaf0', fontFamily: "'Outfit', sans-serif", minHeight: '100vh' }}>
      <Nav />
      <CategoryHub category={meta} activeSubcategory={activeSub} onSubcategoryChange={setActiveSub} />

      <section style={{ padding: '32px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#e8eaf0' }}>{HEADING[locale]}</h2>
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
              {DEMO[locale]}
            </span>
          ) : null}
        </div>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {[...Array(4)].map((_, i) => (
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
        <div style={{ marginTop: '36px', textAlign: 'center' }}>
          <a
            href={TCG_APP_SIGNUP_CLIENT_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            Daftarkan bisnis di kategori ini →
          </a>
        </div>
      </section>
    </div>
  );
}
