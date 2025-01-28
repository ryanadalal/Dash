import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user-types";

const initialUser: User = {
  loading: false,
  id: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    loginStart: (state) => {
      (state.loading = true), (state.id = undefined);
    },
    loginSuccess: (state, param) => {
      const { payload } = param;
      state.email =
        payload.email.length > 0 ? payload.email[0].value : undefined;
      state.picture =
        payload.profilePicture.length > 0
          ? payload.profilePicture[0].value
          : undefined;
      state.firstName = payload.name.givenName;
      state.lastName = payload.name.familyName;
      state.id = payload.id;
      state.loading = false;
    },
    loginFail: (state, param) => {
      const { payload } = param;
      console.log("login fail: ");
      console.log(payload);
      state.loading = false;
      state.id = undefined;
    },
    logout: (state) => {
      state.loading = false;
      state.email = undefined;
      state.firstName = undefined;
      state.lastName = undefined;
      state.id = undefined;
      state.picture = undefined;
    },
  },
});

const { actions, reducer } = userSlice;
export const { loginSuccess, logout, loginStart, loginFail } = actions;
export default reducer;
