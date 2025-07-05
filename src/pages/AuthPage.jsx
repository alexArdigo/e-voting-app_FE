import React, {useEffect} from 'react';
import api from "../services/api.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const AuthPage = () => {


    const handleStartCMDAuthentication = async () => {
        const CMV_URL = "http://localhost:5174/authorization";

        try {
            const response = await api.get("/oauth/login");
            console.log(response);
            const {token} = response?.data;

            if (!token)
                throw new Error("Invalid response from server");


            window.location.href = `${CMV_URL}?TOKEN=${token}`;
        } catch (e) {
            console.error("Error starting vote session:", e);
            toast.error("Erro ao iniciar sessão de voto. Por favor, tente novamente.");
        }
    };

    const handleLogout = async () => {
        const res = await api.post("/logout");
        console.log("res ", res);
    }

    useEffect(() => {
        handleLogout()
    }, []);

    return (
        <MainLayout>
            <div className="auth-container">
                <div className="message-box">
                    <img src="/images/cne-logo.jpg" alt="CNE"/>
                </div>

                <div className="form-section">
                    <h2>Faça sua autenticação com a <strong>Chave Móvel Digital.</strong></h2>

                    <button
                        className="vote-button"
                        onClick={handleStartCMDAuthentication}
                    >
                        Chave Móvel Digital
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default AuthPage;