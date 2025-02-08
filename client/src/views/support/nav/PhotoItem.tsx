export function PhotoItem({ photo }: { photo: string }) {
  return <img src={photo} className="h-10 w-10 rounded-full" />;
}
