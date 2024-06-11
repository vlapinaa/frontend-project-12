import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "utils/api";
import { redirect } from "react-router-dom";

type State = {
  token: string;
  name: string;
  isLoading: boolean;
  error: any;
};

type NewUser = {
  username: string;
  password: string;
};

export const createNewUser = createAsyncThunk(
  "signup/newuser",
  async (newUser: NewUser, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/signup", newUser);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: State = {
  token: localStorage.getItem("token") || "",
  name: localStorage.getItem("username") || "",
  isLoading: false,
  error: undefined,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });

    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.name = action.payload.username;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      redirect("/");
    });

    builder.addCase(createNewUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "";
    });
  },
});

export default signupSlice.reducer;
