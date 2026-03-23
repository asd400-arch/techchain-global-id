'use client';

import { useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import useMobile from '../components/useMobile';
import { TCG_APP_LOGIN_URL, TCG_APP_SIGNUP_CLIENT_URL } from '../../lib/tcgAppUrls';

export default function EnglishHomePage() {
  const videoRef = useRef(null);
  const m = useMobile();

  useEffect(() => {
    document.documentElement.lang = 'en';
    return () => {
      document.documentElement.lang = 'id';
    };
  }, []);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.style.transform = `scale(${1 + window.scrollY * 0.0003})`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const pad = m ? '40px 16px' : '56px 40px';

  return (
    <div>
      <Nav />

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1)',
            willChange: 'transform',
          }}
        >
          <source src="/home_page.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10,22,40,0.55) 0%, rgba(15,43,91,0.45) 50%, rgba(10,22,40,0.55) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '920px',
            padding: '0 20px',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: '30px',
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,212,255,0.08)',
              color: '#00d4ff',
              fontSize: m ? '11px' : '13px',
              fontWeight: '500',
              marginBottom: '24px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Indonesia marketing site · English overview
          </div>
          <h1
            style={{
              fontSize: m ? '34px' : '60px',
              fontWeight: '800',
              color: 'white',
              lineHeight: '1.08',
              letterSpacing: '-1px',
              marginBottom: '20px',
            }}
          >
            Technology services &amp; logistics
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              anchored in Indonesia
            </span>
          </h1>
          <p
            style={{
              fontSize: m ? '15px' : '18px',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '640px',
              margin: '0 auto 28px',
              lineHeight: '1.7',
            }}
          >
            This is the{' '}
            <strong style={{ color: 'rgba(255,255,255,0.9)' }}>techchainglobal.id</strong> experience — not the Singapore
            marketing site. Browse in English here; detailed service pages are available in Indonesian with the same regional
            coverage and TCG Express links for Indonesia (+62).
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '16px',
            }}
          >
            <a
              href="/contact"
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00d4ff, #1a56db)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Contact
            </a>
            <a
              href="/services"
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '15px',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              Services (ID)
            </a>
            <a
              href="/"
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '15px',
              }}
            >
              🇮🇩 Bahasa Indonesia home
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0a1628' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(0,212,170,0.08), rgba(0,212,170,0.02))',
            border: '1px solid rgba(0,212,170,0.15)',
            padding: m ? '28px 20px' : '40px 44px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              background: 'rgba(0,212,170,0.1)',
              border: '1px solid rgba(0,212,170,0.25)',
              borderRadius: '100px',
              padding: '6px 14px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                background: '#00d4aa',
                borderRadius: '50%',
              }}
            />
            <span style={{ color: '#00d4aa', fontSize: '12px', fontWeight: '700', letterSpacing: '0.06em' }}>
              BETA LIVE — Indonesia
            </span>
          </div>
          <h2 style={{ fontSize: m ? '22px' : '28px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>
            TCG Express — Indonesia app
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', marginBottom: '22px' }}>
            Indonesia&apos;s first B2B delivery platform for technology equipment. Sign up and sign in use the same Indonesia
            flows (+62) as the rest of this site — not the Singapore-only defaults on techchainglobal.com.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={TCG_APP_SIGNUP_CLIENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 22px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00d4aa, #00b894)',
                color: '#0a1628',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '14px',
              }}
            >
              Book a Delivery
            </a>
            <a
              href={TCG_APP_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 22px',
                borderRadius: '10px',
                border: '1px solid rgba(0,212,170,0.35)',
                color: '#00d4aa',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '14px',
              }}
            >
              Sign In
            </a>
            <a
              href="/tech-delivery"
              style={{
                padding: '12px 22px',
                borderRadius: '10px',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Tech delivery (ID) →
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: pad, background: '#0e1f3d', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}>
          Marketplace, RFQ, Batam &amp; Jakarta pages, and service detail copy are in Indonesian. Use the header switcher:
          <strong style={{ color: 'rgba(255,255,255,0.75)' }}> 🇮🇩 ID</strong> for the full site in Bahasa Indonesia on this
          domain.
        </p>
      </section>
    </div>
  );
}
