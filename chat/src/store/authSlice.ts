import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "utils/api";
import { redirect } from "react-router-dom";

type State = {
  token: string;
  name: string;
  isLoading: boolean;
  error: string;
};

export const login: any = createAsyncThunk(
  "auth/login",
  async (values: any) => {
    const { data } = await api.post("/login", values);
    return data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    name: localStorage.getItem("username") || "",
    isLoading: false,
    error: "",
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.name = action.payload.username;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      redirect("/");
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "";
    });
  },
});

export default authSlice.reducer;
