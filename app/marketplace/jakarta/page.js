'use client';
import { useState, useEffect } from 'react';
import ProviderCard from '../../components/ProviderCard';
import { loadMarketplaceProvidersWithSeed } from '../../../lib/marketplace/loadProvidersClient';
import { TCG_APP_SIGNUP_CLIENT_URL, TCG_APP_SIGNUP_DRIVER_URL } from '../../../lib/tcgAppUrls';

export default function JakartaPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSeed, setUsingSeed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadMarketplaceProvidersWithSeed({ country: 'ID', limit: 6 }, { maxItems: 6 }).then(({ vendors: v, usingSeed: seed }) => {
      if (cancelled) return;
      setVendors(v);
      setUsingSeed(seed);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const areas = [
    { icon: '📦', title: 'Cikarang', desc: 'Kawasan industri terbesar di Asia Tenggara' },
    { icon: '🏭', title: 'MM2100', desc: 'Zona industri premium Bekasi' },
    { icon: '🚢', title: 'Tanjung Priok', desc: 'Pelabuhan container utama Indonesia' },
    { icon: '🛣️', title: 'Cakung / Marunda', desc: 'Akses tol langsung ke seluruh Jawa' },
  ];

  const corridorRows = [
    { icon: '✈️', label: 'Udara', value: 'Bandara Soekarno-Hatta — koneksi ke 100+ kota Asia' },
    { icon: '🚢', label: 'Laut', value: 'Tanjung Priok — pelabuhan tersibuk di Indonesia' },
    { icon: '📦', label: 'TCG Express', value: 'Pengiriman last-mile B2B di Jabodetabek' },
    { icon: '🌐', label: 'Pasar', value: 'Akses ke 270 juta konsumen Indonesia' },
  ];

  return (
    <div style={{ background: '#0d0f14', color: '#e8eaf0', fontFamily: "'Outfit', sans-serif" }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(160deg, #0d0f14 0%, #13161e 60%, #0d0f14 100%)',
        padding: '80px 24px 64px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(96,165,250,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#60a5fa', fontWeight: '600' }}>
          🏙️ Jakarta · Indonesia
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', margin: '0 0 16px', lineHeight: '1.15', background: 'linear-gradient(135deg, #e8eaf0 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Gudang & Logistik di Jakarta
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: '#7a8099', maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.7' }}>
          Pusat distribusi Indonesia. Akses ke 270 juta konsumen.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/marketplace/rfq?location=Jakarta" style={{
            textDecoration: 'none', padding: '14px 28px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
            color: '#0d0f14', fontWeight: '700', fontSize: '15px',
          }}>
            Cari Gudang di Jakarta →
          </a>
          <a href={TCG_APP_SIGNUP_CLIENT_URL} target="_blank" rel="noopener noreferrer" style={{
            textDecoration: 'none', padding: '14px 28px', borderRadius: '10px',
            background: 'transparent', border: '1px solid rgba(96,165,250,0.4)',
            color: '#60a5fa', fontWeight: '600', fontSize: '15px',
          }}>
            Daftarkan Gudang Anda →
          </a>
        </div>
      </section>

      {/* KEY AREAS */}
      <section style={{ padding: '56px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 24px', color: '#e8eaf0' }}>Kawasan Strategis</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {areas.map((a, i) => (
            <div key={i} style={{
              background: '#1a1e28', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px', padding: '24px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{a.icon}</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '700', color: '#e8eaf0' }}>{a.title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#7a8099', lineHeight: '1.5' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORRIDOR INFO */}
      <section style={{ padding: '0 24px 56px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ background: '#13161e', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: '700', color: '#60a5fa' }}>🗺️ Konektivitas Jakarta</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {corridorRows.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{r.icon}</span>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#7a8099', marginRight: '8px' }}>{r.label}:</span>
                  <span style={{ fontSize: '13px', color: '#e8eaf0' }}>{r.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section style={{ padding: '0 24px 56px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#e8eaf0' }}>Vendor Tersedia di Jakarta</h2>
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
            {[...Array(3)].map((_, i) => <div key={i} style={{ background: '#1a1e28', borderRadius: '14px', height: '180px', border: '1px solid rgba(255,255,255,0.07)' }} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {vendors.map((v) => (
              <ProviderCard key={v.id} vendor={v} />
            ))}
          </div>
        )}
      </section>

      {/* DRIVER CTA */}
      <section style={{ background: 'linear-gradient(135deg, #13161e, #1a1e28)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🚗</div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#e8eaf0', margin: '0 0 10px' }}>Jadilah Driver TCG Express di Jakarta</h2>
          <p style={{ color: '#7a8099', fontSize: '15px', lineHeight: '1.7', margin: '0 auto 28px', maxWidth: '460px' }}>
            Bonus Selamat Datang <strong style={{ color: '#e8b84b' }}>Rp500.000</strong> setelah 5 pengiriman
          </p>
          <a href={TCG_APP_SIGNUP_DRIVER_URL} style={{
            display: 'inline-block', textDecoration: 'none', padding: '14px 32px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #e8b84b, #c49a2e)',
            color: '#0d0f14', fontWeight: '700', fontSize: '15px',
          }}>
            Daftar Driver →
          </a>
        </div>
      </section>

    </div>
  );
}
