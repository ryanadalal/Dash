function NavBarList({ text }: { text: string }) {
  return (
    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
      <a href="#" className="flex items-center">
        {text}
      </a>
    </li>
  );
}

export default function NavBar() {
  return (
    <nav className="flex flex-wrap items-center justify-between w-full px-4 py-2 bg-gray-200 shadow-md rounded-b-xl sticky top-0 lg:px-30 lg:py-3">
      <a
        href="#"
        className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
      >
        Reals
      </a>
      <ul className="flex flex-col gap-1 mb-0 mt-0 sm:flex-row sm:items-center sm:gap-6">
        <NavBarList text="Links"></NavBarList>
        <NavBarList text="Refer"></NavBarList>
        <NavBarList text="Help"></NavBarList>
        <NavBarList text="Account"></NavBarList>
      </ul>
    </nav>
  );
}
