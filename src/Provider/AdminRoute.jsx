import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const location = useLocation()
    const [isAdmin, isAdminLoading] = useAdmin()
    const {user, loading} = useAuth()
    if(loading || isAdminLoading){
     return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
     return children;
    }
   return <Navigate to={'/'} state={{from: location}} replace></Navigate>
};

export default AdminRoute;