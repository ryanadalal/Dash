/*import { UserStateAction } from "../types/action-types";
import { User } from "../types/user-types";

export const initialUser: User = {
  valid: false,
};

export const logout = () => {
  return { type: "logout" };
};
export const login = () => {
  return { type: "login" };
};
export const mutate = () => {
  return { type: "mutate" };
};

export const userRedux = (state = initialUser, action: UserStateAction) => {
  switch (action.type) {
    case "logout": {
      return initialUser;
    }
    case "login": {
      return state;
    }
    case "mutate": {
      return state;
    }
    default: {
      throw Error("Uknown action: " + action.type);
    }
  }
};
*/
