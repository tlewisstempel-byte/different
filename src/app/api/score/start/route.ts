import { NextRequest, NextResponse } from "next/server";
import { startApifyRun } from "@/lib/apify";

export const maxDuration = 10;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const handle = (body.handle as string)?.replace(/^@/, "").trim();

    if (!handle) {
      return NextResponse.json({ error: "handle is required" }, { status: 400 });
    }

    const runId = await startApifyRun(handle);
    return NextResponse.json({ runId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
