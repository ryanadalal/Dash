import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import AppContexts from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContexts />
  </StrictMode>
);
