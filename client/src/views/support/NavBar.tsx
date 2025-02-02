import { useSelector } from "react-redux";

import { User } from "../../types/user-types.ts";

function NavBarList({ text }: { text: string }) {
  return (
    <li className="flex items-center text-sm p-2 gap-x-2 text-textslate rounded-sm hover:bg-realamber">
      <a href="#" className="flex items-center">
        {text}
      </a>
    </li>
  );
}
function PhotoList({ photo }: { photo: string }) {
  return <img src={photo} className="h-10 w-10 rounded-full" />;
}

export default function NavBar() {
  const photo = useSelector((state: User) => state.photo);
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
        {photo != undefined ? <PhotoList photo={photo}></PhotoList> : null}
      </ul>
    </nav>
  );
}
