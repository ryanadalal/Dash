import Home from "./home/Home";
import Login from "./auth/Login";
import UserProvider, { useUser } from "../utilities/UserProvider";
import "../styles/index.css";

function App() {
  const user = useUser().user;
  if (user == null) {
    return <Login />;
  } else {
    return <Home />;
  }
}

export default function AppContexts() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
