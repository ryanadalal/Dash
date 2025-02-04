export default function EmailInput({
  email,
  onChange,
}: {
  email: string;
  onChange: (n: any) => any;
}) {
  return (
    <input
      type="email"
      value={email}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded-md mb-4"
      placeholder="email"
    />
  );
}
