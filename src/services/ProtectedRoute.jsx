import {useUserContext} from "./UserContext.jsx";
import {Navigate, Route} from "react-router-dom";
import {toast} from "react-toastify";

const ProtectedRoute = ({children}) => {
    const contexto = useUserContext();

    if(!contexto.user) {
        toast("Por favor, faça login.");
        return <Navigate to="/login" replace/>;
    }

    return children;
}

export default ProtectedRoute;