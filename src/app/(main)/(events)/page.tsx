/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Card from "@/components/Card";
import { useAppContext } from "@/context/AppContext";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
}

const Events = () => {
  const { events, loading, error } = useAppContext();

  return (
    <div className="flex flex-col h-full rounded-lg">
      <h1 className="text-xl py-4 font-semibold">Available Events</h1>
      <div className="grid overflow-auto py-4 h-fit grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : events.length > 0 ? (
          events.map((event, index) => <Card data={event} key={index} />)
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default Events;
