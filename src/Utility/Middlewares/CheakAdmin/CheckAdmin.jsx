import { Navigate, useLocation } from "react-router-dom";
import useUserInfo from "../../Hooks/useUserInfo";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";
import PropTypes from "prop-types"



const CheckAdmin = ({ children }) => {
  const { userinfo, isLoading } = useUserInfo();
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

CheckAdmin.propTypes = {
  children: PropTypes.node
}
