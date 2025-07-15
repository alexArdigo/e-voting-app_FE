export const useVoteCalculations = () => {
    const calculateAbstention = (resultsData) => {
        if (!resultsData) return "0%";
        const total = resultsData?.totalVotes || 0;
        const abstention = resultsData?.abstention || 0;
        const percentage = total > 2500 ? ((abstention / (total + abstention)) * 100).toFixed(2) : 0;
        return `${percentage}%`;
    };

    const calculateBlankVotesPercentage = (resultsData) => {
        if (!resultsData) return "0%";
        const total = resultsData?.totalVotes || 0;
        const blankVotes = resultsData?.blankVotes || 0;
        if (total === 0) return "0%";
        const percentage = ((blankVotes / total) * 100).toFixed(2);
        return `${percentage}%`;
    };

    return {
        calculateAbstention,
        calculateBlankVotesPercentage
    };
};
