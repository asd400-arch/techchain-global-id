'use client';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const countries = [
  'Singapore', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam',
  'South Korea', 'Japan', 'Taiwan', 'Philippines', 'India', 'Other'
];

const serviceTypes = [
  { value: 'warehouse', label: '📦 Warehouse Operations' },
  { value: 'delivery', label: '🚚 Tech Delivery' },
  { value: 'technical', label: '🔧 Technical Services' },
  { value: 'endoflife', label: '♻️ End of Product Management' },
  { value: 'multiple', label: '📋 Multiple Services' },
];

export default function QuoteModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('');
  const [files, setFiles] = useState([]);
  const [isMobile, setIsMobile] = useState(true);
  const fileRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [form, setForm] = useState({
    company: '', name: '', email: '', phone: '', country: '', city: '',
    serviceType: '',
    wh_region: '', wh_storageType: [], wh_volumeUnit: '', wh_volumeAmount: '',
    wh_duration: '', wh_valueAddedServices: [], wh_specialRequirements: '',
    del_origin: '', del_destination: '', del_deliveryType: [], del_leadTime: '',
    del_frequency: '', del_cargoType: '', del_weight: '', del_dimensions: '',
    del_specialHandling: [],
    tech_region: '', tech_scope: '', tech_serviceTypes: [],
    tech_equipmentType: '', tech_numSites: '', tech_slaRequirement: '',
    tech_duration: '', tech_specialRequirements: '',
    eol_region: '', eol_productType: '', eol_volume: '',
    eol_services: [], eol_certificationNeeded: '', eol_specialRequirements: '',
    projectDescription: '', estimatedBudget: '', timeline: '', additionalNotes: '',
  });

  const m = isMobile;
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const toggleArray = (key, value) => {
    setForm(prev => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };
  const handleFileChange = (e) => { setFiles(prev => [...prev, ...Array.from(e.target.files)]); };
  const removeFile = (index) => { setFiles(prev => prev.filter((_, i) => i !== index)); };

  const handleSubmit = async () => {
    setStatus('sending');
    try {
      const quoteData = {
        ...form,
        wh_storageType: form.wh_storageType.join(', '),
        wh_valueAddedServices: form.wh_valueAddedServices.join(', '),
        del_deliveryType: form.del_deliveryType.join(', '),
        del_specialHandling: form.del_specialHandling.join(', '),
        tech_serviceTypes: form.tech_serviceTypes.join(', '),
        eol_services: form.eol_services.join(', '),
        files: files.map(f => f.name).join(', '),
        submitted_at: new Date().toISOString(),
      };
      const { error } = await supabase.from('quote_requests').insert([quoteData]);
      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error('Quote submission failed:', err);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    color: 'white', outline: 'none', fontFamily: "'Outfit', sans-serif", boxSizing: 'border-box',
  };
  const labelStyle = { color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' };
  const selectStyle = { ...inputStyle, cursor: 'pointer', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  };
  const chipStyle = (active) => ({
    padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '500',
    cursor: 'pointer', transition: 'all 0.2s', border: '1px solid',
    borderColor: active ? '#00d4ff' : 'rgba(255,255,255,0.12)',
    background: active ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.03)',
    color: active ? '#00d4ff' : 'rgba(255,255,255,0.6)',
  });
  const grid2 = { display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '14px' };
  const grid3 = { display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: '14px' };

  const renderStep1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>Company Information</h3>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Company Name *</label>
          <input style={inputStyle} value={form.company} onChange={e => update('company', e.target.value)} placeholder="Your company" />
        </div>
        <div>
          <label style={labelStyle}>Contact Name *</label>
          <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input style={inputStyle} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@company.com" />
        </div>
        <div>
          <label style={labelStyle}>Phone *</label>
          <input style={inputStyle} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+65 1234 5678" />
        </div>
        <div>
          <label style={labelStyle}>Country / Region *</label>
          <select style={selectStyle} value={form.country} onChange={e => update('country', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select country</option>
            {countries.map(c => <option key={c} value={c} style={{ background: '#0a1628' }}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>City</label>
          <input style={inputStyle} value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>Select Service Type</h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Choose the service you need a quotation for</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {serviceTypes.map(s => (
          <div key={s.value} onClick={() => update('serviceType', s.value)}
            style={{
              padding: m ? '16px' : '20px', borderRadius: '14px', cursor: 'pointer',
              border: `2px solid ${form.serviceType === s.value ? '#00d4ff' : 'rgba(255,255,255,0.08)'}`,
              background: form.serviceType === s.value ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)',
            }}>
            <div style={{ fontSize: m ? '15px' : '17px', fontWeight: '600', color: form.serviceType === s.value ? '#00d4ff' : 'white' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWarehouse = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>📦 Warehouse Requirements</h3>
      <div>
        <label style={labelStyle}>Warehouse Region *</label>
        <select style={selectStyle} value={form.wh_region} onChange={e => update('wh_region', e.target.value)}>
          <option value="" style={{ background: '#0a1628' }}>Select region</option>
          {countries.map(c => <option key={c} value={c} style={{ background: '#0a1628' }}>{c}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Storage Type *</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['General', 'Cold Storage', 'Frozen', 'High-Value / Secure', 'Hazardous'].map(t => (
            <div key={t} style={chipStyle(form.wh_storageType.includes(t))} onClick={() => toggleArray('wh_storageType', t)}>{t}</div>
          ))}
        </div>
      </div>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Volume Unit</label>
          <select style={selectStyle} value={form.wh_volumeUnit} onChange={e => update('wh_volumeUnit', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select unit</option>
            {['Pallet', 'CBM', 'Sqft', 'Sqm', 'Units/Pieces'].map(u => <option key={u} value={u} style={{ background: '#0a1628' }}>{u}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Estimated Volume</label>
          <input style={inputStyle} value={form.wh_volumeAmount} onChange={e => update('wh_volumeAmount', e.target.value)} placeholder="e.g. 500" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Duration</label>
        <select style={selectStyle} value={form.wh_duration} onChange={e => update('wh_duration', e.target.value)}>
          <option value="" style={{ background: '#0a1628' }}>Select duration</option>
          {['Short-term (1-3 months)', 'Medium-term (3-12 months)', 'Long-term (1+ year)', 'Project-based'].map(d => <option key={d} value={d} style={{ background: '#0a1628' }}>{d}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Value Added Services</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Spare Part Management', 'Inbound/Outbound', 'Inventory Management', 'Kitting/Assembly', 'Labeling/Repackaging', 'Quality Inspection'].map(s => (
            <div key={s} style={chipStyle(form.wh_valueAddedServices.includes(s))} onClick={() => toggleArray('wh_valueAddedServices', s)}>{s}</div>
          ))}
        </div>
      </div>
      <div>
        <label style={labelStyle}>Special Requirements</label>
        <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} value={form.wh_specialRequirements} onChange={e => update('wh_specialRequirements', e.target.value)} placeholder="Any specific requirements..." />
      </div>
    </div>
  );

  const renderDelivery = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>🚚 Delivery Requirements</h3>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Origin *</label>
          <input style={inputStyle} value={form.del_origin} onChange={e => update('del_origin', e.target.value)} placeholder="City, Country" />
        </div>
        <div>
          <label style={labelStyle}>Destination *</label>
          <input style={inputStyle} value={form.del_destination} onChange={e => update('del_destination', e.target.value)} placeholder="City, Country" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Delivery Type *</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Express (2-4 Hours)', 'Same Day', 'Next Day', 'White Glove', 'Bulky/Heavy Equipment', 'Returns Management'].map(t => (
            <div key={t} style={chipStyle(form.del_deliveryType.includes(t))} onClick={() => toggleArray('del_deliveryType', t)}>{t}</div>
          ))}
        </div>
      </div>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Lead Time</label>
          <select style={selectStyle} value={form.del_leadTime} onChange={e => update('del_leadTime', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select</option>
            {['2-4 Hours', 'Same Day', 'Next Day', '2-3 Days', '1 Week', 'Flexible'].map(t => <option key={t} value={t} style={{ background: '#0a1628' }}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Frequency</label>
          <select style={selectStyle} value={form.del_frequency} onChange={e => update('del_frequency', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select</option>
            {['One-time', 'Daily', 'Weekly', 'Monthly', 'Ad-hoc', 'Project-based'].map(f => <option key={f} value={f} style={{ background: '#0a1628' }}>{f}</option>)}
          </select>
        </div>
      </div>
      <div style={grid3}>
        <div>
          <label style={labelStyle}>Cargo Type</label>
          <input style={inputStyle} value={form.del_cargoType} onChange={e => update('del_cargoType', e.target.value)} placeholder="e.g. Server racks" />
        </div>
        <div>
          <label style={labelStyle}>Weight (kg)</label>
          <input style={inputStyle} value={form.del_weight} onChange={e => update('del_weight', e.target.value)} placeholder="e.g. 500" />
        </div>
        <div>
          <label style={labelStyle}>Dimensions (cm)</label>
          <input style={inputStyle} value={form.del_dimensions} onChange={e => update('del_dimensions', e.target.value)} placeholder="LxWxH" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Special Handling</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Fragile', 'Temperature Controlled', 'Anti-static', 'Security Escort', 'Installation Required', 'De-installation Required'].map(h => (
            <div key={h} style={chipStyle(form.del_specialHandling.includes(h))} onClick={() => toggleArray('del_specialHandling', h)}>{h}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTechnical = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>🔧 Technical Service Requirements</h3>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Service Region *</label>
          <select style={selectStyle} value={form.tech_region} onChange={e => update('tech_region', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select region</option>
            {countries.map(c => <option key={c} value={c} style={{ background: '#0a1628' }}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Number of Sites</label>
          <input style={inputStyle} value={form.tech_numSites} onChange={e => update('tech_numSites', e.target.value)} placeholder="e.g. 3" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Type of Technical Service *</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Maintenance', 'Monitoring (24/7)', 'Spare Part Replacement', 'Equipment Installation', 'De-installation', 'Troubleshooting & Repair', 'Preventive Maintenance', 'Data Center Operations', 'Semiconductor Automation'].map(t => (
            <div key={t} style={chipStyle(form.tech_serviceTypes.includes(t))} onClick={() => toggleArray('tech_serviceTypes', t)}>{t}</div>
          ))}
        </div>
      </div>
      <div>
        <label style={labelStyle}>Scope of Work</label>
        <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} value={form.tech_scope} onChange={e => update('tech_scope', e.target.value)} placeholder="Describe the scope..." />
      </div>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Equipment Type</label>
          <input style={inputStyle} value={form.tech_equipmentType} onChange={e => update('tech_equipmentType', e.target.value)} placeholder="e.g. Servers, UPS" />
        </div>
        <div>
          <label style={labelStyle}>SLA Requirement</label>
          <select style={selectStyle} value={form.tech_slaRequirement} onChange={e => update('tech_slaRequirement', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select SLA</option>
            {['4-Hour Response', '8-Hour Response', 'Next Business Day', '24/7 On-site', 'Custom SLA'].map(s => <option key={s} value={s} style={{ background: '#0a1628' }}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Contract Duration</label>
          <select style={selectStyle} value={form.tech_duration} onChange={e => update('tech_duration', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select</option>
            {['One-time', '3 Months', '6 Months', '1 Year', '2+ Years', 'TBD'].map(d => <option key={d} value={d} style={{ background: '#0a1628' }}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Special Requirements</label>
          <input style={inputStyle} value={form.tech_specialRequirements} onChange={e => update('tech_specialRequirements', e.target.value)} placeholder="Certifications, etc." />
        </div>
      </div>
    </div>
  );

  const renderEndOfLife = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>♻️ End of Product Management</h3>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Region *</label>
          <select style={selectStyle} value={form.eol_region} onChange={e => update('eol_region', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select region</option>
            {countries.map(c => <option key={c} value={c} style={{ background: '#0a1628' }}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Product Type</label>
          <input style={inputStyle} value={form.eol_productType} onChange={e => update('eol_productType', e.target.value)} placeholder="e.g. Servers" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Services Required *</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Scrap Processing', 'Recycling', 'Refurbishment', 'Data Destruction', 'Asset Recovery', 'Environmental Compliance', 'Collection & Transport'].map(s => (
            <div key={s} style={chipStyle(form.eol_services.includes(s))} onClick={() => toggleArray('eol_services', s)}>{s}</div>
          ))}
        </div>
      </div>
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Estimated Volume</label>
          <input style={inputStyle} value={form.eol_volume} onChange={e => update('eol_volume', e.target.value)} placeholder="e.g. 200 units" />
        </div>
        <div>
          <label style={labelStyle}>Certification Needed</label>
          <select style={selectStyle} value={form.eol_certificationNeeded} onChange={e => update('eol_certificationNeeded', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select</option>
            {['Certificate of Destruction', 'Recycling Certificate', 'Environmental Compliance', 'Data Wipe Certificate', 'Multiple'].map(c => <option key={c} value={c} style={{ background: '#0a1628' }}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Special Requirements</label>
        <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} value={form.eol_specialRequirements} onChange={e => update('eol_specialRequirements', e.target.value)} placeholder="Any specific requirements..." />
      </div>
    </div>
  );

  const renderMultiple = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>📋 Multiple Services</h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Describe all services you need below.</p>
      <div>
        <label style={labelStyle}>Project Description *</label>
        <textarea style={{ ...inputStyle, height: '150px', resize: 'vertical' }} value={form.projectDescription}
          onChange={e => update('projectDescription', e.target.value)}
          placeholder="Describe all services needed..." />
      </div>
    </div>
  );

  const renderStep3 = () => {
    switch (form.serviceType) {
      case 'warehouse': return renderWarehouse();
      case 'delivery': return renderDelivery();
      case 'technical': return renderTechnical();
      case 'endoflife': return renderEndOfLife();
      case 'multiple': return renderMultiple();
      default: return null;
    }
  };

  const renderStep4 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>Additional Information</h3>
      {form.serviceType !== 'multiple' && (
        <div>
          <label style={labelStyle}>Project Description</label>
          <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} value={form.projectDescription}
            onChange={e => update('projectDescription', e.target.value)} placeholder="Additional details..." />
        </div>
      )}
      <div style={grid2}>
        <div>
          <label style={labelStyle}>Budget Range</label>
          <select style={selectStyle} value={form.estimatedBudget} onChange={e => update('estimatedBudget', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select</option>
            {['Under $10K', '$10K - $50K', '$50K - $100K', '$100K - $500K', '$500K+', 'TBD'].map(b => <option key={b} value={b} style={{ background: '#0a1628' }}>{b}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Start Date</label>
          <select style={selectStyle} value={form.timeline} onChange={e => update('timeline', e.target.value)}>
            <option value="" style={{ background: '#0a1628' }}>Select</option>
            {['Immediately', 'Within 1 month', '1-3 months', '3-6 months', '6+ months', 'TBD'].map(t => <option key={t} value={t} style={{ background: '#0a1628' }}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Additional Notes</label>
        <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} value={form.additionalNotes}
          onChange={e => update('additionalNotes', e.target.value)} placeholder="Anything else..." />
      </div>
      <div>
        <label style={labelStyle}>Upload Documents</label>
        <div onClick={() => fileRef.current?.click()} style={{
          padding: '20px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer',
          border: '2px dashed rgba(0,212,255,0.25)', background: 'rgba(0,212,255,0.03)',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>📎</div>
          <div style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600' }}>Click to upload</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '4px' }}>PDF, DOCX, XLSX, JPG, PNG</div>
        </div>
        <input ref={fileRef} type="file" multiple accept=".pdf,.docx,.xlsx,.xls,.jpg,.jpeg,.png,.csv" style={{ display: 'none' }} onChange={handleFileChange} />
        {files.length > 0 && (
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {files.map((file, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>📄 {file.name}</span>
                <span onClick={() => removeFile(i)} style={{ color: '#ff6b6b', cursor: 'pointer', fontSize: '18px', fontWeight: '700' }}>×</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
      <h3 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Request Submitted!</h3>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>Our team will respond within 24 hours.</p>
      <button onClick={() => { onClose(); setStep(1); setStatus(''); setFiles([]); }}
        style={{ padding: '14px 35px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #00d4ff, #1a56db)', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Close</button>
    </div>
  );

  const canNext = () => {
    if (step === 1) return form.company && form.name && form.email && form.phone && form.country;
    if (step === 2) return form.serviceType;
    return true;
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}></div>
      <div style={{
        position: 'fixed',
        top: m ? '5%' : '50%', left: m ? '3%' : '50%',
        transform: m ? 'none' : 'translate(-50%, -50%)',
        zIndex: 9999,
        width: m ? '94%' : '90%', maxWidth: '700px',
        maxHeight: m ? '90vh' : '90vh',
        borderRadius: m ? '16px' : '24px', overflow: 'hidden',
        background: '#0f1d35', border: '1px solid rgba(0,212,255,0.15)',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: m ? '15px 18px' : '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,212,255,0.03)' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: m ? '17px' : '20px', fontWeight: '700', margin: 0 }}>Request Free Quotation</h2>
            {status !== 'success' && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: '4px 0 0' }}>Step {step} of 4</p>}
          </div>
          <div onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '10px', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '20px' }}>✕</div>
        </div>

        {/* Progress */}
        {status !== 'success' && (
          <div style={{ padding: '0 18px', paddingTop: '15px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4].map(s => (
                <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', background: s <= step ? 'linear-gradient(90deg, #00d4ff, #1a56db)' : 'rgba(255,255,255,0.08)' }}></div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: m ? '18px' : '25px', overflowY: 'auto', flex: 1 }}>
          {status === 'success' ? renderSuccess() : status === 'error' ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>❌</div>
              <h3 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Submission Failed</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>Something went wrong. Please try again or contact us directly.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setStatus('')}
                  style={{ padding: '14px 35px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #00d4ff, #1a56db)', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Try Again</button>
                <a href="mailto:admin@techchainglobal.com"
                  style={{ padding: '14px 35px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontWeight: '600', fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Email Us</a>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </>
          )}
        </div>

        {/* Footer */}
        {status !== 'success' && (
          <div style={{ padding: m ? '12px 18px' : '15px 25px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} style={{ padding: '12px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>← Back</button>
            ) : <div />}
            <button
              onClick={() => { if (step < 4) setStep(step + 1); else handleSubmit(); }}
              disabled={!canNext() || status === 'sending'}
              style={{
                padding: '12px 24px', borderRadius: '10px', border: 'none',
                background: canNext() ? 'linear-gradient(135deg, #00d4ff, #1a56db)' : 'rgba(255,255,255,0.1)',
                color: canNext() ? 'white' : 'rgba(255,255,255,0.3)',
                fontWeight: '700', fontSize: '15px', cursor: canNext() ? 'pointer' : 'not-allowed',
                fontFamily: "'Outfit', sans-serif",
              }}>
              {status === 'sending' ? 'Submitting...' : step < 4 ? 'Next →' : 'Submit →'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
