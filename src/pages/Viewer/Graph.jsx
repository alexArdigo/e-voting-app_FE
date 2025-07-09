import React, {useState} from "react";
import StyledContainer from "../../layouts/StyledContainer";
import "./viewer.css"
import {useUserContext} from "../../services/UserContext";
import MainLayout from "../../layouts/MainLayout";
import ChartsContainer, {charts} from "./charts/ChartsContainer";

const Graph = () => {
    const {user} = useUserContext();
    const [chartType, setChartType] = useState("votesByParty");


    return (
        <div className="graph-container">
            <MainLayout>
                <div className="graph-layout">

                    <StyledContainer variant="defaultContained" className="graph-sidebar">
                        <img src="public/images/ProfilePic.png" height="150px" alt="Profile"/>

                        <div className="side-profile">
                            <p><strong>Utilizador com sessão iniciada</strong></p>
                            <p>Último acesso: {user?.lastLogin || "N/A"}</p>
                            <p>Nome: {user?.name || "N/A"}</p>
                            <p>Nome de utilizador: {user?.username || "N/A"}</p>
                            <p>Instituição: {user?.institutionName || "N/A"}</p>
                        </div>

                        <div className="logout-button-container">
                            <button className="side-bar-button">Sair</button>
                        </div>
                    </StyledContainer>

                    <StyledContainer variant="DefaultTransparent" className="graph-content">
                        <ChartsContainer active={chartType}/>
                    </StyledContainer>

                    <div className="graph-buttons">
                        {charts.map((chart, index) => (
                            <button
                                key={index}
                                className="side-bar-button"
                                onClick={() => setChartType(chart.type)}
                            >
                                {chart.name}
                            </button>
                        ))}
                    </div>

                </div>
            </MainLayout>
        </div>
    );
};

export default Graph;