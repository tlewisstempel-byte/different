import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roster | Different",
  description: "A curated network of web3-native creators and culture leaders.",
};

const creators = [
  {
    rosterNo: "#0007",
    displayName: "leon.",
    handle: "@cryptoleon",
    bio: "The young face of Web3. Trader, influencer in the realest sense, continual motion.",
    followers: "43.1K",
    sorsaScore: "1,517",
    type: "Authority | Lifestyle",
    socialUrl: "https://x.com/cryptoleon",
    photo: "/creators/Leon.jpg",
  },
  {
    rosterNo: "#0009",
    displayName: "medusa.",
    handle: "@MedusaOnchain",
    bio: "The fastest-growing voice in web3 and tech... for good reason.",
    followers: "14.4K",
    sorsaScore: "747",
    type: "Motion | All-rounder",
    socialUrl: "https://x.com/MedusaOnchain",
    photo: "/creators/Medusa.jpg",
  },
  {
    rosterNo: "#0004",
    displayName: "carlitos.",
    handle: "@Carlitoswa_y",
    bio: "Web3 since forever. Macro, lifestyle, investments. Known and trusted.",
    followers: "29K",
    sorsaScore: "1,477",
    type: "Authority | Lifestyle",
    socialUrl: "https://x.com/Carlitoswa_y",
    photo: "/creators/Carlitos.jpg",
  },
  {
    rosterNo: "#0016",
    displayName: "gujju.",
    handle: "@GUJJUIIXI",
    bio: "Coding, not just vibe-coding. Tech-native, AI-native, crypto-native. Funny too.",
    followers: "6.2K",
    sorsaScore: "479",
    type: "Motion | Tech",
    socialUrl: "https://x.com/GUJJUIIXI",
    photo: "/creators/GUJJU.jpg",
  },
  {
    rosterNo: "#0034",
    displayName: "elisa.",
    handle: "@eeelistar",
    bio: "Web3, AI, future-tech. X, Instagram, podcasts. Elisa is consistently at the forefront.",
    followers: "62.7K",
    sorsaScore: "1,483",
    type: "Authority | All-rounder",
    socialUrl: "https://x.com/eeelistar",
    photo: "/creators/Elisa.jpg",
  },
  {
    rosterNo: "#0008",
    displayName: "telcier.",
    handle: "@Telcier",
    bio: "The guy who gets 10X the engagement of washed KOLs - all while having fun.",
    followers: "10K",
    sorsaScore: "510",
    type: "Motion | Fun",
    socialUrl: "https://x.com/Telcier",
    photo: "/creators/Telcier.jpg",
  },
  {
    rosterNo: "#0017",
    displayName: "loshmi.",
    handle: "@loshmi",
    bio: "A trader, gym enthusiast, and the most famous bald man in Web3. Everyone knows Loshmi.",
    followers: "42K",
    sorsaScore: "1,149",
    type: "Authority | Trader",
    socialUrl: "https://x.com/loshmi",
    photo: "/creators/Loshmi.jpg",
  },
  {
    rosterNo: "#0002",
    displayName: "bigchog.",
    handle: "@bigchog",
    bio: "Lightning-fast wit and even faster posting. New wave leader making tech fun.",
    followers: "6.3K",
    sorsaScore: "403",
    type: "Motion | Fun",
    socialUrl: "https://x.com/bigchog",
    photo: "/creators/Bigchog.jpg",
  },
  {
    rosterNo: "#0022",
    displayName: "craig.",
    handle: "@_Craig_",
    bio: "The voice of collectibles. A collector, father, and NFT researcher.",
    followers: "22.7K",
    sorsaScore: "982",
    type: "Authority | Research",
    socialUrl: "https://x.com/_Craig_",
    photo: "/creators/Craig.jpg",
  },
  {
    rosterNo: "#0012",
    displayName: "galileo.",
    handle: "@galileowilson",
    bio: "Founder, builder, shaker. If it's in web3 and it's got motion, chances are Galileo knows about it.",
    followers: "32K",
    sorsaScore: "928",
    type: "Authority | Builder",
    socialUrl: "https://x.com/galileowilson",
    photo: "/creators/Galileo.jpg",
  },
];

