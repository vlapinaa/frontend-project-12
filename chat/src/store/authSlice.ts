import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "utils/api";
import { redirect } from "react-router-dom";
import routes from "helpers/routes";

type State = {
  token: string;
  name: string;
  isLoading: boolean;
  error: undefined | string;
};

type Values = {
  username: string;
  password: string;
};

export const login = createAsyncThunk(
  "auth/login",
  async (values: Values, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/login", values);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

type NewUser = {
  username: string;
  password: string;
};

export const createNewUser = createAsyncThunk(
  "auth/newuser",
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.name = action.payload.username;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      redirect(routes.main);
    });

    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.name = action.payload.username;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      redirect(routes.main);
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "";
    });
  },
});

export default authSlice.reducer;
