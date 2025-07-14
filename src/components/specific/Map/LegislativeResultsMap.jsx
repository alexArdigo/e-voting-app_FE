import React, {useEffect, useState} from "react";
import api from "../../services/api";
import Districts from "./Districts";

const LegislativeResultsMap = ({electionId}) => {
    const [districtColors, setDistrictColors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const districtMapping = {
        "Viana do Castelo": "31",
        "Braga": "32",
        "Porto": "33",
        "Vila Real": "34",
        "Bragança": "35",
        "Aveiro": "36",
        "Viseu": "37",
        "Guarda": "38",
        "Coimbra": "39",
        "Leiria": "40",
        "Castelo Branco": "41",
        "Santarém": "42",
        "Portalegre": "43",
        "Lisboa": "44",
        "Setúbal": "45",
        "Évora": "46",
        "Beja": "47",
        "Faro": "48",
        "Açores": "49",
        "Madeira": "50"
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (!electionId) return;

            setLoading(true);
            setError("");

            try {

                const {data} = await api.get(`/Elections/${electionId}/results/legislative`);

                const colors = {};

                data.forEach((district) => {
                    if (!district.results || district.results.length === 0) return;


                    const sorted = [...district.results].sort((a, b) => b.votes - a.votes);
                    const winner = sorted[0];

                    const svgId = districtMapping[district.districtName];

                    if (svgId && winner.color) {
                        colors[svgId] = winner.color;
                    } else {
                        console.warn(`Não foi possível mapear distrito: ${district.districtName}`);
                    }
                });

                setDistrictColors(colors);

            } catch (err) {
                console.error("Erro ao carregar resultados:", err);
                setError("Erro ao carregar resultados legislativos.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [electionId]);

    if (loading) return <div>A carregar mapa...</div>;
    if (error) return <div>{error}</div>;

    return <Districts districtColors={districtColors}/>;
};

export default LegislativeResultsMap;