import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../UseAuth/useAuth";
import useGetUser from "../../Hooks/GetUserInfo/useGetUser";
import Loading from "../../Components/Loading/Loading";

const CheckAdmin = ({ children }) => {
  const { userinfo, isLoading } = useGetUser();
  const location = useLocation();
  const { loader, user } = useAuth();
  const isAdmin = userinfo.role === "admin";
  if (loader || isLoading) {
    return <Loading></Loading>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/signIn"} state={location.pathname}></Navigate>;
};

export default CheckAdmin;
