export default function DateSelection() {
  const selectStyles =
    "w-fit p-2 border-textslate border-b-1 focus:border-realamber focus:ring-0 focus:outline-none";
  return (
    <div className="flex justify-between mb-4 items-baseline">
      <span className="text-lg text-textslate">Birthday</span>

      <div className="w-fit flex justify-between gap-4">
        <select
          name="birthMonth"
          required
          className={selectStyles}
          defaultValue=" "
        >
          <option value=" " disabled></option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select
          name="birthDay"
          required
          className={selectStyles}
          defaultValue=" "
        >
          <option value=" " disabled></option>
          {Array(31)
            .fill(null)
            .map((n, i) => n + i)
            .map((_, i) => {
              i += 1;
              return (
                <option key={`birthDay${i}`} value={i}>
                  {i}
                </option>
              );
            })}
        </select>

        <select
          name="birthYear"
          required
          className={selectStyles}
          defaultValue=" "
        >
          <option value=" " disabled></option>
          {Array(100)
            .fill(null)
            .map((n, i) => n + i)
            .map((_, i) => {
              i = 2030 - i;
              return (
                <option key={`birthYear${i}`} value={i}>
                  {i}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
}
