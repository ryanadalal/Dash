import { FormEvent, useState } from "react";

import { loginUser } from "../../../utilities/userAPI.ts";
import EmailInput from "../../support/form/EmailInput.tsx";
import PasswordInput from "../../support/form/PasswordInput.tsx";
import SubmitInput from "../../support/form/SubmitInput.tsx";
import AuthBase from "./AuthBase.tsx";
import { Link } from "react-router-dom";

/**
 * Component for loging in with local stragtegy
 *
 * @returns login object of type react component
 */
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [clicked, setClicked] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    setError(null);

    try {
      await loginUser(email, password);
    } catch (error: any) {
      setError(error.response?.data?.message || "login failed");
      setClicked(false);
    }
  };

  return (
    <AuthBase title="Login to Real">
      <form onSubmit={handleSubmit} className="p-6 w-80">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <EmailInput email={email} onChange={setEmail} />
        <PasswordInput
          password={password}
          placeholder="password"
          onChange={setPassword}
        />

        <SubmitInput label="Login" disabled={clicked} />

        <Link to="/register" className="text-textslate hover:text-black">
          Not a member <span className="underline">register here</span>
        </Link>
      </form>
    </AuthBase>
  );
}
