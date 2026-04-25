"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { useState } from "react";

export default function CreatorsContent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    border: "1px solid rgba(10,10,10,0.25)",
    background: "transparent",
    color: "var(--carbon)",
    borderRadius: 0,
    outline: "none",
    marginBottom: "12px",
    display: "block",
  };

  return (
    <>
      <Nav />

      <main
        style={{
          background: "var(--bright-white)",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          padding: "80px 0",
        }}
      >
        <Container>
          <div style={{ maxWidth: "480px" }}>
            <h1
              style={{
                fontFamily: "var(--font-grotesk)",
                fontWeight: 700,
                fontSize: "48px",
                color: "var(--carbon)",
                marginBottom: "16px",
                lineHeight: 1,
              }}
            >
              Apply.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-grotesk)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.6,
                opacity: 0.6,
                marginBottom: "32px",
              }}
            >
              We&apos;ll be in touch when applications open. Leave your email and
              we&apos;ll reach out.
            </p>

            {submitted ? (
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 500,
                  fontSize: "16px",
                  opacity: 0.7,
                }}
              >
                Done. We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--carbon)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(10,10,10,0.25)")
                  }
                />
                {error && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--signal-red)",
                      marginBottom: "8px",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    background: "var(--carbon)",
                    color: "var(--bright-white)",
                    border: "none",
                    padding: "12px",
                    width: "100%",
                    cursor: "pointer",
                    transition: "background 200ms",
                    opacity: loading ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.background = "#333";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--carbon)";
                  }}
                >
                  {loading ? "Sending..." : "Notify Me"}
                </button>
              </form>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
