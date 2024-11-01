import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

interface EventData {
  _id: string;
  title: string;
  description: string;
  date: string | Date;
  seats: number; 
  availableSeats: number;
}


const Card = ({ data }: { data: EventData }) => {
  const { isLoggedIn, setEvent, setEdit, setCreate, setBook, setBooking } =
    useAppContext();


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
          toast.success("Event deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("An error occurred while deleting the event.");
      }
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

  return (
    <Link
      href={`/${data._id}`}
      className="border cursor-pointer p-4 flex flex-col h-fit justify-between gap-4 rounded-lg border-gray"
    >
      <div className="flex flex-col gap-1">
        <h2 className=" text-lg font-semibold cursor-pointer">{data.title}</h2>
        <p className="truncate text-base cursor-pointer">{data.description}</p>
        <div className="flex flex-col text-sm gap-1 ">
          <p className="cursor-pointer">Date: {formatDate(data.date)}</p>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => handleEdit(data._id, e)}
            className=" bg-primary p-2 px-4 font-semibold rounded text-secondary cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={(e) => handleDelete(data._id, e)}
            className=" bg-primary p-2 px-4 font-semibold rounded text-secondary cursor-pointer"
          >
            Delete
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => handleBooking(data._id, e)}
          className=" bg-primary p-2 px-4 font-semibold rounded text-secondary cursor-pointer"
        >
          Book Now
        </button>
      )}
    </Link>
  );
};

export default Card;
