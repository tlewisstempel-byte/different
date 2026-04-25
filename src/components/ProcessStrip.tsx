"use client";

import { useState, useEffect, useRef } from "react";
import Container from "./Container";

const nodes = [
  {
    id: "A",
    title: "Audience",
    desc: "We map reach, overlap and audience quality before spending a single pound",
  },
  {
    id: "B",
    title: "Brief + strategy",
    desc: "Campaign architecture built around verified audiences, not available slots",
  },
  {
    id: "C",
    title: "Creator coordination",
    desc: "Briefing, scheduling and creator management handled end-to-end",
  },
  {
    id: "D",
    title: "Campaign execution",
    desc: "Live monitoring, optimisation and reporting throughout",
  },
  {
    id: "E",
    title: "Evidence",
    desc: "We measure sentiment and understanding to evidence next steps",
  },
];

export default function ProcessStrip() {
  const [triggered, setTriggered] = useState(false);
  const [allActive, setAllActive] = useState(false);
  const [connectors, setConnectors] = useState([false, false, false, false]);
  const [labels, setLabels] = useState([false, false, false, false, false]);
  const [legendVisible, setLegendVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          setTriggered(true);

          // 700ms: all nodes + connectors → active blue
          setTimeout(() => setAllActive(true), 700);

          // 1000ms: connectors reveal A-B, B-C, C-D, D-E, 200ms apart
          [0, 1, 2, 3].forEach((i) => {
            setTimeout(() => {
              setConnectors((prev) => {
                const next = [...prev] as [boolean, boolean, boolean, boolean];
                next[i] = true;
                return next;
              });
            }, 1000 + i * 200);
          });

          // 1800ms: labels fade in A→E, 80ms apart
          nodes.forEach((_, i) => {
            setTimeout(() => {
              setLabels((prev) => {
                const next = [...prev] as [
                  boolean,
                  boolean,
                  boolean,
                  boolean,
                  boolean,
                ];
                next[i] = true;
                return next;
              });
            }, 1800 + i * 80);
          });

          // 2820ms: legend
          setTimeout(() => setLegendVisible(true), 2820);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section
      ref={ref}
      style={{ background: "#F5F4F0", padding: "72px 0 80px" }}
    >
      <Container>
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.13em",
            color: "#aaa",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          How We Run Campaigns
        </p>

        {/* Strip — horizontally scrollable on small screens */}
        <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              minWidth: "672px",
            }}
          >
            {nodes.map((node, i) => {
              const isCOrD = i === 2 || i === 3;
              const circleOpacity = !triggered
                ? 0
                : allActive
                  ? 1
                  : isCOrD
                    ? 0.4
                    : 0;
              const isBlue = allActive;

              return (
                <div
                  key={node.id}
                  style={{ display: "flex", alignItems: "flex-start" }}
                >
                  {/* Node */}
                  <div
                    style={{
                      width: "96px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Circle */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: `1.5px solid ${isBlue ? "#1A3EFF" : "rgba(10,10,10,0.15)"}`,
                        background: isBlue
                          ? "rgba(26,62,255,0.05)"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: circleOpacity,
                        transition:
                          "opacity 300ms ease-out, border-color 400ms ease-out, background 400ms ease-out",
                        marginBottom: "12px",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "13px",
                          color: isBlue ? "#1A3EFF" : "#888",
                          transition: "color 400ms ease-out",
                        }}
                      >
                        {node.id}
                      </span>
                    </div>

                    {/* Title */}
                    <p
                      style={{
                        fontFamily: "var(--font-grotesk)",
                        fontWeight: 500,
                        fontSize: "11px",
                        textAlign: "center",
                        maxWidth: "88px",
                        margin: "0 0 4px",
                        lineHeight: 1.4,
                        opacity: labels[i] ? 1 : 0,
                        transition: "opacity 400ms ease-out",
                      }}
                    >
                      {node.title}
                    </p>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-grotesk)",
                        fontWeight: 400,
                        fontSize: "10px",
                        color: "#888",
                        textAlign: "center",
                        maxWidth: "88px",
                        lineHeight: 1.4,
                        margin: 0,
                        opacity: labels[i] ? 1 : 0,
                        transition: "opacity 400ms ease-out",
                      }}
                    >
                      {node.desc}
                    </p>
                  </div>

                  {/* Connector */}
                  {i < 4 && (
                    <div
                      style={{
                        width: "48px",
                        height: "2px",
                        background: isBlue
                          ? "#1A3EFF"
                          : "rgba(10,10,10,0.15)",
                        flexShrink: 0,
                        marginTop: "21px",
                        opacity: connectors[i] ? 1 : 0,
                        transition:
                          "opacity 200ms ease-out, background 400ms ease-out",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            marginTop: "28px",
            flexWrap: "wrap",
            opacity: legendVisible ? 1 : 0,
            transition: "opacity 500ms ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid rgba(140,140,140,0.4)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.05em",
                color: "#888",
              }}
            >
              Most agencies: C to D only
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid #1A3EFF",
                background: "rgba(26,62,255,0.1)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.05em",
                color: "#888",
              }}
            >
              Different: A to E
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
