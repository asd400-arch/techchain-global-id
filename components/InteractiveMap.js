'use client';
import { useState } from 'react';

const locations = [
  // South Korea
  { name: 'Seoul', top: 12, left: 56 },
  // Japan
  { name: 'Tokyo', top: 14, left: 66 },
  // Taiwan
  { name: 'Taoyuan', top: 24, left: 57 },
  // India
  { name: 'Delhi', top: 20, left: 20 },
  { name: 'Mumbai', top: 30, left: 12 },
  { name: 'Chennai', top: 35, left: 20 },
  // Vietnam
  { name: 'Hanoi', top: 26, left: 47 },
  { name: 'Ho Chi Minh', top: 36, left: 49 },
  // Thailand
  { name: 'Bangkok', top: 32, left: 43 },
  { name: 'Laem Chabang', top: 34, left: 44 },
  { name: 'Bang Na', top: 33, left: 43.5 },
  // Philippines
  { name: 'Manila', top: 34, left: 60 },
  // Malaysia
  { name: 'Penang', top: 38, left: 42 },
  { name: 'Kuala Lumpur', top: 41, left: 43 },
  { name: 'Johor Bahru', top: 43, left: 44 },
  // Indonesia HQ (label)
  { name: 'Indonesia (HQ)', top: 50, left: 52, isHQ: true },
  // Indonesia
  { name: 'Medan', top: 40, left: 40 },
  { name: 'Pekanbaru', top: 43, left: 42 },
  { name: 'Palembang', top: 47, left: 44 },
  { name: 'Jakarta', top: 50, left: 45 },
  { name: 'Surabaya', top: 51, left: 51 },
  { name: 'Makassar', top: 50, left: 56 },
];

export default function InteractiveMap() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Map Image */}
      <img src="/Map.webp" alt="Asia Pacific Network" style={{
        width: '100%',
        filter: 'invert(1) brightness(0.5) sepia(1) hue-rotate(180deg) saturate(4)',
        opacity: 0.75,
      }} />

      {/* Glow behind map */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60%', height: '60%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none',
      }}></div>

      {/* Location Dots */}
      {locations.map((loc, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            position: 'absolute',
            top: `${loc.top}%`,
            left: `${loc.left}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            cursor: 'pointer',
            padding: '5px',
          }}
        >
          {/* Pulse ring for HQ */}
          {loc.isHQ && (
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '30px', height: '30px', borderRadius: '50%',
              border: '2px solid rgba(0,212,255,0.4)',
              animation: 'pulse 2s ease-in-out infinite',
            }}></div>
          )}

          {/* Outer glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: hovered === i ? '22px' : '14px',
            height: hovered === i ? '22px' : '14px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${loc.isHQ ? 'rgba(0,212,255,0.6)' : 'rgba(0,212,255,0.3)'}, transparent 70%)`,
            transition: 'all 0.3s ease',
          }}></div>

          {/* Dot */}
          <div style={{
            width: loc.isHQ ? '10px' : '7px',
            height: loc.isHQ ? '10px' : '7px',
            borderRadius: '50%',
            background: '#00d4ff',
            boxShadow: hovered === i
              ? '0 0 12px rgba(0,212,255,0.8), 0 0 25px rgba(0,212,255,0.4)'
              : `0 0 6px rgba(0,212,255,${loc.isHQ ? '0.8' : '0.5'})`,
            transition: 'all 0.3s ease',
            transform: hovered === i ? 'scale(1.5)' : 'scale(1)',
          }}></div>

          {/* Tooltip */}
          {hovered === i && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '10px',
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(10,22,40,0.95)',
              border: '1px solid rgba(0,212,255,0.3)',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              {loc.isHQ && <span style={{ color: '#00d4ff', marginRight: '4px' }}>★</span>}
              {loc.name}
              <div style={{
                position: 'absolute', bottom: '-5px', left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '8px', height: '8px',
                background: 'rgba(10,22,40,0.95)',
                borderRight: '1px solid rgba(0,212,255,0.3)',
                borderBottom: '1px solid rgba(0,212,255,0.3)',
              }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
