export type UserAction =
  | { type: "logout" }
  | { type: "login" }
  | { type: "mutate" }
  | { type: "fail" };
