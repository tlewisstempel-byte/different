"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
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
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isMobile ? ["start 90%", "end 40%"] : ["start 80%", "end 60%"],
  });

  // Step opacities and y transforms
  const opacityA = useTransform(scrollYProgress, [0.0, 0.12], [0, 1]);
  const yA = useTransform(scrollYProgress, [0.0, 0.12], [16, 0]);

  const opacityB = useTransform(scrollYProgress, [0.22, 0.34], [0, 1]);
  const yB = useTransform(scrollYProgress, [0.22, 0.34], [16, 0]);

  const opacityC = useTransform(scrollYProgress, [0.44, 0.56], [0, 1]);
  const yC = useTransform(scrollYProgress, [0.44, 0.56], [16, 0]);

  const opacityD = useTransform(scrollYProgress, [0.66, 0.78], [0, 1]);
  const yD = useTransform(scrollYProgress, [0.66, 0.78], [16, 0]);

  const opacityE = useTransform(scrollYProgress, [0.88, 1.0], [0, 1]);
  const yE = useTransform(scrollYProgress, [0.88, 1.0], [16, 0]);

  // Connector scale transforms
  const scaleAB = useTransform(scrollYProgress, [0.10, 0.25], [0, 1]);
  const scaleBC = useTransform(scrollYProgress, [0.32, 0.46], [0, 1]);
  const scaleCD = useTransform(scrollYProgress, [0.54, 0.68], [0, 1]);
  const scaleDE = useTransform(scrollYProgress, [0.76, 0.90], [0, 1]);

  const stepMotion = [
    { opacity: opacityA, y: yA },
    { opacity: opacityB, y: yB },
    { opacity: opacityC, y: yC },
    { opacity: opacityD, y: yD },
    { opacity: opacityE, y: yE },
  ];
  const connectorScales = [scaleAB, scaleBC, scaleCD, scaleDE];

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#F5F4F0",
        padding: "72px 0 80px",
        borderTop: "1px solid rgba(10,10,10,0.08)",
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
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className="ae-outer"
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                {/* Node */}
                <motion.div
                  className="ae-node-wrap"
                  style={{
                    width: "96px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: stepMotion[i].opacity,
                    y: stepMotion[i].y,
                  }}
                >
                  {/* Circle */}
                  <div
                    className="ae-circle"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "1.5px solid #1A3EFF",
                      background: "rgba(26,62,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        color: "#1A3EFF",
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
                      }}
                    >
                      {node.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Connector */}
                {i < 4 && (
                  <motion.div
                    className="ae-connector"
                    style={{
                      width: "48px",
                      height: "2px",
                      background: "#1A3EFF",
                      flexShrink: 0,
                      marginTop: "21px",
                      scaleX: isMobile ? 1 : connectorScales[i],
                      scaleY: isMobile ? connectorScales[i] : 1,
                      transformOrigin: isMobile ? "top center" : "left center",
                    }}
                  />
                )}
              </div>
            ))}
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
