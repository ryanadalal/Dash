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
      state.email = payload.email;
      state.firstName = payload.email;
      state.lastName = payload.email;
      state.id = payload.email;
      state.loading = false;
    },
    loginFail: (state, param) => {
      const { payload } = param;
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
    },
  },
});

const { actions, reducer } = userSlice;
export const { loginSuccess, logout, loginStart, loginFail } = actions;
export default reducer;

//https://medium.com/geekculture/understanding-createslice-in-redux-toolkit-reactjs-eca8d20f45d7
//https://www.geeksforgeeks.org/explain-reducers-in-redux/
//https://developer.okta.com/blog/2022/08/29/react-typescript-redux
//https://stackoverflow.com/questions/59129691/passing-oauth-user-data-back-to-react-via-node-passport-authentication
