import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSliceReducer from "store/authSlice";
import chatSliceReducer from "store/chatSlice";
import signupSliceReducer from "store/signupSlice";
// import { channelsApi } from "./chatSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    chat: chatSliceReducer,
    signup: signupSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
