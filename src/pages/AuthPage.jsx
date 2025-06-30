import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {

    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="auth-container">
                <div className="message-box">
                    <img src="/images/cne-logo.jpg" alt="CNE" />
                </div>

                <div className="form-section">
                    <h2>Faça sua autenticação com a <strong>Chave Móvel Digital.</strong></h2>

                    <button className="vote-button" onClick={() => navigate("/election")} >
                        Chave Móvel Digital
                    </button> {/* <<<<< este navigate só esta aqui em placeholder ate haver a ligação com a chave movel digital*/}
                </div>
            </div>
        </MainLayout>
    );
};

export default AuthPage;

