"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
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
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className="nav-root"
      style={{
        background: "var(--bright-white)",
        borderBottom: "1px solid rgba(10,10,10,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ flex: 1, textAlign: "left" }}>
        <NavLink href="/companies">Companies</NavLink>
      </div>

      <div style={{ flex: 1, textAlign: "center" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-grotesk)",
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
            opacity: isHome ? 0.35 : 1,
            pointerEvents: isHome ? "none" : "auto",
            transition: "opacity 200ms ease-out",
            display: "inline-block",
          }}
        >
          different
        </Link>
      </div>

      <div style={{ flex: 1, display: "flex", gap: "20px", justifyContent: "flex-end" }}>
        <NavLink href="/roster">Roster</NavLink>
        <NavLink href="/apply">Applications</NavLink>
      </div>
    </nav>
  );
}
