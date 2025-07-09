import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import StyledContainer from "../../layouts/StyledContainer";
import {useUserContext} from "../../services/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ChartsContainer, {charts} from "./charts/ChartsContainer";

const Graph = () => {
    const {user} = useUserContext();

    return (

        <div style={{height: "100vh"}}>

            <MainLayout>
                <StyledContainer variant="defaultTransparent" className="dflxRow" style={{height: "100%"}}>

                    <StyledContainer variant="defaultContained" className="dflxColumn" style={{height: "100%"}}>


                        <img src="public/images/ProfilePic.png" height="150px" alt="Profile"/>

                        <div className="side-profile">
                            <p><strong> Utilizador com sessão iniciada </strong></p>
                            <p> Último acesso: {user?.lastLogin || null}</p>
                            <p> Nome: {user?.name || null}</p>
                            <p> Nome de utilizador: {user?.username || null}</p>
                            <p> Instituição: {user?.institutionName || null}</p>


                        </div>
                        <div className="dflxColumn" >
                            {/*<button className="side-bar-button"> Editar perfil </button>*/}
                            <button className="side-bar-button"> Sair </button>
                        </div>

                    </StyledContainer>

                </StyledContainer>
                <StyledContainer variant="DefaultTransparent" style={{minWidth:"70vw"}}>
                    <ChartsContainer active={chartType}></ChartsContainer>
                </StyledContainer>

                <div className="graph-buttons" style={{marginRight:"60px", marginTop:"40px"}}>
                    {charts.map((chart, index) => {
                        return <button className="side-bar-button" onClick={() => setChartType(chart.type)}>{chart.name}</button>
                    })}
                    {/*<button className="side-bar-button"> Votos por Partido </button><br/>
                    <button className="side-bar-button"> Resultados Legislativas Globais </button><br/>
                    <button className="side-bar-button"> Lugares Assembleia da República </button><br/>
                    <button className="side-bar-button"> Votos por Partido Por Freguesia </button><br/>
                    <button className="side-bar-button"> Resultados Presidencis Globais </button><br/>
                    <button className="side-bar-button"> Lugares Republica Portugal </button><br/>*/}
                </div>

            </MainLayout>

        </div>

    );
};

export default Graph;