import React from 'react';
import MainLayout from "./MainLayout.jsx";
import StyledContainer from "./StyledContainer.jsx";

const ConfirmElectionPage = () => {
    return (
        <>
            <MainLayout className="dflxColumn">
                <StyledContainer variant="yellow" style={{paddingInline: "100px", paddingBlock: "50px", margin: "100px"}}>
                    <h1>Eleição Presidencial 2025</h1>
                </StyledContainer>
                <StyledContainer>
                    <p>Ao clicar em “Votar” irá ser redirecionado para o seu boletim de voto eletrónico, a partir desse momentoserão  disponibilizados 5 minutos para submeter o seu voto.  </p>
                </StyledContainer>
                <button className="vote-button" onClick={() => navigate("/instructions")}>Votar</button>
            </MainLayout>

        </>
    );
};

export default ConfirmElectionPage;