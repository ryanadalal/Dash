import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginSuccess,
  loginFail,
  loginStart,
} from "../../../utilities/userSlice.ts";
import { getUserData } from "../../../utilities/userAPI.ts";
import Loading from "../../support/Loading.tsx";

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
              "Login failed! Please try again!",
          })
        );
        navigate("/login");
      }
    };

    handleCallback();
  }, [dispatch, navigate]);

  return <Loading message="Loading user data" />;
}
