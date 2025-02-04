export default function Loading({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realamber"></div>
      <h1 className="text-textslate">{message}</h1>
    </div>
  );
}
