"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useForm } from "@formspree/react";
import { useState } from "react";

function SectionLabel({ text, color }: { text: string; color?: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: color || "var(--carbon)",
        opacity: color ? 1 : 0.38,
        marginBottom: "10px",
      }}
    >
      {text}
    </p>
  );
}

function FeatureDot({ blue }: { blue?: boolean }) {
  return (
    <span
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: blue ? "var(--klein-blue)" : "var(--carbon)",
        flexShrink: 0,
        marginTop: "4px",
        display: "inline-block",
      }}
    />
  );
}

type ProAccent = "border" | "tint" | "none";

function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
  const [state, handleSubmit] = useForm(endpoint);

  if (state.succeeded) {
    return (
      <p
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 400,
          fontSize: "16px",
          color: "#ffffff",
          textAlign: "center",
          opacity: 0.9,
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        Message sent. We&apos;ll be in touch.
      </p>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "transparent",
    color: "#ffffff",
    marginBottom: "12px",
    borderRadius: 0,
    outline: "none",
    display: "block",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "480px", margin: "0 auto", textAlign: "left" }}
    >
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        style={inputStyle}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")
        }
      />
      <input
        type="text"
        name="company"
        placeholder="Company name"
        style={inputStyle}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")
        }
      />
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        style={inputStyle}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")
        }
      />
      <textarea
        name="message"
        placeholder="Tell us what you're building."
        required
        rows={5}
        style={{ ...inputStyle, resize: "vertical", marginBottom: "16px" }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")
        }
      />
      <button
        type="submit"
        disabled={state.submitting}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          background: "var(--bright-white)",
          color: "var(--carbon)",
          border: "none",
          padding: "12px 28px",
          width: "100%",
          cursor: "pointer",
          transition: "opacity 200ms",
          opacity: state.submitting ? 0.6 : 1,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.opacity = state.submitting ? "0.6" : "1")
        }
      >
        Send
      </button>
    </form>
  );
}

export default function Companies() {
  const [proAccent, setProAccent] = useState<ProAccent>("none");
  const [showTable, setShowTable] = useState(true);
  const [showPricing, setShowPricing] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const proCardStyle: React.CSSProperties = {
    ...(proAccent === "border"
      ? { borderColor: "#1A3EFF", boxShadow: "0 0 0 1px #1A3EFF" }
      : proAccent === "tint"
        ? { background: "rgba(26,62,255,0.04)" }
        : {}),
  };

  return (
    <>
      <Nav />

      {/* Intro */}
      <section style={{ padding: "32px 24px 24px" }}>
        <SectionLabel text="For Companies" />
        <p
          style={{
            fontFamily: "var(--font-grotesk)",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: 1.55,
            maxWidth: "520px",
            marginBottom: 0,
          }}
        >
          All three Different packages include audience deduplication and full
          campaign execution. Want more? Then think{" "}
          <strong>Different</strong> or <strong>Pro.</strong>
        </p>
      </section>

      {/* Package Cards */}
      <section style={{ padding: "4px 24px 28px" }}>
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
            {showPricing && (
              <p
                id="price-core"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 500,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                $5,000 - $15,000 USD
              </p>
            )}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                flex: 1,
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
            <button className="card-btn-outline">Get Core</button>
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
              Core, plus proof it worked.
            </p>
            {showPricing && (
              <p
                id="price-different"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 500,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                $15,000 - $30,000 USD
              </p>
            )}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                flex: 1,
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
            <button className="card-btn-outline">Get Different</button>
          </div>

          {/* Card: Pro */}
          <div className="package-card" style={proCardStyle}>
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
              Different, plus native ads.
            </p>
            {showPricing && (
              <p
                id="price-pro"
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
            )}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                flex: 1,
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
            <button className="card-btn-filled">Get Pro</button>
          </div>
        </div>
      </section>

      {/* Interactive Controls */}
      <section
        style={{
          padding: "14px 24px",
          borderTop: "1px solid rgba(10,10,10,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "10px 12px",
            alignItems: "center",
          }}
        >
          {/* Pro Accent */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8.5px",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              opacity: 0.5,
            }}
          >
            Pro Accent
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {(["border", "tint", "none"] as ProAccent[]).map((val) => (
              <button
                key={val}
                className={`control-btn${proAccent === val ? " active" : ""}`}
                onClick={() => setProAccent(val)}
              >
                {val === "border"
                  ? "Blue border"
                  : val === "tint"
                    ? "Blue tint"
                    : "None"}
              </button>
            ))}
          </div>

          {/* Table */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8.5px",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              opacity: 0.5,
            }}
          >
            Table
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {[true, false].map((val) => (
              <button
                key={String(val)}
                className={`control-btn${showTable === val ? " active" : ""}`}
                onClick={() => setShowTable(val)}
              >
                {val ? "Show" : "Hide"}
              </button>
            ))}
          </div>

          {/* Pricing */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8.5px",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              opacity: 0.5,
            }}
          >
            Pricing
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {[true, false].map((val) => (
              <button
                key={String(val)}
                className={`control-btn${showPricing === val ? " active" : ""}`}
                onClick={() => setShowPricing(val)}
              >
                {val ? "Show" : "Hide"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {showTable && (
        <section style={{ padding: "0 24px 36px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
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
                        color: blue && val ? "var(--klein-blue)" : "inherit",
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
        </section>
      )}

      {/* Ambassador Programme */}
      <section
        style={{ background: "var(--stone)", padding: "32px 24px" }}
      >
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
          Dynamic creator tiers and automated scoring. A creator team that gets
          more efficient month on month, aligned with your brand long-term.
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
      </section>

      {/* How It Works */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "44px 24px",
          borderTop: "1px solid rgba(10,10,10,0.08)",
          borderBottom: "1px solid rgba(10,10,10,0.08)",
        }}
      >
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
              body: "Choose Core, Different, or Pro.",
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
              body: "Performance data at close. Insight report on Different and Pro.",
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
      </section>

      {/* Why We're Different */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "44px 24px",
          borderBottom: "1px solid rgba(10,10,10,0.08)",
        }}
      >
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
              body: "Different and Pro tiers both offer brand lift surveys at campaign close. We measure product understanding and sentiment shift in the actual audience, not vanity metrics.",
            },
            {
              title: "A new way of distributing creatives.",
              body: "On Pro campaigns, we produce the creative. Creators distribute it in their own voice, through their own channels - reaching paid media scale without it looking like paid media.",
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
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "var(--carbon)",
          color: "#ffffff",
          padding: "52px 24px",
          textAlign: "center",
        }}
      >
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
          tell us what you&apos;re building. we&apos;ll tell you if we&apos;re
          the right fit.
        </p>

        <button
          onClick={() => setShowForm((v) => !v)}
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
            cursor: "pointer",
            transition: "opacity 200ms",
            marginBottom: showForm ? "32px" : 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Get Different
        </button>

        {showForm && <ContactForm />}
      </section>

      <Footer />
    </>
  );
}
