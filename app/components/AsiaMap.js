'use client';
import { useState } from 'react';
import { ASIA_COUNTRIES } from '../../lib/marketplace/config';

// Approximate SVG positions (x%, y%) within a 100x60 viewBox representing Asia
const POSITIONS = {
  IN: [38, 48], BD: [50, 47], LK: [42, 57],
  CN: [62, 35], HK: [67, 45], TW: [70, 42],
  JP: [77, 28], KR: [73, 31],
  MY: [62, 57], SG: [63, 63], TH: [58, 50],
  VN: [66, 51], PH: [71, 54], ID: [66, 67],
};

export default function AsiaMap({ listingCounts = {}, onCountryClick }) {
  const [tooltip, setTooltip] = useState(null);

  const activeCountries = ASIA_COUNTRIES.filter(c => (listingCounts[c.code] || 0) > 0);
  const maxCount = Math.max(...Object.values(listingCounts), 1);

  return (
    <div style={{ position: 'relative', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <svg
        viewBox="0 0 100 65"
        style={{ width: '100%', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="100" height="65" fill="#0d0f14" rx="2" />

        {/* Grid lines */}
        {[20, 40, 60, 80].map(x => (
          <line key={`vl${x}`} x1={x} y1="0" x2={x} y2="65" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
        ))}
        {[15, 30, 45].map(y => (
          <line key={`hl${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
        ))}

        {/* Country dots */}
        {ASIA_COUNTRIES.map(country => {
          const pos = POSITIONS[country.code];
          if (!pos) return null;
          const count = listingCounts[country.code] || 0;
          const hasListings = count > 0;
          const size = hasListings ? 1.2 + (count / maxCount) * 1.2 : 0.7;

          return (
            <g
              key={country.code}
              onClick={() => onCountryClick && onCountryClick(country.code)}
              onMouseEnter={() => setTooltip({ code: country.code, name: country.name, flag: country.flag, count, x: pos[0], y: pos[1] })}
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: onCountryClick ? 'pointer' : 'default' }}
            >
              {/* Pulse ring for active countries */}
              {hasListings && (
                <>
                  <circle
                    cx={pos[0]} cy={pos[1]} r={size * 1.8}
                    fill="none"
                    stroke="#e8b84b"
                    strokeWidth="0.3"
                    opacity="0.4"
                    style={{ animation: 'mapPulse 2s ease-in-out infinite' }}
                  />
                  <circle
                    cx={pos[0]} cy={pos[1]} r={size * 2.8}
                    fill="none"
                    stroke="#e8b84b"
                    strokeWidth="0.2"
                    opacity="0.2"
                    style={{ animation: 'mapPulse 2s ease-in-out infinite 0.5s' }}
                  />
                </>
              )}
              {/* Main dot */}
              <circle
                cx={pos[0]} cy={pos[1]} r={size}
                fill={hasListings ? '#e8b84b' : 'rgba(122,128,153,0.4)'}
              />
              {/* Country code label */}
              <text
                x={pos[0]} y={pos[1] + size + 1.8}
                textAnchor="middle"
                fontSize="1.8"
                fill={hasListings ? 'rgba(232,184,75,0.9)' : 'rgba(122,128,153,0.5)'}
                style={{ pointerEvents: 'none' }}
              >
                {country.code}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={Math.min(tooltip.x - 8, 80)} y={tooltip.y - 12}
              width="22" height="10"
              fill="#1a1e28"
              stroke="rgba(232,184,75,0.4)"
              strokeWidth="0.3"
              rx="1.5"
            />
            <text
              x={Math.min(tooltip.x - 8, 80) + 11} y={tooltip.y - 6}
              textAnchor="middle"
              fontSize="2.2"
              fill="#e8eaf0"
              style={{ pointerEvents: 'none' }}
            >
              {tooltip.flag} {tooltip.name}
            </text>
            <text
              x={Math.min(tooltip.x - 8, 80) + 11} y={tooltip.y - 2.5}
              textAnchor="middle"
              fontSize="1.8"
              fill={tooltip.count > 0 ? '#3ecf8e' : '#7a8099'}
              style={{ pointerEvents: 'none' }}
            >
              {tooltip.count > 0 ? `${tooltip.count} listing${tooltip.count !== 1 ? 's' : ''}` : 'No listings yet'}
            </text>
          </g>
        )}
      </svg>

      <style>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.4; transform-origin: center; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.3); }
        }
      `}</style>

      {/* Fallback legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px',
        marginTop: '12px', justifyContent: 'center',
      }}>
        {ASIA_COUNTRIES.map(c => {
          const count = listingCounts[c.code] || 0;
          return (
            <button
              key={c.code}
              onClick={() => onCountryClick && onCountryClick(c.code)}
              style={{
                background: count > 0 ? 'rgba(232,184,75,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${count > 0 ? 'rgba(232,184,75,0.25)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: count > 0 ? 'pointer' : 'default',
                fontSize: '12px',
                color: count > 0 ? '#e8eaf0' : '#7a8099',
                fontFamily: "'Outfit', sans-serif",
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              {c.flag} {c.code}
              {count > 0 && (
                <span style={{
                  background: '#e8b84b', color: '#0d0f14',
                  borderRadius: '8px', padding: '0 5px',
                  fontSize: '10px', fontWeight: '700',
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
