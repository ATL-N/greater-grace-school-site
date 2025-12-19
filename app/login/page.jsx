"use client";

import { useState, Suspense } from "react"; // Import Suspense
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// Create a wrapper component for the page content that uses useSearchParams
function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/admin/stories";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res.ok) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--accent-color)" }}>
      <div className="max-w-md w-full p-8 rounded-lg shadow-2xl" style={{ backgroundColor: "var(--background-color)" }}>
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "var(--primary-color)" }}
        >
          Admin Login
        </h1>
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "var(--text-color)" }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: "var(--text-color)", backgroundColor: "var(--background-color)" }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
               style={{ color: "var(--text-color)" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: "var(--text-color)", backgroundColor: "var(--background-color)" }}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
