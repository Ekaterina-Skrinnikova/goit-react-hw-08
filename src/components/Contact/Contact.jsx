import { BsFillTelephoneFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { openDeleteModal, openEditModal } from "../../redux/contacts/slice";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleOpenDeleteModal = () => {
    dispatch(openDeleteModal(contact));
  };

  const handleOpenEditModal = () => {
    dispatch(openEditModal(contact));
  };

  return (
    <div className={css.container}>
      <div>
        <p>
          <IoPerson /> {contact.name}
        </p>
        <p>
          <BsFillTelephoneFill /> {contact.number}
        </p>
      </div>

      <button className={css.btn} onClick={handleOpenEditModal}>
        Edit
      </button>
      <button className={css.btn} onClick={handleOpenDeleteModal}>
        Delete
      </button>
    </div>
  );
}
