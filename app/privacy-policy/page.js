'use client';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';

const sections = [
  {
    title: '1. Informasi yang Kami Kumpulkan',
    content: [
      'Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, seperti ketika Anda mengisi formulir kontak, meminta penawaran, atau berkomunikasi dengan kami. Ini mungkin mencakup:',
      '• Nama, alamat email, nomor telepon, dan nama perusahaan',
      '• Jabatan dan informasi profesional',
      '• Pesan dan pertanyaan yang Anda kirimkan kepada kami',
      '• Informasi yang diberikan selama diskusi atau keterlibatan bisnis',
      'Kami juga mengumpulkan informasi tertentu secara otomatis saat Anda mengunjungi situs web kami, termasuk alamat IP, jenis browser, halaman yang dikunjungi, dan URL perujuk melalui log server standar dan alat analitik.',
    ]
  },
  {
    title: '2. Cara Kami Menggunakan Informasi Anda',
    content: [
      'Kami menggunakan informasi yang kami kumpulkan untuk:',
      '• Merespons pertanyaan Anda dan menyediakan layanan yang Anda minta',
      '• Mengirimkan informasi tentang layanan, pembaruan, dan materi promosi kami (dengan persetujuan Anda jika diperlukan)',
      '• Meningkatkan situs web dan layanan kami',
      '• Mematuhi kewajiban hukum dan menegakkan perjanjian kami',
      '• Menjalankan operasi bisnis dan memelihara catatan bisnis',
    ]
  },
  {
    title: '3. Berbagi Informasi',
    content: [
      'Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi Anda dengan:',
      '• Penyedia layanan yang membantu kami mengoperasikan situs web dan menjalankan bisnis kami, tunduk pada perjanjian kerahasiaan',
      '• Mitra bisnis dengan persetujuan eksplisit Anda',
      '• Otoritas hukum jika diwajibkan oleh hukum atau untuk melindungi hak kami',
      '• Entitas afiliasi dalam grup perusahaan Tech Chain Global untuk keperluan bisnis internal',
    ]
  },
  {
    title: '4. Retensi Data',
    content: [
      'Kami menyimpan informasi pribadi selama diperlukan untuk memenuhi tujuan pengumpulannya, termasuk untuk memenuhi persyaratan hukum, akuntansi, atau pelaporan apa pun.',
      'Dalam menentukan periode retensi yang tepat, kami mempertimbangkan jumlah, sifat, dan sensitivitas data, potensi risiko kerugian dari penggunaan atau pengungkapan yang tidak sah, dan persyaratan hukum yang berlaku.',
    ]
  },
  {
    title: '5. Keamanan Data',
    content: [
      'Kami menerapkan langkah-langkah teknis dan organisasional yang tepat untuk melindungi informasi pribadi Anda dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah. Langkah-langkah ini meliputi:',
      '• Enkripsi secure socket layer (SSL) untuk transmisi data',
      '• Kontrol akses yang membatasi akses data hanya kepada personel yang berwenang',
      '• Penilaian dan pembaruan keamanan secara berkala',
      'Namun, tidak ada metode transmisi melalui Internet atau penyimpanan elektronik yang 100% aman, dan kami tidak dapat menjamin keamanan absolut.',
    ]
  },
  {
    title: '6. Transfer Data Internasional',
    content: [
      'Sebagai perusahaan yang beroperasi di 9 negara di kawasan Asia-Pasifik, informasi Anda mungkin ditransfer ke dan diproses di negara selain negara tempat tinggal Anda, termasuk Singapura, Korea Selatan, Jepang, Tiongkok, Taiwan, Malaysia, Vietnam, India, dan Australia.',
      'Kami memastikan bahwa transfer tersebut dilakukan sesuai dengan undang-undang perlindungan data yang berlaku dan bahwa perlindungan yang memadai tersedia untuk melindungi informasi Anda.',
    ]
  },
  {
    title: '7. Hak Anda',
    content: [
      'Bergantung pada lokasi Anda, Anda mungkin memiliki hak-hak tertentu terkait informasi pribadi Anda, termasuk:',
      '• Hak untuk mengakses informasi pribadi Anda',
      '• Hak untuk memperbaiki informasi yang tidak akurat atau tidak lengkap',
      '• Hak untuk meminta penghapusan informasi Anda',
      '• Hak untuk keberatan atau membatasi pemrosesan informasi Anda',
      '• Hak atas portabilitas data',
      'Untuk menggunakan hak-hak ini, silakan hubungi kami di privacy@techchainglobal.com.',
    ]
  },
  {
    title: '8. Cookie',
    content: [
      'Situs web kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman penelusuran Anda dan menganalisis lalu lintas situs web. Anda dapat mengontrol pengaturan cookie melalui preferensi browser Anda.',
      'Kami menggunakan jenis cookie berikut:',
      '• Cookie esensial yang diperlukan agar situs web berfungsi',
      '• Cookie analitik untuk memahami cara pengunjung menggunakan situs kami',
      '• Cookie preferensi untuk mengingat pengaturan Anda',
    ]
  },
  {
    title: '9. Tautan Pihak Ketiga',
    content: [
      'Situs web kami mungkin berisi tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi situs web tersebut dan mendorong Anda untuk meninjau kebijakan privasi mereka sebelum memberikan informasi pribadi apa pun.',
    ]
  },
  {
    title: '10. Perubahan Kebijakan Ini',
    content: [
      'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan signifikan dengan memposting kebijakan baru di halaman ini dengan tanggal efektif yang diperbarui. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.',
    ]
  },
  {
    title: '11. Hubungi Kami',
    content: [
      'Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait Kebijakan Privasi ini atau praktik data kami, silakan hubungi kami:',
      'Tech Chain Global Pte. Ltd.',
      'Kantor terdaftar: 176 Orchard Road, The Centrepoint, #05-05A, Singapore 238843',
      'Kantor Indonesia: Komplek Nagoya Point Blok D No.02, Lubuk Baja, Batam 29444',
      'Email: privacy@techchainglobal.com',
      'Telepon: +62 778 123 4567',
    ]
  },
];

