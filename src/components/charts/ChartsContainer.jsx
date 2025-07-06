import React from 'react';
import VotesByPartyByDistrictChart from "./VotesByPartyByDistrictChart";
import SampleChartForTesting from "./SampleChartForTesting";

const ChartsContainer = () => {
    return (
        <div style={{ width: "600px", margin: "0 auto" }}>
                <VotesByPartyByDistrictChart />
            <SampleChartForTesting></SampleChartForTesting>

        </div>
    );
};

export default ChartsContainer;