import { useSelector } from "react-redux";

import { User } from "../../types/user-types.ts";
import { ModalRendererProps } from "../../types/util-types.ts";

function NavBarList(props: ModalRendererProps) {
  return (
    <li className="relative group/nav flex items-center text-sm p-2 gap-x-2 text-textslate rounded-sm hover:bg-realamber">
      <a href="#" className="flex items-center">
        {props.title}
      </a>
      <div className="hidden group-hover/nav:block absolute top-full -right-10 z-[999] mt-2 w-250 rounded-xl border border-bgslate bg-white p-3 text-sm text-blue-gray-500 shadow-lg shadow-textslate/10">
        {props.children}
      </div>
    </li>
  );
}
function PhotoList({ photo }: { photo: string }) {
  return <img src={photo} className="h-10 w-10 rounded-full" />;
}
function NavDropDownElement() {
  return (
    <a href="#">
      <button className="flex w-full cursor-pointer select-none items-center gap-3 rounded-lg px-3 pb-2 pt-[9px] text-start leading-tight outline-none transition-all hover:bg-bgslate focus:bg-realamber focus:text-black">
        <div className="flex items-center justify-center rounded-lg p-2 ">
          <img className="h-6 w-6" />
        </div>
        <div className="focus:text-inherit">
          <h6 className="flex items-center font-sans text-sm font-bold tracking-normal text-black antialiased">
            Products
          </h6>
          <p className="block font-sans text-xs !font-medium text-textslate focus:text-inherit antialiased">
            Find the perfect solution for your needs.
          </p>
        </div>
      </button>
    </a>
  );
}

//https://www.material-tailwind.com/docs/html/mega-menu

export default function NavBar() {
  const photo = useSelector((state: User) => state.photo);
  return (
    <>
      <nav className="flex flex-wrap h-20 sticky items-center justify-between w-full px-4 py-2 bg-white shadow-md rounded-b-xl lg:px-30 lg:py-3">
        <a
          href="#"
          className="mr-4 block cursor-pointer py-1.5 text-xl text-realamber font-semibold"
        >
          Reals
        </a>
        <ul className="flex gap-1 mb-0 mt-0 flex-row items-center sm:gap-6">
          <NavBarList title="Help">
            <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
              <NavDropDownElement />
              <NavDropDownElement />
              <NavDropDownElement />
              <NavDropDownElement />
              <NavDropDownElement />
              <NavDropDownElement />
              <NavDropDownElement />
              <NavDropDownElement />
              <NavDropDownElement />
            </ul>
          </NavBarList>
          <NavBarList title="Verify"></NavBarList>
          <NavBarList title="Accounts"></NavBarList>
          <NavBarList title="Settings"></NavBarList>
          {photo != undefined ? <PhotoList photo={photo}></PhotoList> : null}
        </ul>
      </nav>
    </>
  );
}
