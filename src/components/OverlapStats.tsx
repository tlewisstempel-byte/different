"use client";

import { useState, useEffect, useRef } from "react";
import Container from "./Container";

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(
  from: number,
  to: number,
  duration: number,
  onUpdate: (val: number) => void,
  onComplete?: () => void
) {
  const start = performance.now();
  function frame(now: number) {
    const t = Math.min((now - start) / duration, 1);
    onUpdate(Math.round(from + (to - from) * easeOut(t)));
    if (t < 1) requestAnimationFrame(frame);
    else onComplete?.();
  }
  requestAnimationFrame(frame);
}

export default function OverlapStats() {
  const [leftVal, setLeftVal] = useState(0);
  const [rightVal, setRightVal] = useState(60);
  const [prefixVisible, setPrefixVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          animateCounter(0, 60, 1600, setLeftVal);
          animateCounter(60, 30, 1600, setRightVal, () =>
            setPrefixVisible(true)
          );
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.13em",
    color: "#aaa",
    marginBottom: "16px",
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: "var(--font-grotesk)",
    fontWeight: 400,
    fontSize: "13px",
    color: "#888",
    maxWidth: "180px",
    margin: "0 auto",
    lineHeight: 1.5,
  };

  return (
    <section
      ref={ref}
      style={{
        background: "#F5F4F0",
        padding: "80px 0",
        borderTop: "1px solid rgba(10,10,10,0.08)",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {/* Left — Industry Average */}
          <div
            style={{
              flex: 1,
              minWidth: "240px",
              textAlign: "center",
              paddingRight: "48px",
            }}
          >
            <p style={labelStyle}>Industry Average</p>
            <p
              style={{
                fontFamily: "var(--font-grotesk)",
                fontWeight: 700,
                fontSize: "80px",
                color: "var(--carbon)",
                opacity: 0.18,
                lineHeight: 1,
                marginBottom: "16px",
              }}
            >
              {leftVal}%
            </p>
            <p style={bodyStyle}>
              Audience overlap on a typical web3 KOL campaign.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              background: "rgba(10,10,10,0.08)",
              flexShrink: 0,
            }}
          />

          {/* Right — The Different Promise */}
          <div
            style={{
              flex: 1,
              minWidth: "240px",
              textAlign: "center",
              paddingLeft: "48px",
            }}
          >
            <p style={labelStyle}>The Different Promise</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                lineHeight: 1,
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 700,
                  fontSize: "36px",
                  color: "var(--carbon)",
                  position: "relative",
                  top: "-10px",
                  opacity: prefixVisible ? 0.6 : 0,
                  transition: "opacity 300ms ease-out",
                }}
              >
                &lt;
              </span>
              <span
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 700,
                  fontSize: "80px",
                  color: "var(--carbon)",
                  lineHeight: 1,
                }}
              >
                {rightVal}%
              </span>
            </div>
            <p style={bodyStyle}>
              Our target for audience overlap on every campaign.
            </p>
          </div>
        </div>

        {/* Source note */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#bbb",
            textAlign: "center",
            marginTop: "28px",
          }}
        >
          Based on cross-analysis of web3 KOL campaigns. NeoReach, VAIX case
          studies.
        </p>
      </Container>
    </section>
  );
}
