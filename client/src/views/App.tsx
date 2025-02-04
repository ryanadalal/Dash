import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import OAuthCallback from "./auth/support/OAuthCallback.tsx";
import AuthProtected from "./auth/support/AuthProtected.tsx";
import Dashboard from "./home/Dashboard.tsx";
import Register from "./auth/Register.tsx";
import Login from "./auth/Login.tsx";
import CompleteRegister from "./auth/CompleteRegister.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProtected />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "completeregister", element: <CompleteRegister /> },
      { path: "*", element: <Navigate to="/dashboard" replace={true} /> },
      { path: "", element: <Navigate to="/dashboard" replace={true} /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/oauth/callback", element: <OAuthCallback /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
