import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/app/utils/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { guest, is_will_attend, message } = await req.json();

    console.log("RSVP Data:", { guest, is_will_attend, message });

    const { error } = await supabase
      .from("rsvps")
      .insert([
        {
          guest: guest,
          is_will_attend: is_will_attend,
          message: message
        }
      ])
      .select()

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "RSVP submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}