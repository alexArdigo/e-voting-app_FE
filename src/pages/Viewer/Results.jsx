import {useEffect, useState} from "react";

import { useElections } from "../../hooks/useElections";
import { useLegislativeResults } from "../../hooks/useLegislativeResults";
import { useVoteCalculations } from "../../hooks/useVoteCalculations";
import LegislativeResultsMap from "../../components/specific/Map/LegislativeResultsMap";
import Municipalities from "../../components/specific/Map/municipalities";

import "./css/Results.css";
import GlobalLegislativeResultsPerYear from "./charts/GlobalLegislativeResultsPerYear";
import StyledContainer from "../../layouts/StyledContainer";

export default function Results() {

    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const { allLegisElections, loading: electionsLoading, error: electionsError } = useElections();
    const { resultsData, partyWins, loading, error, fetchLegislativeResults } = useLegislativeResults();
    const { calculateAbstention, calculateBlankVotesPercentage } = useVoteCalculations();
    const [mapView, setMapView] = useState("districts");
    const [electionId, setElectionId] = useState(1);

    useEffect(() => {
        fetchLegislativeResults(electionId);
    }, [electionId]);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('pt-PT').format(number);
    };

    return (
        <>
        <div className="results-container">
            <div className="results-main">
                <h1 className="results-title">Resultados legislativas</h1>
                <div className="map-view-toggle">
                    <select
                        name="all-elections-dates"
                        id="all-elections-date"
                        value={electionId}
                        onChange={(e) => setElectionId(parseInt(e.target.value))}
                    >
                        {
                            allLegisElections.map(election => {
                                return <option key={election.id} value={election.id}>{election.name}</option>
                            })
                        }

                    </select>
                </div>
                <div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start'}}>
                    <div>
                        {mapView === "districts" ? <LegislativeResultsMap electionId={electionId}/> :
                            <Municipalities districtId={selectedDistrict}/>}
                    </div>
                </div>
            </div>

            <div className="results-stats">
                <h2 className="stats-title">Resultados</h2>
                {loading ? (
                    <div className="loading-container">
                        <p>A carregar resultados...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <h3>Erro</h3>
                        <p>{error}</p>
                        <button className="retry-button" onClick={() => fetchLegislativeResults(electionId)}>
                            Tentar novamente
                        </button>
                    </div>
                ) : resultsData ? (
                    <>
                        <div className="stat-item">
                            <span className="stat-label">Total de votos:</span>
                            <span className="stat-value">
                                {formatNumber(resultsData.totalVotes || 0)}
                            </span>
                        </div>

                        <div className="stat-item">
                            <span className="stat-label">Votos brancos:</span>
                            <span className="stat-value">
                                {formatNumber(resultsData.blankVotes || 0)} ({calculateBlankVotesPercentage(resultsData)})
                            </span>
                        </div>

                        <div className="stat-item">
                            <span className="stat-label">Abstenção:</span>
                            <span className="stat-value stat-percentage">
                                {calculateAbstention(resultsData)}
                            </span>
                        </div>

                        <div className="party-wins-section">
                            <h3 className="party-wins-title">Partidos Vencedores por Distrito</h3>
                            <div className="party-wins-list">
                                {partyWins.length > 0 ? (
                                    partyWins.map((win, index) => (
                                        <div key={index} className="party-win-item">
                                            <div
                                                className="party-color"
                                                style={{backgroundColor: win.color}}
                                            ></div>
                                            <span className="party-name">{win.party}</span>
                                            <span className="district-name">{win.district}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="loading-container">
                                        <p>Nenhum dado de partidos vencedores disponível</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="loading-container">
                        <p>Nenhum resultado disponível</p>
                    </div>
                )}
            </div>
        </div>
            <StyledContainer style={{paddingBlock: "100px"}}>
                <h1 className="results-title">Resultados legislativas - Numero de Votos Por Partido</h1>
            <GlobalLegislativeResultsPerYear></GlobalLegislativeResultsPerYear>
            </StyledContainer>
        </>
    );
}