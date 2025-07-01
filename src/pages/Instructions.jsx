import React from 'react';
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import StyledContainer from "../components/specific/StyledContainer.jsx";
import { useRef } from "react";

const Instructions = () => {

    const navigate = useNavigate()
    const stepsRef = useRef(null);

    const handleScroll = () => {
        if (stepsRef.current) {
            stepsRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }

    const handleClick = () => {
        navigate("/auth");
    }

    return (
        <MainLayout className="dflxColumn">

            <StyledContainer variant="default" style={{marginTop: "100px", paddingBlock:"30px", width: "1000px", justifyContent: "center", alignContent: "center"}}>
                <h1 style={{ textAlign: "center" }}>Instruções para o Voto Eletrónico</h1>
                <p style={{ textAlign: "center" }}>
                    Administração Eleitoral da Secretaria-Geral do Ministério da Administração Interna compete:
                </p>
                <ul style={{ textAlign: "justify", marginInline: "20px" }}>
                    <li>
                        Assegurar o recenseamento eleitoral de modo automático e voluntário garantindo, a operacionalidade e atualidade do sistema de informação e gestão do recenseamento eleitoral, providenciando pela organização, manutenção e gestão da Base de Dados do Recenseamento Eleitoral;
                    </li>
                    <li>
                        Coordenar o apoio financeiro, logístico e administrativo aos órgãos da administração local no âmbito dos atos eleitorais e referendários, organizar e executar campanhas de divulgação e de esclarecimento e disponibilizar conteúdos formativos adequados à efetiva e correta participação dos eleitores, dos órgãos da administração local e dos agentes da administração eleitoral no âmbito da realização de atos eleitorais e referendários, difundindo informação pública e respetivos procedimentos sobre os mesmos;
                    </li>
                    <li>
                        Elaborar e organizar, ainda, toda a documentação necessária para o apoio jurídico e de esclarecimento aos eleitores, aos agentes eleitorais e a outros intervenientes diretos nos processos eleitorais, promover campanhas mediáticas sobre o recenseamento eleitoral, as eleições e os referendos nacionais, em território nacional e no estrangeiro;
                    </li>
                    <li>
                        Tratar e enviar às entidades competentes, os elementos necessários à impressão dos boletins de voto em todas as eleições e referendos;
                    </li>
                    <li>
                        Coordenar as operações de recolha e divulgação dos resultados do escrutínio provisório de todos os atos eleitorais e referendários.
                    </li>
                    <li>
                        Preparar e organizar, para publicação, todo o trabalho relacionado com as eleições, assegurar a cooperação internacional em matéria eleitoral e do recenseamento, garantir a preservação dos resultados do escrutínio provisório de todos os atos eleitorais e dos referendos, bem como da informação relativa aos eleitos locais.
                    </li>
                </ul>
            </StyledContainer>
            <StyledContainer variant="flex" style={{marginTop:"80px"}}>
                <img src="/images/arrow-down.png" alt="arrow" style={{width: "100px", cursor: "pointer"}} onClick={handleScroll} />
            </StyledContainer>
            <StyledContainer style={{width: "800px", paddingColumn: "30px"}} variant="transparent" ref={stepsRef}>

            <div className="steps-container" >
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

                <img src="/images/legislativas_halfLogo.png" alt="Arco decorativo" className="corner"/>
            </div>

            </StyledContainer>

        </MainLayout>
    );
};

export default Instructions;

