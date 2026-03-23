'use client';
import { useState, useEffect } from 'react';
import { ASIA_COUNTRIES, SERVICE_TYPES, REGION_LABELS } from '../../lib/marketplace/config';
import { MARKETPLACE_RFQ_URL } from '../../lib/marketplace/api';
import { BAHASA_LABELS } from '../../lib/locale/config';

const DURATION_OPTIONS = [
  { value: 1,  label: '1 Month' },
  { value: 3,  label: '3 Months' },
  { value: 6,  label: '6 Months' },
  { value: 12, label: '12 Months' },
  { value: 24, label: '24+ Months' },
];

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: '#13161e',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '12px 14px',
  color: '#e8eaf0',
  fontSize: '14px',
  fontFamily: "'Outfit', sans-serif",
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#7a8099',
  marginBottom: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

export default function RFQForm({ prefillListingId, locale = 'sg' }) {
  const isId = locale === 'id';
  const L = BAHASA_LABELS;
  const STEP_LABELS = isId ? L.step_labels : ['Requirements', 'Your Details', 'Review & Submit'];

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rfqId, setRfqId] = useState(null);

  const [form, setForm] = useState({
    service_types: [],
    country_codes: [],
    size_sqft_needed: '',
    duration_months: 6,
    cargo_type: '',
    special_requirements: '',
    company_name: '',
    contact_name: '',
    client_email: '',
    phone: '',
    budget_monthly: '',
    currency: 'SGD',
  });

  useEffect(() => {
    if (isId) set('currency', 'IDR');
  }, [isId]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleArr = (key, val) => {
    const arr = form[key];
    set(key, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(MARKETPLACE_RFQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, listing_id: prefillListingId }),
      });
      const data = await res.json();
      if (data.success) {
        setRfqId(data.rfq_id);
        setSubmitted(true);
      }
    } catch {
      // noop
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={{
        textAlign: 'center', padding: '60px 24px',
        background: '#1a1e28', borderRadius: '16px',
        border: '1px solid rgba(62,207,142,0.3)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ color: '#3ecf8e', margin: '0 0 12px', fontSize: '22px' }}>
          {isId ? L.success_title : 'RFQ Submitted!'}
        </h2>
        <p style={{ color: '#7a8099', fontSize: '15px', lineHeight: '1.7', maxWidth: '400px', margin: '0 auto 24px' }}>
          {isId ? L.success_msg : "Your request has been submitted. We'll match you with verified providers within 24 hours. Check "}
          {!isId && <strong style={{ color: '#e8eaf0' }}>admin@techchainglobal.com</strong>}
          {!isId && ' for confirmation.'}
        </p>
        <a href="/marketplace" style={{
          display: 'inline-block', textDecoration: 'none',
          background: 'linear-gradient(135deg, #e8b84b, #c49a2e)',
          color: '#0d0f14', fontWeight: '700', borderRadius: '8px',
          padding: '12px 28px', fontSize: '14px',
        }}>
          {isId ? L.success_cta : 'Back to Marketplace'}
        </a>
      </div>
    );
  }

  const regions = ['SEA', 'NEA', 'SA'];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: '#e8eaf0' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '32px' }}>
        {STEP_LABELS.map((label, i) => {
          const num = i + 1;
          const active = step === num;
          const done = step > num;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative' }}>
              {i > 0 && (
                <div style={{
                  position: 'absolute', left: 0, top: '14px', width: '50%', height: '2px',
                  background: done || active ? '#e8b84b' : 'rgba(255,255,255,0.1)',
                }} />
              )}
              {i < STEP_LABELS.length - 1 && (
                <div style={{
                  position: 'absolute', right: 0, top: '14px', width: '50%', height: '2px',
                  background: done ? '#e8b84b' : 'rgba(255,255,255,0.1)',
                }} />
              )}
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', zIndex: 1,
                background: done ? '#e8b84b' : active ? 'rgba(232,184,75,0.2)' : 'rgba(255,255,255,0.06)',
                border: `2px solid ${active || done ? '#e8b84b' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '700',
                color: done ? '#0d0f14' : active ? '#e8b84b' : '#7a8099',
              }}>
                {done ? '✓' : num}
              </div>
              <span style={{ fontSize: '11px', color: active ? '#e8b84b' : '#7a8099', textAlign: 'center' }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={labelStyle}>{isId ? L.services_label : 'Services Needed'}</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICE_TYPES.map(s => {
                const checked = form.service_types.includes(s);
                return (
                  <button key={s} onClick={() => toggleArr('service_types', s)} style={{
                    padding: '8px 14px', borderRadius: '6px', cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: '500',
                    background: checked ? 'rgba(232,184,75,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${checked ? '#e8b84b' : 'rgba(255,255,255,0.1)'}`,
                    color: checked ? '#e8b84b' : '#7a8099',
                    transition: 'all 0.15s',
                  }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={labelStyle}>{isId ? L.countries_label : 'Countries Needed'}</label>
            {regions.map(region => (
              <div key={region} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#7a8099', marginBottom: '6px', fontWeight: '600' }}>
                  {REGION_LABELS[region]}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ASIA_COUNTRIES.filter(c => c.region === region).map(c => {
                    const checked = form.country_codes.includes(c.code);
                    return (
                      <button key={c.code} onClick={() => toggleArr('country_codes', c.code)} style={{
                        padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                        fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                        background: checked ? 'rgba(232,184,75,0.15)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${checked ? '#e8b84b' : 'rgba(255,255,255,0.1)'}`,
                        color: checked ? '#e8b84b' : '#7a8099',
                        transition: 'all 0.15s',
                      }}>
                        {c.flag} {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{isId ? L.size_label : 'Size Needed (sqft)'}</label>
              <input
                type="number" placeholder="e.g. 5000"
                value={form.size_sqft_needed}
                onChange={e => set('size_sqft_needed', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{isId ? L.duration_label : 'Duration'}</label>
              <select
                value={form.duration_months}
                onChange={e => set('duration_months', Number(e.target.value))}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {DURATION_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>{isId ? L.cargo_label : 'Cargo Type'}</label>
            <input
              type="text" placeholder={isId ? 'mis. Peralatan IT / Elektronik / Farmasi / Umum' : 'e.g. IT Equipment / Electronics / Pharma / General'}
              value={form.cargo_type}
              onChange={e => set('cargo_type', e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>{isId ? L.special_req_label : 'Special Requirements'}</label>
            <textarea
              rows={3} placeholder={isId ? 'Persyaratan suhu, sertifikasi yang dibutuhkan, jam akses...' : 'Temperature requirements, certifications needed, access hours...'}
              value={form.special_requirements}
              onChange={e => set('special_requirements', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
            />
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{isId ? L.company_label : 'Company Name *'}</label>
              <input
                type="text" placeholder={isId ? 'Nama perusahaan Anda' : 'Your company'}
                value={form.company_name}
                onChange={e => set('company_name', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{isId ? L.contact_label : 'Contact Name'}</label>
              <input
                type="text" placeholder={isId ? 'Nama Anda' : 'Your name'}
                value={form.contact_name}
                onChange={e => set('contact_name', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{isId ? L.email_label : 'Business Email *'}</label>
              <input
                type="email" placeholder="you@company.com"
                value={form.client_email}
                onChange={e => set('client_email', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{isId ? L.phone_label : 'Phone'}</label>
              <input
                type="tel" placeholder={isId ? L.phone_placeholder : '+65 XXXX XXXX'}
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{isId ? L.budget_label : 'Monthly Budget'}</label>
              <input
                type="number" placeholder="e.g. 10000"
                value={form.budget_monthly}
                onChange={e => set('budget_monthly', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{isId ? L.currency_label : 'Currency'}</label>
              <select
                value={form.currency}
                onChange={e => set('currency', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {[...new Set(ASIA_COUNTRIES.map(c => c.currency))].map(cur => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, color: '#e8eaf0', fontSize: '16px' }}>{isId ? L.review_title : 'Review Your RFQ'}</h3>
          <div style={{ background: '#13161e', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Services', value: form.service_types.join(', ') || '—' },
              { label: 'Countries', value: form.country_codes.map(c => ASIA_COUNTRIES.find(x => x.code === c)?.name).join(', ') || '—' },
              { label: 'Size Needed', value: form.size_sqft_needed ? `${Number(form.size_sqft_needed).toLocaleString()} sqft` : '—' },
              { label: 'Duration', value: DURATION_OPTIONS.find(d => d.value === form.duration_months)?.label || '—' },
              { label: 'Cargo Type', value: form.cargo_type || '—' },
              { label: 'Special Requirements', value: form.special_requirements || '—' },
              { label: 'Company', value: form.company_name || '—' },
              { label: 'Contact', value: form.contact_name || '—' },
              { label: 'Email', value: form.client_email || '—' },
              { label: 'Phone', value: form.phone || '—' },
              { label: 'Budget', value: form.budget_monthly ? `${form.currency} ${Number(form.budget_monthly).toLocaleString()}/month` : '—' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '13px', color: '#7a8099', minWidth: '150px', flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: '13px', color: '#e8eaf0', wordBreak: 'break-word' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', gap: '12px' }}>
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)} style={{
            padding: '12px 24px', borderRadius: '8px', cursor: 'pointer',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#e8eaf0', fontSize: '14px', fontWeight: '600', fontFamily: "'Outfit', sans-serif",
          }}>
            {isId ? L.back_btn : '← Back'}
          </button>
        ) : <div />}

        {step < 3 ? (
          <button onClick={() => setStep(s => s + 1)} style={{
            padding: '12px 28px', borderRadius: '8px', cursor: 'pointer',
            background: 'linear-gradient(135deg, #e8b84b, #c49a2e)',
            border: 'none', color: '#0d0f14', fontSize: '14px', fontWeight: '700',
            fontFamily: "'Outfit', sans-serif",
          }}>
            {isId ? L.continue_btn : 'Continue →'}
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting} style={{
            padding: '12px 28px', borderRadius: '8px', cursor: submitting ? 'not-allowed' : 'pointer',
            background: submitting ? 'rgba(232,184,75,0.4)' : 'linear-gradient(135deg, #e8b84b, #c49a2e)',
            border: 'none', color: '#0d0f14', fontSize: '14px', fontWeight: '700',
            fontFamily: "'Outfit', sans-serif",
          }}>
            {submitting ? (isId ? L.submitting_btn : 'Submitting...') : (isId ? L.submit_btn : 'Submit RFQ ✓')}
          </button>
        )}
      </div>
    </div>
  );
}
