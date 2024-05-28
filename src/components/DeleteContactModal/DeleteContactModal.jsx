import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  selectContactToDelete,
  selectIsDeleteModalOpen,
} from "../../redux/contacts/selectors";
import { closeDeleteModal } from "../../redux/contacts/slice";
import { deleteContact } from "../../redux/contacts/operations";

Modal.setAppElement("#root");

export default function DeleteContactModal() {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const contactToDelete = useSelector(selectContactToDelete);

  // if (!isModalOpen) {
  //   return null;
  // }

  const handleCloseModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleContactDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete.id))
        .unwrap()
        .then(() => {
          toast.success("Congratulations, contact deleted successfully!!!");
        })

        .catch((error) => {
          console.log("🚀 ~ handleSubmit ~ error:", error);
          toast.error("An error occurred, try again!!!");
        });
    }

    dispatch(closeDeleteModal());
  };

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Confirm Deletion"
    >
      <div>
        <h2>Confirm Deletion</h2>
        <p>
          {`Are you sure you want to delete contact ${contactToDelete.name}?`}
        </p>
        <button onClick={handleContactDelete}>Yes</button>
        <button onClick={handleCloseModal}>Cancel</button>
      </div>
    </Modal>
  );
}
