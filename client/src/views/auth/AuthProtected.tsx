import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { User } from "../../types/user-types.ts";

/**
 * ensures that users accessing account restricted sections are logged in
 * if a user is not logged in they are redirected to the login page
 * @returns an empty object for other components to build on top of
 */
export default function AuthProtected() {
  const googleId = useSelector((state: User) => state.googleId);
  const user_loading = useSelector((state: User) => state.loading);
  const navigate = useNavigate();
  useEffect(() => {
    if (googleId == undefined || user_loading) {
      console.log("not logged in redirecting...");
      navigate("/login");
    }
  }, [googleId, user_loading, navigate]);

  return <Outlet />;
}
