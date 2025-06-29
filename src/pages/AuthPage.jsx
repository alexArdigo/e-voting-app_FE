import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";

const AuthPage = () => {
    return (
        <MainLayout>
            <div className="auth-container">
                <div className="message-box">
                    <img src="/images/cne-logo.jpg" alt="CNE" />
                </div>

                <div className="form-section">
                    <h2>Faça sua autenticação com a <strong>Chave Móvel Digital.</strong></h2>

                    <button className="vote-button">
                        Chave Móvel Digital
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default AuthPage;

