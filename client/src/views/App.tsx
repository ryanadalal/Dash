import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "../styles/index.css";

import Login from "./auth/Login.tsx";
import OAuthCallback from "./auth/OAuthCallback.tsx";
import AuthProtected from "./auth/AuthProtected.tsx";
import Dashboard from "./home/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProtected />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <Navigate to="/dashboard" replace={true} /> },
      { path: "", element: <Navigate to="/dashboard" replace={true} /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/oauth/callback", element: <OAuthCallback /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
