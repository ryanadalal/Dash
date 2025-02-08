import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, updateStart } from "../../../utilities/userSlice.ts";
import Loading from "../../support/Loading.tsx";
import { logoutUser } from "../../../utilities/userAPI.ts";
import { User } from "../../../types/user-types.ts";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state: User) => state.id);

  useEffect(() => {
    if (id === undefined) {
      navigate("/login");
    }
    console.log("logging out");
    const handleCallback = async () => {
      try {
        dispatch(updateStart());
        // call to the api and then forward the response to the slice
        await logoutUser();
        // start the user logout process
        dispatch(logout());
      } catch (error: any) {
        console.error(error);
      }
    };
    handleCallback();
  }, [id, dispatch]);

  return <Loading message="Logging out" />;
}
