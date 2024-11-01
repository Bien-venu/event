import type { Metadata } from "next";
import Top from "@/components/Top";

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
    <div className="flex flex-col h-screen w-full overflow-hidden gap-2 p-2 px-8 pb-8 sm:px-20 xl:px-72">
      <Top />
      <div className=" overflow-hidden h-full">{children}</div>
    </div>
  );
}
