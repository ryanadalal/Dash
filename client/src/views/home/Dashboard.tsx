import Body from "./Body.tsx";
import NavBar from "../support/nav/NavBar.tsx";
import Tile from "./Tile.tsx";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-bg-slate md:s-size">
      <NavBar />
      <Body>
        <Tile class="min-w-60 lg:row-span-7 lg:col-span-2 hidden lg:block">
          <div></div>
        </Tile>
        <Tile class="min-w-140 row-span-5 lg:col-span-5 rounded-b-xl">
          <div>
            aaaaaafillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfillfillfillfillfillfill
            fillfillfillfillfillfillfillfillfillfill
          </div>
        </Tile>
        <Tile class="min-w-140 row-span-2 lg:col-start-3 col-span-5 rounded-t-xl">
          <div></div>
        </Tile>
      </Body>
    </div>
  );
}
