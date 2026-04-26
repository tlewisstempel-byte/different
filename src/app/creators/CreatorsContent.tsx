"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { useState } from "react";

const PLATFORMS = ["X", "TikTok", "Instagram", "YouTube", "Farcaster"] as const;
const LOCATIONS = ["Global", "North America", "Europe", "Asia", "Other"] as const;
const DEVICES = ["iOS", "Android", "Other"] as const;
const NICHES = ["AI", "DeFi", "NFTs", "Branding & Marketing", "Gaming", "RWAs & DePIN", "Trading"] as const;
const YES_NO = ["Yes", "No"] as const;

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.13em",
  color: "#1A3EFF",
  paddingBottom: "12px",
  borderBottom: "1px solid rgba(10,10,10,0.1)",
  marginBottom: "32px",
  display: "block",
};

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "9px",
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: "0.13em",
  color: "#888",
  marginBottom: "12px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-grotesk)",
  fontSize: "14px",
  fontWeight: 400,
  color: "#0A0A0A",
  border: "1px solid rgba(10,10,10,0.15)",
  borderRadius: "6px",
  padding: "16px 14px",
  width: "100%",
  background: "transparent",
  outline: "none",
  display: "block",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "9px",
  color: "#FF2D55",
  marginTop: "6px",
};

function SelectButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? "rgba(26,62,255,0.05)" : "transparent",
        border: `1px solid ${selected ? "#1A3EFF" : hovered ? "rgba(10,10,10,0.35)" : "rgba(10,10,10,0.2)"}`,
        color: selected ? "#1A3EFF" : hovered ? "#222" : "#444",
        fontFamily: "var(--font-grotesk)",
        fontWeight: 400,
        fontSize: "13px",
        padding: "8px 18px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "border-color 150ms ease-out, color 150ms ease-out, background 150ms ease-out",
      }}
    >
      {label}
    </button>
  );
}

