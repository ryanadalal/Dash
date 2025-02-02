import { createSlice } from "@reduxjs/toolkit";

import { User } from "../types/user-types";

// an empty initial user for the slice
const initialUser: User = {
  loading: false,
  id: undefined,
};

// generate action creators and action types automatically for the user state
const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    /**
     * The reducers for the user
     * @param state - the current state of the user
     * @param param - the action or values being given to the reducer
     */
    // initialize the user fetch
    loginStart: (state) => {
      (state.loading = true), (state.id = undefined);
    },
    // set the user according to the provided paramteres after a successful fetch
    loginSuccess: (state, param) => {
      const { payload } = param;
      state.email = payload.email;
      state.photo = payload.photo;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.id = payload._id;
      state.loading = false;
    },
    // on a user fetch fail reset the user and log the error
    loginFail: (state, param) => {
      const { payload } = param;
      console.log("login fail:", payload.error);
      state.loading = false;
      state.id = undefined;
    },
    // empty the state on a logout
    logout: (state) => {
      state.loading = false;
      state.email = undefined;
      state.firstName = undefined;
      state.lastName = undefined;
      state.id = undefined;
      state.photo = undefined;
    },
  },
});

const { actions, reducer } = userSlice;
export const { loginSuccess, logout, loginStart, loginFail } = actions;
export default reducer;
