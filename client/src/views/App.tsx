import Home from "./home/Home";
import Login from "./auth/Login";
import "../styles/index.css";
import { useSelector } from "react-redux";
import { User } from "../types/user-types";

export default function App() {
  const id = useSelector((state: User) => state.id);
  if (id == null || id == undefined) {
    return <Login />;
  } else {
    return <Home />;
  }
}
