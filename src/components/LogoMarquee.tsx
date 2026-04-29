"use client";

import Image from "next/image";
import styles from "./LogoMarquee.module.css";

type LogoEntry = {
  src: string;
  alt: string;
  treatment?: "invert";
};

const logos: LogoEntry[] = [
  { src: "/animoca-brands.svg", alt: "Animoca Brands" },
  { src: "/sonic.svg", alt: "Sonic" },
  { src: "/ton.svg", alt: "TON" },
  { src: "/unagi.svg", alt: "Unagi" },
  { src: "/D3_Black_Text_Logo.jpg", alt: "D3" },
  { src: "/EDU Chain.png", alt: "EDU Chain" },
  { src: "/doodle-logo_vertical.jpg", alt: "Doodle" },
  { src: "/Kudoswap.jpg", alt: "Kudoswap", treatment: "invert" },
];

export default function LogoMarquee() {
  const doubled = [...logos, ...logos];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(10,10,10,0.08)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
        background: "var(--bright-white)",
      }}
    >
      <div className={styles.track}>
        {doubled.map((logo, i) => {
          const treatmentClass = logo.treatment ? styles[`treatment-${logo.treatment}`] : undefined;
          return (
            <div key={i} className={styles.item}>
              <div className={treatmentClass}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={36}
                  style={{ width: "auto", height: "36px", maxWidth: "140px", objectFit: "contain" }}
                  unoptimized
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
