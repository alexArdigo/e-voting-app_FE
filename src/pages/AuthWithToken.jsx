import React, {useEffect} from 'react';
import MainLayout from "../layouts/MainLayout";
import {replace, useNavigate, useSearchParams} from "react-router-dom";
import api from "../services/api";

const AuthWithToken = () => {
    const navigate = useNavigate();
    const [data, setData] = useSearchParams();

    console.log(data.get("TOKEN"));
    const handleAuth = async () => {
        try {
            const body = new FormData();
            body.set("token", data.get("TOKEN"))
            body.set("id", data.get("ID"))
            const response = await api.post("/oauth/auth-with-token", body);

            if (response.status === 200)
                navigate("/voter-data", {replace: true});
        } catch (e) {
            console.error("Authentication failed:", e);
            // Optionally, you can redirect to an error page or show a notification
            //navigate("/error", {replace: true});
        }
    }

    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <MainLayout>

        </MainLayout>
    );
};

export default AuthWithToken;