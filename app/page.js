'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import InteractiveMap from '../components/InteractiveMap';
import Nav from './components/Nav';
import useMobile from '../components/useMobile';
import { TCG_APP_SIGNUP_CLIENT_URL } from '../lib/tcgAppUrls';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');
  const videoRef = useRef(null);
  const m = useMobile();

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.style.transform = `scale(${1 + window.scrollY * 0.0003})`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Supabase not configured');
      }
      const { error } = await supabase.from('leads').insert([formData]);
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  const pad = m ? '50px 16px' : '100px 40px';

  const services = [
    { icon: '🔧', title: 'Layanan Teknis', desc: 'Operasi Pusat Data, Otomasi Semikonduktor, Produksi Teknologi, Perbaikan Elektronik Konsumen & Logistik Balik', img: '/Technical_Service_Center.webp' },
    { icon: '🚚', title: 'Pengiriman Teknologi', desc: 'Peralatan Besar & Berat, Pengiriman White Glove, Pengiriman Ekspres (2/4 Jam), Manajemen Pengembalian', img: '/Express_delivery.webp' },
    { icon: '📦', title: 'Operasi Gudang', desc: 'Manajemen Suku Cadang, Inbound/Outbound, Manajemen Inventaris, Kegiatan Nilai Tambah, Penyimpanan Teknologi Bernilai Tinggi', img: '/warehouse_operation.webp' },
    { icon: '♻️', title: 'Manajemen Akhir Produk', desc: 'Pemrosesan Scrap, Daur Ulang, Refurbishment — Manajemen siklus hidup berkelanjutan untuk semua produk teknologi', img: '/end_of_life.webp' },
  ];

  const industries = [
    { icon: '🖥️', title: 'Pusat Data', desc: 'Operasi, pemeliharaan & dukungan infrastruktur' },
    { icon: '⚙️', title: 'Semikonduktor', desc: 'Dukungan fab, otomasi & layanan peralatan' },
    { icon: '📡', title: 'Telekomunikasi', desc: 'Peralatan jaringan & sistem komunikasi' },
    { icon: '🏥', title: 'Layanan Kesehatan', desc: 'Logistik perangkat medis & pengiriman vaksin' },
  ];

  const esgItems = [
    { icon: '🌍', title: 'Standar ESG Global', desc: 'Kepatuhan internasional' },
    { icon: '🌱', title: 'Emisi Net Zero', desc: 'Operasi netral karbon' },
    { icon: '🤝', title: 'Kepedulian Komunitas', desc: 'Tanggung jawab sosial' },
    { icon: '♻️', title: 'Daur Ulang & Refurb', desc: 'Ekonomi sirkular' },
  ];

  const tcgFeatures = [
    { icon: '🚀', label: 'Pengiriman Ekspres' },
    { icon: '📍', label: 'Pelacakan GPS Langsung' },
    { icon: '🔒', label: 'Pembayaran Escrow' },
    { icon: '📄', label: 'Invoice PDF Otomatis' },
  ];

  return (
    <div>

      <Nav active="Home" />

      {/* HERO */}
      <section style={{
        position: 'relative', zIndex: 0, minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <video ref={videoRef} autoPlay muted loop playsInline style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          transform: 'scale(1)', willChange: 'transform', pointerEvents: 'none',
        }}>
          <source src="/home_page.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(135deg, rgba(10,22,40,0.55) 0%, rgba(15,43,91,0.45) 50%, rgba(10,22,40,0.55) 100%)' }}></div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'auto', textAlign: 'center', maxWidth: '950px', padding: '0 20px' }}>
          <div className="animate-fadeInUp" style={{
            display: 'inline-block', padding: '8px 20px', borderRadius: '30px',
            border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)',
            color: '#00d4ff', fontSize: m ? '11px' : '14px', fontWeight: '500', marginBottom: '30px',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            🌐 Mitra Teknologi Terpercaya di Asia-Pasifik
          </div>
          <h1 className="animate-fadeInUp delay-1" style={{
            fontSize: m ? '36px' : '68px', fontWeight: '800', color: 'white',
            lineHeight: '1.05', letterSpacing: '-2px', marginBottom: '25px',
          }}>
            Mendukung Teknologi<br />
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #1a56db, #00d4ff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 3s ease infinite',
            }}>Keunggulan Layanan</span>
          </h1>
          <p className="animate-fadeInUp delay-2" style={{
            fontSize: m ? '15px' : '20px', color: 'rgba(255,255,255,0.6)', maxWidth: '650px',
            margin: '0 auto 40px', lineHeight: '1.7',
          }}>
            Layanan teknis menyeluruh untuk Pusat Data, Semikonduktor, Elektronik Konsumen, dan Layanan Kesehatan — dari Indonesia ke seluruh dunia.
          </p>
          <div className="animate-fadeInUp delay-3" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexDirection: m ? 'column' : 'row', alignItems: 'center' }}>
            <a href="/contact" style={{
              padding: '16px 36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
              color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '17px',
              boxShadow: '0 8px 30px rgba(0,212,255,0.3)',
            }}>Mulai Sekarang</a>
            <a href="/services" style={{
              padding: '16px 36px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '17px',
              background: 'rgba(255,255,255,0.05)',
            }}>Layanan Kami</a>
          </div>
        </div>

        {!m && (
          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '2px' }}>GULIR</span>
            <div style={{ width: '24px', height: '40px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.2)', position: 'relative' }}>
              <div className="animate-float" style={{ width: '4px', height: '8px', borderRadius: '2px', background: '#00d4ff', position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)' }}></div>
            </div>
          </div>
        )}
      </section>

      {/* STATS */}
      <section style={{ background: 'linear-gradient(135deg, #0f2b5b, #1a56db)', padding: m ? '40px 16px' : '50px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: m ? '20px' : '30px', textAlign: 'center' }}>
          {[
            { num: '9+', label: 'Tahun Beroperasi', icon: '📅' },
            { num: '9', label: 'Negara', icon: '🌏' },
            { num: '30+', label: 'Lokasi', icon: '📍' },
            { num: '24/7', label: 'Dukungan Teknis', icon: '⚡' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{ fontSize: m ? '32px' : '42px', fontWeight: '800', color: 'white' }}>{stat.num}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '13px' : '15px', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TCG Express */}
      <section style={{ padding: m ? '40px 16px' : '50px 40px', background: '#0a1628' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(0,212,170,0.08), rgba(0,212,170,0.02))',
          border: '1px solid rgba(0,212,170,0.15)',
          display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '0',
        }}>
          <div style={{ padding: m ? '30px 20px' : '50px 45px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content',
              background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.25)',
              borderRadius: '100px', padding: '6px 16px', marginBottom: '16px',
            }}>
              <span style={{ width: '8px', height: '8px', background: '#00d4aa', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
              <span style={{ color: '#00d4aa', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Zona Indonesia (+62)</span>
            </div>
            <h3 style={{ fontSize: m ? '24px' : '32px', fontWeight: '800', color: 'white', lineHeight: '1.2', marginBottom: '12px' }}>
              TCG Express <span style={{ color: '#00d4aa' }}>Indonesia</span> — sudah live
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: m ? '14px' : '16px', lineHeight: '1.7', marginBottom: '8px' }}>
              Platform B2B pengiriman peralatan teknologi untuk Indonesia. Kuota, GPS, dan pembayaran terintegrasi — lewat aplikasi zona <strong style={{ color: 'rgba(255,255,255,0.85)' }}>+62</strong>, bukan default Singapura (+65).
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: m ? '12px' : '13px', lineHeight: '1.5', marginBottom: '24px', fontFamily: 'ui-monospace, monospace' }}>
              app.techchainglobal.com/id/…
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={TCG_APP_SIGNUP_CLIENT_URL} target="_blank" rel="noopener noreferrer" title="Daftar klien — app.techchainglobal.com/id/signup" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #00d4aa, #00b894)', color: '#0a1628',
                textDecoration: 'none', fontWeight: '700', fontSize: '14px',
              }}>Pesan pengiriman</a>
              <a href="/tech-delivery" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '10px',
                background: 'transparent', color: '#00d4aa',
                textDecoration: 'none', fontWeight: '700', fontSize: '14px',
                border: '1px solid rgba(0,212,170,0.3)',
              }}>Info Pengiriman →</a>
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,212,170,0.06), rgba(0,100,80,0.1))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: m ? '30px 20px' : '40px',
            minHeight: m ? '200px' : 'auto',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '300px' }}>
              {tcgFeatures.map((feat, i) => (
                <div key={i} style={{
                  padding: '16px 12px', borderRadius: '12px', textAlign: 'center',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{feat.icon}</div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.6)' }}>{feat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: m ? '40px' : '60px' }}>
            <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Penawaran Layanan Tersedia</span>
            <h2 style={{ fontSize: m ? '28px' : '44px', fontWeight: '800', color: 'white', marginTop: '10px', letterSpacing: '-1px' }}>
              Solusi Teknologi Komprehensif
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(2, 1fr)', gap: '25px' }}>
            {services.map((service, i) => (
              <div key={i} style={{
                borderRadius: '16px', overflow: 'hidden',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr',
              }}>
                <div style={{ height: m ? '200px' : '250px', overflow: 'hidden' }}>
                  <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: m ? '25px 20px' : '35px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{service.icon}</div>
                  <h3 style={{ color: 'white', fontSize: m ? '20px' : '22px', fontWeight: '700', marginBottom: '12px' }}>{service.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.7' }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a href="/services" style={{
              display: 'inline-block', padding: '14px 35px', borderRadius: '10px',
              border: '1px solid rgba(0,212,255,0.4)', color: '#00d4ff',
              textDecoration: 'none', fontWeight: '600', fontSize: '16px',
              background: 'rgba(0,212,255,0.05)',
            }}>Lihat Semua Layanan</a>
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section style={{ padding: pad, position: 'relative', overflow: 'hidden', background: '#0e1f3d' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '30px' : '60px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Jaringan Global</span>
            <h2 style={{ fontSize: m ? '28px' : '40px', fontWeight: '800', color: 'white', marginTop: '12px', lineHeight: '1.2' }}>
              9 Negara.<br />30+ Lokasi.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: '1.8', marginTop: '20px', marginBottom: '30px' }}>
              Berkantor pusat di Indonesia dengan jaringan komprehensif di Asia-Pasifik, memberikan dukungan teknis lokal dengan standar global.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['🇮🇩 Indonesia (HQ · 16 lokasi)', '🇲🇾 Malaysia', '🇹🇭 Thailand', '🇻🇳 Vietnam', '🇰🇷 South Korea', '🇮🇳 India', '🇯🇵 Japan', '🇹🇼 Taiwan', '🇵🇭 Philippines'].map((c, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500' }}>{c}</div>
              ))}
            </div>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Industri yang Kami Layani</span>
          <h2 style={{ fontSize: m ? '28px' : '40px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>
            Memimpin di Bidang Teknologi
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '20px' }}>
            {industries.map((ind, i) => (
              <div key={i} style={{
                padding: m ? '25px 20px' : '35px 25px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{ind.icon}</div>
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{ind.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: '1.6' }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG */}
      <section style={{ padding: pad, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Net_Zero.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.93), rgba(5,100,70,0.85))' }}></div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '30px' : '60px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#34d399', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>ESG & Keberlanjutan</span>
            <h2 style={{ fontSize: m ? '28px' : '40px', fontWeight: '800', color: 'white', marginTop: '12px', lineHeight: '1.2' }}>
              Membangun Masa Depan Berkelanjutan Melalui Teknologi
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: '1.8', marginTop: '20px' }}>
              Kami berkomitmen pada standar ESG global, emisi karbon Net Zero, dan kepedulian komunitas — memastikan layanan teknologi kami berkontribusi pada dunia yang lebih baik.
            </p>
            <a href="/esg" style={{ display: 'inline-block', marginTop: '30px', padding: '14px 30px', borderRadius: '10px', background: 'linear-gradient(135deg, #34d399, #059669)', color: 'white', textDecoration: 'none', fontWeight: '600' }}>Pelajari Lebih Lanjut tentang ESG</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {esgItems.map((item, i) => (
              <div key={i} style={{ padding: m ? '20px' : '25px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(52,211,153,0.15)', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '40px' : '80px' }}>
          <div>
            <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Hubungi Kami</span>
            <h2 style={{ fontSize: m ? '28px' : '40px', fontWeight: '800', color: 'white', marginTop: '12px', lineHeight: '1.2' }}>
              Mari Tingkatkan Operasi Teknologi Anda
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', lineHeight: '1.8', marginTop: '20px' }}>
              Siap mengoptimalkan operasi layanan teknis Anda? Hubungi kami untuk konsultasi gratis.
            </p>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '📍', label: 'Komplek Nagoya Point Blok D No.02, Lubuk Baja, Batam 29444, Indonesia' },
                { icon: '📧', label: 'admin@techchainglobal.com', href: 'mailto:admin@techchainglobal.com' },
                { icon: '📞', label: '+62 778 123 4567', href: 'tel:+627781234567' },
                { icon: null, label: 'WhatsApp', href: 'https://wa.me/627781234567', isWhatsApp: true },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '45px', height: '45px', borderRadius: '12px', flexShrink: 0,
                    background: item.isWhatsApp ? 'rgba(37,211,102,0.15)' : 'rgba(0,212,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                  }}>
                    {item.isWhatsApp ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    ) : item.icon}
                  </div>
                  {item.href ? (
                    <a href={item.href} target={item.isWhatsApp ? '_blank' : undefined} rel={item.isWhatsApp ? 'noopener noreferrer' : undefined} style={{ color: item.isWhatsApp ? '#25D366' : 'rgba(255,255,255,0.6)', fontSize: '15px', textDecoration: 'none', fontWeight: item.isWhatsApp ? '600' : '400' }}>{item.label}</a>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: m ? '30px 20px' : '40px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { key: 'name', placeholder: 'Nama Anda', type: 'text', required: true },
                { key: 'email', placeholder: 'Alamat Email', type: 'email', required: true },
                { key: 'company', placeholder: 'Nama Perusahaan', type: 'text', required: false },
              ].map((field) => (
                <input key={field.key} type={field.type} placeholder={field.placeholder}
                  value={formData[field.key]} required={field.required}
                  onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                  style={{
                    padding: '15px 18px', borderRadius: '10px', fontSize: '15px', width: '100%',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', outline: 'none', fontFamily: "'Outfit', sans-serif",
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#00d4ff'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              ))}
              <textarea placeholder="Ceritakan kebutuhan Anda..."
                value={formData.message} required rows={4}
                onChange={e => setFormData({...formData, message: e.target.value})}
                style={{
                  padding: '15px 18px', borderRadius: '10px', fontSize: '15px', width: '100%',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white', outline: 'none', resize: 'vertical', fontFamily: "'Outfit', sans-serif",
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = '#00d4ff'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button type="submit" style={{
                padding: '16px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
                color: 'white', fontWeight: '700', fontSize: '17px', cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif", boxShadow: '0 8px 30px rgba(0,212,255,0.2)',
              }}>
                {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
              {status === 'success' && <p style={{ color: '#00d4ff', textAlign: 'center' }}>Pesan terkirim!</p>}
              {status === 'error' && <p style={{ color: '#ff6b35', textAlign: 'center' }}>Terjadi kesalahan.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: m ? '40px 16px 20px' : '60px 40px 30px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '2fr 1fr 1fr 1fr', gap: m ? '30px' : '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', justifyContent: m ? 'center' : 'flex-start' }}>
              <img src="/logo-512-dark.png" alt="Tech Chain Global" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>Tech Chain Global</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: '1.7', maxWidth: '280px', textAlign: m ? 'center' : 'left', margin: m ? '0 auto' : 0 }}>
              Mendukung keunggulan layanan teknologi di Asia-Pasifik sejak 2016.
            </p>
          </div>
          {[
            { title: 'Layanan', links: [{ name: 'Layanan Teknis', href: '/services' }, { name: 'Pengiriman Teknologi', href: '/tech-delivery' }, { name: 'Pergudangan', href: '/services' }, { name: 'Akhir Produk', href: '/services' }] },
            { title: 'Perusahaan', links: [{ name: 'Tentang Kami', href: '/about' }, { name: 'ESG', href: '/esg' }, { name: 'Blog', href: '/blog' }, { name: 'Kontak', href: '/contact' }] },
            { title: 'Industri', links: [{ name: 'Pusat Data', href: '/services' }, { name: 'Semikonduktor', href: '/services' }, { name: 'Telekomunikasi', href: '/services' }, { name: 'Layanan Kesehatan', href: '/services' }] },
          ].map((col, i) => (
            <div key={i} style={{ textAlign: m ? 'center' : 'left' }}>
              <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', marginBottom: '15px' }}>{col.title}</h4>
              {col.links.map((link, j) => (
                <div key={j} style={{ marginBottom: '10px' }}>
                  <a href={link.href} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '14px' }}>{link.name}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          maxWidth: '1100px', margin: '40px auto 0', paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', flexDirection: m ? 'column' : 'row', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Indonesia 🇮🇩</span>
        </div>
      </footer>
    </div>
  );
}
