// frontend/src/main.tsx

import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./routes/HomePage";
import ApiStatus from "@/routes/ApiStatus";
import ClientSideRendering from "./routes/ClientSideRendering";
import HybridRendering from "./routes/HybridRendering";
import NoDirectAccess from "./routes/NoDirectAccess";
import { HelmetProvider } from "react-helmet-async";
import FrontendHealth from "./routes/FrontendHealth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/api-status",
    element: <ApiStatus />,
  },
  {
    path: "demo",
    children: [
      {
        index: true, // This means the route "/demo"
        element: <NoDirectAccess />,
      },
      {
        path: "rendering",
        element: <Navigate to="hybrid" replace />,
      },
      {
        path: "rendering/client-side",
        element: <ClientSideRendering />,
      },
      {
        path: "rendering/hybrid",
        element: <HybridRendering />,
      },
    ],
  },
  {
    path: "/healthz",
    element: <FrontendHealth />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
