import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Utility/Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user,loader} = useAuth()
    const location = useLocation()
    if(loader){
        return <p className="h-screen justify-center items-center loading-spinner"></p>
    }
    if(user){
        return children
    }
    else{
        return <Navigate state={location?.pathname} to={"/signIn"}></Navigate>
    }
    
};

export default PrivateRoute;