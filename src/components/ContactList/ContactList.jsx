import { useSelector } from "react-redux";
import { selectFiltredContacts } from "../../redux/contacts/slice";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFiltredContacts);

  return (
    <ul className={css.list}>
      {contacts.map((item) => (
        <li className={css.item} key={item.id}>
          <Contact contact={item} />
        </li>
      ))}
    </ul>
  );
}
