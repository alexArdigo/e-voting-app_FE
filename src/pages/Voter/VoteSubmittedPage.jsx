import React from 'react';
import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";

const VoteSubmittedPage = () => {
    return (
        <>
            <MainLayout className="dflxColumn">
                <StyledContainer variant="transparent" style={{}}>
                    <h1>Eleição Presidencial 2025</h1>
                </StyledContainer>
                <StyledContainer variant="transparent" style={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <p>O seu voto foi submetido</p>
                </StyledContainer>
            </MainLayout>

        </>
    );
};

export default VoteSubmittedPage;