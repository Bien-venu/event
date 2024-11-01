import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking"; // Make sure this path matches your structure
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  await dbConnect();

  const { id } = await params;
  const eventId = id;

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 }
    );
  }

  try {
    const bookings = await Booking.find({ eventId });

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found for this event" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Bookings retrieved successfully", bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving bookings" },
      { status: 500 }
    );
  }
}
