import React from 'react';

const AuthPage = () => {
    return (
        <div className="auth-container">
            <div className="message-box">
                <img src="/images/cne-logo.jpg" alt="CNE" />
            </div>

            <div className="form-section">
                <h2>Formulário de Autenticação</h2>

                <button className="vote-button">
                    Chave Móvel Digital
                </button>
            </div>
        </div>
    );
};

export default AuthPage;