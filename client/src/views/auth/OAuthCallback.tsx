import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFail, loginStart } from "../../utilities/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      console.log("handleCallback");
      try {
        dispatch(loginStart());
        const response = await axios.get(
          "http://localhost:5000/auth/callback/success",
          { withCredentials: true }
          /*Now until the session is valid the browser will attach the cookies as header in all requests from that origin.*/
        );
        dispatch(loginSuccess({ payload: response.data.user }));
        navigate("/home");
      } catch (error: any) {
        dispatch(
          loginFail({
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
