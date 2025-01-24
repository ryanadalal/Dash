import Home from "./Home";
import Login from "./Login";
import UserProvider, { useUser } from "./UserProvider";

function App() {
  const user = useUser().user;
  if (user == null) {
    return <Login />;
  } else {
    <Home />;
  }
}

export default function AppContexts() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
