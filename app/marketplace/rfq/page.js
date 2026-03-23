'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '../../components/Nav';
import RFQForm from '../../components/RFQForm';

function RfqContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  useEffect(() => {
    document.cookie = 'locale=id;path=/;max-age=86400';
  }, []);

  return (
    <div style={{ background: '#0d0f14', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      <Nav active="Marketplace" />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '88px 24px 80px' }}>
        {location ? (
          <p style={{ color: '#7a8099', fontSize: '14px', margin: '0 0 20px', textAlign: 'center' }}>
            Lokasi: <strong style={{ color: '#e8b84b' }}>{location}</strong>
          </p>
        ) : null}
        <RFQForm locale="id" />
      </div>
    </div>
  );
}

export default function MarketplaceRfqPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0d0f14',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '14px',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Memuat formulir RFQ...
        </div>
      }
    >
      <RfqContent />
    </Suspense>
  );
}
