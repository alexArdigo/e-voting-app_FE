import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import StyledContainer from "../../components/specific/StyledContainer";

const ViewerSideBar = () => {
    return (


        <div style={{height: "100vh"}}>

            <MainLayout style={{ height: "100vh", width:"100vw"}}>
                <StyledContainer variant="DefaultTransparent" style={{minWidth:"30vw"}}>
                    <StyledContainer variant="defaultContained" className="dflxColumn">
                        <img src="public/images/Vector2.png" height="100px"/>
                        <h1>Visualizador de Eleições</h1>
                        <p>Esta página é destinada a visualização de resultados eleitorais.</p>

                    </StyledContainer>

                </StyledContainer>
                <StyledContainer variant="DefaultTransparent" style={{minWidth:"70vw"}}>
                    <p></p>
                </StyledContainer>
            </MainLayout>

        </div>

    );
};

export default ViewerSideBar;