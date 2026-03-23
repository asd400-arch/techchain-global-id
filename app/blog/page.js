'use client';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';

export default function Blog() {
  const [scrollY, setScrollY] = useState(0);
  const [activePost, setActivePost] = useState(null);
  const m = useMobile();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const posts = [
    {
      id: 1, title: 'Bagaimana AI Mengubah Operasi Pusat Data di 2025',
      date: '10 Feb 2025', category: 'Tren Industri', readTime: '5 menit baca',
      excerpt: 'Dari pemeliharaan prediktif hingga optimasi pendinginan otomatis, solusi berbasis AI mengubah cara fasilitas pusat data dikelola di seluruh Asia-Pasifik.',
      img: '/Technical_Service_Center.webp', color: '#00d4ff',
      content: [
        { heading: 'Pemeliharaan Prediktif dengan AI', text: 'Pemeliharaan reaktif tradisional digantikan oleh model prediktif bertenaga AI yang menganalisis data sensor secara real-time. Sistem ini dapat mendeteksi anomali peralatan berminggu-minggu sebelum kegagalan terjadi, mengurangi downtime tak terencana hingga 40%.' },
        { heading: 'Manajemen Energi yang Dioptimalkan AI', text: 'Pusat data mengonsumsi energi dalam jumlah besar, dan dengan target keberlanjutan yang semakin ketat secara global, AI diterapkan untuk mengoptimalkan efektivitas penggunaan daya (PUE). Algoritma pembelajaran mesin secara dinamis menyesuaikan sistem pendingin, beban server, dan distribusi daya.' },
        { heading: 'Respons Insiden Otomatis', text: 'Sistem pemantauan berbasis AI kini memungkinkan respons insiden otomatis, mengidentifikasi dan menyelesaikan masalah lebih cepat dari operator manusia mana pun.' },
        { heading: 'Teknologi Digital Twin', text: 'Operator semakin banyak menggunakan digital twin — replika virtual dari lingkungan pusat data fisik — untuk mensimulasikan skenario, merencanakan kapasitas, dan menguji perubahan sebelum implementasi.' },
        { heading: 'Apa Artinya Bagi Operator', text: 'Seiring percepatan adopsi AI, kebutuhan akan dukungan teknis yang terampil menjadi semakin kritis. AI menangani pengenalan pola dan otomasi, namun keahlian manusia tetap dibutuhkan untuk pemecahan masalah kompleks dan pengambilan keputusan strategis.' },
      ]
    },
    {
      id: 2, title: 'Boom Pusat Data APAC: Singapura, Malaysia, Indonesia & India Memimpin',
      date: '3 Feb 2025', category: 'Wawasan Pasar', readTime: '6 menit baca',
      excerpt: 'Asia-Pasifik adalah pasar pusat data yang tumbuh paling cepat di dunia. Empat pasar menonjol sebagai mesin utama ekspansi ini.',
      img: '/Express_delivery.webp', color: '#9333ea',
      content: [
        { heading: 'Singapura: Hub yang Mapan', text: 'Singapura tetap menjadi hub pusat data utama Asia Tenggara. Pencabutan moratorium pusat data oleh pemerintah baru-baru ini membuka pintu bagi gelombang pembangunan baru.' },
        { heading: 'Malaysia: Bintang yang Sedang Naik', text: 'Malaysia telah muncul sebagai destinasi utama untuk pusat data hyperscale, khususnya di Johor Bahru dan Kuala Lumpur.' },
        { heading: 'Indonesia: Raksasa yang Belum Dimanfaatkan', text: 'Dengan populasi terbesar keempat di dunia dan ekonomi yang berkembang pesat secara digital, Indonesia mewakili potensi yang sangat besar.' },
        { heading: 'India: Mesin Pertumbuhan', text: 'Pasar pusat data India diproyeksikan tumbuh 3x lipat pada 2028, dengan Mumbai, Chennai, dan Delhi NCR sebagai klaster utama.' },
        { heading: 'Benang Merahnya', text: 'Di keempat pasar tersebut, satu faktor tetap konstan: kebutuhan kritis akan dukungan teknis yang andal dan terlokalisasi.' },
      ]
    },
    {
      id: 3, title: 'Mengapa Dukungan Teknis adalah Tulang Punggung Operasi Pusat Data',
      date: '27 Jan 2025', category: 'Wawasan Ahli', readTime: '5 menit baca',
      excerpt: 'Meski banyak perhatian tertuju pada desain dan konstruksi, operasi teknis sehari-hari yang pada akhirnya menentukan keandalan sebuah fasilitas.',
      img: '/Technical_Service__support.webp', color: '#ff6b35',
      content: [
        { heading: 'Kompleksitas Tersembunyi dari Pusat Data Modern', text: 'Pusat data saat ini jauh lebih kompleks dari pendahulunya. Mereka menampung campuran peralatan lama dan terkini, menjalankan sistem pendinginan canggih, dan mengelola jaringan distribusi daya yang rumit.' },
        { heading: 'Apa yang Terjadi Ketika Dukungan Tidak Memadai', text: 'Konsekuensi dari dukungan teknis yang tidak memadai sangat parah. Downtime tak terencana diperkirakan menelan biaya sekitar USD $9.000 per menit.' },
        { heading: 'Rantai Nilai Dukungan Teknis', text: 'Dukungan teknis pusat data yang efektif mencakup: pemantauan dan respons insiden 24/7, pemeliharaan preventif dan prediktif, manajemen suku cadang dan perbaikan hardware.' },
        { heading: 'Keunggulan Regional', text: 'Bagi operator APAC, memiliki mitra dukungan teknis dengan kehadiran regional yang mapan menawarkan keunggulan signifikan.' },
        { heading: 'Ke Depan', text: 'Seiring pusat data menjadi semakin kritis bagi ekonomi global, nilai dukungan teknis profesional hanya akan terus meningkat.' },
      ]
    },
    {
      id: 4, title: 'Revolusi Pusat Data Hijau Singapura: Yang Perlu Diketahui Operator',
      date: '20 Jan 2025', category: 'Fokus Regional', readTime: '4 menit baca',
      excerpt: 'Setelah menerapkan moratorium konstruksi pusat data baru pada 2019, Singapura telah membuka kembali pengembangan — namun dengan persyaratan hijau yang ketat.',
      img: '/Sustainability.webp', color: '#16a34a',
      content: [
        { heading: 'Aturan Baru', text: 'Pusat data baru di Singapura harus memenuhi kriteria keberlanjutan yang ditingkatkan: PUE 1,3 atau lebih rendah, penggunaan sumber energi terbarukan, dan komitmen terhadap target netralitas karbon.' },
        { heading: 'Apa Artinya Bagi Operasi', text: 'Persyaratan ini secara fundamental mengubah cara pengoperasian pusat data. Inovasi pendinginan melalui liquid cooling dan sistem HVAC yang dioptimalkan AI menjadi standar.' },
        { heading: 'Tantangan Tenaga Kerja', text: 'Tenaga kerja pusat data Singapura berada di bawah tekanan. Seiring fasilitas menjadi semakin canggih secara teknologi, keterampilan yang dibutuhkan staf teknis terus berkembang.' },
        { heading: 'Peluang bagi Kawasan', text: 'Standar hijau Singapura mempengaruhi pasar APAC yang lebih luas, menciptakan ekosistem regional di mana keunggulan operasional dan tanggung jawab lingkungan berjalan beriringan.' },
      ]
    },
  ];

  const featured = posts[0];

  if (activePost) {
    const post = posts.find(p => p.id === activePost);
    return (
      <div style={{ minHeight: '100vh' }}>
        <Nav active="Blog" />
        <div style={{ position: 'relative', height: m ? '250px' : '400px', overflow: 'hidden' }}>
          <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a1628 10%, rgba(10,22,40,0.6) 100%)' }}></div>
        </div>
        <div style={{ maxWidth: '800px', margin: m ? '-80px auto 0' : '-120px auto 0', position: 'relative', zIndex: 2, padding: m ? '0 16px 60px' : '0 20px 80px' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: `${post.color}15`, color: post.color, border: `1px solid ${post.color}30` }}>{post.category}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>{post.date}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>· {post.readTime}</span>
          </div>
          <h1 style={{ fontSize: m ? '28px' : '42px', fontWeight: '800', color: 'white', lineHeight: '1.2', marginBottom: '30px' }}>{post.title}</h1>
          <p style={{ fontSize: m ? '15px' : '18px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '40px' }}>{post.excerpt}</p>
          {post.content.map((section, i) => (
            <div key={i} style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: m ? '20px' : '24px', fontWeight: '700', color: '#00d4ff', marginBottom: '15px' }}>{section.heading}</h2>
              <p style={{ fontSize: m ? '14px' : '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.9' }}>{section.text}</p>
            </div>
          ))}
          <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span onClick={() => setActivePost(null)} style={{ color: '#00d4ff', fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>← Kembali ke semua artikel</span>
          </div>
        </div>
        <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
        </footer>
      </div>
    );
  }

  return (
    <div>
      <Nav active="Blog" />

      <section style={{ position: 'relative', minHeight: m ? '40vh' : '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Technical_Service_Center.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.93), rgba(15,43,91,0.88))' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '120px 20px 60px' }}>
          <span className="animate-fadeInUp" style={{ color: '#00d4ff', fontSize: m ? '12px' : '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Blog & Wawasan</span>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '15px', letterSpacing: '-2px' }}>Intelijen Teknologi</h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '20px auto 0', lineHeight: '1.7' }}>Wawasan, tren, dan strategi untuk operasi pusat data dan layanan teknis di seluruh Asia-Pasifik.</p>
        </div>
      </section>

      <section style={{ padding: m ? '50px 16px 30px' : '80px 40px 40px', background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>Artikel Unggulan</span>
          <div onClick={() => { setActivePost(featured.id); window.scrollTo(0, 0); }} style={{
            marginTop: '20px', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.3fr 1fr',
            borderRadius: '20px', overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer',
          }}>
            <div style={{ height: m ? '200px' : '350px', overflow: 'hidden' }}>
              <img src={featured.img} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: m ? '25px 20px' : '45px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: `${featured.color}15`, color: featured.color, border: `1px solid ${featured.color}30` }}>{featured.category}</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>{featured.readTime}</span>
              </div>
              <h2 style={{ fontSize: m ? '22px' : '28px', fontWeight: '800', color: 'white', marginTop: '20px', lineHeight: '1.3' }}>{featured.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '14px' : '16px', lineHeight: '1.7', marginTop: '15px' }}>{featured.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>{featured.date}</span>
                <span style={{ color: '#00d4ff', fontWeight: '600', fontSize: '15px' }}>Baca Artikel →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: m ? '30px 16px 50px' : '40px 40px 80px', background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>Semua Artikel</span>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '25px', marginTop: '25px' }}>
            {posts.slice(1).map((post, i) => (
              <div key={i} onClick={() => { setActivePost(post.id); window.scrollTo(0, 0); }} style={{
                borderRadius: '16px', overflow: 'hidden',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
              }}>
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.6), transparent)' }}></div>
                </div>
                <div style={{ padding: m ? '20px' : '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '5px', fontSize: '11px', fontWeight: '600', background: `${post.color}15`, color: post.color }}>{post.category}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ color: 'white', fontSize: '17px', fontWeight: '700', lineHeight: '1.4', marginBottom: '10px' }}>{post.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: '1.6' }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>{post.date}</span>
                    <span style={{ color: '#00d4ff', fontWeight: '600', fontSize: '14px' }}>Baca Artikel →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: m ? '50px 16px' : '80px 40px', background: '#0e1f3d' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>📬</div>
          <h2 style={{ fontSize: m ? '26px' : '32px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Tetap Diperbarui</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '30px', lineHeight: '1.7' }}>Berlangganan newsletter kami untuk wawasan pusat data terbaru dan tren teknologi di seluruh Asia-Pasifik.</p>
          <div style={{ display: 'flex', gap: '12px', flexDirection: m ? 'column' : 'row' }}>
            <input type="email" placeholder="Masukkan alamat email Anda" style={{
              flex: 1, padding: '16px 18px', borderRadius: '12px', fontSize: '15px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'white', outline: 'none', fontFamily: "'Outfit', sans-serif",
            }} />
            <button style={{
              padding: '16px 30px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
              color: 'white', fontWeight: '700', cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '15px',
            }}>Berlangganan</button>
          </div>
        </div>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
      </footer>
    </div>
  );
}
