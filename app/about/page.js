'use client';
import { useState, useEffect } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const m = useMobile();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pad = m ? '50px 16px' : '100px 40px';

  const vision = [
    { icon: '⚙️', title: 'Kepemimpinan Teknologi', desc: 'Memimpin di bidang dukungan teknologi di sektor Semikonduktor, Pusat Data, Telekomunikasi, dan Layanan Kesehatan.' },
    { icon: '🤖', title: 'AI & Otomasi', desc: 'Peningkatan berkelanjutan kemampuan teknologi kami, mengikuti platform AI terkini dan solusi otomatis.' },
    { icon: '🌱', title: 'Masa Depan Berkelanjutan', desc: 'Pembangunan berkelanjutan melalui teknologi membawa nilai kami ke generasi mendatang, membangun dunia yang lebih baik.' },
  ];

  const timeline = [
    { year: '2016', event: 'Didirikan di Indonesia — Kantor Pusat', icon: '🇮🇩' },
    { year: '2017', event: 'Ekspansi ke Indonesia — jaringan nasional dengan 16 lokasi', icon: '🇮🇩' },
    { year: '2018', event: 'Dukungan Semikonduktor & Telekomunikasi diluncurkan', icon: '⚙️' },
    { year: '2020', event: 'Hub E-Commerce didirikan di Indonesia', icon: '🛒' },
    { year: '2021', event: 'Operasi layanan kesehatan & Pengiriman Vaksin diluncurkan', icon: '🏥' },
    { year: '2022', event: 'Ekspansi ke Malaysia & Thailand', icon: '🌏' },
    { year: '2023', event: 'Dukungan Teknis Fab Indonesia & kemampuan Otomasi', icon: '🤖' },
    { year: '2024', event: 'Ekspansi ke India — Delhi, Mumbai, Chennai', icon: '🇮🇳' },
    { year: '2025', event: 'Layanan Dukungan Pusat Data diluncurkan', icon: '🖥️' },
  ];

  return (
    <div>
      <Nav active="About" />

      <section style={{ position: 'relative', minHeight: m ? '45vh' : '55vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Technical_Service_Center.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.93), rgba(15,43,91,0.88))' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '130px 20px 70px' }}>
          <span className="animate-fadeInUp" style={{ color: '#00d4ff', fontSize: m ? '12px' : '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Profil Perusahaan</span>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '15px', letterSpacing: '-2px' }}>
            <span>Memimpin di Bidang</span><br /><span>Dukungan Teknologi</span>
          </h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '20px auto 0', lineHeight: '1.7' }}>Sejak 2016, memberikan keunggulan layanan teknologi dari Indonesia ke seluruh dunia.</p>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: '25px' }}>
          {vision.map((item, i) => (
            <div key={i} style={{ padding: m ? '30px 20px' : '45px 30px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '44px', marginBottom: '18px' }}>{item.icon}</div>
              <h3 style={{ fontSize: m ? '20px' : '22px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>{item.title}</h3>
              <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #00d4ff, #1a56db)', borderRadius: '2px', margin: '0 auto 15px' }}></div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.7' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: m ? '50px 16px' : '80px 40px', background: '#0e1f3d' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '40px' : '60px' }}>
            <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Perjalanan Kami</span>
            <h2 style={{ fontSize: m ? '28px' : '40px', fontWeight: '800', color: 'white', marginTop: '12px' }}>Satu Dekade Pertumbuhan</h2>
          </div>
          {timeline.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: m ? '12px' : '25px', marginBottom: '20px', alignItems: 'center' }}>
              <div style={{ minWidth: m ? '45px' : '65px', fontSize: m ? '13px' : '16px', fontWeight: '700', color: '#00d4ff', textAlign: 'right' }}>{item.year}</div>
              <div style={{ width: m ? '40px' : '50px', height: m ? '40px' : '50px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(26,86,219,0.2))', border: '2px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: m ? '18px' : '22px' }}>{item.icon}</div>
              <div style={{ flex: 1, padding: m ? '12px 14px' : '18px 22px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', fontSize: m ? '13px' : '15px', lineHeight: '1.5' }}>{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Jaringan Global</span>
            <h2 style={{ fontSize: m ? '28px' : '40px', fontWeight: '800', color: 'white', marginTop: '12px' }}>Kehadiran Kami di Asia-Pasifik</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1.2fr 1fr', gap: m ? '30px' : '60px', alignItems: 'center' }}>
            <InteractiveMap />
            <div>
              {[
                { country: '🇲🇾 Malaysia', cities: 'KL, Penang, Johor Bahru' },
                { country: '🇹🇭 Thailand', cities: 'Bangkok, Laem Chabang' },
                { country: '🇻🇳 Vietnam', cities: 'Ho Chi Minh, Hanoi' },
                { country: '🇰🇷 South Korea', cities: 'Seoul' },
                { country: '🇮🇳 India', cities: 'Delhi, Mumbai, Chennai' },
                { country: '🇮🇩 Indonesia', cities: 'Jakarta, Surabaya, Medan +3' },
                { country: '🇯🇵 Japan', cities: 'Tokyo' },
                { country: '🇹🇼 Taiwan', cities: 'Taoyuan' },
                { country: '🇵🇭 Philippines', cities: 'Manila' },
              ].map((loc, i) => (
                <div key={i} style={{ padding: '12px 16px', marginBottom: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'white', fontWeight: '600', fontSize: m ? '13px' : '15px' }}>{loc.country}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: m ? '12px' : '13px' }}>{loc.cities}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: m ? '50px 16px' : '80px 40px', background: 'linear-gradient(135deg, #0f2b5b, #1a56db)', textAlign: 'center' }}>
        <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Siap Bermitra Dengan Kami?</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: m ? '15px' : '18px', marginBottom: '35px' }}>Bergabunglah dengan bisnis di 9 negara yang mempercayai Tech Chain Global</p>
        <a href="/contact" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: '10px', background: 'white', color: '#0f2b5b', textDecoration: 'none', fontWeight: '700', fontSize: '17px' }}>Hubungi Kami →</a>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
      </footer>
    </div>
  );
}
