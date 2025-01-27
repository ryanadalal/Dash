export const USER_ACTION_LOGOUT = "logout";
export const USER_ACTION_LOGIN = "login";
export const USER_ACTION_MUTATE = "mutate";
export const USER_ACTION_FAIL = "fail";

export type UserAction =
  | { type: "logout" }
  | { type: "login" }
  | { type: "mutate" }
  | { type: "fail" };
