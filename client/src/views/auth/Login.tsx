import { useSelector } from "react-redux";
import GoogleSignInPng from "../../assets/googlesignin/real.png";
import "../../styles/index.css";
import { User } from "../../types/user-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const user_id = useSelector((state: User) => state.id);
  const user_loading = useSelector((state: User) => state.loading);
  const navigate = useNavigate();
  // check if the user is logged in already and renavigate to dashboard if they are
  useEffect(() => {
    if (user_id != undefined && !user_loading) {
      console.log("logged in redirecting...");
      navigate("/dashboard");
    }
  }, [user_id, user_loading, navigate]);

  return (
    <div className="h-screen flex bg-bgslate justify-center items-center">
      <div className="flex flex-col justify-evenly text-center h-75 p-7 bg-realamber shadow-2xl rounded-2xl mb-30">
        <h1 className="py-1.5 text-6xl text-textslate font-semibold">Reals</h1>
        <a href="http://localhost:5000/auth/google">
          <img className="w-75" src={GoogleSignInPng} />
        </a>
      </div>
    </div>
  );
}
