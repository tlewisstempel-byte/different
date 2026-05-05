"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Card from "@/components/Card";
import LoadingAnimation from "@/components/LoadingAnimation";
import type { ScoreResult } from "@/lib/scoring";

type State = "idle" | "loading" | "done" | "error";

export default function WashedPage() {
  const [handle, setHandle] = useState("");
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = handle.replace(/^@/, "").trim();
    if (!trimmed) return;

    setState("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const startRes = await fetch("/api/score/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: trimmed }),
      });
      const startData = await startRes.json();
      if (!startRes.ok) throw new Error(startData.error ?? "Failed to start");
      const { runId } = startData as { runId: string };

      const deadline = Date.now() + 30_000;
      while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 2000));
        const pollRes = await fetch(`/api/score/poll/${runId}`);
        const pollData = await pollRes.json();
        if (!pollRes.ok) throw new Error(pollData.error ?? "Poll failed");
        if (pollData.status !== "pending") {
          setResult(pollData as ScoreResult);
          setState("done");
          return;
        }
      }

      setErrorMsg("COULDN'T SCORE THIS ACCOUNT. TRY AGAIN.");
      setState("error");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setState("error");
    }
  }

  async function downloadCard() {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        width: 1200,
        height: 628,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `washed-score-${result?.handle ?? "card"}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("Failed to export image. Try again.");
    }
  }

  function shareOnX() {
    if (!result) return;
    const text = `My washed score is ${result.score}/100 — ${result.tierName}.\n\nFind out if you're washed: areyouwashed.xyz`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener noreferrer");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F5F4F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 24px 60px",
      }}
    >
      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: "var(--font-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 8vw, 96px)",
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
            margin: 0,
            lineHeight: 1,
          }}
        >
          Are You Washed?
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(10,10,10,0.45)",
            marginTop: 20,
          }}
        >
          Enter an X handle. Get your score. Share the shame (or the flex).
        </p>
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: 0,
          width: "100%",
          maxWidth: 560,
          marginBottom: 64,
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <span
            style={{
              position: "absolute",
              left: 18,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-grotesk), sans-serif",
              fontSize: 18,
              color: "rgba(10,10,10,0.35)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            @
          </span>
          <input
            type="text"
            placeholder="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            disabled={state === "loading"}
            style={{
              width: "100%",
              padding: "16px 18px 16px 36px",
              fontFamily: "var(--font-grotesk), sans-serif",
              fontSize: 18,
              color: "#0A0A0A",
              background: "#fff",
              border: "1px solid rgba(10,10,10,0.2)",
              borderRight: "none",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={state === "loading" || !handle.trim()}
          style={{
            padding: "16px 32px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            background: "#0A0A0A",
            color: "#F5F4F0",
            border: "none",
            cursor: state === "loading" || !handle.trim() ? "not-allowed" : "pointer",
            opacity: state === "loading" || !handle.trim() ? 0.5 : 1,
            transition: "opacity 200ms ease-out",
            flexShrink: 0,
          }}
        >
          Score me
        </button>
      </form>

      {/* Loading state */}
      {state === "loading" && <LoadingAnimation />}

      {/* Error state */}
      {state === "error" && (
        <div
          style={{
            padding: "20px 28px",
            border: "1px solid rgba(255,45,85,0.3)",
            background: "rgba(255,45,85,0.06)",
            maxWidth: 560,
            width: "100%",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#FF2D55",
              margin: 0,
            }}
          >
            {errorMsg}
          </p>
        </div>
      )}

      {/* Card + buttons */}
      {state === "done" && result && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            width: "100%",
          }}
        >
          {/* Card wrapper — displayed at 50% scale */}
          <div
            style={{
              width: 600,
              height: 314,
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                transformOrigin: "top left",
                transform: "scale(0.5)",
                width: 1200,
                height: 628,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Card ref={cardRef} data={result} />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={downloadCard}
              style={{
                padding: "14px 28px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "#0A0A0A",
                color: "#F5F4F0",
                border: "none",
                cursor: "pointer",
                transition: "background 200ms ease-out",
              }}
            >
              Download Card
            </button>
            <button
              onClick={shareOnX}
              style={{
                padding: "14px 28px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "transparent",
                color: "#0A0A0A",
                border: "1px solid #0A0A0A",
                cursor: "pointer",
                transition: "background 200ms ease-out, color 200ms ease-out",
              }}
            >
              Share on X
            </button>
          </div>

          {/* Attribution */}
          <a
            href="https://different.agency"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(10,10,10,0.4)",
              textDecoration: "underline",
              transition: "opacity 200ms ease-out",
            }}
          >
            Want to work with the best? → different.agency
          </a>
        </div>
      )}
    </main>
  );
}
