'use client';
import { useState } from 'react';

export default function CategoryHub({ category, activeSubcategory, onSubcategoryChange }) {
  if (!category) return null;

  return (
    <div>
      {/* Color banner */}
      <div style={{
        background: `linear-gradient(135deg, ${category.color}15 0%, transparent 100%)`,
        borderBottom: `1px solid ${category.color}25`,
        padding: '32px 24px 24px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{
              fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '60px', height: '60px', background: `${category.color}15`,
              border: `1px solid ${category.color}30`, borderRadius: '14px',
            }}>
              {category.icon}
            </span>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#e8eaf0' }}>
                {category.name}
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#7a8099' }}>
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory tabs */}
      <div style={{
        background: '#13161e',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', padding: '0 24px', minWidth: 'max-content' }}>
          <button
            onClick={() => onSubcategoryChange(null)}
            style={{
              padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: '600',
              color: !activeSubcategory ? category.color : 'rgba(232,234,240,0.5)',
              borderBottom: `2px solid ${!activeSubcategory ? category.color : 'transparent'}`,
              whiteSpace: 'nowrap', transition: 'all 0.2s', marginBottom: '-1px',
            }}
          >
            All
          </button>
          {(category.subcategories || []).map(sub => (
            <button
              key={sub}
              onClick={() => onSubcategoryChange(activeSubcategory === sub ? null : sub)}
              style={{
                padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: '500',
                color: activeSubcategory === sub ? category.color : 'rgba(232,234,240,0.5)',
                borderBottom: `2px solid ${activeSubcategory === sub ? category.color : 'transparent'}`,
                whiteSpace: 'nowrap', transition: 'all 0.2s', marginBottom: '-1px',
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
