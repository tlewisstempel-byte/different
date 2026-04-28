'use client';

import Image from 'next/image';
import styles from './LogoMarquee.module.css';

const logos = [
  { src: '/logos/animoca-brands.svg', alt: 'Animoca Brands', treatment: 'standard' },
  { src: '/logos/ton.svg', alt: 'TON', treatment: 'standard' },
  { src: '/logos/sonic.svg', alt: 'Sonic', treatment: 'standard' },
  { src: '/logos/unagi.svg', alt: 'Unagi', treatment: 'standard' },
  { src: '/logos/doodles.png', alt: 'Doodles', treatment: 'multiply' },
  { src: '/logos/kudoswap.png', alt: 'Kudoswap', treatment: 'screen' },
  { src: '/logos/edu-chain.png', alt: 'EDU Chain', treatment: 'multiply' },
  { src: '/logos/d3.jpg', alt: 'D3', treatment: 'multiply' },
];

export default function LogoMarquee() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>Who we&apos;ve worked with</span>
      <div className={styles.overflow}>
        <div className={styles.track}>
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className={`${styles.item} ${styles[`treatment-${logo.treatment}`]}`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
