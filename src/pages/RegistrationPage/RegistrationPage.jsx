import { useSelector } from "react-redux";
import { LineWave } from "react-loader-spinner";
import PageTitle from "../../components/PageTitle/PageTitle";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { selectLoading } from "../../redux/auth/selectors";
import css from "../RegistrationPage/RegistrationPage.module.css";

export default function RegistrationPage() {
  const isLoading = useSelector(selectLoading);
  return (
    <div>
      <PageTitle>Register your account</PageTitle>
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
        <RegistrationForm />
      )}
    </div>
  );
}
