// frontend/src/routes/HomePage.tsx

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTitle } from "@/utils/useTitle";

export default function HomePage() {
  useTitle("Home"); // ✅ Force sync title update
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="The DevStrap Home Page." />
      </Helmet>
      <div className="bg-slate-300 min-h-screen flex flex-col items-center justify-center p-10">
        <div className="p-6 rounded-lg bg-violet-200 space-y-6 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-blue-800">
            Welcome to DevStrap
          </h1>
          <div className="flex flex-col items-center space-y-2">
            <a
              href="/api/health"
              className="text-neutral-200 font-semibold bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
            >
              API Health Check
            </a>
            <Link
              to="/api-status"
              className="text-neutral-200 font-semibold bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
            >
              API Status Page
            </Link>
            <Link
              to="/demo/rendering/client-side"
              className="text-neutral-200 font-semibold bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
            >
              Client-Side Rendering
            </Link>
            <a
              href="/demo/rendering/hybrid"
              className="text-neutral-200 font-semibold bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
            >
              Hybrid Rendering
            </a>
            <a
              href="/demo/rendering/server-side"
              className="text-neutral-200 font-semibold bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
            >
              Server-Side Rendering
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
