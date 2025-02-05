import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { User } from "../../../types/user-types.ts";
import { loginUser } from "../../../utilities/userAPI.ts";
import EmailInput from "../../support/form/EmailInput.tsx";
import PasswordInput from "../../support/form/PasswordInput.tsx";
import SubmitInput from "../../support/form/SubmitInput.tsx";
import AuthBase from "./AuthBase.tsx";

/**
 * Component for loging in with local stragtegy
 *
 * @returns login object of type react component
 */
export default function Login() {
  // check if the user is logged in already and renavigate to dashboard if they are
  const id = useSelector((state: User) => state.id);
  const user_loading = useSelector((state: User) => state.loading);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [clicked, setClicked] = useState<boolean>(false);


  need to add a new thing so that if you go to login page need loike an auth protected thing over the whoel page so that on any reload checks even if you reload to login
  useEffect(() => {
    if (id != undefined && !user_loading) {
      navigate("/dashboard");
    }
  }, [id, user_loading, navigate]);

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

        <a href="/register" className="text-textslate hover:text-black">
          Not a member <span className="underline">register here</span>
        </a>
      </form>
    </AuthBase>
  );
}
