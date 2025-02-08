export function NavDropDownItem({
  title,
  img,
  dest,
}: {
  title: string;
  img: string;
  dest: string;
}) {
  return (
    <a href={dest}>
      <div className="flex w-fill cursor-pointer select-none items-center gap-3 rounded-lg px-1 py-1 text-start leading-tight outline-none transition-all hover:bg-bgslate focus:bg-realamber focus:text-black">
        <div className="flex items-center justify-center rounded-lg p-2">
          <img className="h-6 w-6" src={img} />
        </div>
        <div className="focus:text-inherit">
          <h6 className="text-nowrap flex items-center font-sans text-sm font-bold tracking-normal text-black antialiased">
            {title}
          </h6>
        </div>
      </div>
    </a>
  );
}
