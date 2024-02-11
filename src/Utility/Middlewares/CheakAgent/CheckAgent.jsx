import { Navigate, useLocation } from "react-router-dom";
import useUserInfo from "../../Hooks/useUserInfo";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";
import PropTypes from "prop-types"


const CheckAgent = ({ children }) => {
  const { userinfo, isLoading } = useUserInfo();
  const location = useLocation();
  const { loader, user } = useAuth();
  const isAgent = userinfo.role === "agent";
  if (loader || isLoading) {
    return <Loading></Loading>;
  }
  if (user && isAgent) {
    return children;
  }

  return <Navigate to={"/signIn"} state={location.pathname}></Navigate>;
};

export default CheckAgent;

CheckAgent.propTypes = {
  children: PropTypes.node
}
