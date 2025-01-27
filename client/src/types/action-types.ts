export type UserStateAction =
  | { type: "logout" }
  | { type: "login" }
  | { type: "mutate" }
  | { type: "fail" };
