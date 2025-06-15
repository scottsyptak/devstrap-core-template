// frontend/src/routes/ApiStatus.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { API_BASE_URL } from "@/utils/api";
import { useTitle } from "@/utils/useTitle";

export default function ApiStatus() {
  const [status, setStatus] = useState<string | null>(null);
  useTitle("API Status"); // ✅ Force sync title update

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(`/api/health`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const data = await res.json();
        setStatus(data.status);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    fetchStatus();
  }, []);

  return (
    <>
      <Helmet>
        <title>API Status</title>
        <meta name="description" content="View the current API status." />
      </Helmet>
      <div className="bg-slate-300 min-h-screen flex flex-col items-center justify-center p-10">
        <div className="p-6 rounded-lg bg-violet-200 space-y-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold text-green-800">API Status</h1>
          <p className="text-lg text-green-600">
            This page uses client-side React to fetch API data.
          </p>
          <p className="text-lg">
            Status:{" "}
            <span
              className={
                status === "ok"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {status ?? "Loading..."}
            </span>
          </p>
          <Link
            to="/"
            className="text-neutral-200 font-semibold bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
          >
            Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
