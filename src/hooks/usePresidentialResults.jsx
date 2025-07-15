import { useState } from 'react';
import api from '../services/api';

export const usePresidentialResults = () => {
    const [presidentialResultsData, setPresidentialResultsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPresidentialResults = async (electionId) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get(`/elections/${electionId}/results/presidential`);

            console.log("Dados dos resultados presidenciais:", data);
            setPresidentialResultsData(data);

        } catch (err) {
            console.error("Erro ao buscar resultados presidenciais:", err);
            setError("Erro ao buscar resultados presidenciais");
        } finally {
            setLoading(false);
        }
    };

    return { presidentialResultsData, loading, error, fetchPresidentialResults };
};
