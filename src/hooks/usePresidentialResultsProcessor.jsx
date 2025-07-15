import { useMemo } from 'react';

export const usePresidentialResultsProcessor = (resultsArray) => {
    return useMemo(() => {
        if (!resultsArray || !Array.isArray(resultsArray) || resultsArray.length === 0) {
            return {
                candidatesData: [],
                electionWinner: null
            };
        }

        const candidateVotes = {};

        resultsArray.forEach((candidate) => {
            const candidateName = candidate.candidateName || candidate.organisationName;
            const organisationName = candidate.organisationName || 'Independente';

            if (!candidateVotes[candidateName]) {
                candidateVotes[candidateName] = {
                    candidateName: candidateName,
                    organisationName: organisationName,
                    totalVotes: 0
                };
            }

            candidateVotes[candidateName].totalVotes += candidate.votes || 0;
        });

        const candidatesArray = Object.values(candidateVotes).sort((a, b) => b.totalVotes - a.totalVotes);
        const totalVotes = candidatesArray.reduce((sum, candidate) => sum + candidate.totalVotes, 0);

        candidatesArray.forEach(candidate => {
            candidate.totalPercentage = totalVotes > 0 ? ((candidate.totalVotes / totalVotes) * 100).toFixed(2) : 0;
        });

        const electionWinner = candidatesArray.length > 0 ? candidatesArray[0] : null;

        return {
            candidatesData: candidatesArray,
            electionWinner: electionWinner
        };
    }, [resultsArray]);
};
