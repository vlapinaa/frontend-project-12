import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSliceReducer from "store/authSlice";
// import chatSliceReducer from "store/chatSlice";
import modalsSliceReducer from "store/modalsSlice";
import { chatApi } from "store/chatApi";
import { authApi } from "store/authApi";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    modals: modalsSliceReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
