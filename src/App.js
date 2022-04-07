import React from "react";
import { Home } from "./pages/Home";
import { AppContext } from "./context/AppContext";
import { useAppState } from "./hooks/useAppState";

export default function App() {
  return (
    <AppContext.Provider value={useAppState()}>
      <Home />
    </AppContext.Provider>
  );
}
