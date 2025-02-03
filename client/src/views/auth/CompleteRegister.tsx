import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { User } from "../../types/user-types.ts";
import { completeRegisterUser } from "../../utilities/userAPI.ts";

/**
 * Component for Register in with local stragtegy
 *
 * @returns Register object of type react component
 */
export default function CompleteRegister() {
  // check if the user is logged in already and renavigate to dashboard if they are
  const valid = useSelector((state: User) => state.valid);
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (valid) {
      console.log("logged in redirecting...");
      navigate("/dashboard");
    }
  }, [valid, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    setError(null);

    try {
      await completeRegisterUser(firstName, lastName);
    } catch (error: any) {
      setError(
        error.response?.data?.message || `Completetion of registration failed`
      );
      setClicked(false);
    }
  };
  //^\d{2}\/\d{2}\/\d{4}$
  //
  function verifyDate(event: React.KeyboardEvent<HTMLInputElement>) {
    const regexDate =
      /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    if (regexDate.test(date)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="h-screen flex bg-bgslate justify-center items-center">
      <div className="flex flex-col justify-evenly text-center h-fit p-7 bg-white shadow-2xl rounded-2xl mb-30">
        <h1 className="py-1.5 text-4xl text-realamber font-semibold">
          Register for Real
        </h1>
        <form onSubmit={handleSubmit} className="p-6 w-80">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="email"
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="password"
          />

          <input
            type="text"
            value={date}
            onKeyDown={(event) => verifyDate(event)}
            required
          />

          <button
            type="submit"
            className="w-full mb-4 bg-textslate text-white enabled:bg-black enabled:hover:bg-realamber enabled:hover:text-textslate disabled:cursor-not-allowed py-2 rounded-md"
            disabled={clicked}
          >
            Finish Registering
          </button>
        </form>
      </div>
    </div>
  );
}
