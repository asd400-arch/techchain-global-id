'use client';
import { useState } from 'react';
import { getCountry, getWarehouseType, formatPrice } from '../../lib/marketplace/config';

export default function WarehouseCard({ listing }) {
  const [hovered, setHovered] = useState(false);
  const country = getCountry(listing.country_code);
  const wtype = getWarehouseType(listing.warehouse_type);
  const features = (listing.features || []).slice(0, 3);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1a1e28',
        border: `1px solid ${hovered ? '#e8b84b' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px',
        padding: '22px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 48px rgba(232,184,75,0.12)' : '0 2px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Country badge */}
      {country && (
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '3px 10px',
          fontSize: '12px',
          color: 'rgba(232,234,240,0.8)',
          display: 'flex', alignItems: 'center', gap: '5px',
        }}>
          {country.flag} {country.name}
        </div>
      )}

      {/* Type badge */}
      {wtype && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '90px' }}>
          <span style={{ fontSize: '18px' }}>{wtype.icon}</span>
          <span style={{ fontSize: '12px', color: '#e8b84b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {wtype.label}
          </span>
        </div>
      )}

      {/* Name */}
      <h3 style={{
        margin: 0,
        fontSize: '16px',
        fontWeight: '700',
        color: '#e8eaf0',
        lineHeight: '1.3',
        paddingRight: '90px',
      }}>
        {listing.name}
      </h3>

      {/* Location */}
      <div style={{ fontSize: '13px', color: '#7a8099', display: 'flex', alignItems: 'center', gap: '4px' }}>
        📍 {listing.city}{country ? `, ${country.name}` : ''}
      </div>

      {/* Size + Price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '13px', color: '#7a8099' }}>
          📐 {listing.size_sqft?.toLocaleString()} sqft
        </div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#3ecf8e' }}>
          {formatPrice(listing.price_monthly, listing.currency)}
          <span style={{ fontSize: '11px', color: '#7a8099', fontWeight: '400' }}>/mo</span>
        </div>
      </div>

      {/* Feature chips */}
      {features.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {features.map((f, i) => (
            <span key={i} style={{
              background: 'rgba(232,184,75,0.08)',
              border: '1px solid rgba(232,184,75,0.2)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              color: '#e8b84b',
            }}>
              {f}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <a
        href={`/marketplace/warehouses/${listing.id}`}
        onClick={e => e.stopPropagation()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '4px',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: '600',
          color: hovered ? '#e8b84b' : 'rgba(232,184,75,0.7)',
          transition: 'color 0.2s',
        }}
      >
        View Details →
      </a>
    </div>
  );
}
