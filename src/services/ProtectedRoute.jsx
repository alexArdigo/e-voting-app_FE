import {useUserContext} from "./UserContext.jsx";
import {Navigate, useLocation} from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {user, isVoting, loading} = useUserContext();
    const location = useLocation();

    console.log("role ", user?.role);

    if (loading) {
        return <div>Loading...</div>;
    }

    /*if (!user?.id) {
        return <Navigate to="/" replace />;
    }*/

    if (user?.role !== "VOTER") {
        //return <Navigate to="/unauthorized" replace />;
    }

    // Prevent voter from leaving "/ballot" page if currently voting
    if (user?.role === "VOTER" && isVoting && location.pathname !== "/ballot") {
        return <Navigate to="/ballot" state={location.state} replace />;
    }


    return children;
};

export default ProtectedRoute;