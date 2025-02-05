import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  saveUserData,
  loginFail,
  loginStart,
  updateStart,
} from "../../../utilities/userSlice.ts";
import { getUserData } from "../../../utilities/userAPI.ts";
import Loading from "../../support/Loading.tsx";

export default function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // determine whether the users is logging in or updating with url parameters
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const shouldUpdate = params.get("update") === "true";

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // start the user loading process
        // use shouldupdate to determine whether to wipe the id or keep it
        dispatch(shouldUpdate ? updateStart() : loginStart());
        // call to the api and then forward the response to the slice
        const response = await getUserData();
        dispatch(saveUserData(response.data.user));
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
