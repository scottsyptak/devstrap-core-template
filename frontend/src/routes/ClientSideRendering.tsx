// frontend/src/routes/ClientSideRendering.tsx

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTitle } from "@/utils/useTitle";

export default function ClientSideRendering() {
  useTitle("Client-Side Rendering Demo");

  return (
    <>
      <Helmet>
        <title>Client-Side Rendering Demo</title>
        <meta
          name="description"
          content="A demonstration of a client-side rendering route."
        />
      </Helmet>
      <div className="bg-slate-300 min-h-screen flex flex-col items-center justify-center p-10">
        <div className="p-6 rounded-lg bg-violet-200 space-y-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-violet-800">
            Client-Side Rendering
          </h1>
          <p className="text-lg text-violet-600">Rendered fully in React.</p>
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
