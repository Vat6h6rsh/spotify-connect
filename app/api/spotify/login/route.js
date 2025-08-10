import { NextResponse } from "next/server";
import { getLoginUrl } from "@/utils/spotify";

export async function GET() {
  return NextResponse.redirect(getLoginUrl());
}
