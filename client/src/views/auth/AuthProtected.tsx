import { useSelector } from "react-redux";
import { User } from "../../types/user-types";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AuthProtected() {
  const user_id = useSelector((state: User) => state.id);
  const user_loading = useSelector((state: User) => state.loading);
  const navigate = useNavigate();
  useEffect(() => {
    if (user_id == undefined || user_loading) {
      console.log("not logged in redirecting...");
      navigate("/login");
    }
  }, [user_id, user_loading, navigate]);

  return <Outlet />;
}
