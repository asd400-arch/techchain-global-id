'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from '../Nav';
import useMobile from '../useMobile';
import { marketingLocaleFromPath, withLocalePrefix } from '../../../lib/localePath';

const COPY = {
  id: {
    heroKicker: 'Penawaran Layanan Tersedia',
    heroTitle1: 'Layanan Teknologi',
    heroTitle2: '& Solusi',
    heroSub:
      'Dari dukungan teknis hingga manajemen akhir masa pakai — solusi komprehensif untuk operasi teknologi Anda.',
    industriesKicker: 'Industri yang Dilayani',
    industriesTitle: 'Spesialis di Berbagai Sektor',
    ctaTitle: 'Butuh Solusi Khusus?',
    ctaSub: 'Hubungi tim kami untuk mendiskusikan kebutuhan layanan teknis spesifik Anda',
    ctaButton: 'Hubungi Kami',
    footer: '© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.',
    ctaLink: 'Pelajari Lebih Lanjut dan Pesan',
    detailDelivery: 'Detail layanan pengiriman',
  },
  en: {
    heroKicker: 'Service offerings',
    heroTitle1: 'Technology services',
    heroTitle2: '& solutions',
    heroSub:
      'From technical support to end-of-life management — comprehensive solutions for your technology operations.',
    industriesKicker: 'Industries we serve',
    industriesTitle: 'Specialists across sectors',
    ctaTitle: 'Need a tailored solution?',
    ctaSub: 'Talk to our team about your technical service requirements.',
    ctaButton: 'Contact us',
    footer: '© 2026 Tech Chain Global. All rights reserved.',
    ctaLink: 'Learn more & book',
    detailDelivery: 'Delivery service details',
  },
};

const SERVICES = {
  id: [
    { icon: '🔧', title: 'Layanan Teknis', desc: 'Dukungan teknis komprehensif untuk industri berteknologi tinggi termasuk layanan di lokasi dan jarak jauh. Kami menyediakan keahlian teknik khusus di berbagai sektor.', img: '/Technical_Service_Center.webp', features: ['Operasi Pusat Data', 'Otomasi Semikonduktor', 'Produksi Teknologi', 'Perbaikan Elektronik Konsumen', 'Logistik Balik'] },
    { icon: '🚚', title: 'Pengiriman Teknologi', desc: 'Layanan pengiriman khusus yang dirancang untuk peralatan teknologi sensitif, besar, dan bernilai tinggi dengan protokol penanganan terjamin.', img: '/Express_delivery.webp', features: ['Peralatan Besar & Berat', 'Pengiriman White Glove', 'Pengiriman Ekspres (2/4 Jam)', 'Manajemen Pengembalian'], detailPath: '/tech-delivery' },
    { icon: '📦', title: 'Operasi Gudang', desc: 'Manajemen gudang canggih dengan area khusus untuk inventaris teknologi bernilai tinggi dan persyaratan penanganan khusus.', img: '/warehouse_operation.webp', features: ['Manajemen Suku Cadang', 'Inbound/Outbound', 'Manajemen Inventaris', 'Kegiatan Nilai Tambah', 'Penyimpanan Teknologi Bernilai Tinggi'] },
    { icon: '♻️', title: 'Manajemen Akhir Produk', desc: 'Manajemen akhir masa pakai yang bertanggung jawab dan berkelanjutan untuk semua produk teknologi, memastikan kepatuhan terhadap regulasi lingkungan.', img: '/end_of_life.webp', features: ['Pemrosesan Scrap', 'Program Daur Ulang', 'Layanan Refurbishment', 'Kepatuhan Lingkungan'] },
  ],
  en: [
    { icon: '🔧', title: 'Technical services', desc: 'Comprehensive technical support for high-tech industries, including on-site and remote assistance with specialist engineering expertise.', img: '/Technical_Service_Center.webp', features: ['Data centre operations', 'Semiconductor automation', 'Tech manufacturing', 'Consumer electronics repair', 'Reverse logistics'] },
    { icon: '🚚', title: 'Technology delivery', desc: 'Specialised delivery for sensitive, large, and high-value technology equipment with proven handling protocols.', img: '/Express_delivery.webp', features: ['Heavy & oversized', 'White-glove delivery', 'Express (2/4 hr)', 'Returns management'], detailPath: '/tech-delivery' },
    { icon: '📦', title: 'Warehouse operations', desc: 'Advanced warehouse management with dedicated zones for high-value technology inventory and special handling requirements.', img: '/warehouse_operation.webp', features: ['Spare parts', 'Inbound/outbound', 'Inventory', 'Value-added', 'High-value storage'] },
    { icon: '♻️', title: 'End-of-life management', desc: 'Responsible, sustainable end-of-life management for technology products with environmental compliance.', img: '/end_of_life.webp', features: ['Scrap processing', 'Recycling programmes', 'Refurbishment', 'Environmental compliance'] },
  ],
};

