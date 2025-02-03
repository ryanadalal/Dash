import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { User } from "../../types/user-types.ts";
import { registerUser } from "../../utilities/userAPI.ts";

/**
 * Component for Register in with local stragtegy
 *
 * @returns Register object of type react component
 */
export default function Register() {
  // check if the user is logged in already and renavigate to dashboard if they are
  const id = useSelector((state: User) => state.id);
  const user_loading = useSelector((state: User) => state.loading);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordStrengthError, setPasswordStrengthError] = useState<
    string | null
  >(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    if (id != undefined && !user_loading) {
      console.log("logged in redirecting...");
      navigate("/dashboard");
    }
  }, [id, user_loading, navigate]);

  const validatePassword = (password: string) => {
    if (password.length == 0) {
      setPasswordStrengthError(null);
      return;
    }

    const lengthValid = password.length >= 8;

    const complexityValid =
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*()_+]/.test(password);

    if (!lengthValid) {
      setPasswordStrengthError("password must have 8 characters");
    } else if (!complexityValid) {
      setPasswordStrengthError(
        "password must contain at least one uppercase letter, lowercase letter, number, and special character."
      );
    } else {
      setPasswordStrengthError(null);
    }

    setPasswordValid(lengthValid && complexityValid);
  };

  const handleConfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    setError(null);

    setPasswordsMatch(password === confPassword);
    // Check if passwords match
    if (!passwordsMatch) {
      return;
    }

    if (!passwordValid) {
      setError("password does not meet mininmum requirements");
      return;
    }

    try {
      await registerUser(email, password);
    } catch (error: any) {
      setError(error.response?.data?.message || `Register failed`);
      setClicked(false);
    }
  };

  return (
    <div className="h-screen flex bg-bgslate justify-center items-center">
      <div className="flex flex-col justify-evenly text-center h-fit p-7 bg-white shadow-2xl rounded-2xl mb-30">
        <h1 className="py-1.5 text-4xl text-realamber font-semibold">
          Register for Real
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
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="password"
          />
          {passwordStrengthError && (
            <p className="text-red-500 text-sm mb-4">{passwordStrengthError}</p>
          )}

          <input
            type="password"
            value={confPassword}
            onChange={handleConfPasswordChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="confirm password"
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
          )}

          <button
            type="submit"
            className="w-full mb-4 bg-textslate text-white enabled:bg-black enabled:hover:bg-realamber enabled:hover:text-textslate disabled:cursor-not-allowed py-2 rounded-md"
            disabled={password !== confPassword || !passwordValid || clicked}
          >
            Register
          </button>

          <a href="/login" className="text-textslate hover:text-black">
            Already a member <span className="underline">login here</span>
          </a>
        </form>
      </div>
    </div>
  );
}
