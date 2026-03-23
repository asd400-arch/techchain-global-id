'use client';
import { ASIA_COUNTRIES, REGION_LABELS } from '../../lib/marketplace/config';

const REGIONS = [
  { key: 'SEA', label: 'Southeast Asia' },
  { key: 'NEA', label: 'Northeast Asia' },
  { key: 'SA',  label: 'South Asia' },
];

export default function CountryFilter({ selected, onChange, counts = {} }) {
  const toggle = (code) => {
    const next = selected.includes(code)
      ? selected.filter(c => c !== code)
      : [...selected, code];
    onChange(next);
  };

  const selectAll = (region) => {
    const codes = ASIA_COUNTRIES.filter(c => c.region === region).map(c => c.code);
    const allSelected = codes.every(c => selected.includes(c));
    if (allSelected) {
      onChange(selected.filter(c => !codes.includes(c)));
    } else {
      const merged = [...new Set([...selected, ...codes])];
      onChange(merged);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Outfit', sans-serif" }}>
      {REGIONS.map(region => {
        const countries = ASIA_COUNTRIES.filter(c => c.region === region.key);
        const allSelected = countries.every(c => selected.includes(c.code));
        return (
          <div key={region.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#7a8099', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                {region.label}
              </span>
              <button
                onClick={() => selectAll(region.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: allSelected ? '#e8b84b' : 'rgba(232,184,75,0.5)',
                  padding: 0,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: '600',
                }}
              >
                {allSelected ? 'Clear' : 'All'}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {countries.map(country => {
                const isChecked = selected.includes(country.code);
                const count = counts[country.code] || 0;
                return (
                  <label
                    key={country.code}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      background: isChecked ? 'rgba(232,184,75,0.06)' : 'transparent',
                      border: `1px solid ${isChecked ? 'rgba(232,184,75,0.2)' : 'transparent'}`,
                      transition: 'all 0.15s',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(country.code)}
                      style={{ accentColor: '#e8b84b', width: '14px', height: '14px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '15px' }}>{country.flag}</span>
                    <span style={{ fontSize: '13px', color: isChecked ? '#e8eaf0' : '#7a8099', flex: 1, transition: 'color 0.15s' }}>
                      {country.name}
                    </span>
                    {count > 0 && (
                      <span style={{
                        background: 'rgba(62,207,142,0.15)',
                        color: '#3ecf8e',
                        borderRadius: '10px',
                        padding: '1px 7px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}>
                        {count}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {selected.length > 0 && (
        <button
          onClick={() => onChange([])}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#7a8099',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
