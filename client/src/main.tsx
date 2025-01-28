import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App.tsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "./styles/index.css";
import reducer from "./utilities/userSlice.ts";

const store = configureStore({ reducer: reducer });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
