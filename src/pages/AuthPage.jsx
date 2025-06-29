import React from 'react';
import Header from "../components/Header.jsx";

const AuthPage = () => {
    return (
        <>
            <Header/>
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
        </>

    );
};

export default AuthPage;