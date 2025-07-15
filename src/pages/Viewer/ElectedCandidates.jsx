import {useEffect, useState} from "react";
import { useElections } from "../../hooks/useElections";
import { useElectedCandidates } from "../../hooks/useFetchElectedCandidates";
import "./css/ElectedCandidates.css";

export default function ElectedCandidates() {
    const { allLegisElections, loading: electionsLoading, error: electionsError } = useElections();
    const { electedCandidatesData, loading, error, fetchElectedCandidates } = useElectedCandidates();
    const [electionId, setElectionId] = useState(1);

    useEffect(() => {
        fetchElectedCandidates(electionId);
    }, [electionId, fetchElectedCandidates]);

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
                <h1 className="elected-candidates-title">Candidatos Eleitos para a Assembleia</h1>

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
                        <button className="retry-button" onClick={() => fetchElectedCandidates(electionId)}>
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
