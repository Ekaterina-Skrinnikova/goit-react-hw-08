import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import css from "../UserMenu/UserMenu.module.css";
import { logOut } from "../../redux/auth/operations";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.container}>
      <p className={css.text}>Welcome, {user.name} </p>
      <button onClick={handleLogout} className={css.btn} type="button">
        Logout
      </button>
    </div>
  );
}
