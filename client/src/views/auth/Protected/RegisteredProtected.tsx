import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { User } from "../../../types/user-types.ts";
import Loading from "../../support/Loading.tsx";

/**
 * ensures that users accessing account restricted sections are registered
 * if a user is not fully registered in they are redirected to the complete register page
 * @returns an empty object for other components to build on top of
 */

export default function RegisteredProtected() {
  const valid = useSelector((state: User) => state.valid);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(valid);
    if (!valid) {
      console.log("registration not completed");
      navigate("/completeregister");
    }
  }, [valid, navigate]);

  if (!valid) {
    return <Loading message="Confirming account status" />;
  }

  return <Outlet />;
}
