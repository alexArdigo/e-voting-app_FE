import {createContext, useContext, useEffect, useState} from "react";
import api from "./api.jsx";
import {useNavigate} from "react-router-dom";

import React from 'react';
import {toast} from "react-toastify";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVoting, setIsVoting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                let response;
                response = await api.get("/loggedUser");

                if (!response.data) {
                    response = await api.get("/loggedVoter");
                }

                setUser(response.data);
            } catch (e) {
                console.error("user not logged in: ", e);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (user?.id) {
                try {
                    const response = await api.get(`voters/${user?.id}/is-voting`);
                    if (response.status === 200) {
                        setIsVoting(true);
                    }
                } catch (e) {
                    console.error("Error fetching user data: ", e);
                }
            }
        })();
    }, []);

    const logout = async () => {
        try {
            await api.get("/logout");
            navigate("/login");
            setUser(null);
            console.log("User logged out successfully");
        } catch (e) {
            console.error("Error logging out: " + e);
        }
    };

    return (
        <UserContext.Provider value={{user, setUser, loading, logout, isVoting, setIsVoting}}>
             {loading ? <div>Loading</div> : children}
        </UserContext.Provider>
    );
};
export default UserProvider;
