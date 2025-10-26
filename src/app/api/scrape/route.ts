import { NextRequest, NextResponse } from "next/server";

// URL submission form route handler
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // Forward url to backend
    const backend = process.env.BACKEND_URL;
    const res = await fetch(`${backend}/api/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    return NextResponse.json({status: res.status, data: data });
  } catch (e) {
    return NextResponse.json({status: 502, error: "Fetch call failed" + e });
  }
}