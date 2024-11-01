/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface EventData {
  _id: string;
  title: string;
  description: string;
  date: string | Date;
  seats: number;
  availableSeats: number;
}

interface AppContextType {
  create: boolean;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  booking: boolean;
  setBooking: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: string | null;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  events: EventData[];
  loading: boolean;
  error: string;
  setEvent: React.Dispatch<React.SetStateAction<boolean>>;
  edit: string | null;
  setEdit: React.Dispatch<React.SetStateAction<string | null>>;
  book: string | null;
  setBook: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [create, setCreate] = useState<boolean>(false);
  const [booking, setBooking] = useState<boolean>(false);
  const [event, setEvent] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [edit, setEdit] = useState<string | null>(null);
  const [book, setBook] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events);
      } else {
        setError("Failed to fetch events");
        toast.error("Failed to fetch events");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (event) setEvent(false);
    fetchEvents();
  }, [event]);

  useEffect(() => {
    const adminName = localStorage.getItem("admiName");
    setIsLoggedIn(adminName);

    if (adminName && pathname === "/") {
      router.push("/admin");
    }

    if (refresh) setRefresh(false);
  }, [refresh, pathname, router]);

  return (
    <AppContext.Provider
      value={{
        create,
        setCreate,
        isLoggedIn,
        refresh,
        setRefresh,
        events,
        loading,
        error,
        setEvent,
        edit,
        setEdit,
        book,
        setBook,
        booking,
        setBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
