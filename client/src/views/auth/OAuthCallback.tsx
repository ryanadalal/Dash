import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  loginSuccess,
  loginFail,
  loginStart,
} from "../../utilities/userSlice.ts";

export default function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        dispatch(loginStart());
        // request the user data from the backend and pass it the cookies for the session
        const response = await axios.get(
          "http://localhost:5000/auth/callback/success",
          { withCredentials: true }
        );
        dispatch(loginSuccess(response.data.user));
        navigate("/dashboard");
      } catch (error: any) {
        dispatch(
          loginFail({
            error:
              error.response?.data?.message ||
              "Login using Google failed! Please try using email and password!",
          })
        );
        navigate("/login");
      }
    };

    handleCallback();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realamber"></div>
    </div>
  );
}
