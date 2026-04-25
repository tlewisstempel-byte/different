"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { useState } from "react";

const packages = ["Core", "Different", "Pro"] as const;
type Package = (typeof packages)[number];

export default function ContactContent() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    if (selectedPackage) data.set("package", selectedPackage);

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
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
    border: "1px solid rgba(10,10,10,0.20)",
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
          background: "#F5F4F0",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          padding: "80px 0",
        }}
      >
        <Container>
          <div style={{ maxWidth: "480px", margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--carbon)",
                opacity: 0.38,
                marginBottom: "16px",
              }}
            >
              Get in Touch
            </p>

            <h1
              style={{
                fontFamily: "var(--font-grotesk)",
                fontWeight: 700,
                fontSize: "40px",
                color: "var(--carbon)",
                lineHeight: 1,
                marginBottom: "32px",
              }}
            >
              Tell us what you&apos;re building.
            </h1>

            {submitted ? (
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 400,
                  fontSize: "16px",
                  opacity: 0.7,
                }}
              >
                Done. We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--carbon)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(10,10,10,0.20)")
                  }
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--carbon)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(10,10,10,0.20)")
                  }
                />

                {/* Package selector */}
                <div style={{ marginBottom: "12px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      opacity: 0.38,
                      marginBottom: "8px",
                    }}
                  >
                    Package interest (optional)
                  </p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {packages.map((pkg) => (
                      <button
                        key={pkg}
                        type="button"
                        onClick={() =>
                          setSelectedPackage(
                            selectedPackage === pkg ? null : pkg
                          )
                        }
                        className={`control-btn${selectedPackage === pkg ? " active" : ""}`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  name="message"
                  placeholder="Anything else we should know."
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    marginBottom: "16px",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--carbon)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(10,10,10,0.20)")
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
                    padding: "12px 28px",
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
                  {loading ? "Sending..." : "Send"}
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
