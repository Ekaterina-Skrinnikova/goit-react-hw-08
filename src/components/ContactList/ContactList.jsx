import { useSelector } from "react-redux";
import { selectFiltredContacts } from "../../redux/contacts/slice";
import { selectIsModalOpen } from "../../redux/modal/selectors";
import DeleteContactModal from "../DeleteContactModal/DeleteContactModal";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFiltredContacts);
  const isModalOpen = useSelector(selectIsModalOpen);

  return (
    <div>
      <ul className={css.list}>
        {contacts.map((item) => (
          <li className={css.item} key={item.id}>
            <Contact contact={item} />
          </li>
        ))}
      </ul>
      {isModalOpen && <DeleteContactModal />}
    </div>
  );
}
