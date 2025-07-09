import React, {useState} from "react";
import StyledContainer from "../../layouts/StyledContainer";
import "./viewer.css"
import {useUserContext} from "../../services/UserContext";
import MainLayout from "../../layouts/MainLayout";
import ChartsContainer, {charts} from "./charts/ChartsContainer";

const Graph = () => {
    const {user} = useUserContext();
    const [chartType, setChartType] = useState("votesByParty");
    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (

            <MainLayout>
                <div className="graph-layout">

                    <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </div>

                    <div className={`graph-sidebar ${sidebarOpen ? "open" : "closed"}`}>
                        <img src="/images/ProfilePic.png" height="100px" alt="Profile" />

                        <div className="side-profile">
                            <p><strong>Nome:</strong> {user?.name || "N/A"}</p>
                            <p><strong>Instituição:</strong> {user?.institutionName || "N/A"}</p>
                            <p><strong>Email:</strong> {user?.username || "N/A"}</p>
                        </div>

                        <button className="edit">Editar Perfil</button>
                    </div>

                    <div className="graph-content">
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

                        <div className="graph-charts">
                            <ChartsContainer active={chartType} />
                        </div>
                    </div>

                </div>
            </MainLayout>
    );
};

export default Graph;