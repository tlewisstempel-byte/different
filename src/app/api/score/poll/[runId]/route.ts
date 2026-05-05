import { NextRequest, NextResponse } from "next/server";
import { pollApifyRun } from "@/lib/apify";
import { calculateScore } from "@/lib/scoring";

export const maxDuration = 10;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const { runId } = await params;
    const result = await pollApifyRun(runId);

    if (result.status === "pending") {
      return NextResponse.json({ status: "pending" });
    }

    const score = calculateScore(result.profile, result.guardian);
    return NextResponse.json(score);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