export default function CreatorsContent() {
  const [telegramUsername, setTelegramUsername] = useState("");
  const [xHandle, setXHandle] = useState("");
  const [youtubeHandle, setYoutubeHandle] = useState("");
  const [tiktokHandle, setTiktokHandle] = useState("");
  const [primaryPlatform, setPrimaryPlatform] = useState("");
  const [additionalPlatforms, setAdditionalPlatforms] = useState<string[]>([]);
  const [profileUrls, setProfileUrls] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [audienceLocation, setAudienceLocation] = useState("");
  const [audienceDevice, setAudienceDevice] = useState("");
  const [sorsaScore, setSorsaScore] = useState("");
  const [avgImpressions, setAvgImpressions] = useState("");
  const [avgEngagement, setAvgEngagement] = useState("");
  const [niche, setNiche] = useState<string[]>([]);
  const [contentDescription, setContentDescription] = useState("");
  const [workedWithBrands, setWorkedWithBrands] = useState("");
  const [whyDifferent, setWhyDifferent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePrimaryPlatform = (p: string) => {
    setPrimaryPlatform(p);
    setAdditionalPlatforms((prev) => prev.filter((x) => x !== p));
  };

  const toggleAdditional = (p: string) => {
    setAdditionalPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const toggleNiche = (n: string) => {
    setNiche((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!telegramUsername.trim()) newErrors.telegramUsername = "Required";
    if (!primaryPlatform) newErrors.primaryPlatform = "Required";
    if (!followerCount.trim()) newErrors.followerCount = "Required";
    if (niche.length === 0) newErrors.niche = "Select at least one";
    if (!whyDifferent.trim()) newErrors.whyDifferent = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/creator-apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telegramUsername,
        xHandle,
        youtubeHandle,
        tiktokHandle,
        primaryPlatform,
        additionalPlatforms,
        profileUrls,
        followerCount,
        audienceLocation,
        audienceDevice,
        sorsaScore,
        avgImpressions,
        avgEngagement,
        niche,
        contentDescription,
        workedWithBrands,
        whyDifferent,
      }),
    });

    if (res.ok) setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      <Nav />

      <main style={{ background: "#F5F4F0", padding: "100px 0 80px" }}>
        <Container>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            {submitted ? (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 700,
                    fontSize: "32px",
                    color: "#0A0A0A",
                  }}
                >
                  application received.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "#888",
                    marginTop: "12px",
                  }}
                >
                  We&apos;ll be in touch via Telegram.
                </p>
              </div>
            ) : (
              <>
                <h1
                  className="page-heading"
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 700,
                    fontSize: "48px",
                    color: "#0A0A0A",
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  Apply.
                </h1>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "#888",
                    marginTop: "12px",
                    marginBottom: "48px",
                  }}
                >
                  Tell us about your audience.
                </p>

                <form onSubmit={handleSubmit} noValidate>

                  {/* ── Section 1: Identity ── */}
                  <div style={{ marginBottom: "48px" }}>
                    <p style={sectionLabelStyle}>Identity</p>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Telegram Username *</p>
                      <input
                        type="text"
                        placeholder="@username"
                        value={telegramUsername}
                        onChange={(e) => setTelegramUsername(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                      {errors.telegramUsername && <p style={errorStyle}>{errors.telegramUsername}</p>}
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>X Handle</p>
                      <input
                        type="text"
                        placeholder="@handle"
                        value={xHandle}
                        onChange={(e) => setXHandle(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>YouTube Handle</p>
                      <input
                        type="text"
                        placeholder="@handle"
                        value={youtubeHandle}
                        onChange={(e) => setYoutubeHandle(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>

                    <div>
                      <p style={fieldLabelStyle}>TikTok Handle</p>
                      <input
                        type="text"
                        placeholder="@handle"
                        value={tiktokHandle}
                        onChange={(e) => setTiktokHandle(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>
                  </div>

                  {/* ── Section 2: Platform ── */}
                  <div style={{ marginBottom: "48px" }}>
                    <p style={sectionLabelStyle}>Platform</p>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Primary Platform *</p>
                      <div className="pill-group" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {PLATFORMS.map((p) => (
                          <SelectButton
                            key={p}
                            label={p}
                            selected={primaryPlatform === p}
                            onClick={() => handlePrimaryPlatform(p)}
                          />
                        ))}
                      </div>
                      {errors.primaryPlatform && <p style={errorStyle}>{errors.primaryPlatform}</p>}
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Additional Platforms</p>
                      <div className="pill-group" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {PLATFORMS.filter((p) => p !== primaryPlatform).map((p) => (
                          <SelectButton
                            key={p}
                            label={p}
                            selected={additionalPlatforms.includes(p)}
                            onClick={() => toggleAdditional(p)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p style={fieldLabelStyle}>Profile URLs</p>
                      <textarea
                        placeholder="Paste your best 1–3 links"
                        value={profileUrls}
                        onChange={(e) => setProfileUrls(e.target.value)}
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>
                  </div>

                  {/* ── Section 3: Audience & Analytics ── */}
                  <div style={{ marginBottom: "48px" }}>
                    <p style={sectionLabelStyle}>Audience &amp; Analytics</p>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Follower Count *</p>
                      <input
                        type="text"
                        placeholder="e.g. 45,000"
                        value={followerCount}
                        onChange={(e) => setFollowerCount(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                      {errors.followerCount && <p style={errorStyle}>{errors.followerCount}</p>}
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Primary Audience Location</p>
                      <div className="pill-group" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {LOCATIONS.map((l) => (
                          <SelectButton
                            key={l}
                            label={l}
                            selected={audienceLocation === l}
                            onClick={() => setAudienceLocation(audienceLocation === l ? "" : l)}
                          />
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Primary Audience Device</p>
                      <div className="pill-group" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {DEVICES.map((d) => (
                          <SelectButton
                            key={d}
                            label={d}
                            selected={audienceDevice === d}
                            onClick={() => setAudienceDevice(audienceDevice === d ? "" : d)}
                          />
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Sorsa Score</p>
                      <input
                        type="text"
                        placeholder="e.g. 72"
                        value={sorsaScore}
                        onChange={(e) => setSorsaScore(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Avg Daily Impressions (Past 90 Days)</p>
                      <input
                        type="text"
                        placeholder="e.g. 12,000"
                        value={avgImpressions}
                        onChange={(e) => setAvgImpressions(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>

                    <div>
                      <p style={fieldLabelStyle}>Avg Engagement Rate (Past 90 Days)</p>
                      <input
                        type="text"
                        placeholder="e.g. 4.2%"
                        value={avgEngagement}
                        onChange={(e) => setAvgEngagement(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>
                  </div>

                  {/* ── Section 4: Content ── */}
                  <div style={{ marginBottom: "48px" }}>
                    <p style={sectionLabelStyle}>Content</p>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Niche *</p>
                      <div className="pill-group" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {NICHES.map((n) => (
                          <SelectButton
                            key={n}
                            label={n}
                            selected={niche.includes(n)}
                            onClick={() => toggleNiche(n)}
                          />
                        ))}
                      </div>
                      {errors.niche && <p style={errorStyle}>{errors.niche}</p>}
                    </div>

                    <div>
                      <p style={fieldLabelStyle}>How Would You Describe Your Content?</p>
                      <textarea
                        placeholder="Keep it brief"
                        value={contentDescription}
                        onChange={(e) => setContentDescription(e.target.value)}
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                    </div>
                  </div>

                  {/* ── Section 5: Fit ── */}
                  <div style={{ marginBottom: "48px" }}>
                    <p style={sectionLabelStyle}>Fit</p>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={fieldLabelStyle}>Worked with Web3 or AI Brands Before?</p>
                      <div className="pill-group" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {YES_NO.map((y) => (
                          <SelectButton
                            key={y}
                            label={y}
                            selected={workedWithBrands === y}
                            onClick={() => setWorkedWithBrands(workedWithBrands === y ? "" : y)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p style={fieldLabelStyle}>Why Do You Want to Work with Different? *</p>
                      <textarea
                        placeholder="Tell us what makes this the right fit"
                        value={whyDifferent}
                        onChange={(e) => setWhyDifferent(e.target.value)}
                        rows={4}
                        style={{ ...inputStyle, resize: "vertical" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)")}
                      />
                      {errors.whyDifferent && <p style={errorStyle}>{errors.whyDifferent}</p>}
                    </div>
                  </div>

                  {/* ── Submit ── */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: "#0A0A0A",
                      color: "#F5F4F0",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.13em",
                      padding: "14px 32px",
                      borderRadius: "6px",
                      width: "100%",
                      border: "none",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.4 : 1,
                      marginTop: "32px",
                      transition: "opacity 200ms ease-out",
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.opacity = "1"; }}
                  >
                    {submitting ? "Sending…" : "Apply"}
                  </button>

                </form>
              </>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
