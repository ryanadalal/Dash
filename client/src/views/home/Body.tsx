import { ModalRendererProps } from "../../types/util-types.ts";

export default function Body(props: ModalRendererProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-7 lg:gap-x-10 gap-y-4 flex-grow items-top justify-evenly px-1 sm:px-10 h-fill overflow-auto">
      {props.children}
    </div>
  );
}
