import { NextRequest, NextResponse } from "next/server";
import { startApifyRun } from "@/lib/apify";

export const maxDuration = 10;

export async function POST(req: NextRequest) {
  try {
    const { handle } = await req.json();
    const clean = String(handle ?? "").replace(/^@/, "").trim();
    if (!clean) return NextResponse.json({ error: "handle is required" }, { status: 400 });

    const runId = await startApifyRun(clean);
    return NextResponse.json({ runId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
