import {useUserContext} from "./UserContext.jsx";
import {Navigate, useLocation} from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {user, isVoting, loading} = useUserContext();
    const location = useLocation();



    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.id) {
        return <Navigate to="/" replace />;
    }

    // if (user?.role !== "VOTER") {
    //     return <Navigate to="/unauthorized" replace />;
    // }

    if (isVoting && location.pathname !== "/ballot") {
        return <Navigate to="/ballot" replace />;
    }


    return children;
};

export default ProtectedRoute;