function PhotoPanel({ creator }: { creator: (typeof creators)[0] }) {
  return (
    <div className="creator-photo-panel" style={{ position: "relative", minHeight: "220px" }}>
      <Image
        src={creator.photo}
        alt={creator.displayName}
        fill
        className="creator-photo"
        style={{ objectFit: "cover" }}
      />
      <span
        style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "9px",
          color: "var(--klein-blue)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          zIndex: 1,
        }}
      >
        CREATOR
      </span>
    </div>
  );
}

function InfoPanel({ creator }: { creator: (typeof creators)[0] }) {
  return (
    <div
      className="creator-info-panel"
      style={{
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--klein-blue)",
          letterSpacing: "0.05em",
          margin: "0 0 8px",
        }}
      >
        {creator.rosterNo}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 700,
          fontSize: "38px",
          color: "var(--carbon)",
          lineHeight: 1,
          margin: "0 0 5px",
        }}
      >
        {creator.displayName}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 400,
          fontSize: "13px",
          color: "#888",
          margin: "0 0 14px",
        }}
      >
        {creator.handle}
      </p>
      <p
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 400,
          fontSize: "13px",
          color: "#444",
          lineHeight: 1.6,
          maxWidth: "280px",
          margin: "0 0 22px",
        }}
      >
        {creator.bio}
      </p>
      <Link
        href={creator.socialUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          border: "1px solid var(--carbon)",
          background: "transparent",
          color: "var(--carbon)",
          padding: "10px 16px",
          alignSelf: "flex-start",
          transition: "background 200ms ease-out, color 200ms ease-out",
        }}
      >
        VIEW PRIMARY SOCIAL
      </Link>
    </div>
  );
}

function StatBox({ label, value, isType }: { label: string; value: string; isType?: boolean }) {
  return (
    <div
      style={{
        border: "1px solid rgba(10,10,10,0.08)",
        borderRadius: "8px",
        padding: "14px 16px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "9px",
          color: "var(--klein-blue)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: isType ? 400 : 700,
          fontSize: isType ? "13px" : "20px",
          color: "var(--carbon)",
          lineHeight: isType ? 1.3 : 1,
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function StatsPanel({
  creator,
  borderSide,
}: {
  creator: (typeof creators)[0];
  borderSide: "left" | "right";
}) {
  return (
    <div
      className="creator-stats-panel"
      style={{
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
        borderLeft: borderSide === "left" ? "0.5px solid rgba(10,10,10,0.08)" : undefined,
        borderRight: borderSide === "right" ? "0.5px solid rgba(10,10,10,0.08)" : undefined,
      }}
    >
      <StatBox label="FOLLOWERS" value={creator.followers} />
      <StatBox label="SORSA SCORE" value={creator.sorsaScore} />
      <StatBox label="TYPE" value={creator.type} isType />
    </div>
  );
}

export default function Roster() {
  return (
    <>
      <Nav />

      <main style={{ background: "var(--stone)", minHeight: "100vh" }}>
        {/* Page header */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "64px 24px 40px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "11px",
              color: "var(--klein-blue)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: "0 0 20px",
            }}
          >
            Our Roster
          </p>
          <h1
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 700,
              fontSize: "36px",
              color: "var(--carbon)",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            A curated network of creators and culture leaders.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            VIEW ALL CREATORS &rarr;
          </p>
        </div>

        {/* Creator cards */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px 64px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {creators.map((creator, index) => {
            const isOdd = index % 2 === 0;
            return (
              <div
                key={creator.rosterNo}
                className="creator-card"
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: isOdd
                    ? "200px 1fr 180px"
                    : "180px 1fr 200px",
                }}
              >
                {isOdd ? (
                  <>
                    <PhotoPanel creator={creator} />
                    <InfoPanel creator={creator} />
                    <StatsPanel creator={creator} borderSide="left" />
                  </>
                ) : (
                  <>
                    <StatsPanel creator={creator} borderSide="right" />
                    <InfoPanel creator={creator} />
                    <PhotoPanel creator={creator} />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* SORSA score legend */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px 80px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 400,
              fontSize: "13px",
              color: "#888",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
              paddingTop: "48px",
            }}
          >
            SORSA scores are calculated from audience quality, engagement
            credibility, and content consistency. A score above 300 indicates a
            genuine, growing account with real traction. Above 500 signals a
            highly credible audience - one that listens, engages, and acts.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
