import { Link } from "react-router-dom";
import { ModalRendererProps } from "../../../types/util-types";

export function NavBarItem(props: ModalRendererProps) {
  return (
    <div className="relative group">
      <li className="flex items-center text-sm py-5 px-9 gap-x-2 h-12 text-textslate rounded-t-sm hover:bg-realamber">
        <Link to="#" className="flex items-center">
          {props.title}
        </Link>
        {props.children}
      </li>
    </div>
  );
}
