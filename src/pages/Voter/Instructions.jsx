import React, {useRef} from 'react';
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";
import {useUserContext} from "../../services/UserContext";

const Instructions = () => {
    const {user} = useUserContext();
    const navigate = useNavigate()
    const stepsRef = useRef(null);

    const handleScroll = () => {
        if (stepsRef.current) {
            stepsRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }

    const handleClick = () => {
        window.scrollTo(0, 0);
        if (user?.id && user?.role === "VOTER") {
           navigate("/voter-data")
        } else {
            navigate("/auth");
        }
    }

    return (
        <MainLayout className="dflxColumn">

            <StyledContainer variant="default" style={{lineHeight: "2em", paddingRight:"50px", width: "900px"}}>
                <h1 style={{ textAlign: "center" }}>Instruções para o Voto Eletrónico</h1>
                <p style={{ textAlign: "center" }}>
                    Administração Eleitoral da Secretaria-Geral do Ministério da Administração Interna compete:
                </p>
                <ul style={{ textAlign: "justify", paddingLeft: "20px"}}>
                    <li>
                        <strong>Assegurar</strong> o recenseamento eleitoral de modo automático e voluntário garantindo, a operacionalidade e atualidade do sistema de informação e gestão do recenseamento eleitoral, providenciando pela organização, manutenção e gestão da Base de Dados do Recenseamento Eleitoral;
                    </li>
                    <li>
                        <strong>Coordenar</strong> o apoio financeiro, logístico e administrativo aos órgãos da administração local no âmbito dos atos eleitorais e referendários, organizar e executar campanhas de divulgação e de esclarecimento e disponibilizar conteúdos formativos adequados à efetiva e correta participação dos eleitores, dos órgãos da administração local e dos agentes da administração eleitoral no âmbito da realização de atos eleitorais e referendários, difundindo informação pública e respetivos procedimentos sobre os mesmos;
                    </li>
                    <li>
                        <strong>Tratar e enviar</strong> às entidades competentes, os elementos necessários à impressão dos boletins de voto em todas as eleições e referendos;
                    </li>
                    <li>
                        <strong>Coordenar</strong> as operações de recolha e divulgação dos resultados do escrutínio provisório de todos os atos eleitorais e referendários.
                    </li>
                    <li>
                        <strong>Preparar e organizar</strong>, para publicação, todo o trabalho relacionado com as eleições, assegurar a cooperação internacional em matéria eleitoral e do recenseamento, garantir a preservação dos resultados do escrutínio provisório de todos os atos eleitorais e dos referendos, bem como da informação relativa aos eleitos locais.
                    </li>
                </ul>
            </StyledContainer>
            <StyledContainer variant="flex" style={{marginTop:"0"}}>
                <img src="/images/arrow-down.png" alt="arrow" style={{width: "80px", cursor: "pointer"}} onClick={handleScroll} />
            </StyledContainer>
            <StyledContainer style={{width: "800px", paddingTop: "80px"}} variant="transparent" ref={stepsRef}>

            <div className="steps-container" >
                <h1>Siga os seguintes passos</h1>
                <section className="steps-list" style={{width: "600px", margin:"auto", marginBlock: "50px"}}>
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
                    <button className="vote-button" onClick={handleClick} style={{margin:"0"}}>Prosseguir</button>
                </div>
            </div>
            </StyledContainer>
        </MainLayout>
    );
};

export default Instructions;
