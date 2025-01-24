import { ModalRendererProps } from "../types/util-types";

export default function Tile(props: ModalRendererProps) {
  return (
    <section className={props.class + " bg-white shadow-md rounded-xl"}>
      {props.children}
    </section>
  );
}
