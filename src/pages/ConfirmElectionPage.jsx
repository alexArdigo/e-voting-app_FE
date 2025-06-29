import React from 'react';


import {useNavigate, useLocation} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import StyledContainer from "../components/specific/StyledContainer.jsx";


const ConfirmElectionPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedElectionName = location.state.selectedElectionName;

    return (
        <>
            <MainLayout className="dflxColumn">
                <StyledContainer variant="yellow" style={{paddingInline: "100px", paddingBlock: "50px", margin: "100px"}}>
                    <p>Selecionou:</p>
                    <h1>{selectedElectionName || "Nome da eleição não disponível"}</h1>
                </StyledContainer>
                <StyledContainer>
                    <p>Ao clicar em “Votar” irá ser redirecionado para o seu boletim de voto eletrónico, a partir desse momentoserão  disponibilizados 5 minutos para submeter o seu voto.  </p>
                </StyledContainer>
                <button className="vote-button" onClick={() => navigate("/XXXX")}>Votar</button>
            </MainLayout>

        </>
    );
};

export default ConfirmElectionPage;