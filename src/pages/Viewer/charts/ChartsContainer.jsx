import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import GlobalLegislativeResultsPerYear from "./GlobalLegislativeResultsPerYear";
import ElectoralSeats from "./ElectoralSeats";
import './charts.css';
import Results from "../Results";
import Districts from "../../../components/specific/Map/Districts";

export const charts = [
    { type: "votesByParty", name: "Votos por Partido", component: VotesByPartyByDistrictChart },
    { type: "results", name: "Resultados Legislativas Globais", component: Results },
    { type: "globalLegislativeResults", name: "Resultados Legislativas Globais", component: GlobalLegislativeResultsPerYear },
    { type: "assemblySeats", name: "Lugares Assembleia da República", component: ElectoralSeats }
];

const ChartsContainer = ({ active }) => {
    return (
        <div className="charts-container">
            {charts
                .filter(chart => chart.type === active)
                .map((chart, index) => (
                    <div key={index} className="chart-block">
                        <h2 className="chart-title">{chart.name}</h2>
                        {React.createElement(chart.component)}
                    </div>
                ))}
        </div>
    );
};

export default ChartsContainer;