import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import CreateEvent from "@/components/Create";
import { Toaster } from "react-hot-toast";
import Book from "@/components/Book";

export const metadata: Metadata = {
  title: "Events",
  description: "Event Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative ">
        <AppProvider>
          {children}
          <CreateEvent />
          <Book/>
          <Toaster position="top-right" reverseOrder={false} />
        </AppProvider>
      </body>
    </html>
  );
}
