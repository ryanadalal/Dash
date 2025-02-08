import { useSelector } from "react-redux";

import { User } from "../../../types/user-types.ts";
import { NavBarItem } from "./NavBarItem.tsx";
import { NavDropDownItem } from "./NavDropDownItem.tsx";
import { PhotoItem } from "./PhotoItem.tsx";
import NavDropDown from "./NavDropDown.tsx";
import { Link } from "react-router-dom";

export default function NavBar() {
  const photo = useSelector((state: User) => state.photo);
  return (
    <>
      <nav className="flex flex-wrap h-13 sticky items-center justify-between w-full px-4 bg-white shadow-md lg:px-30 py-0">
        <Link
          to="#"
          className="mr-4 block cursor-pointer py-1.5 text-xl text-realamber font-semibold"
        >
          Reals
        </Link>
        <ul className="flex gap-1 mb-0 mt-1 flex-row items-center sm:gap-2 h-12">
          <NavBarItem title="Help">
            <NavDropDown>
              <NavDropDownItem title="FAQ" img="" dest="#" />
              <NavDropDownItem title="Forums" img="" dest="#" />
              <NavDropDownItem title="Help Center" img="" dest="#" />
            </NavDropDown>
          </NavBarItem>
          <NavBarItem title="Verify"></NavBarItem>
          <NavBarItem title="Accounts">
            <NavDropDown>
              <NavDropDownItem title="Banks" img="" dest="#" />
              <NavDropDownItem title="Credit Cards" img="" dest="#" />
              <NavDropDownItem title="Investment" img="" dest="#" />
              <NavDropDownItem title="Other" img="" dest="#" />
            </NavDropDown>
          </NavBarItem>
          <NavBarItem title="Settings">
            <NavDropDown>
              <NavDropDownItem title="Profile" img="" dest="#" />
              <NavDropDownItem title="Authorized Users" img="" dest="#" />
              <NavDropDownItem title="Logout" img="" dest="/logout" />
            </NavDropDown>
          </NavBarItem>
          {photo != undefined ? <PhotoItem photo={photo}></PhotoItem> : null}
        </ul>
      </nav>
    </>
  );
}
