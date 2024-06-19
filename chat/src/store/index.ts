import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSliceReducer from "store/authSlice";
import chatSliceReducer from "store/chatSlice";
import modalsSliceReducer from "./modalsSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    chat: chatSliceReducer,
    modals: modalsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
