// frontend/src/routes/NoDirectAccess.tsx

import { Helmet } from "react-helmet-async";
import { useTitle } from "@/utils/useTitle";

export default function NoDirectAccess() {
  useTitle("No Direct Access");

  return (
    <>
      <Helmet>
        <title>No Direct Access</title>
        <meta
          name="description"
          content="This route is not directly accessible."
        />
      </Helmet>
      <div className="bg-slate-300 min-h-screen flex flex-col items-center justify-center p-10">
        <div className="p-6 rounded-lg bg-red-200 space-y-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-red-700">No Direct Access</h1>
          <p className="text-red-700 text-xl">
            This route cannot be directly accessed, try a child route.
          </p>
          <p className="text-red-700 text-lg">(HINT: try a child route.)</p>
        </div>
      </div>
    </>
  );
}
