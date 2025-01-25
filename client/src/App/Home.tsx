import Body from "./Body";
import NavBar from "./NavBar";
import Tile from "./Tile";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-slate-100 group md:s-size">
      <NavBar />
      <Body>
        <Tile class="min-w-60 lg:row-span-7 lg:col-span-2 hidden lg:block">
          <div></div>
        </Tile>
        <Tile class="min-w-140 row-span-5 lg:col-span-5 rounded-b-xl">
          <div></div>
        </Tile>
        <Tile class="min-w-140 row-span-2 lg:col-start-3 col-span-5 rounded-t-xl">
          <div></div>
        </Tile>
      </Body>
    </div>
  );
}
