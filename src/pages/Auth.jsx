import Login from "../components/auth/Login";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Auth = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) return <Redirect to="/customer" />;

  return (
    <>
      <Login />
    </>
  );
};

export default Auth;
