import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import GlobalLegislativeResultsPerYear from "./GlobalLegislativeResultsPerYear";
import ElectoralSeats from "./ElectoralSeats";
import './charts.css';
import Results from "../Results";

export const charts = [
    { type: "votesByParty", name: "Votos por Partido", mapComp: Results, chartComp: VotesByPartyByDistrictChart },
    { type: "globalLegislativeResults", name: "Resultados Legislativas Globais", mapComp: Results, chartComp: GlobalLegislativeResultsPerYear },
    { type: "assemblySeats", name: "Lugares Assembleia da República", mapComp: Results, chartComp: ElectoralSeats }
];

const ChartsContainer = ({ active }) => {
    return (
        <div className="charts-container">
            {charts
                .filter(chart => chart.type === active)
                .map((chart, index) => (
                    <div key={index} className="chart-block">
                        <h2 className="chart-title">{chart.name}</h2>
                        {React.createElement(chart.mapComp)}
                        {React.createElement(chart.chartComp)}
                    </div>
                ))}
        </div>
    );
};

export default ChartsContainer;