import "../styles/index.css";

function NavBarList({ text }: { text: string }) {
  return (
    <li className="flex items-center text-sm p-2 gap-x-2 text-textslate rounded-sm hover:bg-realamber">
      <a href="#" className="flex items-center">
        {text}
      </a>
    </li>
  );
}

export default function NavBar() {
  return (
    <nav className="flex flex-wrap h-20 sticky items-center justify-between w-full px-4 py-2 bg-white shadow-md rounded-b-xl lg:px-30 lg:py-3">
      <a
        href="#"
        className="mr-4 block cursor-pointer py-1.5 text-xl text-realamber font-semibold"
      >
        Reals
      </a>
      <ul className="flex gap-1 mb-0 mt-0 flex-row items-center sm:gap-6">
        <NavBarList text="Help"></NavBarList>
        <NavBarList text="Verify"></NavBarList>
        <NavBarList text="Accounts"></NavBarList>
        <NavBarList text="Settings"></NavBarList>
      </ul>
    </nav>
  );
}