export default function PrivacyPolicy() {
  const m = useMobile();
  const pad = m ? '50px 16px' : '100px 40px';

  return (
    <div>
      <Nav />

      <section style={{ position: 'relative', minHeight: m ? '35vh' : '40vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.98), rgba(15,43,91,0.95))' }}></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(26,86,219,0.06) 0%, transparent 60%)' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '130px 20px 70px' }}>
          <span style={{ color: '#00d4ff', fontSize: m ? '12px' : '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Legal</span>
          <h1 style={{ fontSize: m ? '32px' : '52px', fontWeight: '800', color: 'white', marginTop: '15px', letterSpacing: '-1px' }}>Kebijakan Privasi</h1>
          <p style={{ fontSize: m ? '14px' : '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '550px', margin: '16px auto 0', lineHeight: '1.7' }}>
            Terakhir diperbarui: Maret 2026
          </p>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            padding: m ? '24px 20px' : '36px 40px', borderRadius: '16px',
            background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)',
            marginBottom: '48px',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: m ? '15px' : '16px', lineHeight: '1.8', margin: 0 }}>
              Tech Chain Global Pte. Ltd. (&quot;Tech Chain Global&quot;, &quot;kami&quot;, atau &quot;kita&quot;) berkomitmen untuk melindungi privasi dan keamanan informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda saat Anda mengunjungi situs web kami atau terlibat dengan layanan kami di seluruh operasi kami di kawasan Asia-Pasifik.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {sections.map((section, i) => (
              <div key={i} style={{
                padding: m ? '24px 20px' : '36px 40px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <h2 style={{ fontSize: m ? '18px' : '20px', fontWeight: '700', color: 'white', marginTop: 0, marginBottom: '20px' }}>
                  {section.title}
                </h2>
                <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #00d4ff, #1a56db)', borderRadius: '2px', marginBottom: '20px' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {section.content.map((line, j) => (
                    <p key={j} style={{
                      color: line.startsWith('•') ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.7)',
                      fontSize: m ? '14px' : '15px', lineHeight: '1.8', margin: 0,
                      paddingLeft: line.startsWith('•') ? '8px' : 0,
                    }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: m ? '40px 16px' : '60px 40px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>© 2026 Tech Chain Global Pte. Ltd. Seluruh hak cipta dilindungi.</p>
      </section>
    </div>
  );
}
