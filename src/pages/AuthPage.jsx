import React from 'react';
import Header from "../Components/Header.jsx";

const AuthPage = () => {

    // Esta call vai para um componente próprio, está aqui só para config
    const handleCMDredirect = async () => {
        window.location.href = 'http://localhost:8080/oauth/login'; // euvoto backend
    };

    return (
        <>
            <Header/>
            <div className="auth-container">
                <div className="message-box">
                    <img src="/images/cne-logo.jpg" alt="CNE"/>
                </div>

                <div className="form-section">
                    <h2>Faça sua autenticação com a <strong>Chave Móvel Digital.</strong></h2>

                    <button
                        className="vote-button"
                        onClick={handleCMDredirect}
                    >
                        Chave Móvel Digital
                    </button>
                </div>
            </div>
        </>

    );
};

export default AuthPage;