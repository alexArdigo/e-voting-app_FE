import React from 'react';
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import StyledContainer from "../components/specific/StyledContainer.jsx";

const Instructions = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/auth");
    }

    return (
        <MainLayout className="dflxColumn">
            <StyledContainer variant="transparent" style={{padding: "10px"}}>
                <h1>Bem vindo à platafroma de voto .........</h1>
            </StyledContainer>
            <StyledContainer style={{width: "800px", padding: "10px"}} variant="transparent">
            <div className="steps-container">
                <h1>Siga os seguintes passos</h1>
                <section className="steps-list">
                    <div className="step">
                        <img src="/images/Vector.png" alt="Entrar"/>
                        <p><strong>Entre como votante</strong></p>
                    </div>
                    <div className="step">
                        <img src="/images/Key.svg" alt="Chave"/>
                        <p><strong>Autentique-se com a chave de segurança</strong></p>
                    </div>
                    <div className="step">
                        <img src="/images/registration.svg" alt="Info"/>
                        <p><strong>Confirme as suas informações</strong></p>
                    </div>
                    <div className="step">
                        <img src="/images/Vector2.svg" alt="Menu de voto"/>
                        <p><strong>Prossiga para o menu de voto</strong></p>
                    </div>
                    <div className="step">
                        <img src="/images/Vector3.svg" alt="Submeter voto"/>
                        <p><strong>Vote e submeta o seu voto</strong></p>
                    </div>
                </section>

                <div className="button-wrapper">
                    <button className="vote-button" onClick={handleClick}>Prosseguir</button>
                </div>

                <img src="/images/legislativas_halfLogo.png" alt="Arco decorativo" className="corner-image"/>
            </div>
            </StyledContainer>
        </MainLayout>
    );
};

export default Instructions;

