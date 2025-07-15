import {useEffect, useState} from "react";

import api from "../../services/api";
import LegislativeResultsMap from "../../components/specific/Map/LegislativeResultsMap";
import Municipalities from "../../components/specific/Map/municipalities";

import "./css/Results.css";

export default function Results() {

    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [allLegisElections, setAllLegisElections] = useState([]);
    const [resultsData, setResultsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mapView, setMapView] = useState("districts");

    const [electionId, setElectionId] = useState(1);

    useEffect(() => {
        fetchAllNonActiveLegislativeElections();
        fetchElectionResults();
    }, [electionId]);

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

    const fetchElectionResults = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/elections/${electionId}/results/legislative`);
            setResultsData(response.data);
        } catch (err) {
            console.error("Error in fetching election results:", err);
            setError("Error in fetching election results");
        } finally {
            setLoading(false);
        }
    };


    const formatNumber = (number) => {
        return new Intl.NumberFormat('pt-PT').format(number);
    };

    const calculateAbstention = () => {
        if (!resultsData) return "0%";
        const total = resultsData?.totalVotes || 0;
        const abstention = resultsData?.abstention || 0;
        const percentage = total > 2500 ? ((abstention / (total + abstention)) * 100).toFixed(2) : 0;
        return `${percentage}%`;
    };

    return (
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
                        <button className="retry-button" onClick={fetchElectionResults}>
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
                                {formatNumber(resultsData.blankVotes || 0)}
                            </span>
                        </div>

                        <div className="stat-item">
                            <span className="stat-label">Abstenção:</span>
                            <span className="stat-value stat-percentage">
                                {calculateAbstention()}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="loading-container">
                        <p>Nenhum resultado disponível</p>
                    </div>
                )}
            </div>
        </div>
    );
}