import React, {useEffect} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../../services/api";
import {useUserContext} from "../../services/UserContext";

const AuthWithToken = () => {
    const {user, setUser, loading} = useUserContext();
    const navigate = useNavigate();
    const [data, setData] = useSearchParams();

    const handleAuth = async () => {
        try {
            const body = new FormData();
            body.set("token", data.get("TOKEN"));
            const response = await api.post("/oauth/auth-with-token", body);

            if (response.status === 200) {
                setUser(response.data);
                navigate("/voter-data", {replace: true});
            }
        } catch (e) {
            console.error("Authentication failed:", e);
        }
    };

    useEffect(() => {
        handleAuth();
    }, []);


    return (
        <MainLayout>
            {!user?.id && loading}
        </MainLayout>
    );
};

export default AuthWithToken;