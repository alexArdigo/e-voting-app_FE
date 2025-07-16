import {createContext, useContext, useEffect, useState} from "react";
import api from "./api.jsx";
import {useLocation, useNavigate} from "react-router-dom";

import React from 'react';
import {toast} from "react-toastify";
import {useScrollRestoration} from "../hooks/useScrollRestoration";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({children}) => {
    useScrollRestoration();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [votingSession, setVotingSession] = useState({
        electionId: null,
        isVoting: false,
    });
    const navigate = useNavigate();
    const location = useLocation();

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
            if (user?.id && location.pathname !== "/submitted" && location.pathname !== "/ballot") {
                try {
                    const response = await api.get(`voters/${user?.id}/voting-status`);

                    console.log("voting status response: ", response.data);
                    if (response.status === 200) {
                        setVotingSession(response.data);
                    }

                    if (response.data
                        && response.data.isVoting
                        && votingSession.electionId === response.data.electionId
                    ) {
                        navigate("/ballot", {
                            state: {
                                electionId: response.data.electionId,
                                electionName: response.data.electionName
                            },
                            replace: true
                        });
                    }

                } catch (e) {
                    console.error("Error fetching user data: ", e);
                }
            }
        })();
    }, [user, location.pathname]);


    const logout = async () => {
        try {
            await api.get("/logout");
            setUser(null);

        } catch (e) {
            console.error("Error logging out: " + e);
        }
    };

    const hasRole = (role) => {
        if (!user) return false;

        if (user.role) {
            return user.role === role;
        }

        return false;
    };

    const isAdmin = () => hasRole('ADMIN');

    const isViewer = () => hasRole('VIEWER');

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            loading,
            logout,
            votingSession,
            setVotingSession,
            hasRole,
            isAdmin,
            isViewer
        }}>
            {loading ? <div>Loading</div> : children}
        </UserContext.Provider>
    );
};
export default UserProvider;
