/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { isLoggedIn, setEvent, setEdit, setCreate, setBook, setBooking } =
    useAppContext();
  const [events, setEvents] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchEventById(id);
    }
  }, [id]);

  const fetchEventById = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.event);
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

  const handleEdit = (
    id: React.SetStateAction<string | null>,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();
    setEdit(id);
    setCreate(true);
  };

  const handleBooking = (
    id: React.SetStateAction<string | null>,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();
    setBook(id);
    setBooking(true);
  };

  const handleDelete = async (
    id: string,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to delete event:", errorData.error);
          alert("Error deleting event: " + errorData.error);
        } else {
          setEvent(true);
          router.push("/admin");
          toast.success("Event deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("An error occurred while deleting the event.");
      }
    }
  };

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = `${date.toLocaleDateString(
      "en-US",
      options
    )} at ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;

    return formattedDate;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!events) return <div>Event not found</div>;

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <div className="flex items-center py-2 gap-1 text-sm">
        <Link href="/" className="">
          Home
        </Link>
        <span>{">"}</span>
        <p>{events.title}</p>
      </div>

      <div className="flex flex-col gap-3 h-full overflow-auto">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-xl font-semibold">{events.title}</h2>
          <p>
            On: <span className="font-semibold">{formatDate(events.date)}</span>
          </p>
        </div>
        <p className="text-lg">{events.description}</p>
        <div className="flex items-center justify-between gap-1">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleEdit(events._id, e)}
                className=" bg-primary p-2 px-4 font-semibold rounded text-secondary cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleDelete(events._id, e)}
                className=" bg-primary p-2 px-4 font-semibold rounded text-secondary cursor-pointer"
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => handleBooking(events._id, e)}
              className=" bg-primary p-2 px-4 font-semibold rounded text-secondary cursor-pointer"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
