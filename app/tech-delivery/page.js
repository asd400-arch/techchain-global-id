'use client';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';
import {
  TCG_APP_SIGNUP_CLIENT_URL,
  TCG_APP_SIGNUP_URL,
  TCG_APP_CLIENT_JOBS_NEW_URL,
  TCG_APP_CORP_PREMIUM_URL,
  TCG_EXPRESS_PWA_URL_ID,
} from '../../lib/tcgAppUrls';

/** Masuk — fixed Indonesia login URL (no query string). */
const TCG_MASUK_HREF = 'https://app.techchainglobal.com/id/login';

export default function TechDelivery() {
  const [scrollY, setScrollY] = useState(0);
  const m = useMobile();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pad = m ? '50px 16px' : '80px 40px';

  const vehicles = [
    { icon: '🏍️', name: 'Motor',        capacity: '≤ 20kg',     price: 'mulai Rp150.000' },
    { icon: '🚗', name: 'Mobil',         capacity: '≤ 50kg',     price: 'mulai Rp250.000' },
    { icon: '🚐', name: 'Van 1.7m',      capacity: '≤ 300kg',    price: 'mulai Rp450.000' },
    { icon: '🚐', name: 'Van 2.4m',      capacity: '≤ 600kg',    price: 'mulai Rp650.000' },
    { icon: '🚚', name: 'Truk 10ft',     capacity: '≤ 1.500kg',  price: 'mulai Rp900.000' },
    { icon: '🚚', name: 'Truk 14ft',     capacity: '≤ 3.000kg',  price: 'mulai Rp1.200.000' },
    { icon: '🚛', name: 'Trailer 20ft',  capacity: '≤ 4.000kg',  price: 'mulai Rp1.800.000' },
    { icon: '🚛', name: 'Truk 24ft',     capacity: '≤ 8.000kg',  price: 'mulai Rp2.200.000' },
    { icon: '🚛', name: 'Trailer 40ft',  capacity: '≤ 20.000kg', price: 'mulai Rp3.500.000' },
  ];

  const steps = [
    { num: '01', title: 'Buat Pesanan', desc: 'Masukkan lokasi penjemputan & pengiriman, detail barang, dimensi, dan berat. Kendaraan dipilih otomatis. Pilih pengiriman segera, terjadwal, atau rutin.' },
    { num: '02', title: 'Pengemudi Menawar', desc: 'Mitra pengemudi terverifikasi mengajukan penawaran kompetitif. Tinjau rating, jenis kendaraan, dan harga. Terima penawaran terbaik untuk pengiriman Anda.' },
    { num: '03', title: 'Lacak Langsung', desc: 'Pelacakan GPS dari penjemputan hingga pengiriman. Pembaruan status secara real-time. Pesan dalam aplikasi antara pelanggan dan pengemudi.' },
    { num: '04', title: 'Terkirim & Ditandatangani', desc: 'Bukti foto + tanda tangan elektronik saat pengiriman. Invoice PDF dibuat otomatis. Pembayaran escrow dilepaskan ke pengemudi.' },
  ];

  const features = [
    { icon: '📍', title: 'Pelacakan GPS Langsung', desc: 'Lokasi pengemudi real-time dari penjemputan hingga pengiriman dengan pembaruan status di setiap tahap.' },
    { icon: '🔒', title: 'Pembayaran Escrow', desc: 'Pembayaran ditahan dengan aman hingga pengiriman dikonfirmasi dengan tanda tangan elektronik. Terlindungi untuk kedua pihak.' },
    { icon: '💰', title: 'GoPay, OVO, DANA, Transfer Bank', desc: 'Isi saldo dompet Anda melalui GoPay, OVO, DANA, atau Transfer Bank tanpa biaya transaksi.' },
    { icon: '📄', title: 'Invoice PDF Otomatis', desc: 'Invoice profesional dibuat otomatis setelah pengiriman selesai. Unduh kapan saja dari dashboard Anda.' },
    { icon: '🤖', title: 'Chatbot Dukungan AI', desc: 'Bantuan instan dari asisten AI kami untuk pemesanan, pelacakan, dan pemecahan masalah — tersedia 24/7.' },
    { icon: '🌱', title: 'Poin Hijau', desc: 'Kumpulkan poin loyalitas di setiap pengiriman. Bonus untuk kendaraan EV dan pengiriman konsolidasi SaveMode.' },
  ];

  const services = [
    { icon: '🚀', title: 'Pengiriman Ekspres', desc: 'Pengiriman B2B di hari yang sama dan terjadwal untuk peralatan IT. Motor hingga trailer 40ft. Penawaran real-time dari pengemudi terverifikasi.', tag: 'TERSEDIA SEKARANG', tagColor: '#00d4aa' },
    { icon: '🏭', title: 'Layanan Gudang', desc: 'Penyimpanan beriklim terkontrol untuk peralatan teknologi sensitif. Manajemen inventaris, pick-and-pack, dan cross-docking.', tag: 'HADIR 2026', tagColor: '#00d4ff' },
    { icon: '🌏', title: 'Freight Forwarding', desc: 'Pengiriman internasional peralatan teknologi. Freight laut, udara, dan multimodal dengan pengurusan bea cukai.', tag: 'HADIR 2026', tagColor: '#00d4ff' },
  ];

  const androidSteps = [
    `Buka ${TCG_EXPRESS_PWA_URL_ID.replace('https://', '')} di Chrome`,
    'Ketuk menu ⋮ (tiga titik, pojok kanan atas)',
    'Pilih "Tambah ke layar utama" atau "Instal aplikasi"',
    'Ketuk "Instal" — ikon aplikasi muncul di layar utama',
    'Izinkan notifikasi untuk pembaruan pengiriman',
  ];

  const iosSteps = [
    `Buka ${TCG_EXPRESS_PWA_URL_ID.replace('https://', '')} di Safari`,
    'Ketuk tombol Bagikan (kotak dengan panah)',
    'Gulir ke bawah dan ketuk "Tambah ke Layar Utama"',
    'Ketuk "Tambah" — ikon aplikasi muncul di layar utama',
    'Memerlukan iOS 16.4+ untuk notifikasi push',
  ];

  return (
    <div>
      <Nav active="Services" />

      <section style={{ position: 'relative', minHeight: m ? '55vh' : '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Express_delivery.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.95), rgba(15,43,91,0.90))' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,212,170,0.08) 0%, transparent 70%)' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '130px 20px 70px' }}>
          <div className="animate-fadeInUp" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.25)',
            borderRadius: '100px', padding: '8px 20px', marginBottom: '20px',
          }}>
            <span style={{ width: '8px', height: '8px', background: '#00d4aa', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
            <span style={{ color: '#00d4aa', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>BETA LIVE — Indonesia</span>
          </div>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '10px', letterSpacing: '-2px', lineHeight: '1.1' }}>
            Peralatan Teknologi<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4aa, #00ffd1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dikirim Cepat.</span>
          </h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '20px auto 0', lineHeight: '1.7' }}>
            Platform pengiriman B2B pertama di Indonesia yang dirancang khusus untuk peralatan teknologi — server, perangkat jaringan, hardware IT.
          </p>
          <div className="animate-fadeInUp delay-3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '35px', flexWrap: 'wrap' }}>
            <a href={TCG_APP_SIGNUP_CLIENT_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 32px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #00d4aa, #00b894)', color: '#0a1628',
              textDecoration: 'none', fontWeight: '700', fontSize: '16px',
              boxShadow: '0 4px 20px rgba(0,212,170,0.35)',
            }}>🚀 Pesan Pengiriman</a>
            <a href={TCG_MASUK_HREF} target="_blank" rel="noopener noreferrer" title="app.techchainglobal.com/id/login — Indonesia (+62)" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 32px', borderRadius: '12px',
              background: 'transparent', color: 'white',
              textDecoration: 'none', fontWeight: '700', fontSize: '16px',
              border: '2px solid rgba(255,255,255,0.2)',
            }}>Masuk (Indonesia) →</a>
          </div>
        </div>
      </section>

      <section style={{
        display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#0e1a2e',
      }}>
        {[
          { num: '9', label: 'Jenis Kendaraan' },
          { num: '0%', label: 'Biaya PayNow' },
          { num: '24/7', label: 'Ketersediaan' },
          { num: '<1s', label: 'Waktu Respons' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: m ? '25px 16px' : '35px 32px', textAlign: 'center',
            borderRight: (m ? (i % 2 === 0) : (i < 3)) ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <div style={{ fontSize: m ? '28px' : '36px', fontWeight: '800', color: '#00d4aa' }}>{stat.num}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Layanan Kami</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>Tiga Pilar Logistik Teknologi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {services.map((svc, i) => (
              <div key={i} style={{ padding: m ? '28px' : '36px', borderRadius: '18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{svc.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '10px' }}>{svc.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>{svc.desc}</p>
                <span style={{
                  display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
                  fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px',
                  background: `${svc.tagColor}15`, color: svc.tagColor, border: `1px solid ${svc.tagColor}30`,
                }}>{svc.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0e1a2e' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Armada</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: '8px' }}>Kendaraan yang Tepat untuk Setiap Pekerjaan</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '14px' : '17px', marginBottom: m ? '30px' : '45px', maxWidth: '600px', lineHeight: '1.7' }}>Dicocokkan otomatis ke kendaraan optimal berdasarkan dimensi dan berat — dari komponen kecil hingga rak server penuh.</p>
          <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '16px' }}>
            {vehicles.map((v, i) => (
              <div key={i} style={{ padding: '20px', borderRadius: '14px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{v.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{v.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{v.capacity}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#00d4aa', marginTop: '8px' }}>{v.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Cara Kerja</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>Empat Langkah Menuju Pengiriman</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4, 1fr)', gap: '24px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ padding: '28px 24px' }}>
                <div style={{ fontSize: '48px', fontWeight: '800', color: 'rgba(255,255,255,0.06)', lineHeight: '1', marginBottom: '16px' }}>{step.num}</div>
                <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{step.title}</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.45)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0e1a2e' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Fitur Platform</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>Dibangun untuk Logistik Teknologi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
            {features.map((feat, i) => (
              <div key={i} style={{ padding: '28px', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{feat.icon}</div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{feat.title}</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.45)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: 'linear-gradient(135deg, #0a1628 0%, #0e2d5e 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: '#00d4aa', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Mulai</span>
          <h2 style={{ fontSize: m ? '28px' : '42px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: '15px' }}>Siap Mengirim?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '15px' : '18px', maxWidth: '500px', margin: '0 auto 50px' }}>Pilih jalur Anda — kirim peralatan, antar untuk kami, atau kelola armada Anda.</p>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}>
            {[
              { icon: '📦', title: 'Saya Butuh Pengiriman', desc: 'Pesan pengiriman untuk peralatan teknologi Anda. Dapatkan penawaran kompetitif dari pengemudi terverifikasi.', btn: '🚀 Pesan Sekarang', btnBg: 'linear-gradient(135deg, #00d4aa, #00b894)', btnColor: '#0a1628', link: TCG_APP_SIGNUP_CLIENT_URL },
              { icon: '🚛', title: 'Jadi Pengemudi', desc: 'Punya kendaraan? Bergabunglah dengan jaringan pengemudi kami dan hasilkan pendapatan sesuai jadwal Anda.', btn: '👤 Daftar Sekarang', btnBg: 'linear-gradient(135deg, #ff6b35, #e85d2c)', btnColor: 'white', link: TCG_APP_SIGNUP_URL },
              { icon: '🏢', title: 'Enterprise / Korporat', desc: 'Volume pengiriman besar? Dapatkan tarif khusus, prioritas dispatch, dan manajer akun dedikasi.', btn: 'Hubungi Sales', btnBg: 'transparent', btnColor: 'white', link: TCG_APP_CORP_PREMIUM_URL, border: true },
            ].map((cta, i) => (
              <div key={i} style={{ padding: m ? '28px' : '36px', borderRadius: '18px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{cta.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{cta.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', marginBottom: '24px' }}>{cta.desc}</p>
                <a href={cta.link} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block', padding: '14px 28px', borderRadius: '10px',
                  background: cta.btnBg, color: cta.btnColor,
                  textDecoration: 'none', fontWeight: '700', fontSize: '15px',
                  border: cta.border ? '2px solid rgba(255,255,255,0.2)' : 'none',
                  width: '100%', textAlign: 'center', boxSizing: 'border-box', marginTop: 'auto',
                }}>{cta.btn}</a>
              </div>
            ))}
          </div>

          {/* Marketplace banner */}
          <div style={{
            marginTop: '32px',
            padding: '20px 24px',
            background: 'rgba(232,184,75,0.08)',
            border: '1px solid rgba(232,184,75,0.2)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', margin: '0 0 12px' }}>
              Butuh gudang, vendor otomasi, atau layanan logistik?
            </p>
            <a href="/marketplace" style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: '#e8b84b',
              color: '#06080e',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
            }}>
              🏭 Buka Marketplace →
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Pasang Aplikasi</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: '8px' }}>Gunakan Seperti Aplikasi Native</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '14px' : '17px', marginBottom: m ? '30px' : '45px', maxWidth: '600px', lineHeight: '1.7' }}>Tidak perlu app store. Pasang langsung dari browser untuk notifikasi push dan pengalaman layar penuh.</p>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '24px' }}>
            {[
              { emoji: '🤖', title: 'Android', badge: 'Chrome', badgeColor: '#00d4aa', badgeBg: 'rgba(0,212,170,0.1)', steps: androidSteps },
              { emoji: '🍎', title: 'iPhone / iPad', badge: 'Safari', badgeColor: '#0094ff', badgeBg: 'rgba(0,148,255,0.1)', steps: iosSteps },
            ].map((platform, pi) => (
              <div key={pi} style={{ padding: m ? '24px' : '32px', borderRadius: '18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '24px' }}>{platform.emoji}</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>{platform.title}</h3>
                  <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: platform.badgeBg, color: platform.badgeColor }}>{platform.badge}</span>
                </div>
                {platform.steps.map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span style={{ width: '26px', height: '26px', minWidth: '26px', borderRadius: '8px', background: platform.badgeBg, color: platform.badgeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>{i + 1}</span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5' }}>{text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: 'linear-gradient(135deg, #0f2b5b, #1a56db)', textAlign: 'center' }}>
        <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Mulai Pengiriman Hari Ini</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: m ? '15px' : '18px', marginBottom: '35px' }}>Buat akun gratis dan pesan pengiriman pertama Anda dalam hitungan menit</p>
        <a href={TCG_APP_CLIENT_JOBS_NEW_URL} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', padding: '16px 40px', borderRadius: '10px',
          background: 'white', color: '#0f2b5b', textDecoration: 'none',
          fontWeight: '700', fontSize: '17px',
        }}>Luncurkan TCG Express →</a>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
      </footer>
    </div>
  );
}
