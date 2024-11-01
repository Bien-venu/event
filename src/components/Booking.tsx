/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

// Define types for Booking and props
interface Booking {
  _id: string;
  eventId: string;
  email: string;
  name: string;
  seatsBooked: number;
}

interface BookingProps {
  eventId: string;
}

const Booking: React.FC<BookingProps> = ({ eventId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings/${eventId}`);
        const data = await response.json();

        if (response.ok) {
          setBookings(data.bookings);
        } else {
          setError(data.error || "No bookings found for this event");
        }
      } catch (error) {
        setError("An error occurred while fetching bookings");
      }
    };

    if (eventId) fetchBookings();
  }, [eventId]);

  return (
    <div className="container mx-auto border border-gray p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Event Bookings
      </h1>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded">
          <table className="min-w-full bg-white border border-gray rounded">
            <thead className="bg-gray">
              <tr className="text-left text-gray-600">
                <th className="py-3 px-4 border-b border-gray">Name</th>
                <th className="py-3 px-4 border-b border-gray">Email</th>
                <th className="py-3 px-4 border-b border-gray">Seats Booked</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-100 transition duration"
                >
                  <td className="py-3 px-4 border-b border-gray">{booking.name}</td>
                  <td className="py-3 px-4 border-b border-gray">{booking.email}</td>
                  <td className="py-3 px-4 border-b border-gray">{booking.seatsBooked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No bookings available.</p>
      )}
    </div>
  );
};

export default Booking;
