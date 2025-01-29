import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";

import "./styles/index.css";

import reducer from "./utilities/userSlice.ts";

import App from "./views/App.tsx";

const store = configureStore({ reducer: reducer });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
