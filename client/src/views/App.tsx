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
import AuthForward from "./auth/Protected/AuthForward.tsx";
import Logout from "./auth/support/Logout.tsx";

const router = createBrowserRouter([
  { path: "*", element: <Navigate to="/login" replace={true} /> },
  {
    path: "",
    element: <AuthForward />,
    children: [
      { path: "/logout", element: <Logout /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "", element: <Navigate to="/login" replace={true} /> },
    ],
  },
  { path: "/oauth/callback", element: <OAuthCallback /> },
  {
    path: "",
    element: <AuthProtected />,
    children: [
      { path: "/completeregister", element: <CompleteRegister /> },
      {
        path: "",
        element: <RegisteredProtected />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
