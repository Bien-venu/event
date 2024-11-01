"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface EventData {
  _id: string;
  title: string;
  description: string;
  date: string | Date;
  totalSeats: number;
}

const EditEvent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        const res = await fetch(`/api/events/${eventId}`);
        const data: EventData = await res.json();
        setEvent(data);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      router.push("/admin/dashboard");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={event?.title || ""}
          onChange={(e) => setEvent({ ...event!, title: e.target.value })}
          required
        />
        <textarea
          value={event?.description || ""}
          onChange={(e) => setEvent({ ...event!, description: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={event ? new Date(event.date).toISOString().slice(0, 16) : ""}
          onChange={(e) =>
            setEvent({ ...event!, date: new Date(e.target.value) })
          }
          required
        />
        <input
          type="number"
          value={event?.totalSeats || 0}
          onChange={(e) =>
            setEvent({ ...event!, totalSeats: Number(e.target.value) })
          }
          required
        />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
