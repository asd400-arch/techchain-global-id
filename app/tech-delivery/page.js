'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';
import { marketingLocaleFromPath, withLocalePrefix } from '../../lib/localePath';
import { TCG_EXPRESS_PWA_URL_ID } from '../../lib/tcgAppUrls';

const UI = {
  id: {
    badge: 'BETA LIVE — Indonesia',
    heroTitle1: 'Peralatan Teknologi',
    heroTitle2: 'Dikirim Cepat.',
    heroSub: 'Platform pengiriman B2B pertama di Indonesia yang dirancang khusus untuk peralatan teknologi — server, perangkat jaringan, hardware IT.',
    bookBtn: '🚀 Mulai Sekarang',
    contactBtn: 'Hubungi Kami →',
    statVehicles: 'Jenis Kendaraan', statFee: 'Biaya PayNow', statAvail: 'Ketersediaan', statResponse: 'Waktu Respons',
    svcKicker: 'Layanan Kami', svcTitle: 'Tiga Pilar Logistik Teknologi',
    fleetKicker: 'Armada', fleetTitle: 'Kendaraan yang Tepat untuk Setiap Pekerjaan',
    fleetSub: 'Dicocokkan otomatis ke kendaraan optimal berdasarkan dimensi dan berat — dari komponen kecil hingga rak server penuh.',
    howKicker: 'Cara Kerja', howTitle: 'Empat Langkah Menuju Pengiriman',
    featKicker: 'Fitur Platform', featTitle: 'Dibangun untuk Logistik Teknologi',
    ctaKicker: 'Mulai', ctaTitle: 'Siap Mengirim?', ctaSub: 'Pilih jalur Anda — kirim peralatan, antar untuk kami, atau kelola armada Anda.',
    ctaClient: { icon: '📦', title: 'Saya Butuh Pengiriman', desc: 'Kirim peralatan teknologi Anda dengan aman. Hubungi kami untuk penawaran terbaik.', btn: '📧 Hubungi Kami' },
    ctaDriver: { icon: '🚛', title: 'Jadi Pengemudi', desc: 'Punya kendaraan? Bergabunglah dengan jaringan pengemudi kami dan hasilkan pendapatan sesuai jadwal Anda.', btn: '📧 Hubungi Kami' },
    ctaCorp: { icon: '🏢', title: 'Enterprise / Korporat', desc: 'Volume pengiriman besar? Dapatkan tarif khusus, prioritas dispatch, dan manajer akun dedikasi.', btn: '📧 Hubungi Sales' },
    mktBanner: 'Butuh gudang, vendor otomasi, atau layanan logistik?', mktBtn: '🏭 Buka Marketplace →',
    pwaKicker: 'Pasang Aplikasi', pwaTitle: 'Gunakan Seperti Aplikasi Native',
    pwaSub: 'Tidak perlu app store. Pasang langsung dari browser untuk notifikasi push dan pengalaman layar penuh.',
    finalTitle: 'Mulai Pengiriman Hari Ini', finalSub: 'Hubungi tim kami untuk mendiskusikan kebutuhan pengiriman Anda', finalBtn: 'Hubungi Kami →',
    regClientBtn: 'Daftar sebagai Klien',
    regDriverBtn: 'Daftar sebagai Pengemudi',
    footer: '© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.',
    vehicles: [
      { icon: '🏍️', name: 'Motor',        capacity: '≤ 20kg',     price: 'mulai Rp150.000' },
      { icon: '🚗', name: 'Mobil',         capacity: '≤ 50kg',     price: 'mulai Rp250.000' },
      { icon: '🚐', name: 'Van 1.7m',      capacity: '≤ 300kg',    price: 'mulai Rp450.000' },
      { icon: '🚐', name: 'Van 2.4m',      capacity: '≤ 600kg',    price: 'mulai Rp650.000' },
      { icon: '🚚', name: 'Truk 10ft',     capacity: '≤ 1,500kg',  price: 'mulai Rp900.000' },
      { icon: '🚚', name: 'Truk 14ft',     capacity: '≤ 3,000kg',  price: 'mulai Rp1.200.000' },
      { icon: '🚛', name: 'Trailer 20ft',  capacity: '≤ 4,000kg',  price: 'mulai Rp1.800.000' },
      { icon: '🚛', name: 'Truk 24ft',     capacity: '≤ 8,000kg',  price: 'mulai Rp2.200.000' },
      { icon: '🚛', name: 'Trailer 40ft',  capacity: '≤ 20,000kg', price: 'mulai Rp3.500.000' },
    ],
    steps: [
      { num: '01', title: 'Buat Pesanan', desc: 'Masukkan lokasi penjemputan & pengiriman, detail barang, dimensi, dan berat. Kendaraan dipilih otomatis. Pilih pengiriman segera, terjadwal, atau rutin.' },
      { num: '02', title: 'Pengemudi Menawar', desc: 'Mitra pengemudi terverifikasi mengajukan penawaran kompetitif. Tinjau rating, jenis kendaraan, dan harga. Terima penawaran terbaik untuk pengiriman Anda.' },
      { num: '03', title: 'Lacak Langsung', desc: 'Pelacakan GPS dari penjemputan hingga pengiriman. Pembaruan status secara real-time. Pesan dalam aplikasi antara pelanggan dan pengemudi.' },
      { num: '04', title: 'Terkirim & Ditandatangani', desc: 'Bukti foto + tanda tangan elektronik saat pengiriman. Invoice PDF dibuat otomatis. Pembayaran escrow dilepaskan ke pengemudi.' },
    ],
    features: [
      { icon: '📍', title: 'Pelacakan GPS Langsung', desc: 'Lokasi pengemudi real-time dari penjemputan hingga pengiriman dengan pembaruan status di setiap tahap.' },
      { icon: '🔒', title: 'Pembayaran Escrow', desc: 'Pembayaran ditahan dengan aman hingga pengiriman dikonfirmasi dengan tanda tangan elektronik. Terlindungi untuk kedua pihak.' },
      { icon: '💰', title: 'GoPay, OVO, DANA, Transfer Bank', desc: 'Isi saldo dompet Anda melalui GoPay, OVO, DANA, atau Transfer Bank tanpa biaya transaksi.' },
      { icon: '📄', title: 'Invoice PDF Otomatis', desc: 'Invoice profesional dibuat otomatis setelah pengiriman selesai. Unduh kapan saja dari dashboard Anda.' },
      { icon: '🤖', title: 'Chatbot Dukungan AI', desc: 'Bantuan instan dari asisten AI kami untuk pemesanan, pelacakan, dan pemecahan masalah — tersedia 24/7.' },
      { icon: '🌱', title: 'Poin Hijau', desc: 'Kumpulkan poin loyalitas di setiap pengiriman. Bonus untuk kendaraan EV dan pengiriman konsolidasi SaveMode.' },
    ],
    services: [
      { icon: '🚀', title: 'Pengiriman Ekspres', desc: 'Pengiriman B2B di hari yang sama dan terjadwal untuk peralatan IT. Motor hingga trailer 40ft. Penawaran real-time dari pengemudi terverifikasi.', tag: 'TERSEDIA SEKARANG', tagColor: '#00d4aa' },
      { icon: '🏭', title: 'Layanan Gudang', desc: 'Penyimpanan beriklim terkontrol untuk peralatan teknologi sensitif. Manajemen inventaris, pick-and-pack, dan cross-docking.', tag: 'HADIR 2026', tagColor: '#00d4ff' },
      { icon: '🌏', title: 'Freight Forwarding', desc: 'Pengiriman internasional peralatan teknologi. Freight laut, udara, dan multimodal dengan pengurusan bea cukai.', tag: 'HADIR 2026', tagColor: '#00d4ff' },
    ],
    androidSteps: (pwaUrl) => [
      `Buka ${pwaUrl} di Chrome`, 'Ketuk menu ⋮ (tiga titik, pojok kanan atas)',
      'Pilih "Tambah ke layar utama" atau "Instal aplikasi"', 'Ketuk "Instal" — ikon aplikasi muncul di layar utama',
      'Izinkan notifikasi untuk pembaruan pengiriman',
    ],
    iosSteps: (pwaUrl) => [
      `Buka ${pwaUrl} di Safari`, 'Ketuk tombol Bagikan (kotak dengan panah)',
      'Gulir ke bawah dan ketuk "Tambah ke Layar Utama"', 'Ketuk "Tambah" — ikon aplikasi muncul di layar utama',
      'Memerlukan iOS 16.4+ untuk notifikasi push',
    ],
  },
  en: {
    badge: 'BETA LIVE — Indonesia',
    heroTitle1: 'Technology Equipment',
    heroTitle2: 'Delivered Fast.',
    heroSub: "Indonesia's first B2B delivery platform built specifically for technology equipment — servers, networking gear, IT hardware.",
    bookBtn: '🚀 Get Started',
    contactBtn: 'Contact Us →',
    statVehicles: 'Vehicle Types', statFee: 'Transaction Fee', statAvail: 'Availability', statResponse: 'Response Time',
    svcKicker: 'Our Services', svcTitle: 'Three Pillars of Tech Logistics',
    fleetKicker: 'Fleet', fleetTitle: 'The Right Vehicle for Every Job',
    fleetSub: 'Automatically matched to the optimal vehicle based on dimensions and weight — from small components to full server racks.',
    howKicker: 'How It Works', howTitle: 'Four Steps to Delivery',
    featKicker: 'Platform Features', featTitle: 'Built for Tech Logistics',
    ctaKicker: 'Get Started', ctaTitle: 'Ready to Ship?', ctaSub: 'Choose your path — ship equipment, deliver for us, or manage your fleet.',
    ctaClient: { icon: '📦', title: 'I Need a Delivery', desc: 'Ship your tech equipment safely. Contact us for the best rates.', btn: '📧 Contact Us' },
    ctaDriver: { icon: '🚛', title: 'Become a Driver', desc: 'Have a vehicle? Join our driver network and earn on your schedule.', btn: '📧 Contact Us' },
    ctaCorp: { icon: '🏢', title: 'Enterprise / Corporate', desc: 'High-volume shipments? Get custom rates, priority dispatch, and a dedicated account manager.', btn: '📧 Contact Sales' },
    mktBanner: 'Need warehouse, automation vendors, or logistics services?', mktBtn: '🏭 Open Marketplace →',
    pwaKicker: 'Install App', pwaTitle: 'Use It Like a Native App',
    pwaSub: 'No app store needed. Install directly from your browser for push notifications and full-screen experience.',
    finalTitle: 'Start Shipping Today', finalSub: 'Contact our team to discuss your delivery needs', finalBtn: 'Contact Us →',
    regClientBtn: 'Register as Client',
    regDriverBtn: 'Register as Driver',
    footer: '© 2026 Tech Chain Global. All rights reserved.',
    vehicles: [
      { icon: '🏍️', name: 'Motorcycle',    capacity: '≤ 20 kg',     price: 'from Rp150,000' },
      { icon: '🚗', name: 'Car',            capacity: '≤ 50 kg',     price: 'from Rp250,000' },
      { icon: '🚐', name: 'Van 1.7 m',      capacity: '≤ 300 kg',    price: 'from Rp450,000' },
      { icon: '🚐', name: 'Van 2.4 m',      capacity: '≤ 600 kg',    price: 'from Rp650,000' },
      { icon: '🚚', name: 'Truck 10 ft',    capacity: '≤ 1,500 kg',  price: 'from Rp900,000' },
      { icon: '🚚', name: 'Truck 14 ft',    capacity: '≤ 3,000 kg',  price: 'from Rp1,200,000' },
      { icon: '🚛', name: 'Trailer 20 ft',  capacity: '≤ 4,000 kg',  price: 'from Rp1,800,000' },
      { icon: '🚛', name: 'Truck 24 ft',    capacity: '≤ 8,000 kg',  price: 'from Rp2,200,000' },
      { icon: '🚛', name: 'Trailer 40 ft',  capacity: '≤ 20,000 kg', price: 'from Rp3,500,000' },
    ],
    steps: [
      { num: '01', title: 'Create an Order', desc: 'Enter pickup & delivery locations, item details, dimensions, and weight. Vehicle is auto-matched. Choose immediate, scheduled, or recurring delivery.' },
      { num: '02', title: 'Drivers Bid', desc: 'Verified driver partners submit competitive bids. Review ratings, vehicle type, and price. Accept the best offer for your shipment.' },
      { num: '03', title: 'Track Live', desc: 'GPS tracking from pickup to delivery. Real-time status updates. In-app messaging between client and driver.' },
      { num: '04', title: 'Delivered & Signed', desc: 'Photo proof + e-signature on delivery. PDF invoice auto-generated. Escrow payment released to driver.' },
    ],
    features: [
      { icon: '📍', title: 'Live GPS Tracking', desc: 'Real-time driver location from pickup to delivery with status updates at every stage.' },
      { icon: '🔒', title: 'Escrow Payments', desc: 'Payment held securely until delivery is confirmed with e-signature. Protected for both parties.' },
      { icon: '💰', title: 'GoPay, OVO, DANA, Bank Transfer', desc: 'Top up your wallet via GoPay, OVO, DANA, or Bank Transfer with zero transaction fees.' },
      { icon: '📄', title: 'Auto PDF Invoices', desc: 'Professional invoices auto-generated after delivery. Download anytime from your dashboard.' },
      { icon: '🤖', title: 'AI Support Chatbot', desc: 'Instant help from our AI assistant for booking, tracking, and troubleshooting — available 24/7.' },
      { icon: '🌱', title: 'Green Points', desc: 'Earn loyalty points on every delivery. Bonus for EV vehicles and SaveMode consolidated shipments.' },
    ],
    services: [
      { icon: '🚀', title: 'Express Delivery', desc: 'Same-day and scheduled B2B delivery for IT equipment. Motorcycle to 40 ft trailer. Real-time bids from verified drivers.', tag: 'AVAILABLE NOW', tagColor: '#00d4aa' },
      { icon: '🏭', title: 'Warehouse Services', desc: 'Climate-controlled storage for sensitive tech equipment. Inventory management, pick-and-pack, and cross-docking.', tag: 'COMING 2026', tagColor: '#00d4ff' },
      { icon: '🌏', title: 'Freight Forwarding', desc: 'International shipment of technology equipment. Sea, air, and multimodal freight with customs clearance.', tag: 'COMING 2026', tagColor: '#00d4ff' },
    ],
    androidSteps: (pwaUrl) => [
      `Open ${pwaUrl} in Chrome`, 'Tap menu ⋮ (three dots, top-right)',
      'Select "Add to Home screen" or "Install app"', 'Tap "Install" — app icon appears on home screen',
      'Allow notifications for delivery updates',
    ],
    iosSteps: (pwaUrl) => [
      `Open ${pwaUrl} in Safari`, 'Tap the Share button (box with arrow)',
      'Scroll down and tap "Add to Home Screen"', 'Tap "Add" — app icon appears on home screen',
      'Requires iOS 16.4+ for push notifications',
    ],
  },
};

