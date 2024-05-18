import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineWave } from "react-loader-spinner";
import { fetchContacts } from "../../redux/contacts/operations";
import ContactForm from "../../components/ContactForm/ContactForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { selectLoading } from "../../redux/contacts/selectors";
import css from "../ContactsPage/ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={css.container}>
      <div>
        <PageTitle>Add contact</PageTitle>
        <ContactForm />
      </div>
      <div className={css.searchbox}>
        <SearchBox />
        {isLoading && (
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass={css.location}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        )}

        <PageTitle>List contacts</PageTitle>
        <ContactList />
      </div>
    </div>
  );
}
