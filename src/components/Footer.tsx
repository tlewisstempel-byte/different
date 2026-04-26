import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bright-white)",
        borderTop: "1px solid rgba(10,10,10,0.10)",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 700,
          fontSize: "14px",
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        different
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          opacity: 0.35,
          margin: 0,
        }}
      >
        a Compound agency
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          opacity: 0.3,
          margin: 0,
        }}
      >
        &copy; 2026
      </p>
      <div style={{ display: "flex", gap: "20px", marginTop: "4px" }}>
        {[
          { label: "Companies", href: "/companies", external: false },
          { label: "Creators", href: "/creators", external: false },
          {
            label: "X ↗",
            href: "https://x.com/adifferentagency",
            external: true,
          },
        ].map(({ label, href, external }) => (
          <Link
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              opacity: 0.45,
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
