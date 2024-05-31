import { Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";
import css from "../LoginForm/LoginForm.module.css";
import Button from "../Button/Button";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Welcome to app Contacts!!!");
      })
      .catch((error) => {
        console.log("🚀 ~ handleSubmit ~ error:", error);
        toast.error("Unfortunately an error occurred, leads data again!!!");
      });
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

        <Button className={css.btn} type="submit">
          Log In
        </Button>
      </Form>
    </Formik>
  );
}
