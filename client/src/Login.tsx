import { useUser } from "./UserProvider";
import axios from "axios";
import GoogleSignInPng from "./assets/googlesignin/real.png";
import "./styles/index.css";

export default function Login() {
  const userDispatch = useUser().dispatch;
  return (
    <div className="h-screen flex bg-bgslate justify-center items-center">
      <div className="flex flex-col justify-evenly text-center h-75 p-7 bg-realamber shadow-2xl rounded-2xl mb-30">
        <h1 className="py-1.5 text-6xl text-textslate font-semibold">Reals</h1>
        <a href="http://localhost:5000/google/auth">
          <img className="w-75" src={GoogleSignInPng} />
        </a>
      </div>
    </div>
  );
}
