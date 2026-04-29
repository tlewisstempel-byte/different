'use client';

import Image from 'next/image';
import styles from './LogoMarquee.module.css';

const logos = [
  { src: '/animoca-brands.svg', alt: 'Animoca Brands', treatment: 'standard' },
  { src: '/ton.svg', alt: 'TON', treatment: 'standard' },
  { src: '/sonic.svg', alt: 'Sonic', treatment: 'standard' },
  { src: '/unagi.svg', alt: 'Unagi', treatment: 'standard' },
  { src: '/doodle-logo_vertical.jpg', alt: 'Doodles', treatment: 'multiply' },
  { src: '/Kudoswap.jpg', alt: 'Kudoswap', treatment: 'invert' },
  { src: '/EDU Chain.png', alt: 'EDU Chain', treatment: 'multiply' },
  { src: '/D3_Black_Text_Logo.jpg', alt: 'D3', treatment: 'multiply' },
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
                width={140}
                height={36}
                style={{ width: 'auto', height: '36px', maxWidth: '140px', objectFit: 'contain' }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
