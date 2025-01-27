import Home from "./home/Home";
import Login from "./auth/Login";
import "../styles/index.css";
import { useSelector } from "react-redux";
import { User } from "../types/user-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OAuthCallback from "./auth/OAuthCallback";

export default function App() {
  const id = useSelector((state: User) => state.id);
  /*if (id == null || id == undefined) {
    return <Login />;
  } else {
    return <Home />;
  }*/
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={id == null || id == undefined ? <Login /> : <Home />}
        />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}
