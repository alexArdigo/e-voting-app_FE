import { useState, useEffect } from 'react';
import api from '../services/api';

export const usePresidentialElections = () => {
    const [allPresidentialElections, setAllPresidentialElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPresidentialElections = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/elections?electionType=PRESIDENTIAL`);
                setAllPresidentialElections(response.data);
            } catch (err) {
                console.error("Erro ao buscar eleições presidenciais:", err);
                setError("Erro ao buscar eleições presidenciais");
            } finally {
                setLoading(false);
            }
        };

        fetchPresidentialElections();
    }, []);

    return { allPresidentialElections, loading, error };
};
