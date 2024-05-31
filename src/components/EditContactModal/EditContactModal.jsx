import Modal from "react-modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  selectContactToEdit,
  selectIsEditModalOpen,
} from "../../redux/contacts/selectors";
import { closeEditModal } from "../../redux/contacts/slice";
import { updateContact } from "../../redux/contacts/operations";
import css from "./EditContactModal.module.css";
import Button from "../Button/Button";

export default function EditContactModal() {
  const textId = useId();
  const telId = useId();
  const dispatch = useDispatch();
  const contactToEdit = useSelector(selectContactToEdit);
  const isEditModalOpen = useSelector(selectIsEditModalOpen);

  const handleSubmite = (values) => {
    console.log("🚀 ~ handleSubmite ~ values:", values);
    if (contactToEdit) {
      console.log("🚀 ~ handleSubmite ~ contactToEdit:", contactToEdit);
      dispatch(updateContact(values))
        .unwrap()
        .then(() => {
          toast.success("Congratulations, contact added successfully!!!");
        })
        .catch((error) => {
          console.log("🚀 ~ handleSubmit ~ error:", error);
          toast.error("An error occurred, try again!!!");
        });
    }
  };

  const handleCloseModal = () => {
    dispatch(closeEditModal());
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string().matches(/[0-9]{3}-[0-9]{2}-[0-9]{2}/, {
      message: "Invalid phone number",
      excludeEmptyString: false,
    }),
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "30px",
    },
    overlay: {
      backgroundColor: "grey",
    },
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Edit contact"
      style={customStyles}
    >
      {contactToEdit && (
        <Formik
          initialValues={contactToEdit}
          onSubmit={handleSubmite}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.container}>
            <label className={css.text} htmlFor={textId}>
              Name
              <Field
                className={css.input}
                name="name"
                type="text"
                id={textId}
              />
              <ErrorMessage
                className={css.error}
                name="name"
                component="span"
              />
            </label>

            <label className={clsx(css.text, css.margin)} htmlFor={telId}>
              Number
              <Field
                className={css.input}
                name="number"
                type="tel"
                id={telId}
              />
              <ErrorMessage
                className={css.error}
                name="number"
                component="span"
              />
            </label>
            <div className={css.wrapper}>
              <Button className={css.btn} type="submit">
                Save
              </Button>
              <Button
                className={css.btn}
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </Modal>
  );
}
