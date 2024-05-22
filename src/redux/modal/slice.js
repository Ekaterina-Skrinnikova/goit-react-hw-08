import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  contactToDelete: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setContactToDelete: (state, action) => {
      state.contactToDelete = action.payload;
    },
  },
});

export const { openModal, closeModal, setContactToDelete } = modalSlice.actions;

export default modalSlice.reducer;
