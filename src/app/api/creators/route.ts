import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      return NextResponse.json(
        { error: "Airtable not configured" },
        { status: 500 }
      );
    }

    const base = new Airtable({ apiKey }).base(baseId);

    await base("Applications").create([
      {
        fields: {
          Email: email,
          "Submitted at": new Date().toISOString(),
          Status: "New",
        },
      },
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Airtable error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
