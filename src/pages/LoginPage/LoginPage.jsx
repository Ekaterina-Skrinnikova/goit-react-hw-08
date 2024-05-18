import { useSelector } from "react-redux";
import { LineWave } from "react-loader-spinner";
import { selectLoading } from "../../redux/auth/selectors";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import css from "../LoginPage/LoginPage.module.css";

export default function LoginPage() {
  const isLoading = useSelector(selectLoading);
  return (
    <div>
      <PageTitle>Plaese log in</PageTitle>
      {isLoading ? (
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
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
