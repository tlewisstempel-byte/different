import { NextRequest, NextResponse } from "next/server";
import { scrapeTwitterProfile } from "@/lib/apify";
import { calculateScore } from "@/lib/scoring";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const handle = (body.handle as string)?.replace(/^@/, "").trim();

    if (!handle) {
      return NextResponse.json({ error: "handle is required" }, { status: 400 });
    }

    const { profile, guardian } = await scrapeTwitterProfile(handle);
    const result = calculateScore(profile, guardian);

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
