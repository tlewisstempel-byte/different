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
    desc: "Briefing, scheduling and management. Handled.",
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
  const [stripIn, setStripIn] = useState(false);
  const [cdMuted, setCdMuted] = useState(false);
  const [nodeActive, setNodeActive] = useState([false, false, false, false, false]);
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

          // t=0: strip fades in
          setStripIn(true);

          // t=200: C and D appear muted
          setTimeout(() => setCdMuted(true), 200);

          // t=800: A→blue, t=900: B→blue, t=1000: E→blue
          [0, 1, 4].forEach((idx, order) => {
            setTimeout(() => {
              setNodeActive((prev) => {
                const n = [...prev];
                n[idx] = true;
                return n;
              });
            }, 800 + order * 100);
          });

          // t=1200: C and D → blue simultaneously
          setTimeout(() => {
            setNodeActive((prev) => {
              const n = [...prev];
              n[2] = true;
              n[3] = true;
              return n;
            });
          }, 1200);

          // t=1450–1850: connectors A-B, B-C, C-D, D-E staggered 150ms
          [0, 1, 2, 3].forEach((i) => {
            setTimeout(() => {
              setConnectors((prev) => {
                const n = [...prev] as [boolean, boolean, boolean, boolean];
                n[i] = true;
                return n;
              });
            }, 1450 + i * 150);
          });

          // t=2100–2420: labels A→E staggered 80ms
          nodes.forEach((_, i) => {
            setTimeout(() => {
              setLabels((prev) => {
                const n = [...prev] as [boolean, boolean, boolean, boolean, boolean];
                n[i] = true;
                return n;
              });
            }, 2100 + i * 80);
          });

          // t=2650: legend
          setTimeout(() => setLegendVisible(true), 2650);
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
      style={{
        background: "#F5F4F0",
        padding: "72px 0 80px",
        borderTop: "1px solid rgba(10,10,10,0.08)",
        opacity: stripIn ? 1 : 0,
        transform: stripIn ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    >
      <Container>
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.13em",
            color: "#1A3EFF",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          How We Run Campaigns
        </p>

        {/* Strip */}
        <div className="process-scroll-wrapper" style={{ overflowX: "auto", paddingBottom: "4px" }}>
          <div
            className="process-strip"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              minWidth: "672px",
            }}
          >
            {nodes.map((node, i) => {
              const isBlue = nodeActive[i];
              const isMuted = (i === 2 || i === 3) && cdMuted && !isBlue;
              const circleOpacity = isBlue ? 1 : isMuted ? 0.35 : 0;

              return (
                <div
                  key={node.id}
                  className="ae-outer"
                  style={{ display: "flex", alignItems: "flex-start" }}
                >
                  {/* Node */}
                  <div
                    className="ae-node-wrap"
                    style={{
                      width: "96px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Circle */}
                    <div
                      className="ae-circle"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: `1.5px solid ${isBlue ? "#1A3EFF" : "rgba(10,10,10,0.15)"}`,
                        background: isBlue ? "rgba(26,62,255,0.05)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: circleOpacity,
                        transition: "border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease",
                        marginBottom: "12px",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "13px",
                          color: isBlue ? "#1A3EFF" : "#888",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {node.id}
                      </span>
                    </div>

                    {/* Text block */}
                    <div className="ae-text-block">
                      <p
                        className="ae-title"
                        style={{
                          fontFamily: "var(--font-grotesk)",
                          fontWeight: 500,
                          fontSize: "11px",
                          textAlign: "center",
                          maxWidth: "88px",
                          margin: "0 0 4px",
                          lineHeight: 1.4,
                          opacity: labels[i] ? 1 : 0,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        {node.title}
                      </p>

                      <p
                        className="ae-desc"
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
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        {node.desc}
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  {i < 4 && (
                    <div
                      className="ae-connector"
                      style={{
                        width: "48px",
                        height: "2px",
                        background: isBlue ? "#1A3EFF" : "rgba(10,10,10,0.15)",
                        flexShrink: 0,
                        marginTop: "21px",
                        opacity: connectors[i] ? 1 : 0,
                        transition: "opacity 0.2s ease, background-color 0.3s ease",
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
          className="process-legend"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            marginTop: "28px",
            flexWrap: "wrap",
            opacity: legendVisible ? 1 : 0,
            transition: "opacity 0.5s ease-out",
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
