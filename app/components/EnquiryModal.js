'use client';
import { useState, useEffect } from 'react';
import { ASIA_COUNTRIES } from '../../lib/marketplace/config';
import { MARKETPLACE_ENQUIRIES_URL } from '../../lib/marketplace/api';

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: '#0d0f14', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', padding: '11px 13px',
  color: '#e8eaf0', fontSize: '14px', fontFamily: "'Outfit', sans-serif", outline: 'none',
};
const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: '600', color: '#7a8099',
  marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px',
};

export default function EnquiryModal({ vendor, listing, onClose }) {
  const [form, setForm] = useState({ from_name: '', from_company: '', from_email: '', from_phone: '', from_country: 'SG', message: '' });
  const [status, setStatus] = useState('');

  // Close on Escape
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch(MARKETPLACE_ENQUIRIES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendor_id: vendor?.id,
        listing_id: listing?.id || null,
        ...form,
      }),
    });
    const data = await res.json();
    setStatus(data.success ? 'success' : 'error');
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(13,15,20,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      }}
    >
      <div style={{
        background: '#1a1e28', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '500px',
        maxHeight: '90vh', overflowY: 'auto',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#e8eaf0' }}>
              Contact {vendor?.company_name}
            </h2>
            {listing && (
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#7a8099' }}>
                Re: {listing.name}
              </p>
            )}
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#7a8099', fontSize: '22px', lineHeight: 1, padding: '0 0 0 12px',
            fontFamily: "'Outfit', sans-serif",
          }}>×</button>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#3ecf8e', margin: '0 0 8px', fontSize: '18px' }}>Message Sent!</h3>
            <p style={{ color: '#7a8099', margin: '0 0 24px', fontSize: '14px' }}>
              Expect a reply within 1 business day.
            </p>
            <button onClick={onClose} style={{
              padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.08)', color: '#e8eaf0',
              fontSize: '14px', fontFamily: "'Outfit', sans-serif",
            }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input required type="text" placeholder="Jane Smith" value={form.from_name}
                  onChange={e => set('from_name', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Company *</label>
                <input required type="text" placeholder="Acme Corp" value={form.from_company}
                  onChange={e => set('from_company', e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Email *</label>
                <input required type="email" placeholder="you@company.com" value={form.from_email}
                  onChange={e => set('from_email', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input type="tel" placeholder="+65 XXXX" value={form.from_phone}
                  onChange={e => set('from_phone', e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Country</label>
              <select value={form.from_country} onChange={e => set('from_country', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}>
                {ASIA_COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Message *</label>
              <textarea required rows={4} placeholder="Describe your requirements, quantities needed, timeline..."
                value={form.message} onChange={e => set('message', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }} />
            </div>
            {status === 'error' && (
              <p style={{ margin: 0, fontSize: '13px', color: '#ff6b35' }}>Something went wrong. Please try again.</p>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={onClose} style={{
                flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#e8eaf0', fontSize: '14px', fontFamily: "'Outfit', sans-serif",
              }}>Cancel</button>
              <button type="submit" disabled={status === 'loading'} style={{
                flex: 2, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #e8b84b, #c49a2e)',
                color: '#0d0f14', fontWeight: '700', fontSize: '14px', fontFamily: "'Outfit', sans-serif",
              }}>
                {status === 'loading' ? 'Sending...' : 'Send Enquiry →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
