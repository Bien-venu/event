"use client";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Top = () => {
  const { isLoggedIn, setRefresh } = useAppContext();
  const nameShort = isLoggedIn?.slice(0, 2);
  const router = useRouter();

  const handleLogout = () => {
    setRefresh(true);
    localStorage.removeItem("admiName");
    router.push("/");
  };

  return (
    <div className="flex py-2 items-center text-sm font-semibold justify-between">
      <h1 className="text-2xl uppercase">Events</h1>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <div className="flex uppercase bg-gray p-2 rounded-full">
            {nameShort}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            color="#000000"
            fill="none"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            <path
              d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-primary p-2 text-secondary rounded px-4"
        >
          Login as Admin
        </Link>
      )}
    </div>
  );
};

export default Top;
