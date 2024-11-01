import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import Event from "@/models/Event";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { eventId, email, name, seatsBooked } = await req.json();

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (seatsBooked > event.availableSeats) {
      return NextResponse.json(
        { error: "Not enough seats available" },
        { status: 400 }
      );
    }

    const newBooking = new Booking({
      eventId,
      email,
      name,
      seatsBooked,
    });

    await newBooking.save();

    event.availableSeats -= seatsBooked;
    await event.save();

    return NextResponse.json(
      { message: "Booking successful", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { error: "An error occurred while booking" },
      { status: 500 }
    );
  }
}
