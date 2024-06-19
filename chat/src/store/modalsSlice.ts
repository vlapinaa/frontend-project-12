import { createSlice } from "@reduxjs/toolkit";

type State = {
  showEdit: boolean;
  showRemove: boolean;
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    showEdit: false,
    showRemove: false,
  } as State,
  reducers: {
    openModalEdit: (state) => {
      state.showEdit = true;
    },
    closeModalEdit: (state) => {
      state.showEdit = false;
    },
    openModalRemove: (state) => {
      state.showRemove = true;
    },
    closeModalRemove: (state) => {
      state.showRemove = false;
    },
  },
});

export const {
  openModalEdit,
  closeModalEdit,
  openModalRemove,
  closeModalRemove,
} = modalsSlice.actions;
export default modalsSlice.reducer;
