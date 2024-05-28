export const selectContacts = (state) => state.contacts.items;

export const selectLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const selectIsEditModalOpen = (state) => state.contacts.isEditModalOpen;

export const selectIsDeleteModalOpen = (state) =>
  state.contacts.isDeleteModalOpen;

export const selectContactToDelete = (state) => state.contacts.contactToDelete;

export const selectContactToEdit = (state) => state.contacts.contactToEdit;
