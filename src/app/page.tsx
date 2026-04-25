import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Link from "next/link";

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "var(--carbon)",
        opacity: 0.38,
        margin: "0 0 24px",
      }}
    >
      {text}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "80px 0",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Container>
          <h1
            className="hero-wordmark"
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 700,
              fontSize: "72px",
              letterSpacing: "-0.03em",
              color: "var(--carbon)",
              marginBottom: "20px",
              lineHeight: 1,
            }}
          >
            different
          </h1>

          <div
            style={{
              width: "32px",
              height: "1px",
              background: "#cccccc",
              margin: "0 auto 20px",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 500,
              fontSize: "26px",
              color: "var(--carbon)",
              marginBottom: "16px",
            }}
          >
            built for what&apos;s being built.
          </p>

          <p
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 400,
              fontSize: "15px",
              color: "#888888",
              maxWidth: "400px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            Tech-native influencers. Frontier tech companies. We connect the
            two, as neither of you fit the old model.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/companies" className="btn-filled">
              Companies
            </Link>
            <Link href="/creators" className="btn-outline">
              Creators
            </Link>
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#bbbbbb",
              marginTop: "24px",
            }}
          >
            a Compound agency
          </p>
        </Container>
      </section>

      {/* A Different Approach */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "64px 0",
          borderTop: "1px solid rgba(10,10,10,0.08)",
          textAlign: "center",
        }}
      >
        <Container>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <SectionLabel text="A Different Approach" />
            <p
              style={{
                fontFamily: "var(--font-grotesk)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.65,
                color: "var(--carbon)",
                marginBottom: "20px",
              }}
            >
              Web3 and AI influencer agencies rely on a cabal of influencers
              with the same audiences, limited conversion, and CPMs that
              don&apos;t reflect reality. We do things differently.
            </p>
            <p
              style={{
                fontFamily: "var(--font-grotesk)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.65,
                color: "var(--carbon)",
              }}
            >
              We select influencers with active, growing audiences, nurture
              relationships with them, and push new-look campaigns combining the
              best of traditional influencer marketing with the fast-moving
              world of web3 creator metas.
            </p>
          </div>
        </Container>
      </section>

      {/* Why Different */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "64px 0",
          borderTop: "1px solid rgba(10,10,10,0.08)",
          textAlign: "center",
        }}
      >
        <Container>
          <SectionLabel text="Why Different" />
          <div
            className="responsive-grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            {[
              {
                title: "Verified reach.",
                body: "Audience deduplication on every campaign. The reach you pay for is real.",
              },
              {
                title: "Proof, not just data.",
                body: "Brand lift surveys measure whether the campaign actually shifted how people think about your product.",
              },
              {
                title: "End-to-end execution.",
                body: "Creator coordination, briefs, scheduling, reporting. Handled entirely.",
              },
            ].map(({ title, body }) => (
              <div key={title} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontWeight: 700,
                    fontSize: "15px",
                    marginBottom: "8px",
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
                    opacity: 0.6,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Dual CTA */}
      <section
        style={{
          background: "var(--bright-white)",
          padding: "64px 0",
          borderTop: "1px solid rgba(10,10,10,0.08)",
          textAlign: "center",
        }}
      >
        <Container>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              opacity: 0.38,
              marginBottom: "32px",
            }}
          >
            Get Started
          </p>
          <div
            className="responsive-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 700,
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                For companies.
              </p>
              <Link href="/companies" className="cta-link">
                See packages &rarr;
              </Link>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 700,
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                For creators.
              </p>
              <Link href="/creators" className="cta-link">
                Apply &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
