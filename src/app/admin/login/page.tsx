"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-100 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg shadow-sm hover:bg-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
