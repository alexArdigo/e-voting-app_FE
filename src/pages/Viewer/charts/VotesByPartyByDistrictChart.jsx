import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import api from "../../../services/api";
import {getLegislativeElections} from "../../../services/ElectionService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const VotesByPartyByDistrictChart = ({ electionName }) => {
    const [chartData, setChartData] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    const [yearNames, setYearNames] = useState({});


    const config = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Distribuição de Votos por Partido por Distrito' },

        }
    };

    useEffect(() => {
        const data = async () => {
            try {

                //PARTIES
                const orgResponse = await api.get("/cleanParties");
                const organisations = orgResponse.data;

                const partyNames = [... new Set(organisations.map(org => org.organisationName))]; //temporary até resolver o problema de duplicados!!


                //DISTRICTS
                const districtResponse = await api.get("/districts");
                const districts = districtResponse.data;
                const districtNames = districts.map(district => district.districtName);
                setDistricts(districtNames);
                if (!selectedDistrict && districtNames.length > 0) {
                    setSelectedDistrict(districtNames[0]);
                }


                //LEGISLATIVES
                const legislatives = await getLegislativeElections(null, false);

                const legislativeName = {};
                const legislativeYears = [];

                legislatives.forEach(legislative => {
                    const year = legislative.startDate.slice(0, 4);
                    legislativeYears.push(year);
                    legislativeName[year] = legislative.name;
                });

                setYears(legislativeYears);
                setYearNames(legislativeName);

                if (!year && legislativeYears.length > 0) {
                    setYear(legislativeYears[0]);
                }


                if (!year) return;
                const voteCounts = [];

                for (const party of partyNames) {
                    try {
                        const res = await api.get("/total-votes-by-party-by-district", {
                            params: {
                                partyName: party,
                                districtName: selectedDistrict || districtNames[0],
                                year: year
                            }
                        });
                        voteCounts.push(res.data);
                    } catch (e) {
                        voteCounts.push(0);
                    }
                }

                setChartData({
                    labels: partyNames,
                    datasets: [
                        {
                            label: "Votos por Partido e Distrito",
                            data: voteCounts,
                            backgroundColor: "rgba(75, 192, 192, 0.5)"
                        }
                    ]
                });

            } catch (e) {
                console.error("Erro", e);
            }
        };

        data();

    }, [selectedDistrict, year]);

    if (!chartData) return <p>A carregar gráfico...</p>;

    return (
        <div className="chart-container">

            <div className="year-select-container">
                <label htmlFor="year-select" className="year-select-label">
                    Seleciona o ano:
                </label>
                <select
                    id="year-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="year-select"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {yearNames[y]}
                        </option>
                    ))}
                </select>
            </div>

            <div className="district-select-container">
                <label htmlFor="district-select" className="district-select-label">
                    Seleciona o distrito:
                </label>
                <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="district-select"
                >
                    {districts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>
            </div>

            <Bar options={config} data={chartData} height={200} />
        </div>
    );
};

export default VotesByPartyByDistrictChart;
