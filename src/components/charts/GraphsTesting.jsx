import React from 'react';
import VoteChart from "./VoteChart";
import ChartDefaultContainer from "./ChartDefaultContainer";

const GraphsTesting = () => {
    return (
        <div style={{minHeight: "150vh"}}>

                <VoteChart electionId={1} electionName="Eleições para a Assembleia da República" />
            <ChartDefaultContainer></ChartDefaultContainer>
        </div>
    );
};

export default GraphsTesting;