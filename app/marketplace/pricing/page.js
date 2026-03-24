'use client';

import Nav from '../../components/Nav';
import Link from 'next/link';
import { TCG_APP_SIGNUP_CLIENT_URL } from '../../../lib/tcgAppUrls';

const TIERS = [
  {
    name: 'Free',
    price: 'Rp0',
    desc: 'Listing dasar, visibilitas terbatas',
    features: ['Profil perusahaan', '1 kategori', 'Lead email'],
  },
  {
    name: 'Starter',
    price: 'Hubungi kami',
    desc: 'Untuk SMB yang mulai menjangkau Asia',
    features: ['Semua kategori', 'RFQ prioritas', 'Badge Starter'],
    highlight: true,
  },
  {
    name: 'Pro / Enterprise',
    price: 'Kustom',
    desc: 'Volume besar & integrasi',
    features: ['Account manager', 'API & SLA', 'Enterprise billing'],
  },
];

export default function MarketplacePricingPage() {
  return (
    <div style={{ background: '#0d0f14', color: '#e8eaf0', fontFamily: "'Outfit', sans-serif", minHeight: '100vh' }}>
      <Nav />
      <section style={{ padding: '88px 24px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: '800', margin: '0 0 12px' }}>Harga Marketplace</h1>
        <p style={{ color: '#7a8099', maxWidth: '560px', margin: '0 auto', lineHeight: '1.65' }}>
          Paket untuk vendor di Indonesia &amp; Asia. Detail akhir disesuaikan dengan kebutuhan — mulai dari daftar gratis.
        </p>
      </section>
      <section style={{ padding: '24px 24px 64px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {TIERS.map((t) => (
            <div
              key={t.name}
              style={{
                padding: '28px 22px',
                borderRadius: '16px',
                background: t.highlight ? 'linear-gradient(145deg, rgba(232,184,75,0.12), rgba(26,30,40,0.95))' : '#1a1e28',
                border: t.highlight ? '1px solid rgba(232,184,75,0.35)' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '800', color: '#e8eaf0' }}>{t.name}</h2>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#e8b84b', marginBottom: '8px' }}>{t.price}</div>
              <p style={{ color: '#7a8099', fontSize: '14px', margin: '0 0 20px', lineHeight: '1.5' }}>{t.desc}</p>
              <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(232,234,240,0.85)', fontSize: '14px', lineHeight: '1.8' }}>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <a
            href={TCG_APP_SIGNUP_CLIENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #e8b84b, #c49a2e)',
              color: '#0d0f14',
              fontWeight: '700',
              fontSize: '15px',
            }}
          >
            Daftar sebagai vendor →
          </a>
          <Link
            href="/marketplace/rfq"
            style={{
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              border: '1px solid rgba(232,184,75,0.4)',
              color: '#e8b84b',
              fontWeight: '600',
              fontSize: '15px',
            }}
          >
            Minta penawaran (RFQ)
          </Link>
        </div>
      </section>
    </div>
  );
}
