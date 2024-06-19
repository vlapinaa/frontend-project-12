import { createSlice } from "@reduxjs/toolkit";

type State = {
  isShowEdit: boolean;
  isShowRemove: boolean;
  currentChannelId: string;
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    isShowEdit: false,
    isShowRemove: false,
    currentChannelId: "",
  } as State,
  reducers: {
    openModalEdit: (state) => {
      state.isShowEdit = true;
    },
    closeModalEdit: (state) => {
      state.isShowEdit = false;
      state.currentChannelId = "";
    },
    openModalRemove: (state) => {
      state.isShowRemove = true;
    },
    closeModalRemove: (state) => {
      state.isShowRemove = false;
      state.currentChannelId = "";
    },
    setChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const {
  openModalEdit,
  closeModalEdit,
  openModalRemove,
  closeModalRemove,
  setChannelId,
} = modalsSlice.actions;
export default modalsSlice.reducer;
