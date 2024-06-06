import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "utils/api";

type State = {
  token: string;
  name: string;
  isLoading: boolean;
  error: any | undefined;
};

type NewUser = {
  username: string;
  password: string;
};

export const newuser: any = createAsyncThunk(
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

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    token: localStorage.getItem("token") || "",
    name: localStorage.getItem("username") || "",
    isLoading: false,
    error: undefined,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newuser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.name = action.payload.username;

      window.location.href = "/";
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);

      window.location.href = "/";
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    });
    builder.addCase(newuser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "";
    });
  },
});

export default signupSlice.reducer;
