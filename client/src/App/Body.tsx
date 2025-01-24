import { ModalRendererProps } from "../types/util-types";

export default function Body(props: ModalRendererProps) {
  return (
    <div className="flex items-top justify-evenly pt-5 h-fill bg-amber-400">
      {props.children}
    </div>
  );
}
