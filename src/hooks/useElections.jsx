import { useState, useEffect } from 'react';
import api from '../services/api';

export const useElections = () => {
    const [allLegisElections, setAllLegisElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllNonActiveLegislativeElections = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/elections/legislative`);
            setAllLegisElections(response.data);
        } catch (err) {
            console.error("Error in fetching elections", err);
            setError("Error in fetching elections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllNonActiveLegislativeElections();
    }, []);

    return {
        allLegisElections,
        loading: loading,
        error: error,
        refetch: fetchAllNonActiveLegislativeElections
    };
};
