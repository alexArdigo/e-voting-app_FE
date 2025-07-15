import React, {useState} from "react";
import "./css/Viewer.css";
import MainLayout from "../../layouts/MainLayout";
import ChartsContainer, {charts} from "./charts/ChartsContainer";

const Viewer = () => {
    const [chartType, setChartType] = useState("votesByParty");

    return (
        <div className={"dflx"}>
            <MainLayout>
                <div className="graph-layout">
                    <div className="graph-content">
                        <div className="graph-buttons">
                            {charts.map((chart, index) => {
                                return  (
                                    <button
                                        key={chart.type}
                                        onClick={() => setChartType(chart.type)}
                                    >
                                        <p className="graph-title">{chart.name}</p>
                                    </button>
                                )
                            }
                           )}
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

export default Viewer;