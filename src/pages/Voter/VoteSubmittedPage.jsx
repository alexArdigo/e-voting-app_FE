import React, {useEffect, useState} from 'react';
import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";
import api from "../../services/api";
import {useLocation, useNavigate} from "react-router-dom";
import {useUserContext} from "../../services/UserContext";

const VoteSubmittedPage = () => {
    const {user, setUser, setVotingSession, logout} = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();
    const {electionId, electionName, partyName} = location.state || {};
    const [countdown, setCountdown] = useState(10);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = async () => {
        setUser(null);
        logout();
    };

    useEffect(() => {
        setShowSuccess(true);

        const logoutTimer = setTimeout(() => {
            handleLogout();
        }, 10000);

        return () => clearTimeout(logoutTimer);
    }, []);

    useEffect(() => {
        if (!showSuccess) return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);

                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showSuccess, navigate]);

    const handleManualRedirect = async () => {
        await api.get("/logout");
        setUser(null);
        navigate("/", {replace: true});
    };

    if (!electionId && !electionName) {
        console.warn("No election data, redirecting immediately");
        navigate("/", {replace: true});
        return null;
    }

    return (
        <MainLayout className="dflxColumn">
            <StyledContainer style={{
                width: '600px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '40px'
            }}>
                <div style={{
                    fontSize: '4rem',
                    color: '#059669',
                    marginBottom: '20px'
                }}>
                    ✅
                </div>

                <h2 style={{
                    color: '#059669',
                    marginBottom: '15px',
                    fontSize: '1.8rem'
                }}>
                    Voto Submetido com Sucesso!
                </h2>

                {partyName && partyName !== 'Partido selecionado' && (
                    <div style={{
                        backgroundColor: '#f0f9ff',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid #e0f2fe'
                    }}>
                        <p style={{fontSize: '1.1rem', margin: '0'}}>
                            Opção selecionada: <strong>{partyName}</strong>
                        </p>
                    </div>
                )}

                <p style={{
                    fontSize: '1.1rem',
                    marginBottom: '30px',
                    color: '#374151'
                }}>
                    Obrigado por participar no processo democrático.
                </p>

                <div style={{
                    backgroundColor: '#f9fafb',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '25px',
                    border: '1px solid #e5e7eb'
                }}>
                    <p style={{
                        fontSize: '1rem',
                        margin: '0',
                        color: '#6b7280'
                    }}>
                        Será redirecionado automaticamente em <strong
                        style={{color: '#374151'}}>{countdown}</strong> segundos.
                    </p>
                </div>

                <button
                    onClick={handleManualRedirect}
                    style={{
                        backgroundColor: '#3C5DBC',
                        color: 'white',
                        padding: '12px 30px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2c4aa6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3C5DBC'}
                >
                    Ir para Página Inicial
                </button>
            </StyledContainer>

            <StyledContainer style={{
                width: '500px',
                marginTop: '20px',
                padding: '20px'
            }}>
                <div style={{
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: '0.9rem'
                }}>
                    <p style={{margin: '0'}}>
                        <em>O seu voto foi registado de forma segura e anónima.</em>
                    </p>
                </div>
            </StyledContainer>
        </MainLayout>
    );
};

export default VoteSubmittedPage;