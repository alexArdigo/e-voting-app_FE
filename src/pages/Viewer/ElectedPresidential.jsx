import {useEffect, useState} from "react";
import { usePresidentialElections } from "../../hooks/usePresidentialElections";
import { usePresidentialResults } from "../../hooks/usePresidentialResults";
import "./css/ElectedCandidates.css";

export default function ElectedPresidential() {
    const { allPresidentialElections, loading: electionsLoading, error: electionsError } = usePresidentialElections();
    const { presidentialResultsData, loading, error, fetchPresidentialResults } = usePresidentialResults();
    const [electedCandidatesData, setElectedCandidatesData] = useState([]);
    const [electionId, setElectionId] = useState(1);

    useEffect(() => {
        if (allPresidentialElections.length > 0) {
            const firstElectionId = allPresidentialElections[0].id;
            setElectionId(firstElectionId);
            fetchPresidentialResults(firstElectionId);
        }
    }, [allPresidentialElections]);

    useEffect(() => {
        if (electionId) {
            fetchPresidentialResults(electionId);
        }
    }, [electionId]);

    useEffect(() => {
        if (presidentialResultsData && presidentialResultsData.length > 0) {
            processPresidentialResults();
        }
    }, [presidentialResultsData]);

    const processPresidentialResults = () => {
        const allElectedCandidates = [];

        presidentialResultsData.forEach((district) => {
            if (!district.results || district.results.length === 0) {
                console.warn(`Distrito ${district.districtName} sem resultados`);
                return;
            }

            const sortedResults = [...district.results].sort((a, b) => b.votes - a.votes);
            const winner = sortedResults[0];

            if (winner) {
                allElectedCandidates.push({
                    candidateName: winner.candidateName || winner.organisationName,
                    organisationName: winner.organisationName || 'Independente',
                    districtName: district.districtName,
                    votes: winner.votes || 0,
                    percentage: district.totalVotes ? ((winner.votes / district.totalVotes) * 100).toFixed(2) : 0
                });
            }
        });

        setElectedCandidatesData(allElectedCandidates);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('pt-PT').format(number);
    };

    const groupedByCandidate = electedCandidatesData.reduce((acc, result) => {
        const candidate = result.candidateName;
        if (!acc[candidate]) {
            acc[candidate] = {
                candidateName: candidate,
                organisationName: result.organisationName,
                districts: [],
                totalVotes: 0
            };
        }
        acc[candidate].districts.push({
            districtName: result.districtName,
            votes: result.votes,
            percentage: result.percentage
        });
        acc[candidate].totalVotes += result.votes;
        return acc;
    }, {});

    const groupedByDistrict = electedCandidatesData.reduce((acc, result) => {
        const district = result.districtName;
        if (!acc[district]) {
            acc[district] = [];
        }
        acc[district].push(result);
        return acc;
    }, {});

    if (electionsLoading) {
        return (
            <div className="elected-candidates-container">
                <div className="loading-container">
                    <p>A carregar eleições presidenciais...</p>
                </div>
            </div>
        );
    }

    if (electionsError) {
        return (
            <div className="elected-candidates-container">
                <div className="error-container">
                    <h3>Erro</h3>
                    <p>{electionsError}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="elected-candidates-container">
            <div className="elected-candidates-main">
                <h1 className="elected-candidates-title">Resultados das Eleições Presidenciais</h1>

                <div className="election-selector">
                    <select
                        name="all-elections-dates"
                        id="all-elections-date"
                        value={electionId}
                        onChange={(e) => setElectionId(parseInt(e.target.value))}
                    >
                        {allPresidentialElections.map(election => (
                            <option key={election.id} value={election.id}>
                                {election.name}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <p>A carregar resultados presidenciais...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <h3>Erro</h3>
                        <p>{error}</p>
                        <button className="retry-button" onClick={() => fetchPresidentialResults(electionId)}>
                            Tentar novamente
                        </button>
                    </div>
                ) : (
                    <div className="candidates-content">
                        <div className="candidate-summary-section">
                            <h2>Resumo dos Candidatos</h2>
                            {Object.keys(groupedByCandidate).length > 0 ? (
                                <div className="candidates-summary">
                                    {Object.entries(groupedByCandidate)
                                        .sort(([,a], [,b]) => b.totalVotes - a.totalVotes)
                                        .map(([candidateName, candidateData]) => (
                                        <div key={candidateName} className="candidate-summary-card">
                                            <h3 className="candidate-summary-name">{candidateData.candidateName}</h3>
                                            <p className="candidate-summary-party">{candidateData.organisationName}</p>
                                            <p className="candidate-summary-stats">
                                                <strong>Total de votos:</strong> {formatNumber(candidateData.totalVotes)}
                                            </p>
                                            <p className="candidate-summary-stats">
                                                <strong>Distritos vencidos:</strong> {candidateData.districts.length}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-data">
                                    <p>Nenhum resultado encontrado</p>
                                </div>
                            )}
                        </div>

                        {/* Resultados por Distrito */}
                        <div className="district-section">
                            <h2>Vencedores por Distrito</h2>
                            {Object.keys(groupedByDistrict).length > 0 ? (
                                Object.entries(groupedByDistrict).map(([district, results]) => (
                                    <div key={district} className="district-group">
                                        <h3 className="district-name">
                                            {district}
                                        </h3>
                                        <div className="candidates-list">
                                            {results.map((result, index) => (
                                                <div key={index} className="candidate-item presidential-result">
                                                    <span className="candidate-name">{result.candidateName}</span>
                                                    <span className="candidate-party">{result.organisationName}</span>
                                                    <span className="candidate-votes">{formatNumber(result.votes)} votos ({result.percentage}%)</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-data">
                                    <p>Nenhum resultado encontrado</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
