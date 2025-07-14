import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Districts from "./Districts";
import concelhosZonas from "./data/concelhos_zonas.json";

const LegislativeResultsMap = ({ electionId }) => {
    const [districtColors, setDistrictColors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError("");
            try {
                const { data } = await api.get(`/Elections/${electionId}/results/legislative`);
                const colors = {};
                data.forEach((district) => {
                    if (!district.results || district.results.length === 0) return;
                    const sorted = [...district.results].sort((a, b) => b.votes - a.votes);
                    const winner = sorted[0];
                    const zona = concelhosZonas.find(z => z.nome === district.districtName);
                    if (zona && winner.color) {
                        colors[zona.id] = winner.color;
                    }
                });
                setDistrictColors(colors);
            } catch (err) {
                setError("Erro ao carregar resultados legislativos.");
            } finally {
                setLoading(false);
            }
        };
        if (electionId) fetchResults();
    }, [electionId]);

    if (loading) return <div>A carregar mapa...</div>;
    if (error) return <div>{error}</div>;

    return <Districts districtColors={districtColors} />;
};

export default LegislativeResultsMap;

