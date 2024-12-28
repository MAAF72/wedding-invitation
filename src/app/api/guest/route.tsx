import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/app/utils/supabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("guests")
      .select("slug, name")
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("Error fetching guest:", error.message);
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}