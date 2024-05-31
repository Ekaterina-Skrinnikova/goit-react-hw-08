import css from "../Button/Button.module.css";
import clsx from "clsx";

export default function Button({ children, onClick, typeBtn, className }) {
  return (
    <button
      type={typeBtn}
      onClick={onClick}
      className={clsx(css.btn, className)}
    >
      {children}
    </button>
  );
}