const INDUSTRIES = {
  id: ['Pusat Data', 'Semikonduktor', 'Telekomunikasi', 'Layanan Kesehatan'],
  en: ['Data centres', 'Semiconductor', 'Telecommunications', 'Healthcare'],
};

export default function ServicesPageContent() {
  const pathname = usePathname();
  const locale = marketingLocaleFromPath(pathname);
  const t = COPY[locale];
  const services = SERVICES[locale];
  const industries = INDUSTRIES[locale];
  const industryIcons = ['🖥️', '⚙️', '📡', '🏥'];

  const [scrollY, setScrollY] = useState(0);
  const m = useMobile();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactHref = withLocalePrefix('/contact', locale);
  const pad = m ? '50px 16px' : '80px 40px';

  return (
    <div>
      <Nav />

      <section style={{ position: 'relative', minHeight: m ? '45vh' : '55vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Technical_Service__support.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.93), rgba(15,43,91,0.88))' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '130px 20px 70px' }}>
          <span className="animate-fadeInUp" style={{ color: '#00d4ff', fontSize: m ? '12px' : '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.heroKicker}</span>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '15px', letterSpacing: '-2px' }}>
            <span>{t.heroTitle1}</span><br /><span>{t.heroTitle2}</span>
          </h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '20px auto 0', lineHeight: '1.7' }}>{t.heroSub}</p>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {services.map((service, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '25px' : '50px', alignItems: 'center', marginBottom: m ? '40px' : '80px', padding: m ? '20px' : '40px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: m ? '220px' : '350px', order: m ? 0 : (i % 2 === 0 ? 0 : 1) }}>
                <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ order: m ? 1 : (i % 2 === 0 ? 1 : 0) }}>
                <div style={{ fontSize: '44px', marginBottom: '12px' }}>{service.icon}</div>
                <h3 style={{ fontSize: m ? '24px' : '30px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: m ? '14px' : '16px', lineHeight: '1.8', marginBottom: '25px' }}>{service.desc}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {service.features.map((feat, j) => (
                    <span key={j} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', background: 'rgba(0,212,255,0.08)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.15)' }}>{feat}</span>
                  ))}
                </div>
                {(service.detailPath || service.link) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginTop: '20px' }}>
                    {service.detailPath && (
                      <a
                        href={withLocalePrefix(service.detailPath, locale)}
                        style={{
                          display: 'inline-block',
                          padding: '12px 24px',
                          borderRadius: '10px',
                          border: '1px solid rgba(0,212,255,0.35)',
                          color: '#00d4ff',
                          textDecoration: 'none',
                          fontWeight: '700',
                          fontSize: '14px',
                        }}
                      >
                        {t.detailDelivery} →
                      </a>
                    )}
                    {service.link && (
                      <a href={service.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #00d4aa, #00b894)', color: '#0a1628', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>{t.ctaLink}</a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: pad, background: '#0e1f3d', textAlign: 'center' }}>
        <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.industriesKicker}</span>
        <h2 style={{ fontSize: m ? '28px' : '36px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>{t.industriesTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {industries.map((title, i) => (
            <div key={i} style={{ padding: m ? '25px' : '30px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{industryIcons[i]}</div>
              <h3 style={{ color: 'white', fontSize: '17px', fontWeight: '700' }}>{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: pad, background: 'linear-gradient(135deg, #0f2b5b, #1a56db)', textAlign: 'center' }}>
        <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>{t.ctaTitle}</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: m ? '15px' : '18px', marginBottom: '35px' }}>{t.ctaSub}</p>
        <a href={contactHref} style={{ display: 'inline-block', padding: '16px 40px', borderRadius: '10px', background: 'white', color: '#0f2b5b', textDecoration: 'none', fontWeight: '700', fontSize: '17px' }}>{t.ctaButton}</a>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>{t.footer}</span>
      </footer>
    </div>
  );
}