export default function TechDelivery() {
  const pathname = usePathname();
  const locale = marketingLocaleFromPath(pathname);
  const t = UI[locale];
  const [scrollY, setScrollY] = useState(0);
  const m = useMobile();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pad = m ? '50px 16px' : '80px 40px';
  const pwaUrl = TCG_EXPRESS_PWA_URL_ID.replace('https://', '');
  const vehicles = t.vehicles;
  const steps = t.steps;
  const features = t.features;
  const services = t.services;
  const androidSteps = t.androidSteps(pwaUrl);
  const iosSteps = t.iosSteps(pwaUrl);

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
            <span style={{ color: '#00d4aa', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>{t.badge}</span>
          </div>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '10px', letterSpacing: '-2px', lineHeight: '1.1' }}>
            {t.heroTitle1}<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4aa, #00ffd1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.heroTitle2}</span>
          </h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '20px auto 0', lineHeight: '1.7' }}>
            {t.heroSub}
          </p>
          <div className="animate-fadeInUp delay-3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '35px', flexWrap: 'wrap' }}>
            <a href={withLocalePrefix('/contact', locale)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 32px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #00d4aa, #00b894)', color: '#0a1628',
              textDecoration: 'none', fontWeight: '700', fontSize: '16px',
              boxShadow: '0 4px 20px rgba(0,212,170,0.35)',
            }}>{t.bookBtn}</a>
            <a href={withLocalePrefix('/contact', locale)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 32px', borderRadius: '12px',
              background: 'transparent', color: 'white',
              textDecoration: 'none', fontWeight: '700', fontSize: '16px',
              border: '2px solid rgba(255,255,255,0.2)',
            }}>{t.contactBtn}</a>
          </div>
        </div>
      </section>

      <section style={{
        display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#0e1a2e',
      }}>
        {[
          { num: '9', label: t.statVehicles },
          { num: '0%', label: t.statFee },
          { num: '24/7', label: t.statAvail },
          { num: '<1s', label: t.statResponse },
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
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.svcKicker}</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>{t.svcTitle}</h2>
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
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.fleetKicker}</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: '8px' }}>{t.fleetTitle}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '14px' : '17px', marginBottom: m ? '30px' : '45px', maxWidth: '600px', lineHeight: '1.7' }}>{t.fleetSub}</p>
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
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.howKicker}</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>{t.howTitle}</h2>
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
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.featKicker}</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: m ? '30px' : '50px' }}>{t.featTitle}</h2>
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
          <span style={{ color: '#00d4aa', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.ctaKicker}</span>
          <h2 style={{ fontSize: m ? '28px' : '42px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: '15px' }}>{t.ctaTitle}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '15px' : '18px', maxWidth: '500px', margin: '0 auto 50px' }}>{t.ctaSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}>
            {[
              { ...t.ctaClient, btnBg: 'linear-gradient(135deg, #00d4aa, #00b894)', btnColor: '#0a1628', link: withLocalePrefix('/contact', locale) },
              { ...t.ctaDriver, btnBg: 'linear-gradient(135deg, #ff6b35, #e85d2c)', btnColor: 'white', link: withLocalePrefix('/contact', locale) },
              { ...t.ctaCorp, btnBg: 'transparent', btnColor: 'white', link: withLocalePrefix('/contact', locale), border: true },
            ].map((cta, i) => (
              <div key={i} style={{ padding: m ? '28px' : '36px', borderRadius: '18px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{cta.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{cta.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', marginBottom: '24px' }}>{cta.desc}</p>
                <a href={cta.link} style={{
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
              {t.mktBanner}
            </p>
            <a href={withLocalePrefix('/marketplace', locale)} style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: '#e8b84b',
              color: '#06080e',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
            }}>
              {t.mktBtn}
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>{t.pwaKicker}</span>
          <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginTop: '12px', marginBottom: '8px' }}>{t.pwaTitle}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '14px' : '17px', marginBottom: m ? '30px' : '45px', maxWidth: '600px', lineHeight: '1.7' }}>{t.pwaSub}</p>
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
        <h2 style={{ fontSize: m ? '28px' : '38px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>{t.finalTitle}</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: m ? '15px' : '18px', marginBottom: '35px' }}>{t.finalSub}</p>
        <a href={withLocalePrefix('/contact', locale)} style={{
          display: 'inline-block', padding: '16px 40px', borderRadius: '10px',
          background: 'white', color: '#0f2b5b', textDecoration: 'none',
          fontWeight: '700', fontSize: '17px',
        }}>{t.finalBtn}</a>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          <a
            href="https://app.techchainglobal.id/signup?role=client"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '14px 32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #00d4aa, #00b894)',
              color: '#0a1628', textDecoration: 'none', fontWeight: '700', fontSize: '15px',
              boxShadow: '0 4px 16px rgba(0,212,170,0.3)',
            }}
          >
            {t.regClientBtn}
          </a>
          <a
            href="https://app.techchainglobal.id/signup?role=driver"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '14px 32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6b35, #e85d2c)',
              color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '15px',
              boxShadow: '0 4px 16px rgba(255,107,53,0.3)',
            }}
          >
            {t.regDriverBtn}
          </a>
        </div>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>{t.footer}</span>
      </footer>
    </div>
  );
}
