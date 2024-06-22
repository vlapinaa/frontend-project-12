import { createSlice } from "@reduxjs/toolkit";

type State = {
  isShow: boolean;
  type: string;
  currentChannelId: string;
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    isShow: false,
    type: "",
    currentChannelId: "",
  } as State,
  reducers: {
    openModalEdit: (state) => {
      state.isShow = true;
      state.type = "edit";
    },
    closeModalEdit: (state) => {
      state.isShow = false;
      state.currentChannelId = "";
      state.type = "";
    },
    openModalRemove: (state) => {
      state.isShow = true;
      state.type = "remove";
    },
    closeModalRemove: (state) => {
      state.isShow = false;
      state.currentChannelId = "";
      state.type = "";
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
