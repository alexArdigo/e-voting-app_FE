import React from 'react';
import VoteChart from "./VoteChart";

const GraphsTesting = () => {
    return (
        <div style={{minHeight: "150vh"}}>

                <VoteChart electionId={1} electionName="Eleições para a Assembleia da República" />
        </div>
    );
};

export default GraphsTesting;