import { createSlice } from "@reduxjs/toolkit";

import { User } from "../types/user-types";

// an empty initial user for the slice
const initialUser: User = {
  loading: false,
  valid: false,
  emailVerified: false,
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
    // initialize the update to user data
    updateStart: (state) => {
      state.loading = true;
    },
    // set the user according to the provided paramteres after a successful fetch
    saveUserData: (state, param) => {
      const { payload } = param;
      state.email = payload.email;
      state.photo = payload.photo;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.valid = payload.valid;
      state.emailVerified = payload.emailVerified;
      state.id = payload._id;
      state.loading = false;
    },
    // on a user fetch fail reset the user and log the error
    loginFail: (state, param) => {
      const { payload } = param;
      console.error("login fail:", payload.error);
      state.loading = false;
      state.id = undefined;
    },
    // empty the state on a logout
    logout: (state) => {
      state.loading = false;
      state.valid = false;
      state.emailVerified = false;
      state.id = undefined;
    },
  },
});

const { actions, reducer } = userSlice;
export const { saveUserData, updateStart, logout, loginStart, loginFail } =
  actions;
export default reducer;
