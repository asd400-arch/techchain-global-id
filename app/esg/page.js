'use client';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';

export default function ESG() {
  const [scrollY, setScrollY] = useState(0);
  const m = useMobile();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pad = m ? '50px 16px' : '100px 40px';

  return (
    <div>
      <Nav active="ESG" />

      <section style={{ position: 'relative', minHeight: m ? '45vh' : '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Sustainability.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(5,80,60,0.85))' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '130px 20px 70px' }}>
          <span className="animate-fadeInUp" style={{ color: '#34d399', fontSize: m ? '12px' : '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>ESG & Keberlanjutan</span>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '15px', letterSpacing: '-2px' }}>
            <span>Membangun Masa Depan</span><br /><span>Berkelanjutan Melalui Teknologi</span>
          </h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '20px auto 0', lineHeight: '1.7' }}>Komitmen kami terhadap pengelolaan lingkungan, tanggung jawab sosial, dan tata kelola yang baik mendorong semua yang kami lakukan.</p>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '40px' : '60px' }}>
            <span style={{ color: '#34d399', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Pilar Kami</span>
            <h2 style={{ fontSize: m ? '28px' : '40px', fontWeight: '800', color: 'white', marginTop: '12px' }}>Kerangka ESG</h2>
          </div>

          {/* Standar ESG Global */}
          <div style={{
            display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '25px' : '50px', alignItems: 'center',
            marginBottom: m ? '30px' : '80px', padding: m ? '25px' : '50px', borderRadius: '24px',
            background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.1)',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(5,150,105,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🌍</div>
                <h3 style={{ fontSize: m ? '22px' : '28px', fontWeight: '800', color: 'white' }}>Standar ESG Global</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: m ? '14px' : '16px', lineHeight: '1.8', marginBottom: '25px' }}>Kami mematuhi standar ESG yang diakui secara internasional di semua operasi kami. Kerangka komprehensif kami memastikan tanggung jawab lingkungan, akuntabilitas sosial, dan tata kelola yang transparan di setiap pasar yang kami layani.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Kepatuhan ISO', 'Pelaporan Keberlanjutan', 'Rantai Pasokan Etis', 'Keterlibatan Pemangku Kepentingan'].map((tag, i) => (
                  <span key={i} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', background: 'rgba(52,211,153,0.08)', color: '#34d399', border: '1px solid rgba(52,211,153,0.15)' }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: m ? '220px' : '300px' }}>
              <img src="/Net_Zero.webp" alt="Standar ESG" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Net Zero */}
          <div style={{
            display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '25px' : '50px', alignItems: 'center',
            marginBottom: m ? '30px' : '80px', padding: m ? '25px' : '50px', borderRadius: '24px',
            background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.1)',
          }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: m ? '220px' : '300px', order: m ? 1 : 0 }}>
              <img src="/Sustainability.webp" alt="Net Zero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ order: m ? 0 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(5,150,105,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🌱</div>
                <h3 style={{ fontSize: m ? '22px' : '28px', fontWeight: '800', color: 'white' }}>Emisi Karbon Net Zero</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: m ? '14px' : '16px', lineHeight: '1.8', marginBottom: '25px' }}>Kami berkomitmen untuk mencapai emisi karbon Net Zero di seluruh operasi kami. Melalui rute logistik yang dioptimalkan, pergudangan hemat energi, dan praktik berkelanjutan, kami secara aktif mengurangi jejak lingkungan kami.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {[
                  { num: '30%', label: 'Target Pengurangan Karbon' },
                  { num: '100%', label: 'Target Energi Terbarukan' },
                ].map((stat, i) => (
                  <div key={i} style={{ padding: '18px', borderRadius: '12px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.12)', textAlign: 'center' }}>
                    <div style={{ fontSize: m ? '24px' : '28px', fontWeight: '800', color: '#34d399' }}>{stat.num}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kepedulian Komunitas */}
          <div style={{
            display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '25px' : '50px', alignItems: 'center',
            marginBottom: m ? '30px' : '80px', padding: m ? '25px' : '50px', borderRadius: '24px',
            background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.1)',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(5,150,105,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🤝</div>
                <h3 style={{ fontSize: m ? '22px' : '28px', fontWeight: '800', color: 'white' }}>Kepedulian Komunitas</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: m ? '14px' : '16px', lineHeight: '1.8', marginBottom: '25px' }}>Kami percaya pada memberi kembali kepada komunitas tempat kami beroperasi. Dari inisiatif dukungan kesehatan hingga program pendidikan dan lapangan kerja lokal, kami aktif berinvestasi dalam kesejahteraan komunitas kami di seluruh Asia-Pasifik.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Inisiatif Kesehatan', 'Program Pendidikan', 'Lapangan Kerja Lokal', 'Pengembangan Komunitas'].map((tag, i) => (
                  <span key={i} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', background: 'rgba(52,211,153,0.08)', color: '#34d399', border: '1px solid rgba(52,211,153,0.15)' }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: m ? '220px' : '300px' }}>
              <img src="/Community_care.webp" alt="Kepedulian Komunitas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Ekonomi Sirkular */}
          <div style={{
            padding: m ? '25px' : '50px', borderRadius: '24px', textAlign: 'center',
            background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.1)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>♻️</div>
            <h3 style={{ fontSize: m ? '22px' : '28px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Ekonomi Sirkular & Daur Ulang Bertanggung Jawab</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: m ? '14px' : '16px', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 30px' }}>Melalui layanan Manajemen Akhir Produk kami, kami memastikan penanganan teknologi yang bertanggung jawab di akhir masa pakai. Pemrosesan scrap, program daur ulang, dan layanan refurbishment kami meminimalkan limbah dan memaksimalkan pemulihan sumber daya.</p>
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
              {[
                { icon: '🔄', title: 'Refurbishment', desc: 'Memperpanjang siklus hidup produk' },
                { icon: '📊', title: 'Daur Ulang', desc: 'Pemulihan material yang bertanggung jawab' },
                { icon: '📋', title: 'Kepatuhan', desc: 'Regulasi lingkungan' },
              ].map((item, i) => (
                <div key={i} style={{ padding: m ? '20px' : '25px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '15px' }}>{item.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '4px' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: m ? '50px 16px' : '80px 40px', background: 'linear-gradient(135deg, #065f46, #059669)', textAlign: 'center' }}>
        <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Bermitra Dengan Tujuan</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: m ? '15px' : '18px', marginBottom: '35px' }}>Pelajari bagaimana praktik berkelanjutan kami dapat mendukung tujuan ESG Anda</p>
        <a href="/contact" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: '10px', background: 'white', color: '#065f46', textDecoration: 'none', fontWeight: '700', fontSize: '17px' }}>Hubungi Kami →</a>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
      </footer>
    </div>
  );
}
