import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import routes from "helpers/routes";
import { authApi } from "store/authApi";

type State = {
  token: string;
  name: string;
  isLoading: boolean;
  error: undefined | string;
};

const initialState: State = {
  token: localStorage.getItem("token") || "",
  name: localStorage.getItem("username") || "",
  isLoading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.auth.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.name = payload.username;

        localStorage.setItem("token", payload.token);
        localStorage.setItem("username", payload.username);
        redirect(routes.main);
      },
    );
    builder.addMatcher(
      authApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.name = payload.username;

        localStorage.setItem("token", payload.token);
        localStorage.setItem("username", payload.username);
        redirect(routes.main);
      },
    );
  },
});

export default authSlice.reducer;
