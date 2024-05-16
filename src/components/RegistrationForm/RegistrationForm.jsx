import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "../RegistrationForm/RegistrationForm.module.css";

export default function RagistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.container} autoComplete="off">
        <label className={css.text}>
          Username
          <Field className={css.input} type="text" name="name"></Field>
        </label>
        <label className={css.text}>
          Email
          <Field className={css.input} type="email" name="email"></Field>
        </label>
        <label className={css.text}>
          Password
          <Field className={css.input} type="password" name="password"></Field>
        </label>

        <button className={css.btn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
}
