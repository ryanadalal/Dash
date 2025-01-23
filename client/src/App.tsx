import "./App.css";
import { useState } from "react";

const stuff = [
  { id: 1, name: "red", age: 10 },
  { id: 2, name: "blue", age: 15 },
  { id: 3, name: "green", age: 20 },
];

function MyButton(color: string, onClick: () => null) {
  return (
    <button
      className={
        (color.id == 1 ? "bg-amber-600" : "bg-blue-600") +
        " text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      }
      key={color.id}
      onClick={() => handle(color.id)}
    >
      {color.name + " " + color.age}
    </button>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  function handle(id: number) {
    setCount(id);
  }

  const listItems = stuff.map((color) => <MyButton />);

  return (
    <div>
      <div className="flex w-96 flex-col gap-1 p-1.5 relative rounded-lg bg-white shadow-sm border border-slate-200">
        {listItems}
      </div>
      <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
        Press me! {count}
      </button>
    </div>
  );
}
