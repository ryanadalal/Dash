import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { User } from "../../types/user-types.ts";
import { loginUser } from "../../utilities/userAPI.ts";

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

  useEffect(() => {
    if (id != undefined && !user_loading) {
      console.log("logged in redirecting...");
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
    <div className="h-screen flex bg-bgslate justify-center items-center">
      <div className="flex flex-col justify-evenly text-center h-fit p-7 bg-white shadow-2xl rounded-2xl mb-30">
        <h1 className="py-1.5 text-4xl text-realamber font-semibold">
          Login to Real
        </h1>
        <form onSubmit={handleSubmit} className="p-6 w-80">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="password"
          />

          <button
            type="submit"
            className="w-full mb-4 bg-textslate text-white enabled:bg-black enabled:hover:bg-realamber enabled:hover:text-textslate disabled:cursor-not-allowed py-2 rounded-md"
            disabled={clicked}
          >
            Login
          </button>

          <a href="/register" className="text-textslate hover:text-black">
            Not a member <span className="underline">register here</span>
          </a>
        </form>
      </div>
    </div>
  );
}
