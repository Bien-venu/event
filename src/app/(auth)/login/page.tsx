"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAppContext } from "@/context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const { setRefresh } = useAppContext();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        setError(errorData.message || "An error occurred. Please try again."); 
        return;
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("admiName", data.username);
        setRefresh(true);
        router.push("/admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error); 
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="h-screen flex flex-col items-center border overflow-hidden py-6 px-4">
      <div className="grid h-full overflow-auto mx-auto md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
        <div className="border border-gray rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="mb-8">
              <h3 className=" text-2xl font-semibold">Login as an admin</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Sign in to your account and explore a world of possibilities.
                Your journey begins here.
              </p>
            </div>

            <div>
              <label className=" text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-sm border border-gray px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className=" text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm border border-gray px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            <div className="!mt-8">
              <button
                type="submit"
                className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-secondary bg-primary font-semibold focus:outline-none ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} 
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>

            <p className="text-sm !mt-8 text-center">
              Not an admin?
              <Link
                href="/"
                className="font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Return Home
              </Link>
            </p>
          </form>
        </div>
        <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
          <Image
            src="https://readymadeui.com/login-image.webp"
            className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
            alt="Dining Experience"
            width={2000}
            height={2000}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
