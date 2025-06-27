import {createContext, useContext, useEffect, useState} from "react";
import api from "./api.jsx";
import { useNavigate} from "react-router-dom";

import React from 'react';
import {toast} from "react-toastify";


const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);
const UserProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                let resposta = await api.get("/user/logado");
                setUser(resposta.data);
            } catch (e) {
                console.log("user not logged in: ", e);
            }
            setLoading(false);
        })();
    }, []);

    const logout = async () => {
        try {
            await api.get("/logout");
            navigate("/login");
            setUser(null);
        } catch (e) {
            toast("Erro ao fazer logout");
        }
    }

    return (
        <UserContext.Provider value={ {user, setUser, loading, logout} }>
            {loading ? <div>Loading</div> : children}
        </UserContext.Provider>
    );
};
export default UserProvider;
