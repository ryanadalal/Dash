import Dashboard from "./home/Dashboard";
import Login from "./auth/Login";
import "../styles/index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import OAuthCallback from "./auth/OAuthCallback";
import AuthProtected from "./auth/AuthProtected";

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
