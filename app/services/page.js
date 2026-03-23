'use client';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';
import { TCG_APP_SIGNUP_CLIENT_URL } from '../../lib/tcgAppUrls';

export default function Services() {
  const [scrollY, setScrollY] = useState(0);
  const m = useMobile();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: '🔧', title: 'Layanan Teknis', desc: 'Dukungan teknis komprehensif untuk industri berteknologi tinggi termasuk layanan di lokasi dan jarak jauh. Kami menyediakan keahlian teknik khusus di berbagai sektor.', img: '/Technical_Service_Center.webp', features: ['Operasi Pusat Data', 'Otomasi Semikonduktor', 'Produksi Teknologi', 'Perbaikan Elektronik Konsumen', 'Logistik Balik'] },
    { icon: '🚚', title: 'Pengiriman Teknologi', desc: 'Layanan pengiriman khusus yang dirancang untuk peralatan teknologi sensitif, besar, dan bernilai tinggi dengan protokol penanganan terjamin.', img: '/Express_delivery.webp', features: ['Peralatan Besar & Berat', 'Pengiriman White Glove', 'Pengiriman Ekspres (2/4 Jam)', 'Manajemen Pengembalian'], link: TCG_APP_SIGNUP_CLIENT_URL },
    { icon: '📦', title: 'Operasi Gudang', desc: 'Manajemen gudang canggih dengan area khusus untuk inventaris teknologi bernilai tinggi dan persyaratan penanganan khusus.', img: '/warehouse_operation.webp', features: ['Manajemen Suku Cadang', 'Inbound/Outbound', 'Manajemen Inventaris', 'Kegiatan Nilai Tambah', 'Penyimpanan Teknologi Bernilai Tinggi'] },
    { icon: '♻️', title: 'Manajemen Akhir Produk', desc: 'Manajemen akhir masa pakai yang bertanggung jawab dan berkelanjutan untuk semua produk teknologi, memastikan kepatuhan terhadap regulasi lingkungan.', img: '/end_of_life.webp', features: ['Pemrosesan Scrap', 'Program Daur Ulang', 'Layanan Refurbishment', 'Kepatuhan Lingkungan'] },
  ];

  const industries = ['Pusat Data', 'Semikonduktor', 'Telekomunikasi', 'Layanan Kesehatan'];
  const industryIcons = ['🖥️', '⚙️', '📡', '🏥'];
  const pad = m ? '50px 16px' : '80px 40px';

  return (
    <div>
      <Nav active="Services" />

      <section style={{ position: 'relative', minHeight: m ? '45vh' : '55vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Technical_Service__support.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.93), rgba(15,43,91,0.88))' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '130px 20px 70px' }}>
          <span className="animate-fadeInUp" style={{ color: '#00d4ff', fontSize: m ? '12px' : '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Penawaran Layanan Tersedia</span>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '15px', letterSpacing: '-2px' }}>
            <span>Layanan Teknologi</span><br /><span>& Solusi</span>
          </h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '20px auto 0', lineHeight: '1.7' }}>Dari dukungan teknis hingga manajemen akhir masa pakai — solusi komprehensif untuk operasi teknologi Anda.</p>
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
                {service.link && (
                  <a href={service.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #00d4aa, #00b894)', color: '#0a1628', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>Pelajari Lebih Lanjut dan Pesan</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: pad, background: '#0e1f3d', textAlign: 'center' }}>
        <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Industri yang Dilayani</span>
        <h2 style={{ fontSize: m ? '28px' : '36px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>Spesialis di Berbagai Sektor</h2>
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
        <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Butuh Solusi Khusus?</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: m ? '15px' : '18px', marginBottom: '35px' }}>Hubungi tim kami untuk mendiskusikan kebutuhan layanan teknis spesifik Anda</p>
        <a href="/contact" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: '10px', background: 'white', color: '#0f2b5b', textDecoration: 'none', fontWeight: '700', fontSize: '17px' }}>Hubungi Kami</a>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
      </footer>
    </div>
  );
}
