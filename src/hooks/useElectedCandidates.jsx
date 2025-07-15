import { useState } from 'react';
import api from '../services/api';

export const useElectedCandidates = () => {
    const [electedCandidatesData, setElectedCandidatesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchElectedCandidates = async (electionId) => {
        try {
            setLoading(true);
            setError(null);
            const {data} = await api.get(`/Elections/${electionId}/results/legislative`);

            const allElectedCandidates = [];

            data.forEach((district) => {
                if (!district.results || district.results.length === 0) {
                    console.warn(`Distrito ${district.districtName} sem resultados`);
                    return;
                }

                district.results.forEach((organisation) => {
                    if (organisation.electedCandidates && organisation.electedCandidates.length > 0) {
                        organisation.electedCandidates.forEach((candidate) => {
                            allElectedCandidates.push({
                                candidateName: candidate,
                                organisationName: organisation.organisationName,
                                districtName: district.districtName,
                            });
                        });
                    }
                });
            });

            setElectedCandidatesData(allElectedCandidates);

        } catch (err) {
            console.error("Erro ao buscar candidatos eleitos:", err);
            setError("Erro ao buscar candidatos eleitos");
        } finally {
            setLoading(false);
        }
    };

    return {
        electedCandidatesData,
        loading,
        error,
        fetchElectedCandidates
    };
};
