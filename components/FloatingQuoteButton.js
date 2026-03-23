'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import QuoteModal from './QuoteModal';
export default function FloatingQuoteButton() {
  const pathname = usePathname();
  const label = pathname.startsWith('/id') ? 'Minta Penawaran' : 'Request Quote';
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: isMobile ? '20px' : '30px', right: isMobile ? '16px' : '30px', zIndex: 9990,
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: isMobile ? '14px' : '15px 25px', borderRadius: '50px',
          background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
          color: 'white', fontWeight: '700', fontSize: '15px',
          cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
          boxShadow: '0 8px 30px rgba(0,212,255,0.35)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        {!isMobile && label}
      </div>
      <QuoteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
