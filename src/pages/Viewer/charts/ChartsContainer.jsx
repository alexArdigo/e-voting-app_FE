import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import ElectoralSeats from "./ElectoralSeats";
import './charts.css';
import Results from "../Results";
import ElectedCandidates from "../ElectedCandidates";
import ElectedPresidential from "../ElectedPresidential";

export const charts = [
    { type: "votesByParty", name: "Votos por Partido", component: VotesByPartyByDistrictChart },
    { type: "results", name: "Mapa de Resultados Legislativas Globais", component: Results },
    { type: "electedCandidates", name: "Candidatos Eleitos Assembleia", component: ElectedCandidates },
    { type: "electedPresidential", name: "Resultados Eleições Presidenciais", component: ElectedPresidential },
    // { type: "globalLegislativeResults", name: "Resultados Legislativas Globais", component: GlobalLegislativeResultsPerYear }, //Note: .graph-buttons max-width em Viwer.css foi alterado para acomodar os botoes em linha, mas pode ser removido.
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