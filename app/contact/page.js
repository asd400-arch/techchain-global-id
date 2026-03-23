'use client';
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState('');
  const m = useMobile();

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

  const inputStyle = {
    padding: '16px 18px', borderRadius: '12px', fontSize: '15px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'white', outline: 'none', width: '100%', boxSizing: 'border-box',
    fontFamily: "'Outfit', sans-serif",
  };

  return (
    <div>
      <Nav active="" />

      <section style={{ position: 'relative', minHeight: m ? '40vh' : '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,22,40,0.93), rgba(15,43,91,0.88))' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: m ? '100px 16px 50px' : '120px 20px 60px' }}>
          <span className="animate-fadeInUp" style={{ color: '#00d4ff', fontSize: m ? '12px' : '14px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' }}>Hubungi Kami</span>
          <h1 className="animate-fadeInUp delay-1" style={{ fontSize: m ? '32px' : '56px', fontWeight: '800', color: 'white', marginTop: '15px', letterSpacing: '-2px' }}>Mari Bicara Teknologi</h1>
          <p className="animate-fadeInUp delay-2" style={{ fontSize: m ? '15px' : '19px', color: 'rgba(255,255,255,0.6)', maxWidth: '550px', margin: '20px auto 0', lineHeight: '1.7' }}>Dapatkan konsultasi gratis dan penawaran khusus untuk kebutuhan layanan teknis Anda.</p>
        </div>
      </section>

      <section style={{ padding: m ? '50px 16px' : '80px 40px', background: '#0a1628' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1.2fr', gap: m ? '40px' : '60px' }}>
          <div>
            <h2 style={{ fontSize: m ? '26px' : '32px', fontWeight: '800', color: 'white', marginBottom: '20px' }}>Hubungi Kami</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: m ? '14px' : '16px', lineHeight: '1.8', marginBottom: '40px' }}>
              Apakah Anda membutuhkan penawaran, memiliki pertanyaan tentang layanan kami, atau ingin mendiskusikan solusi teknologi khusus — tim kami siap membantu.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {[
                { icon: '📍', title: 'Kantor', text: '21 Tan Quee Lan Street, #02-04\nHeritage Place, Singapore 188108' },
                { icon: '📧', title: 'Email', text: 'admin@techchainglobal.com', href: 'mailto:admin@techchainglobal.com' },
                { icon: '📞', title: 'Telepon', text: '+65 8976 3771', href: 'tel:+6589763771' },
                { icon: null, title: 'WhatsApp', text: 'Chat dengan kami', href: 'https://wa.me/6589763771', isWhatsApp: true },
                { icon: '🕐', title: 'Jam Operasional', text: 'Senin – Jumat: 9:00 AM – 6:00 PM (SGT)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0,
                    background: item.isWhatsApp ? 'rgba(37,211,102,0.1)' : 'rgba(0,212,255,0.08)',
                    border: `1px solid ${item.isWhatsApp ? 'rgba(37,211,102,0.2)' : 'rgba(0,212,255,0.15)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                  }}>
                    {item.isWhatsApp ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    ) : item.icon}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>{item.title}</div>
                    {item.href ? (
                      <a href={item.href} target={item.isWhatsApp ? '_blank' : undefined} rel={item.isWhatsApp ? 'noopener noreferrer' : undefined} style={{ color: item.isWhatsApp ? '#25D366' : 'rgba(255,255,255,0.45)', fontSize: '15px', textDecoration: 'none', whiteSpace: 'pre-line', lineHeight: '1.5' }}>{item.text}</a>
                    ) : (
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', whiteSpace: 'pre-line', lineHeight: '1.5' }}>{item.text}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!m && (
              <div style={{ marginTop: '40px', height: '200px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7934!2d103.8561!3d1.2993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a7a8e4b5f7%3A0x0!2s21+Tan+Quee+Lan+St%2C+Singapore+188108!5e0!3m2!1sen!2ssg!4v1"
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen="" loading="lazy"
                ></iframe>
              </div>
            )}
          </div>

          <div style={{
            padding: m ? '30px 20px' : '45px', borderRadius: '24px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h3 style={{ fontSize: m ? '22px' : '24px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>Kirim Pesan</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', marginBottom: '30px' }}>Kami biasanya merespons dalam 24 jam.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '18px' }}>
                <input type="text" placeholder="Nama Anda" value={formData.name} required
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#00d4ff'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <input type="email" placeholder="Alamat Email" value={formData.email} required
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#00d4ff'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <input type="text" placeholder="Nama Perusahaan" value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#00d4ff'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}>
                <option value="" style={{ background: '#0a1628' }}>Pilih Layanan yang Dibutuhkan</option>
                <option value="datacenter" style={{ background: '#0a1628' }}>Operasi Pusat Data</option>
                <option value="semiconductor" style={{ background: '#0a1628' }}>Dukungan Semikonduktor</option>
                <option value="delivery" style={{ background: '#0a1628' }}>Pengiriman Teknologi</option>
                <option value="warehouse" style={{ background: '#0a1628' }}>Operasi Gudang</option>
                <option value="endoflife" style={{ background: '#0a1628' }}>Manajemen Akhir Produk</option>
                <option value="other" style={{ background: '#0a1628' }}>Lainnya</option>
              </select>
              <textarea placeholder="Ceritakan tentang kebutuhan layanan teknis Anda..." value={formData.message} required rows={5}
                onChange={e => setFormData({...formData, message: e.target.value})}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = '#00d4ff'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button type="submit" style={{
                padding: '18px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
                color: 'white', fontWeight: '700', fontSize: '17px',
                cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 8px 30px rgba(0,212,255,0.2)',
              }}>
                {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan →'}
              </button>
              {status === 'success' && <p style={{ color: '#00d4ff', textAlign: 'center', fontWeight: '500', fontSize: '15px' }}>✅ Pesan terkirim! Kami akan menghubungi Anda dalam 24 jam.</p>}
              {status === 'error' && <p style={{ color: '#ff6b35', textAlign: 'center', fontWeight: '500', fontSize: '15px' }}>❌ Terjadi kesalahan. Silakan coba lagi.</p>}
            </form>
          </div>
        </div>
      </section>

      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>© 2026 Tech Chain Global. Seluruh hak cipta dilindungi.</span>
      </footer>
    </div>
  );
}
