import React, {useEffect} from 'react';
import MainLayout from "../layouts/MainLayout";
import {useSearchParams} from "react-router-dom";
import api from "../services/api";

const AuthWithToken = () => {
    const [data, setData] = useSearchParams();

    const handleAuth = async () => {
        try {
            const body = new FormData();
            body.set("TOKEN", data.get("TOKEN"))
            const response = await api.post("/oauth/auth-with-token", body);

            if (response.status === 200)
                window.location.href = "http://localhost:5173/voter-data";
        } catch (e) {
            console.error("Authentication failed:", e);
            // Optionally, you can redirect to an error page or show a notification
            //window.location.href = "http://localhost:5173/error";
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