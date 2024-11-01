import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  const { id } = await params; // Await params

  await dbConnect();

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Event ID is missing" },
      { status: 400 }
    );
  }

  try {
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  const { id } = await params; // Await params

  await dbConnect();

  try {
    const { title, description, date, seats } = await request.json();
    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, seats, availableSeats: seats },
      { new: true }
    );

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  const { id } = await params; // Await params

  await dbConnect();

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
