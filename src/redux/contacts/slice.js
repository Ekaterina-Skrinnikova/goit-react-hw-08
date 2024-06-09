import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./operations";
import { logOut } from "../../redux/auth/operations";

const initialState = {
  items: [],
  isEditModalOpen: false,
  contactToEdit: null,
  isDeleteModalOpen: false,
  contactToDelete: null,

  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    openDeleteModal: (state, action) => {
      state.isDeleteModalOpen = true;
      state.contactToDelete = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.contactToDelete = null;
    },
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.contactToEdit = action.payload;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.contactToEdit = null;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        // state.items.filter((item) => item.id !== action.payload.id);
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        // state.items.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // );
        state.isEditModalOpen = false;
        state.contactToEdit = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      }),
});

export const selectSortedContacts = createSelector(
  [(state) => state.contacts.items],
  (contacts) => {
    return contacts.sort((a, b) => {
      let contactA = a.name.toLowerCase();
      let contactB = b.name.toLowerCase();
      return contactA.localeCompare(contactB);
    });
  }
);

export const selectFiltredContacts = createSelector(
  [(state) => state.contacts.items, (state) => state.filters.name],
  (contacts, valueFilter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(valueFilter.toLowerCase()) ||
        contact.number.includes(valueFilter)
    );
  }
);

export const {
  openDeleteModal,
  closeDeleteModal,
  openEditModal,
  closeEditModal,
} = contactsSlice.actions;

export default contactsSlice.reducer;
