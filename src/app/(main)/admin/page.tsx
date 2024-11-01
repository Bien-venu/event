"use client";
import Card from "@/components/Card";
import { useAppContext } from "@/context/AppContext";

const Dashboard = () => {
  const { setEdit, setCreate, isLoggedIn, events, loading, error } =
    useAppContext();

  const handleCreate = () => {
    setEdit(null);
    setCreate(true);
  };

  return (
    <div className="flex flex-col h-full rounded-lg">
      <h1 className="text-xl py-4 font-semibold">
        Welcome back, {isLoggedIn ? isLoggedIn : "Guest"}!
      </h1>
      <div className="flex items-center justify-between py-2">
        <h1 className="text-lg font-medium">Events</h1>
        <div
          onClick={handleCreate}
          className="bg-primary cursor-pointer text-sm font-semibold p-2 text-secondary rounded px-4"
        >
          Create New Event
        </div>
      </div>
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

export default Dashboard;
