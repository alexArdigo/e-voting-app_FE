import {useEffect, useState} from "react";
import api from "../../services/api";
import { useElections } from "../../hooks/useElections";
import "./css/ElectedCandidates.css";

export default function ElectedCandidates() {
    const { allLegisElections, loading: electionsLoading, error: electionsError } = useElections();
    const [electedCandidatesData, setElectedCandidatesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [electionId, setElectionId] = useState(1);

    useEffect(() => {
        fetchElectedCandidates();
    }, [electionId]);

    const fetchElectedCandidates = async () => {
        try {
            setLoading(true);
            setError(null);
            const {data} = await api.get(`/Elections/${electionId}/results/legislative`);

            console.log("Dados da API para candidatos eleitos:", data);

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
                                votes: organisation.votes || 0
                            });
                        });
                    }
                });
            });

            console.log("Candidatos eleitos processados:", allElectedCandidates);
            setElectedCandidatesData(allElectedCandidates);

        } catch (err) {
            console.error("Erro ao buscar candidatos eleitos:", err);
            setError("Erro ao buscar candidatos eleitos");
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('pt-PT').format(number);
    };

    const groupedByParty = electedCandidatesData.reduce((acc, candidate) => {
        const party = candidate.organisationName;
        if (!acc[party]) {
            acc[party] = [];
        }
        acc[party].push(candidate);
        return acc;
    }, {});

    const groupedByDistrict = electedCandidatesData.reduce((acc, candidate) => {
        const district = candidate.districtName;
        if (!acc[district]) {
            acc[district] = [];
        }
        acc[district].push(candidate);
        return acc;
    }, {});

    return (
        <div className="elected-candidates-container">
            <div className="elected-candidates-main">
                <h1 className="elected-candidates-title">Candidatos Eleitos</h1>

                <div className="election-selector">
                    <select
                        name="all-elections-dates"
                        id="all-elections-date"
                        value={electionId}
                        onChange={(e) => setElectionId(parseInt(e.target.value))}
                    >
                        {allLegisElections.map(election => (
                            <option key={election.id} value={election.id}>
                                {election.name}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <p>A carregar candidatos eleitos...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <h3>Erro</h3>
                        <p>{error}</p>
                        <button className="retry-button" onClick={fetchElectedCandidates}>
                            Tentar novamente
                        </button>
                    </div>
                ) : (
                    <div className="candidates-content">
                        <div className="district-section">
                            <h2>Candidatos por Distrito</h2>
                            {Object.keys(groupedByDistrict).length > 0 ? (
                                Object.entries(groupedByDistrict).map(([district, candidates]) => (
                                    <div key={district} className="district-group">
                                        <h3 className="district-name">
                                            {district} ({candidates.length} eleitos)
                                        </h3>
                                        <div className="candidates-list">
                                            {candidates.map((candidate, index) => (
                                                <div key={index} className="candidate-item">
                                                    <span className="candidate-name">{candidate.candidateName}</span>
                                                    <span className="candidate-party">{candidate.organisationName}</span>
                                                    <span className="candidate-votes">
                                                        {formatNumber(candidate.votes)} votos
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-data">
                                    <p>Nenhum candidato eleito encontrado</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
