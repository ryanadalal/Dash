import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import OAuthCallback from "./auth/support/OAuthCallback.tsx";
import AuthProtected from "./auth/Protected/AuthProtected.tsx";
import Dashboard from "./home/Dashboard.tsx";
import Register from "./auth/views/Register.tsx";
import Login from "./auth/views/Login.tsx";
import CompleteRegister from "./auth/views/CompleteRegister.tsx";
import RegisteredProtected from "./auth/Protected/RegisteredProtected.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <AuthProtected />,
    children: [
      { path: "/completeregister", element: <CompleteRegister /> },
      {
        path: "",
        element: <RegisteredProtected />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "*", element: <Navigate to="/dashboard" replace={true} /> },
          { path: "", element: <Navigate to="/dashboard" replace={true} /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/oauth/callback", element: <OAuthCallback /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
