import { useContext } from "react";
import { Context } from "../../../Context/AuthContext/AuthContext";

const useAuth = () => {
    const auth = useContext(Context)
    return auth;
};

export default useAuth;