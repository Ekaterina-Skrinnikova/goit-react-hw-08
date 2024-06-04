import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "../AuthNav/AuthNav.module.css";

export default function AuthNav() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.nav}>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
