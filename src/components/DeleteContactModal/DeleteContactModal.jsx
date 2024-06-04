import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  selectContactToDelete,
  selectIsDeleteModalOpen,
} from "../../redux/contacts/selectors";
import { closeDeleteModal } from "../../redux/contacts/slice";
import { deleteContact } from "../../redux/contacts/operations";
import Button from "../Button/Button";
import css from "../DeleteContactModal/DeleteContactModal.module.css";

export default function DeleteContactModal() {
  Modal.setAppElement(document.body);

  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const contactToDelete = useSelector(selectContactToDelete);

  // if (!isModalOpen) {
  //   return null;
  // }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "30px",
      backgroundColor: "rgba(216, 203, 73)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: "1000",
    },
  };

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
    <div>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirm Deletion"
        style={customStyles}
      >
        {contactToDelete && (
          <div>
            <h2 className={css.title}>Confirm Deletion</h2>
            <p className={css.text}>
              {`Are you sure you want to delete contact ${contactToDelete.name}?`}
            </p>
            <div className={css.wrapper}>
              <Button
                className={css.btn}
                type="button"
                onClick={handleContactDelete}
              >
                Yes
              </Button>
              <Button
                className={css.btn}
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
