import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import SampleChartForTesting from "./SampleChartForTesting";
import ResultadosLegislativasGlobaisPorAno from "./ResultadosLegislativasGlobaisPorAno";
import ElectoralSeats from "./ElectoralSeats";

export const charts = [
    {type: "votesByParty", name: "Votos por Partido", component: VotesByPartyByDistrictChart},
    {type: "globalLegislativeResults", name: "Resultados Legislativas Globais", component: ResultadosLegislativasGlobaisPorAno},
    {type: "assemblySeats", name: "Lugares Assembleia da República", component: ElectoralSeats}
];

const ChartsContainer = ({active}) => {
    return (
        <div style={{margin: "0 auto", width: "800px", paddingTop: "0", paddingLeft: "190px", paddingRight: "190px"}}>
            {charts.filter(chart => chart.type === active).map((chart, index) => {
                return (
                    <div key={index} style={{marginBottom: "20px"}}>
                        <h2>{chart.name}</h2>
                        {React.createElement(chart.component)}
                    </div>
                );
            })}

        </div>

    );
};

export default ChartsContainer;