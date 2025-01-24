import Body from "./Body";
import NavBar from "./NavBar";
import Tile from "./Tile";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-50">
      <NavBar />
      <Body>
        <Tile class="w-96 h-fill">
          <div></div>
        </Tile>
        <Tile class="w-225 h-100">
          <div></div>
        </Tile>
      </Body>
    </div>
  );
}
