import { NextRequest, NextResponse } from "next/server";

import { sheet } from "@/app/utils/gsheetClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const uniqueCode = searchParams.get("unique_code");

  if (!uniqueCode) {
    return NextResponse.json({ error: "Missing unique_code parameter" }, { status: 400 });
  }

  try {
    await sheet.loadInfo();

    const guestSheet = sheet.sheetsByTitle["Aggregate Database"];
    const guestRows = await guestSheet.getRows();

    const guest = guestRows.find(r => r.get("unique_code") == uniqueCode);

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    const data = {
      unique_code: guest.get("unique_code"),
      name: guest.get("name"),
      session: guest.get("session"),
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}