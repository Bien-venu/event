/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateEvent = () => {
  const { create, setCreate, setEvent, edit } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [eventId, setEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const fetchEventById = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${edit}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.event.title);
        setDescription(data.event.description);
        setDate(data.event.date);
        setTotalSeats(data.event.seats);
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
    if (edit) {
      fetchEventById();
    }
  }, [edit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = edit ? "PUT" : "POST";
      const url = edit ? `/api/events/${eventId}` : "/api/events";
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, date, seats: totalSeats }),
      });

      if (res.ok) {
        toast.success(
          edit ? "Event updated successfully!" : "Event created successfully!"
        );
        resetForm();
        setCreate(false);
        setEvent(true);
        router.push("/admin");
      } else {
        const data = await res.json();
        const errorMessage = data.error || "Failed to save event";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error saving event:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTotalSeats(0);
    setEventId(null);
  };

  return (
    <div
      className={`${
        create ? "flex" : "hidden"
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
            setCreate(false);
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
        <h1 className="text-lg">{edit ? "Edit Event" : "Create New Event"}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            className="border p-2 rounded border-gray"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded border-gray"
            required
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded border-gray"
            required
          />
          <div className="flex flex-col gap-1 text-sm">
            <p>Seats</p>
            <input
              type="number"
              value={totalSeats}
              onChange={(e) => setTotalSeats(Number(e.target.value))}
              placeholder="Total Seats"
              className="border p-2 rounded border-gray"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-primary p-4 font-semibold rounded text-secondary cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} 
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 0115.996.001A8 8 0 014 12z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </span>
            ) : edit ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
