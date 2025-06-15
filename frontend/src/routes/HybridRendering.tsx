// frontend/src/routes/HybridRendering.tsx

import { Helmet } from "react-helmet-async";
import { useTitle } from "@/utils/useTitle";

export default function HybridRendering() {
  useTitle("Hybrid Rendering Demo");

  return (
    <>
      <Helmet>
        <title>Hybrid Rendering Demo</title>
        <meta
          name="description"
          content="A demonstration of a client-side rendering route."
        />
      </Helmet>
      <div className="p-6 rounded-lg bg-slate-300 space-y-6 flex flex-col items-center justify-center border-4 border-black shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-800">
          This part is rendered by React.
        </h2>
        <a
          href="/"
          className="text-neutral-200 font-semibold bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
        >
          Home Page
        </a>
      </div>
    </>
  );
}
