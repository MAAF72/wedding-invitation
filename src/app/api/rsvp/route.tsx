import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/app/utils/supabaseClient";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const BOT_CHAT_ID = process.env.TELEGRAM_BOT_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { guest_slug, guest_name, is_will_attend, message } = await req.json();

    console.log("RSVP Data:", { guest_slug, guest_name, is_will_attend, message });

    const { error } = await supabase
      .from("rsvps")
      .insert([
        {
          guest: guest_slug,
          is_will_attend: is_will_attend,
          message: message
        }
      ])
      .select()

    if (error) {
      throw error;
    }
    
    const notify_message = [
      `<b>${guest_name}</b> ${is_will_attend ? 'akan hadir' : 'tidak hadir'}`,
      ``,
      `Pesan:`,
      message,
    ]

    const join_notify_message = notify_message.join('\n')

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${BOT_CHAT_ID}&text=${encodeURIComponent(join_notify_message)}&parse_mode=html`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      console.error("Failed to notify:", await response.text());
    }

    return NextResponse.json({ message: "RSVP submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}