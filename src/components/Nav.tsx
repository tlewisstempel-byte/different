"use client";

import Link from "next/link";
import { useState } from "react";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--carbon)",
        opacity: hovered ? 1 : 0.45,
        transition: "opacity 200ms ease-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          background: "var(--bright-white)",
          borderBottom: "1px solid rgba(10,10,10,0.10)",
          padding: "14px 24px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-grotesk)",
            fontWeight: 700,
            fontSize: "15px",
            color: "var(--carbon)",
          }}
        >
          different
        </Link>

        <div
          className="desktop-only"
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <NavLink href="/companies">Companies</NavLink>
          <NavLink href="/creators">Creators</NavLink>
        </div>

        <button
          className="mobile-only"
          onClick={() => setOpen(true)}
          style={{
            background: "none",
            border: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "18px",
            color: "var(--carbon)",
            lineHeight: 1,
            padding: 0,
          }}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--carbon)",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "none",
              border: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "20px",
              color: "var(--bright-white)",
              lineHeight: 1,
              padding: 0,
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
          <Link
            href="/companies"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 700,
              fontSize: "28px",
              color: "var(--bright-white)",
            }}
          >
            Companies
          </Link>
          <Link
            href="/creators"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 700,
              fontSize: "28px",
              color: "var(--bright-white)",
            }}
          >
            Creators
          </Link>
        </div>
      )}
    </>
  );
}
