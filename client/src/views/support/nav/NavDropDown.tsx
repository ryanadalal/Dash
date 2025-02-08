import { ModalRendererProps } from "../../../types/util-types";

export default function NavDropDown(props: ModalRendererProps) {
  return (
    <div
      className="hidden group-hover:grid  gap-y-1
      absolute top-full right-0 z-[999] min-w-50
      rounded-xl rounded-tr-none border border-bgslate bg-white 
      p-1 text-sm shadow-lg shadow-textslate/10"
    >
      {props.children}
    </div>
  );
}
