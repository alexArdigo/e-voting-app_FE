import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import ResultadosLegislativasGlobaisPorAno from "./ResultadosLegislativasGlobaisPorAno";
import ElectoralSeats from "./ElectoralSeats";
import './charts.css';

export const charts = [
    { type: "votesByParty", name: "Votos por Partido", component: VotesByPartyByDistrictChart },
    { type: "globalLegislativeResults", name: "Resultados Legislativas Globais", component: ResultadosLegislativasGlobaisPorAno },
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