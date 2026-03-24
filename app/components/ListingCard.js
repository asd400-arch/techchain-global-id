'use client';
import { useState } from 'react';
import { getVendorCategory, getCurrencySymbol, getCountry } from '../../lib/marketplace/config';

function formatListingPrice(listing) {
  const sym = getCurrencySymbol(listing.currency || 'IDR');
  switch (listing.price_type) {
    case 'quote':   return { label: '💬 Quote on Request', color: '#7a8099' };
    case 'fixed':   return { label: `${sym}${Number(listing.price_from).toLocaleString()}`, color: '#3ecf8e' };
    case 'monthly': return { label: `${sym}${Number(listing.price_from).toLocaleString()}/mo`, color: '#3ecf8e' };
    case 'annual':  return { label: `${sym}${Number(listing.price_from).toLocaleString()}/yr`, color: '#3ecf8e' };
    case 'range':   return {
      label: `From ${sym}${Number(listing.price_from).toLocaleString()}${listing.price_to ? ` – ${sym}${Number(listing.price_to).toLocaleString()}` : '+'}`,
      color: '#3ecf8e',
    };
    default: return { label: '—', color: '#7a8099' };
  }
}

export default function ListingCard({ listing, showVendor = false, onEnquire }) {
  const [hovered, setHovered] = useState(false);
  const cat = getVendorCategory(listing.category_id);
  const color = cat?.color || '#e8b84b';
  const price = formatListingPrice(listing);
  const countries = (listing.countries_available || []).slice(0, 5).map(c => getCountry(c)).filter(Boolean);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1a1e28',
        border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.07)'}`,
        borderLeft: `3px solid ${hovered ? color : `${color}40`}`,
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 12px 36px ${color}12` : '0 2px 8px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Subcategory chip */}
      {listing.subcategory && (
        <span style={{
          display: 'inline-block',
          background: `${color}12`, border: `1px solid ${color}30`,
          borderRadius: '20px', padding: '2px 10px',
          fontSize: '11px', color: color, fontWeight: '600',
          alignSelf: 'flex-start',
        }}>
          {listing.subcategory}
        </span>
      )}

      {/* Name */}
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#e8eaf0', lineHeight: '1.3' }}>
        {listing.name}
      </h3>

      {/* Description */}
      {listing.description && (
        <p style={{
          margin: 0, fontSize: '13px', color: '#7a8099', lineHeight: '1.6',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {listing.description}
        </p>
      )}

      {/* Price */}
      <div style={{ fontSize: '15px', fontWeight: '700', color: price.color }}>
        {price.label}
      </div>

      {/* Countries */}
      {countries.length > 0 && (
        <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
          {countries.map(c => (
            <span key={c.code} title={c.name} style={{ fontSize: '14px' }}>{c.flag}</span>
          ))}
          {(listing.countries_available || []).length > 5 && (
            <span style={{ fontSize: '11px', color: '#7a8099', alignSelf: 'center', marginLeft: '2px' }}>
              +{listing.countries_available.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Vendor name */}
      {showVendor && listing.vendor_company && (
        <div style={{ fontSize: '12px', color: '#7a8099', display: 'flex', alignItems: 'center', gap: '6px' }}>
          by <a href={`/marketplace/providers/${listing.vendor_id}`} style={{ color: color, textDecoration: 'none' }}>
            {listing.vendor_company}
          </a>
          {listing.contact_visible === false && (
            <span title="Upgrade to reveal contact" style={{
              background: 'rgba(122,128,153,0.12)', border: '1px solid rgba(122,128,153,0.25)',
              borderRadius: '4px', padding: '1px 6px', fontSize: '10px', color: '#7a8099',
            }}>
              🔒 Contact Hidden
            </span>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => onEnquire && onEnquire(listing)}
        style={{
          marginTop: '4px', padding: '9px 16px', borderRadius: '8px', border: 'none',
          background: hovered ? `linear-gradient(135deg, ${color}, ${color}bb)` : `${color}15`,
          color: hovered ? '#0d0f14' : color,
          fontSize: '13px', fontWeight: '700', cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif",
          transition: 'all 0.2s',
          alignSelf: 'flex-start',
        }}
      >
        {listing.contact_visible === false ? '🔒 Request via Platform' : 'Get Quote →'}
      </button>
    </div>
  );
}
