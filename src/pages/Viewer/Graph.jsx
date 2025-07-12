import React, {useState} from "react";
import "./css/viewer.css";
import MainLayout from "../../layouts/MainLayout";
import ChartsContainer, {charts} from "./charts/ChartsContainer";
import SideBar from "../../components/specific/SideBar";

const Graph = () => {
    const [chartType, setChartType] = useState("votesByParty");

    return (
        <div className={"dflx"}>
            <SideBar />
            <MainLayout >
                <div className="graph-layout">
                    <div className="graph-content">
                        <div className="graph-buttons">
                            {charts.map((chart, index) => (
                                <button
                                    key={index}
                                    onClick={() => setChartType(chart.type)}
                                >
                                    <p className="graph-title">{chart.name}</p>
                                </button>
                            ))}
                        </div>

                        <div className="graph-charts">
                            <ChartsContainer active={chartType}/>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    );
};

export default Graph;