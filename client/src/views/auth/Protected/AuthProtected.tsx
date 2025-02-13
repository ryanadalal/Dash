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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    if (!checkingAuth) {
      if (id === undefined) {
        navigate("/login");
      }
    }

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
    if (id === undefined) {
      tryFetchUserData();
    } else {
      setCheckingAuth(false);
    }
  }, [id, setCheckingAuth, navigate, dispatch]);

  if (checkingAuth || !id) {
    return <Loading message="Confirming login status" />;
  }

  return <Outlet />;
}
