import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginSuccess,
  loginFail,
  loginStart,
} from "../../utilities/userSlice.ts";
import { getUserData } from "../../utilities/userAPI.ts";

export default function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        dispatch(loginStart());

        const response = await getUserData();
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
