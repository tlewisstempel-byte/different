'use client';

import Image from 'next/image';
import styles from './LogoMarquee.module.css';

const logos = [
  { src: '/animoca-brands.svg', alt: 'Animoca Brands', treatment: 'standard', url: 'https://www.animocabrands.com' },
  { src: '/ton.svg', alt: 'TON', treatment: 'standard', url: 'https://ton.org' },
  { src: '/sonic.svg', alt: 'Sonic', treatment: 'standard', url: 'https://www.soniclabs.com' },
  { src: '/unagi.svg', alt: 'Unagi', treatment: 'standard', url: 'https://www.unagi.games' },
  { src: '/doodle-logo_vertical.jpg', alt: 'Doodles', treatment: 'multiply', url: 'https://doodles.app' },
  { src: '/EDU Chain.png', alt: 'EDU Chain', treatment: 'multiply', url: 'https://opencampus.xyz' },
  { src: '/D3_Black_Text_Logo.jpg', alt: 'D3', treatment: 'multiply', url: 'https://d3.com' },
];

function LogoBlock() {
  return (
    <div className={styles.block}>
      {logos.map((logo, i) => (
        <a
          key={i}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.item} ${styles[`treatment-${logo.treatment}`]}`}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={36}
            style={{ width: 'auto', height: '36px', maxWidth: '140px', objectFit: 'contain' }}
            unoptimized
          />
        </a>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>Who we&apos;ve worked with</span>
      <div className={styles.overflow}>
        <LogoBlock />
        <LogoBlock />
      </div>
      <div className={styles.cta}>
        <a href="/roster" className={styles.ctaButton}>VIEW ROSTER</a>
      </div>
    </section>
  );
}
