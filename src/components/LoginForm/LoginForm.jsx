import { Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "../LoginForm/LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className={css.container} autoComplete="off">
        <label className={css.text}>
          Email
          <Field className={css.input} type="email" name="email"></Field>
        </label>

        <label className={css.text}>
          Password
          <Field className={css.input} type="password" name="password"></Field>
        </label>

        <button className={css.btn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
}
