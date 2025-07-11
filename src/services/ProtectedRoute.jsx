import React, {cloneElement} from "react";
import {useUserContext} from "./UserContext.jsx";
import {Navigate, useLocation} from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {user, isVoting, loading} = useUserContext();
    const location = useLocation();


    if (loading) {
        return <div>Loading...</div>;
    }

    return cloneElement(children, {
        locationState: location.state
    });
};

export default ProtectedRoute;