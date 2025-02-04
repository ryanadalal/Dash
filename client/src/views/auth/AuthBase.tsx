import { ModalRendererProps } from "../../types/util-types";

export default function AuthBase(props: ModalRendererProps) {
  return (
    <div className="h-screen flex bg-bgslate justify-center items-center">
      <div className="flex flex-col justify-center text-center w-fit h-fit p-7 bg-white shadow-2xl rounded-2xl mb-30">
        <h1 className="py-1.5 text-4xl text-realamber font-semibold">
          {props.title}
        </h1>
        {props.children}
      </div>
    </div>
  );
}
