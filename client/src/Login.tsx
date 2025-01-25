import { useUser } from "./UserProvider";
import axios from "axios";

export default function Login() {
  const userDispatch = useUser().dispatch;
  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div
        id="g_id_onload"
        data-client_id=YOUR_GOOGLE_CLIENT_ID
        data-login_uri="http://localhost:5000/auth/google"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  );
}
