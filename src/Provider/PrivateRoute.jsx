


// import Loading from "../Components/Loading";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth()
   if(loading){
    return <progress className="progress w-56"></progress>
   }
   if(user){
    return children;
   }
  return <Navigate to={'/login'}></Navigate>
};

export default PrivateRoute;