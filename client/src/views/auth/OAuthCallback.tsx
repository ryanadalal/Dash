import { useEffect, useReducer } from "react";
import { useUser } from "../../utilities/UserProvider";
import axios from "axios";

export default function OAuthCallback() {
  const dispatch = useUser().dispatch;

  useEffect(() => {
    const handleCallback = async () => {
      try {
        dispatch(loginStart());
        const response = await axios.get(
          `http://localhost:5000/auth/callback/success`,
          { withCredentials: true }
        );
        dispatch(response.user.data, useraction);
        //dispatch(loginSuccess({ user: response.data.user }));
        navigate("/");
      } catch (error) {
        dispatch(
          loginFailure({
            error:
              error.response?.data?.message ||
              "Login using Google failed! Please try using email and password!",
          })
        );
        navigate("/login");
      }
    };

    handleCallback();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realamber"></div>
    </div>
  );
}
