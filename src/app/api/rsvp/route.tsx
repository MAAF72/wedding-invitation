import { NextRequest, NextResponse } from "next/server";

import { sheet } from "@/app/utils/gsheetClient";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const BOT_CHAT_ID = process.env.TELEGRAM_BOT_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { unique_code, is_will_attend, message } = await req.json();

    console.log("RSVP Data:", { unique_code, is_will_attend, message });

    await sheet.loadInfo();
    
    const guestSheet = sheet.sheetsByTitle["Aggregate Database"];
    const guestRows = await guestSheet.getRows();

    const guest = guestRows.find(r => r.get("unique_code") == unique_code);

    if (!guest) {
      return NextResponse.json({ error: "Bad request, guest not exist" }, { status: 400 });
    }

    const rsvpSheet = sheet.sheetsByTitle["RSVP"];

    await rsvpSheet.addRow({
      unique_code: guest.get("unique_code"),
      name: guest.get("name"),
      relation: guest.get("relation"),
      invited_by: guest.get("invited_by"),
      is_will_attend:	is_will_attend,
      message: message,
      rsvp_at: new Date(),
    })

    let mentionID = "1875201674"

    if (guest.get("invited_by") == "Fathiyyah") {
      mentionID = "5413021403"
    }
    
    const notify_message = [
      `Hai <a href="tg://user?id=${mentionID}">${guest.get("invited_by")}</a>,`,
      `<b>${guest.get("name")} (${guest.get("relation")})</b> ${is_will_attend ? 'akan hadir &#10004;' : 'tidak hadir &#10060;'}`,
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