import { useSelector } from "react-redux";
import { selectFiltredContacts } from "../../redux/contacts/slice";
import {
  selectIsDeleteModalOpen,
  selectIsEditModalOpen,
} from "../../redux/contacts/selectors";
import DeleteContactModal from "../DeleteContactModal/DeleteContactModal";
import EditContactModal from "../EditContactModal/EditContactModal";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFiltredContacts);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const isEditeModalOpen = useSelector(selectIsEditModalOpen);

  return (
    <div>
      <ul className={css.list}>
        {contacts.map((item) => (
          <li className={css.item} key={item.id}>
            <Contact contact={item} />
          </li>
        ))}
      </ul>
      {isDeleteModalOpen && <DeleteContactModal />}
      {isEditeModalOpen && <EditContactModal />}
    </div>
  );
}
