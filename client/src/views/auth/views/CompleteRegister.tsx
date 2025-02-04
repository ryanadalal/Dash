import { FormEvent, useState } from "react";

import { completeRegisterUser } from "../../../utilities/userAPI.ts";
import SubmitInput from "../../support/form/SubmitInput.tsx";
import AuthBase from "./AuthBase.tsx";
import DateSelection from "../../support/form/DateSelection.tsx";
import dayjs from "dayjs";

/**
 * Component for Register in with local stragtegy
 *
 * @returns Register object of type react component
 */
export default function CompleteRegister() {
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const textBoxStyle =
    "p-2 border border-gray-300 rounded-md shrink min-w-0 placeholder-textslate caret-realamber focus:outline-2 focus:outline-realamber";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    setError(null);

    const birthDay = e.currentTarget.birthDay.value;
    const birthMonth = e.currentTarget.birthMonth.value;
    const birthYear = e.currentTarget.birthYear.value;

    const DATE_FORMAT = "YYYY-MM-DD";
    const inputDate = `${birthYear}-${birthMonth}-${birthDay}`;
    const parsedDate = dayjs(inputDate, DATE_FORMAT, true);
    if (
      !(parsedDate.isValid() && parsedDate.format(DATE_FORMAT) === inputDate)
    ) {
      console.log("invalid date");
      setError("Invalid date");
      setClicked(false);
      return;
    }

    try {
      await completeRegisterUser(firstName, lastName, new Date(inputDate));
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Completetion of registration failed"
      );
      setClicked(false);
    }
  };

  return (
    <AuthBase title="Finish Registration">
      <form onSubmit={handleSubmit} className="p-6 w-fit">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-row justify-between mb-4 gap-4 w-95">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
            className={textBoxStyle}
            placeholder="first name"
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
            className={textBoxStyle}
            placeholder="last name"
          />
        </div>
        <DateSelection />

        <SubmitInput label="Finish Registering" disabled={clicked} />
      </form>
    </AuthBase>
  );
}
