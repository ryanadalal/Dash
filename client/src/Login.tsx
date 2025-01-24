import { useUser } from "./UserProvider";

export default function Login() {
  const userDispatch = useUser().dispatch;
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
