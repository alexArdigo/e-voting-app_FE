import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import SampleChartForTesting from "./SampleChartForTesting";
import ResultadosLegislativasGlobaisPorAno from "./ResultadosLegislativasGlobaisPorAno";
import ElectoralSeats from "./ElectoralSeats";

const ChartsContainer = () => {
    return (
        <div style={{margin: "0 auto", width: "1000px", padding: "20px"}}>

            <VotesByPartyByDistrictChart/> <br/><br/>
            <ResultadosLegislativasGlobaisPorAno></ResultadosLegislativasGlobaisPorAno><br/><br/>
            <ElectoralSeats></ElectoralSeats>

        </div>
    );
};

export default ChartsContainer;