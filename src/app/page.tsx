"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiration, setExpiration] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateExpiration = (duration: string) => {
    // this is a function that calculates the expiration date based on the duration selected
    const now = new Date();
    switch (duration) {
      case "5-minutes":
        now.setMinutes(now.getMinutes() + 5);
        break;
      case "10-minutes":
        now.setMinutes(now.getMinutes() + 10);
        break;
      case "30-minutes":
        now.setMinutes(now.getMinutes() + 30);
        break;
      case "1-hour":
        now.setHours(now.getHours() + 1);
        break;
      case "5-hours":
        now.setHours(now.getHours() + 5);
        break;
      default:
        return null;
    }
    return now.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const expirationDate = calculateExpiration(expiration);

    if (!originalUrl) {
      setError("Please provide a URL to shorten.");
      setLoading(false);
      return;
    }

    if (!expirationDate) {
      setError("Please select a valid expiration duration.");
      setLoading(false);
      return;
    }

    const formData = {
      originalUrl,
      expiration: expirationDate,
    };

    try {
      const response = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong. Please try again.");
      } else {
        setOriginalUrl("");
        setExpiration("");
        router.refresh();
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 pl-10 w-full px-8">
      <h1 className="font-bold text-4xl">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-4 py-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex">
          <input
            type="text"
            placeholder="Paste the URL to be shortened"
            className="focus:outline-none flex-1 border border-gray-400 px-2 py-2 placeholder:text-lg"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <select
            className="focus:outline-none text-gray-400 border border-gray-400 px-2 py-2 placeholder:text-lg"
            name="interval"
            id="interval"
            onChange={(e) => setExpiration(e.target.value)}
            value={expiration}
          >
            <option value="">Set a duration time</option>
            <option value="5-minutes">5 Minutes</option>
            <option value="10-minutes">10 Minutes</option>
            <option value="30-minutes">30 Minutes</option>
            <option value="1-hour">1 Hour</option>
            <option value="5-hours">5 Hours</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#6a3693] text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Shorten URL"}
        </button>
      </form>
    </div>
  );
}
