import { findPreview } from "@/lib/central-util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');
  if (!query) return NextResponse.json({ error: "No query provided" }, { status: 400 });
  return NextResponse.json(await findPreview(query));
}