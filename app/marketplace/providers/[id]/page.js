'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../../components/Nav';
import MarketplaceNav from '../../../components/MarketplaceNav';
import ProviderCard from '../../../components/ProviderCard';
import { getVendorCategory } from '../../../../lib/marketplace/config';
import { SEED_MARKETPLACE_PROVIDERS } from '../../../../lib/marketplace/seedProviders';
import { marketplaceProvidersUrl } from '../../../../lib/marketplace/api';
import { TCG_APP_SIGNUP_CLIENT_URL } from '../../../../lib/tcgAppUrls';

export default function MarketplaceProviderDetailPage() {
  const params = useParams();
  const raw = params?.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.cookie = 'locale=id;path=/;max-age=86400';
    if (!id) return;
    let cancelled = false;

    const fromSeed = SEED_MARKETPLACE_PROVIDERS.find((v) => v.id === id);
    if (fromSeed) {
      setVendor(fromSeed);
      setLoading(false);
      return;
    }

    fetch(marketplaceProvidersUrl({ limit: 100 }))
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        const list = data?.providers || [];
        const found = list.find((v) => v.id === id);
        setVendor(found || null);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setVendor(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!loading && !vendor) {
    notFound();
  }

  const cat = vendor ? getVendorCategory(vendor.category_id) : null;

  return (
    <div style={{ background: '#0d0f14', color: '#e8eaf0', fontFamily: "'Outfit', sans-serif", minHeight: '100vh' }}>
      <Nav />
      <MarketplaceNav />
      <section style={{ padding: '88px 24px 48px', maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/marketplace/providers" style={{ color: '#e8b84b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          ← Semua penyedia
        </Link>
        {loading ? (
          <div style={{ marginTop: '32px', height: '220px', background: '#1a1e28', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }} />
        ) : vendor ? (
          <div style={{ marginTop: '28px' }}>
            {cat ? (
              <p style={{ color: cat.color, fontSize: '13px', fontWeight: '700', margin: '0 0 12px' }}>
                {cat.icon} {cat.name}
              </p>
            ) : null}
            <ProviderCard vendor={vendor} />
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
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
                Daftarkan bisnis serupa →
              </a>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
