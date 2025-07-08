import {useUserContext} from "./UserContext.jsx";
import {Navigate} from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {user, loading} = useUserContext();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.id) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;