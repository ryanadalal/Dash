export default function SubmitInput({
  label,
  disabled,
}: {
  label: string;
  disabled: boolean;
}) {
  return (
    <button
      type="submit"
      className="w-full mb-4 bg-textslate text-white enabled:bg-black enabled:hover:bg-realamber enabled:hover:text-textslate disabled:cursor-not-allowed py-2 rounded-md"
      disabled={disabled}
    >
      {label}
    </button>
  );
}
