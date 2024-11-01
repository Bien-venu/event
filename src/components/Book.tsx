/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Book = () => {
  const { booking, setBooking, book, setEvent } = useAppContext();
  const [eventTitle, setEventTitle] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [eventId, setEventId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchEventById = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${book}`);
      if (res.ok) {
        const data = await res.json();
        setEventTitle(data.event.title);
        setAvailableSeats(data.event.availableSeats);
        setEventId(data.event._id);
      } else {
        setError("Failed to fetch event details");
        toast.error("Failed to fetch event details");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (book) {
      fetchEventById();
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (seatsToBook > availableSeats) {
      toast.error("Not enough seats available.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          email,
          name,
          seatsBooked: seatsToBook,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Booking successful!");
        resetForm();
        setBooking(false);
        setEvent(true);
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.error || "Failed to complete booking";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error completing booking:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setSeatsToBook(1);
    setEventId(null);
  };

  return (
    <div
      className={`${
        booking ? "flex" : "hidden"
      } absolute bg-black h-screen w-full top-0 bottom-0 bg-opacity-60 flex justify-center items-center`}
    >
      <div className="bg-white text-black w-[35rem] relative h-fit flex flex-col p-8 rounded bg-secondary gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          className="absolute top-6 cursor-pointer right-8"
          fill="none"
          onClick={() => {
            setBooking(false);
            resetForm();
          }}
        >
          <path
            d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-lg">Book Event: {eventTitle}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="border p-2 rounded border-gray"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="border p-2 rounded border-gray"
            required
          />
          <div className="flex flex-col gap-1 text-sm">
            <p>Seats to Book</p>
            <input
              type="number"
              value={seatsToBook}
              onChange={(e) => setSeatsToBook(Number(e.target.value))}
              min={1}
              max={availableSeats}
              className="border p-2 rounded border-gray"
              required
            />
            <p className="text-xs text-gray-500">
              Available seats: {availableSeats}
            </p>
          </div>
          <button
            type="submit"
            className={`${
              seatsToBook > availableSeats || loading
                ? " cursor-not-allowed"
                : " cursor-pointer"
            } p-4 bg-primary font-semibold rounded text-secondary`}
            disabled={seatsToBook > availableSeats || loading}
          >
            {seatsToBook > availableSeats
              ? "No room available"
              : loading
              ? "Processing..."
              : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Book;
