import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import SampleChartForTesting from "./SampleChartForTesting";
import ResultadosLegislativasGlobaisPorAno from "./ResultadosLegislativasGlobaisPorAno";

const ChartsContainer = () => {
    return (
        <div style={{margin: "0 auto", width: "800px", padding: "20px"}}>

            <VotesByPartyByDistrictChart/>

            <SampleChartForTesting></SampleChartForTesting>

            <ResultadosLegislativasGlobaisPorAno></ResultadosLegislativasGlobaisPorAno>

        </div>
    );
};

export default ChartsContainer;