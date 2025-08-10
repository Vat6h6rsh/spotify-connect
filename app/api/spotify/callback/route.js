import { NextResponse } from "next/server";
import { getAccessToken } from "@/utils/spotify";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenData = await getAccessToken(code);
  return NextResponse.json(tokenData);
}
