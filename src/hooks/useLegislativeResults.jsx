import { useState } from 'react';
import api from '../services/api';

export const useLegislativeResults = () => {
    const [resultsData, setResultsData] = useState(null);
    const [partyWins, setPartyWins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLegislativeResults = async (electionId) => {
        try {
            setLoading(true);
            setError(null);
            const {data} = await api.get(`/Elections/${electionId}/results/legislative`);

            const wins = [];
            let totalVotes = 0;
            let blankVotes = 0;
            let abstention = 0;

            data.forEach((district) => {

                if (!district.results || district.results.length === 0) {
                    console.warn(`Distrito ${district.districtName} sem resultados`);
                    return;
                }

                if (district.totalVotes) {
                    totalVotes += district.totalVotes;
                }
                if (district.blankVotes) {
                    blankVotes += district.blankVotes;
                }
                if (district.abstention) {
                    abstention += district.abstention;
                }

                const sorted = [...district.results].sort((a, b) => b.votes - a.votes);
                const winner = sorted[0];

                if (winner.color) {
                    wins.push({
                        district: district.districtName,
                        party: winner.organisationName || 'Partido Desconhecido',
                        color: winner.color,
                        votes: winner.votes
                    });
                }
            });

            setPartyWins(wins);
            setResultsData({
                totalVotes,
                blankVotes,
                abstention
            });
        } catch (err) {
            console.error("Erro ao buscar vencedores por distrito:", err);
            setError("Erro ao buscar resultados");
        } finally {
            setLoading(false);
        }
    };

    return {
        resultsData,
        partyWins,
        loading,
        error,
        fetchLegislativeResults
    };
};
