'use client';
import { useState, useEffect } from 'react';

export default function ScrollArrow() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className={`scroll-arrow${scrolled ? ' hidden' : ''}`}>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M1 1L10 10L19 1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
