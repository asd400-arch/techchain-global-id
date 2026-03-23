'use client';
import { useState } from 'react';
import { getVendorCategory, getCountry } from '../../lib/marketplace/config';

const PLAN_BADGE = {
  free:       { label: 'Free',          bg: 'rgba(122,128,153,0.12)', color: '#7a8099', border: 'rgba(122,128,153,0.3)'  },
  starter:    { label: 'Starter',       bg: 'rgba(96,165,250,0.12)',  color: '#60a5fa', border: 'rgba(96,165,250,0.3)'   },
  pro:        { label: 'Pro ⭐',        bg: 'rgba(232,184,75,0.12)',  color: '#e8b84b', border: 'rgba(232,184,75,0.3)'   },
  enterprise: { label: 'Enterprise 💎', bg: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: 'rgba(167,139,250,0.3)'  },
};

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function VendorCard({ vendor }) {
  const [hovered, setHovered] = useState(false);
  const cat = getVendorCategory(vendor.category_id);
  const countries = (vendor.country_codes || []).slice(0, 4).map(c => getCountry(c)).filter(Boolean);
  const extra = (vendor.country_codes || []).length - 4;
  const certs = (vendor.certifications || []).slice(0, 2);
  const color = cat?.color || '#e8b84b';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1a1e28',
        border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px',
        padding: '22px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 48px ${color}18` : '0 2px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
      }}
    >
      {/* Header row: logo left, category badge right */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
        {/* Logo circle */}
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden',
          flexShrink: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {vendor.logo_url ? (
            <>
              <img
                src={vendor.logo_url}
                alt={vendor.company_name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span style={{
                display: 'none', width: '100%', height: '100%',
                alignItems: 'center', justifyContent: 'center',
                background: color, fontSize: '14px', fontWeight: '600', color: '#fff',
              }}>
                {vendor.company_name.substring(0, 2).toUpperCase()}
              </span>
            </>
          ) : (
            <span style={{
              display: 'flex', width: '100%', height: '100%',
              alignItems: 'center', justifyContent: 'center',
              background: color, fontSize: '14px', fontWeight: '600', color: '#fff',
            }}>
              {vendor.company_name.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        {/* Category badge */}
        {cat && (
          <div style={{
            background: `${color}15`, border: `1px solid ${color}40`,
            borderRadius: '20px', padding: '3px 10px',
            fontSize: '11px', color: color, fontWeight: '600',
            display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
          }}>
            {cat.icon} {cat.name}
          </div>
        )}
      </div>

      {/* Name + tagline */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <h3 style={{
            margin: 0, fontSize: '15px', fontWeight: '600', color: '#e8eaf0',
            lineHeight: '1.3', width: '100%',
          }}>
            {vendor.company_name}
          </h3>
          {vendor.verified && (
            <span style={{
              background: 'rgba(62,207,142,0.12)', border: '1px solid rgba(62,207,142,0.3)',
              borderRadius: '20px', padding: '1px 8px', fontSize: '10px', color: '#3ecf8e', fontWeight: '600',
            }}>
              ✅ Verified
            </span>
          )}
          {(() => {
            const badge = PLAN_BADGE[vendor.plan_id] || PLAN_BADGE.free;
            return (
              <span style={{
                background: badge.bg, border: `1px solid ${badge.border}`,
                borderRadius: '20px', padding: '1px 8px', fontSize: '10px', color: badge.color, fontWeight: '600',
              }}>
                {badge.label}
              </span>
            );
          })()}
        </div>
        {vendor.tagline && (
          <p style={{
            margin: '4px 0 0', fontSize: '12px', color: '#7a8099', lineHeight: '1.5',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {vendor.tagline}
          </p>
        )}
      </div>

      {/* Countries */}
      {countries.length > 0 && (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
          {countries.map(c => (
            <span key={c.code} title={c.name} style={{ fontSize: '16px' }}>{c.flag}</span>
          ))}
          {extra > 0 && <span style={{ fontSize: '11px', color: '#7a8099' }}>+{extra} more</span>}
        </div>
      )}

      {/* Certs */}
      {certs.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {certs.map(c => (
            <span key={c} style={{
              background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)',
              borderRadius: '4px', padding: '2px 8px', fontSize: '10px', color: '#60a5fa',
            }}>
              {c}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <a
        href={`/marketplace/providers/${vendor.id}`}
        onClick={e => e.stopPropagation()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px',
          textDecoration: 'none', fontSize: '13px', fontWeight: '600',
          color: hovered ? color : `${color}99`,
          transition: 'color 0.2s',
        }}
      >
        View Profile →
      </a>
    </div>
  );
}
