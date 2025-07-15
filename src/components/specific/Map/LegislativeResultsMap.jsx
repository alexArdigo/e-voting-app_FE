import React, {useEffect, useState} from "react";
import Districts from "./Districts";
import api from "../../../services/api";
import Islands from "./Islands";

const LegislativeResultsMap = ({electionId}) => {
    const [districtColors, setDistrictColors] = useState({});
    const [islandColors, setIslandColors] = useState({});
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
    };

    const islandMapping = {
        "Madeira": ["377", "378", "379"],
        "Açores": ["380", "381", "382", "383", "384", "385", "386", "387", "388"]
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (!electionId) return;

            setLoading(true);
            setError("");

            try {
                const {data} = await api.get(`/Elections/${electionId}/results/legislative`);


                const continentColors = {};
                const islandsColors = {};

                data.forEach((district) => {

                    if (!district.results || district.results.length === 0) {
                        console.warn(`Distrito ${district.districtName} sem resultados`);
                        return;
                    }

                    const sorted = [...district.results].sort((a, b) => b.votes - a.votes);
                    const winner = sorted[0];

                    const svgId = districtMapping[district.districtName];
                    if (svgId && winner.color) {
                        continentColors[svgId] = winner.color;
                    }


                    const islandPaths = islandMapping[district.districtName];
                    if (islandPaths && winner.color) {

                        islandPaths.forEach(pathId => {
                            islandsColors[pathId] = winner.color;
                        });
                    }

                    if (!svgId && !islandPaths) {
                        console.warn(`Não foi possível mapear distrito: ${district.districtName}`);
                    }
                });


                setDistrictColors(continentColors);
                setIslandColors(islandsColors);

            } catch (err) {
                console.error("Erro ao carregar resultados:", err);
                setError("Erro ao carregar resultados legislativos.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [electionId]);

    if (loading) return <div>Loading map...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Districts districtColors={districtColors}/>
            <Islands islandColors={islandColors}/>
        </>
    )
}

export default LegislativeResultsMap;