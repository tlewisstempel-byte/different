"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { ScoreResult } from "@/lib/scoring";

interface Props {
  data: ScoreResult;
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function MetricBar({
  label,
  value,
  accentColor,
}: {
  label: string;
  value: number;
  accentColor: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "rgba(10,10,10,0.45)",
        }}
      >
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div
        style={{
          height: 3,
          background: "rgba(10,10,10,0.12)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: accentColor,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}

function TierPlaceholder({ tier, tierName, accentColor }: { tier: number; tierName: string; accentColor: string }) {
  return (
    <div
      style={{
        width: 220,
        height: 175,
        background: `${accentColor}18`,
        border: `2px dashed ${accentColor}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: accentColor,
          textAlign: "center",
          padding: "0 12px",
        }}
      >
        Tier {tier} illustration
      </span>
    </div>
  );
}

function TierIllustration({ tier, tierName, accentColor }: { tier: number; tierName: string; accentColor: string }) {
  return (
    <div style={{ width: 220, height: 175, position: "relative", flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/illustrations/tier${tier}.png`}
        alt={tierName}
        width={220}
        height={175}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          // Try SVG placeholder before giving up
          if (!img.src.endsWith(".svg")) {
            img.onerror = null;
            img.src = `/illustrations/tier${tier}.svg`;
          }
        }}
      />
    </div>
  );
}

const Card = forwardRef<HTMLDivElement, Props>(function Card({ data }, ref) {
  const {
    handle,
    displayName,
    avatarUrl,
    followerCount,
    score,
    tier,
    tierName,
    accentColor,
    motion,
    conviction,
    volume,
    guardian,
  } = data;

  return (
    <div
      ref={ref}
      style={{
        width: 1200,
        height: 628,
        background: "#F5F4F0",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-grotesk), sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: accentColor, width: "100%", flexShrink: 0 }} />

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left section */}
        <div
          style={{
            flex: 1,
            padding: "40px 44px 36px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/* Profile row */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                width={76}
                height={76}
                style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: "var(--font-grotesk), sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                {handle[0]?.toUpperCase()}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  fontFamily: "var(--font-grotesk), sans-serif",
                  fontWeight: 500,
                  fontSize: 26,
                  color: "#0A0A0A",
                  lineHeight: 1.1,
                }}
              >
                @{handle}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(10,10,10,0.4)",
                }}
              >
                {formatFollowers(followerCount)} followers
              </span>
            </div>
          </div>

          {/* Score + illustration row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(10,10,10,0.35)",
                }}
              >
                Washed Score
              </span>
              <span
                style={{
                  fontFamily: "var(--font-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: 128,
                  lineHeight: 1,
                  color: accentColor,
                  letterSpacing: "-0.02em",
                }}
              >
                {score}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-grotesk), sans-serif",
                  fontWeight: 500,
                  fontSize: 28,
                  color: "#0A0A0A",
                  lineHeight: 1.1,
                  marginTop: 4,
                }}
              >
                {tierName}
              </span>
            </div>

            <TierIllustration tier={tier} tierName={tierName} accentColor={accentColor} />
          </div>

          {/* Metric bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <MetricBar label="Motion" value={motion} accentColor={accentColor} />
            <MetricBar label="Conviction" value={conviction} accentColor={accentColor} />
            <MetricBar label="Volume" value={volume} accentColor={accentColor} />
          </div>

          {/* Footer */}
          <div style={{ marginTop: "auto" }}>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(10,10,10,0.3)",
              }}
            >
              areyouwashed.xyz
            </span>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, background: "rgba(10,10,10,0.1)", flexShrink: 0 }} />

        {/* Guardian column */}
        <div
          style={{
            width: 370,
            background: "#E8E2D9",
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(10,10,10,0.35)",
            }}
          >
            Your Guardian
          </span>

          {guardian ? (
            <>
              {guardian.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={guardian.avatarUrl}
                  alt={guardian.handle}
                  width={96}
                  height={96}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    background: "#0A0A0A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F5F4F0",
                    fontSize: 36,
                    fontWeight: 700,
                  }}
                >
                  {guardian.handle[0]?.toUpperCase()}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "var(--font-grotesk), sans-serif",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "#0A0A0A",
                  }}
                >
                  @{guardian.handle}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(10,10,10,0.4)",
                  }}
                >
                  {formatFollowers(guardian.followerCount)} followers
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 13,
                  color: "rgba(10,10,10,0.55)",
                  lineHeight: 1.6,
                  margin: 0,
                  marginTop: "auto",
                }}
              >
                Your most famous recent supporter. Keeping you unwashed — or trying to.
              </p>
            </>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                color: "rgba(10,10,10,0.4)",
                lineHeight: 1.6,
                margin: 0,
                marginTop: 8,
              }}
            >
              No guardian found. You&apos;re out here alone. Respect.
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Card;
