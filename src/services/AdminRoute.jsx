import React, {cloneElement} from "react";
import {useUserContext} from "./UserContext.jsx";
import {Navigate, useLocation} from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user, loading, isAdmin} = useUserContext();
    const location = useLocation();


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.id) {
        return <Navigate to="/" replace={true} state={{ from: location }} />;
    }

    if (!isAdmin()) {
        return <Navigate to="/" replace={true} state={{ from: location }} />;
    }

    return cloneElement(children, {
        locationState: location.state
    });
};

export default AdminRoute;