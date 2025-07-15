import {useEffect, useState} from "react";
import {usePresidentialElections} from "../../hooks/usePresidentialElections";
import {usePresidentialResults} from "../../hooks/usePresidentialResults";
import {usePresidentialResultsProcessor} from "../../hooks/usePresidentialResultsProcessor";
import "./css/ElectedCandidates.css";

export default function ElectedPresidential() {
    const {allPresidentialElections, loading: electionsLoading, error: electionsError} = usePresidentialElections();
    const {presidentialResultsData, loading, error, fetchPresidentialResults} = usePresidentialResults();
    const [electionId, setElectionId] = useState(null);
    const resultsArray = presidentialResultsData?.results || [];
    const {candidatesData, electionWinner} = usePresidentialResultsProcessor(resultsArray);

    useEffect(() => {
        if (allPresidentialElections.length > 0) {
            const firstElectionId = allPresidentialElections[0].id;
            setElectionId(firstElectionId);
        }
    }, [allPresidentialElections]);

    useEffect(() => {
        if (electionId) {
            fetchPresidentialResults(electionId);
        }
    }, [electionId]);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('pt-PT').format(number);
    };

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
                            {candidatesData.length > 0 ? (
                                <div className="candidates-summary">
                                    {candidatesData
                                        .sort((a, b) => b.totalVotes - a.totalVotes)
                                        .map((candidate) => (
                                            <div key={candidate.candidateName} className="candidate-summary-card">
                                                <h3 className="candidate-summary-name">{candidate.candidateName}</h3>
                                                <p className="candidate-summary-stats">
                                                    <strong>Total de
                                                        votos:</strong> {formatNumber(candidate.totalVotes)}
                                                </p>
                                                <p className="candidate-summary-stats">
                                                    <strong>Percentagem do total:</strong> {candidate.totalPercentage}%
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

                        {electionWinner && (
                            <div className="election-winner-section">
                                <h2>Vencedor da Eleição</h2>
                                <div className="election-winner-card">
                                    <h3 className="election-winner-name">{electionWinner.candidateName}</h3>
                                    <p className="election-winner-party">{electionWinner.organisationName}</p>
                                    <p className="election-winner-stats">
                                        <strong>Total de votos:</strong> {formatNumber(electionWinner.totalVotes)}
                                    </p>
                                    <p className="election-winner-stats">
                                        <strong>Percentagem do total:</strong> {electionWinner.totalPercentage}%
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
