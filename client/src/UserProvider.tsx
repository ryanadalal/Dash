import { createContext, useContext, useReducer } from "react";
import { ModalRendererProps } from "./types/util-types";
import { User } from "./types/types";
import { UserAction } from "./types/action-types";

const initialUser: User = null;
const UserContext = createContext<{
  user: User;
  dispatch: React.Dispatch<UserAction>;
}>({ user: initialUser, dispatch: () => null });

export default function UserProvider(props: ModalRendererProps) {
  const [user, dispatch] = useReducer(userReducer, initialUser);

  return (
    <UserContext.Provider value={{ user: user, dispatch: dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

function userReducer(user: User, action: UserAction) {
  switch (action.type) {
    case "logout": {
      return initialUser;
    }
    case "login": {
      return user;
    }
    case "mutate": {
      return user;
    }
    default: {
      throw Error("Uknown action: " + action.type);
    }
  }
}
