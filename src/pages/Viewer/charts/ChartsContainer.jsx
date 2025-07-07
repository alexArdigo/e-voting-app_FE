import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import SampleChartForTesting from "./SampleChartForTesting";
import ResultadosLegislativasGlobaisPorAno from "./ResultadosLegislativasGlobaisPorAno";

const ChartsContainer = () => {
    return (
        <div style={{ width: "600px", margin: "0 auto" }}>
                <VotesByPartyByDistrictChart />
            <SampleChartForTesting></SampleChartForTesting>
            <ResultadosLegislativasGlobaisPorAno></ResultadosLegislativasGlobaisPorAno>


        </div>
    );
};

export default ChartsContainer;