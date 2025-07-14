import {useState, useEffect} from "react";
import {useUserContext} from "../../services/UserContext";
import {useNavigate} from "react-router-dom";
import api from "../../services/api";
import Districts from "../../components/specific/Map/Districts";
import Municipalities from "../../components/specific/Map/municipalities";
import Islands from "../../components/specific/Map/Islands";
import "./css/Results.css";

export default function Results() {
    const {logout} = useUserContext();
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [resultsData, setResultsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mapView, setMapView] = useState("districts"); // "districts" ou "municipalities"

    const [electionId, setElectionId] = useState(1);

    useEffect(() => {
        fetchElectionResults();
    }, [electionId]);

    const fetchElectionResults = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/Elections/${electionId}/results/legislative`);
            setResultsData(response.data);
        } catch (err) {
            console.error("Erro ao buscar resultados:", err);
            setError("Erro ao carregar resultados da eleição");
        } finally {
            setLoading(false);
        }
    };

    const handleDistrictClick = (districtId) => {
        setSelectedDistrict(districtId);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('pt-PT').format(number);
    };

    const calculateAbstention = () => {
        if (!resultsData) return "0%";
        const total = resultsData.totalVotes || 0;
        const abstention = resultsData.abstention || 0;
        const percentage = total > 2500 ? ((abstention / (total + abstention)) * 100).toFixed(2) : 0;
        return `${percentage}%`;
    };

    return (
        <div className="results-container">
            <div className="results-main">
                <h1 className="results-title">Resultados legislativas</h1>
                <div className="map-view-toggle">
                    <button
                        onClick={() => setMapView("districts")}
                        className={mapView === "districts" ? "active" : ""}
                    >
                        Ver por Distritos
                    </button>
                    <button
                        onClick={() => setMapView("municipalities")}
                        className={mapView === "municipalities" ? "active" : ""}
                    >
                        Ver por Municípios
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <div>
                        {mapView === "districts" ? <Districts onDistrictClick={handleDistrictClick} /> : <Municipalities districtId={selectedDistrict} />}
                        <Islands />
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