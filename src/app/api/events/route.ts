/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import Event from "@/models/Event";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  await dbConnect();

  try {
    const events = await Event.find({});
    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();

  const authResult = await verifyAdmin(req);
  if (!authResult) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { title, description, date, seats } = await req.json();
    const event = new Event({
      title,
      description,
      date,
      seats,
      availableSeats: seats,
    });
    await event.save();
    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
