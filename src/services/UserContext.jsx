import {createContext, useContext, useEffect, useState} from "react";
import api from "./api.jsx";
import {useNavigate} from "react-router-dom";

import React from 'react';
import {toast} from "react-toastify";
import {useScrollRestoration} from "../hooks/useScrollRestoration";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({children}) => {
    useScrollRestoration();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVoting, setIsVoting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            try {
                let response;
                response = await api.get("/oauth/logged");

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
