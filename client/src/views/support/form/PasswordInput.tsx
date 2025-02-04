export default function ({
  password,
  placeholder,
  onChange,
}: {
  password: string;
  placeholder: string;
  onChange: (n: any) => any;
}) {
  return (
    <input
      type="password"
      value={password}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded-md mb-4"
      placeholder={placeholder}
    />
  );
}
