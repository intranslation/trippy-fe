import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import BaseLayout from "./components/layout/base-layout";
import { queryClient } from "./lib/react-query";
import Authentication from "./features/authentication/authentication";
import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/sonner";

const ItineraryEditor = lazy(
  () => import("./features/itinerary-editor/itinerary-editor"),
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ItineraryEditor />
              </Suspense>
            }
          />
          <Route
            path="/join"
            element={
              <BaseLayout>
                <Authentication />
              </BaseLayout>
            }
          />
          <Route path="/loading" element={<div className="loading">aa</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
