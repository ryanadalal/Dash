import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { User } from "../../../types/user-types.ts";
import { getUserData } from "../../../utilities/userAPI.ts";
import {
  loginFail,
  saveUserData,
  updateStart,
} from "../../../utilities/userSlice.ts";

/**
 * ensures that users who are already logged in can be forwarded to the dashboard
 * 1. load the page and begin searchign for user in the background
 * 2. if a user is logged in they are redirected to the login page
 * @returns an empty object for other components to build on top of
 */

export default function AuthForward() {
  const id = useSelector((state: User) => state.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  useEffect(() => {
    async function tryFetchUserData() {
      try {
        // start the user loading process
        dispatch(updateStart());
        // call to the api and then forward the response to the slice
        const response = await getUserData();
        dispatch(saveUserData(response.data.user));
      } catch (error: any) {
        dispatch(
          loginFail({
            error:
              error.response?.data?.message ||
              "Login failed! Please try again!",
          })
        );
      } finally {
        setCheckingAuth(false);
      }
    }
    if (id) {
      navigate("/dashboard");
    } else {
      tryFetchUserData();
    }
  }, [id, setCheckingAuth, navigate, dispatch]);
  useEffect(() => {
    if (!checkingAuth) {
      if (id) {
        navigate("/dashboard");
      }
    }
  }, [id, checkingAuth, navigate]);

  // return outlet right away because this route isn't protected
  // users can see the login page and then be redirected
  return <Outlet />;
}
