import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { User } from "../../../types/user-types.ts";
import Loading from "../../support/Loading.tsx";
import { getUserData } from "../../../utilities/userAPI.ts";
import {
  loginFail,
  saveUserData,
  updateStart,
} from "../../../utilities/userSlice.ts";

/**
 * ensures that users accessing account restricted sections are logged in
 * if a user is not logged in they are redirected to the login page
 * @returns an empty object for other components to build on top of
 */

export default function AuthProtected() {
  const id = useSelector((state: User) => state.id);
  const user_loading = useSelector((state: User) => state.loading);
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
    if (!id) {
      tryFetchUserData();
    } else {
      setCheckingAuth(false);
    }
  }, [id, user_loading, setCheckingAuth, navigate, dispatch]);
  useEffect(() => {
    if (!checkingAuth) {
      if (!id) {
        navigate("/login");
      }
    }
  }, [id, user_loading, checkingAuth, navigate]);

  if (checkingAuth || user_loading || !id) {
    return <Loading message="Confirming login status" />;
  }

  return <Outlet />;
}
