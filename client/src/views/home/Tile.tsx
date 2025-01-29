import { ModalRendererProps } from "../../types/util-types.ts";

export default function Tile(props: ModalRendererProps) {
  return (
    <section className={props.class + " " + " bg-white shadow-md "}>
      {props.children}
    </section>
  );
}
