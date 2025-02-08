import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, updateStart } from "../../../utilities/userSlice.ts";
import Loading from "../../support/Loading.tsx";
import { checkToken, logoutUser } from "../../../utilities/userAPI.ts";
import { User } from "../../../types/user-types.ts";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state: User) => state.id);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        dispatch(updateStart());
        // call to the api and then forward the response to the slice
        await logoutUser();
        const hasToken = (await checkToken()).data.exists;
        if (!hasToken) {
          console.log("predidn't");
          dispatch(logout());
        } else {
          const interval = setInterval(async () => {
            const hasToken = (await checkToken()).data.exists;
            console.log("int", hasToken);
            if (!hasToken) {
              console.log("didn't have finishing");
              clearInterval(interval);
              dispatch(logout());
            }
          }, 1000);
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    if (id === undefined) {
      console.log("success logging out redirectng");
      navigate("/login");
    } else {
      handleCallback();
    }
  }, [id, dispatch]);

  return <Loading message="Logging out" />;
}
