import React from 'react';
import MainLayout from "./MainLayout.jsx";
import StyledContainer from "./StyledContainer.jsx";

const VoteSubmitedPage = () => {
    return (
        <>
            <MainLayout className="dflxColumn">
                <StyledContainer variant="yellow" style={{paddingInline: "100px", paddingBlock: "50px", margin: "100px"}}>
                    <h1>Eleição Presidencial 2025</h1>
                </StyledContainer>
                <StyledContainer>
                    <p>O seu voto foi submetido</p>
                </StyledContainer>
            </MainLayout>

        </>
    );
};

export default VoteSubmitedPage;