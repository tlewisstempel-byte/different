"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Link from "next/link";
import { useState } from "react";

function SectionLabel({ text, color }: { text: string; color?: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: color || "#1A3EFF",
        marginBottom: "10px",
      }}
    >
      {text}
    </p>
  );
}

function FeatureDot() {
  return (
    <span
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "var(--carbon)",
        flexShrink: 0,
        marginTop: "4px",
        display: "inline-block",
      }}
    />
  );
}

export default function CompaniesContent() {
  const [showTable, setShowTable] = useState(true);

  return (
    <>
      <Nav />

      {/* Intro */}
      <section style={{ padding: "32px 0 24px" }}>
        <Container>
          <SectionLabel text="For Companies" />
          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.55,
              maxWidth: "520px",
            }}
          >
            All three different packages include audience deduplication and full
            campaign execution. Want more? Then think{" "}
            <strong>different</strong> or <strong>pro.</strong>
          </p>
        </Container>
      </section>

      {/* Package Cards */}
      <section style={{ padding: "4px 0 0" }}>
        <Container>
          <div
            className="responsive-grid-cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            {/* Card: Core */}
            <div className="package-card">
              <SectionLabel text="Different Core" />
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: 1,
                  marginBottom: "5px",
                }}
              >
                Core
              </p>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 400,
                  fontSize: "12px",
                  fontStyle: "italic",
                  opacity: 0.42,
                  marginBottom: "14px",
                }}
              >
                Full execution, verified reach.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 500,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                $5,000 - $15,000 USD
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  minHeight: "120px",
                  marginBottom: "20px",
                }}
              >
                {[
                  { text: "Audience deduplication", bold: false },
                  { text: "End-to-end campaign service", bold: false },
                  { text: "Performance report", bold: true },
                ].map(({ text, bold }) => (
                  <li
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "9px",
                      padding: "3px 0",
                      fontSize: "13px",
                      fontWeight: bold ? 700 : 400,
                    }}
                  >
                    <FeatureDot />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="card-btn-outline">Get Core</Link>
            </div>

            {/* Card: Different */}
            <div className="package-card">
              <SectionLabel text="Different" />
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: 1,
                  marginBottom: "5px",
                }}
              >
                Different
              </p>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 400,
                  fontSize: "12px",
                  fontStyle: "italic",
                  opacity: 0.42,
                  marginBottom: "14px",
                }}
              >
                <strong>core</strong>, plus proof it worked.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 500,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                $15,000 - $30,000 USD
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  minHeight: "120px",
                  marginBottom: "20px",
                }}
              >
                {[
                  { text: "Audience deduplication", bold: false },
                  { text: "End-to-end campaign service", bold: false },
                  { text: "Brand lift surveys + report", bold: true },
                ].map(({ text, bold }) => (
                  <li
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "9px",
                      padding: "3px 0",
                      fontSize: "13px",
                      fontWeight: bold ? 700 : 400,
                    }}
                  >
                    <FeatureDot />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="card-btn-outline">Get Different</Link>
            </div>

            {/* Card: Pro — permanent blue border */}
            <div
              className="package-card"
              style={{
                border: "1px solid #1A3EFF",
                boxShadow: "0 0 0 1px #1A3EFF",
              }}
            >
              <SectionLabel text="Different Pro" color="var(--klein-blue)" />
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: 1,
                  color: "var(--carbon)",
                  marginBottom: "5px",
                }}
              >
                Pro
              </p>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 400,
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "var(--carbon)",
                  opacity: 0.42,
                  marginBottom: "14px",
                }}
              >
                <strong>different</strong>, plus native ads.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "var(--carbon)",
                  marginBottom: "16px",
                }}
              >
                $30,000 - $50,000+ USD
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  minHeight: "120px",
                  marginBottom: "20px",
                }}
              >
                {[
                  { text: "Audience deduplication", bold: false },
                  { text: "End-to-end campaign service", bold: false },
                  { text: "Brand lift surveys + report", bold: false },
                  { text: "Native creator ads", bold: true },
                ].map(({ text, bold }) => (
                  <li
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "9px",
                      padding: "3px 0",
                      fontSize: "13px",
                      fontWeight: bold ? 700 : 400,
                      color: "var(--carbon)",
                    }}
                  >
                    <FeatureDot />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="card-btn-filled">Get Pro</Link>
            </div>
          </div>

          {/* Compare packages toggle */}
          <div style={{ padding: "24px 0 0", textAlign: "center" }}>
            <button
              onClick={() => setShowTable((v) => !v)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                border: "1px solid rgba(10,10,10,0.25)",
                background: "transparent",
                color: "var(--carbon)",
                padding: "8px 20px",
                display: "block",
                margin: "0 auto 28px",
                cursor: "pointer",
                transition: "opacity 200ms ease-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {showTable ? "Hide comparison" : "Compare packages"}
            </button>

            {/* Comparison Table */}
            {showTable && (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        opacity: 0.38,
                        padding: "8px 10px",
                        borderBottom: "1px solid rgba(10,10,10,0.10)",
                        textAlign: "left",
                        fontWeight: 400,
                      }}
                    />
                    {["Core", "Different", "Pro"].map((h) => (
                      <th
                        key={h}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          opacity: 0.38,
                          padding: "8px 10px",
                          borderBottom: "1px solid rgba(10,10,10,0.10)",
                          textAlign: "center",
                          fontWeight: 400,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Audience deduplication",
                      core: true,
                      diff: true,
                      pro: true,
                    },
                    {
                      feature: "End-to-end execution",
                      core: true,
                      diff: true,
                      pro: true,
                    },
                    {
                      feature: "Brand lift surveys",
                      core: false,
                      diff: true,
                      pro: true,
                    },
                    {
                      feature: "Native creator ads",
                      core: false,
                      diff: false,
                      pro: true,
                    },
                  ].map(({ feature, core, diff, pro }, i, arr) => (
                    <tr key={feature}>
                      <td
                        style={{
                          padding: "10px 10px",
                          borderBottom:
                            i < arr.length - 1
                              ? "1px solid rgba(10,10,10,0.06)"
                              : "none",
                          opacity: 0.75,
                          fontFamily: "var(--font-grotesk)",
                        }}
                      >
                        {feature}
                      </td>
                      {[
                        { val: core, blue: false },
                        { val: diff, blue: false },
                        { val: pro, blue: true },
                      ].map(({ val, blue }, ci) => (
                        <td
                          key={ci}
                          style={{
                            padding: "10px 10px",
                            borderBottom:
                              i < arr.length - 1
                                ? "1px solid rgba(10,10,10,0.06)"
                                : "none",
                            textAlign: "center",
                            color:
                              blue && val ? "var(--klein-blue)" : "inherit",
                            opacity: val ? 0.75 : 0.22,
                          }}
                        >
                          {val ? "✓" : "–"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Container>
      </section>

      {/* Ambassador Programme */}
      <section style={{ background: "var(--stone)", padding: "32px 0" }}>
        <Container>
          <SectionLabel text="Add-On" />
          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 700,
              fontSize: "18px",
              marginBottom: "8px",
            }}
          >
            Ambassador Programme
          </p>
          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: 1.65,
              opacity: 0.68,
              maxWidth: "500px",
              marginBottom: "12px",
            }}
          >
            Dynamic creator tiers and automated scoring. A creator team that
            gets more efficient month on month, aligned with your brand
            long-term.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8.5px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              opacity: 0.38,
            }}
          >
            Available alongside any package. Pricing varies by scope. Ask us.
          </p>
        </Container>
      </section>

      {/* How It Works */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "44px 0",
          borderTop: "1px solid rgba(10,10,10,0.08)",
          borderBottom: "1px solid rgba(10,10,10,0.08)",
        }}
      >
        <Container>
          <SectionLabel text="How It Works" />
          <div
            className="responsive-grid-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "18px",
            }}
          >
            {[
              {
                num: "01",
                title: "Pick your package",
                body: <>Choose <strong>core</strong>, <strong>different</strong>, or <strong>pro</strong>.</>,
              },
              {
                num: "02",
                title: "We brief, you approve",
                body: "Campaign lead assigned within 24 hours.",
              },
              {
                num: "03",
                title: "Creators go live",
                body: "Coordination and scheduling handled entirely.",
              },
              {
                num: "04",
                title: "You see what worked",
                body: <>Performance data at close. Insight report on <strong>different</strong> and <strong>pro</strong>.</>,
              },
            ].map(({ num, title, body }) => (
              <div key={num}>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 700,
                    fontSize: "40px",
                    color: "#1A3EFF",
                    lineHeight: 1,
                    marginBottom: "10px",
                  }}
                >
                  {num}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 700,
                    fontSize: "13px",
                    marginBottom: "5px",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 400,
                    fontSize: "12px",
                    opacity: 0.48,
                    lineHeight: 1.6,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why We're Different */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "44px 0",
          borderBottom: "1px solid rgba(10,10,10,0.08)",
        }}
      >
        <Container>
          <SectionLabel text="Why We're Different" />
          <div
            className="responsive-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "28px 48px",
              textAlign: "left",
            }}
          >
            {[
              {
                title: "Real reach, by design.",
                body: "Audience deduplication on every campaign. Overlap cut to sub-30%. The number we quote is the number you get - no recycled impressions.",
              },
              {
                title: "Proof the campaign moved people.",
                body: <><strong>different</strong> and <strong>pro</strong> tiers both offer brand lift surveys at campaign close. We measure product understanding and sentiment shift in the actual audience, not vanity metrics.</>,
              },
              {
                title: "A new way of distributing creatives.",
                body: <>On <strong>pro</strong> campaigns, we produce the creative. Creators distribute it in their own voice, through their own channels - reaching paid media scale without it looking like paid media.</>,
              },
              {
                title: "Built to last beyond the campaign.",
                body: "Our ambassador programmes offer dynamic tiers and automated scoring - an increasingly efficient influencer team aligned with your vision, month-to-month.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 700,
                    fontSize: "15px",
                    marginBottom: "7px",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: 1.7,
                    opacity: 0.62,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "var(--carbon)",
          color: "#ffffff",
          padding: "52px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              opacity: 0.35,
              color: "#ffffff",
              marginBottom: "18px",
            }}
          >
            Work With Us
          </p>
          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 700,
              fontSize: "30px",
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            if this sounds like you
          </p>
          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 400,
              fontSize: "14px",
              opacity: 0.52,
              color: "#ffffff",
              marginBottom: "32px",
            }}
          >
            tell us what you&apos;re building. we&apos;ll tell you if
            we&apos;re the right fit.
          </p>

          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              background: "var(--bright-white)",
              color: "var(--carbon)",
              border: "none",
              padding: "12px 32px",
              borderRadius: "4px",
              display: "inline-block",
              textDecoration: "none",
              transition: "opacity 200ms",
            }}
          >
            Get Different
          </Link>
        </Container>
      </section>

      <Footer />
    </>
  );
}
