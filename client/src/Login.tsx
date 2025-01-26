import { useUser } from "./UserProvider";
import axios from "axios";
import GoogleSignInPng from "./assets/googlesignin/real.png";

export default function Login() {
  const userDispatch = useUser().dispatch;
  return (
    <div>
      <img src={GoogleSignInPng} />
    </div>
  );
}
