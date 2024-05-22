import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContactToDelete,
  selectIsModalOpen,
} from "../../redux/modal/selectors";
import { closeModal } from "../../redux/modal/slice";
import { deleteContact } from "../../redux/contacts/operations";

export default function DeleteContactModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const contactToDelete = useSelector(selectContactToDelete);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleContactDelete = () => {
    dispatch(deleteContact(contactToDelete.id));
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={isModalOpen}
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
