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
import StyledContainer from "../../../layouts/StyledContainer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GlobalLegislativeResultsPerYear = () => {
    const [chartData, setChartData] = useState(null);

    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    const [yearNames, setYearNames] = useState({});

    const config = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Distribuição de Votos por Partido por Ano' },
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orgResponse = await api.get("/cleanParties");
                const organisations = orgResponse.data;
                const partyNames = [... new Set(organisations.map(org => org.organisationName))];



                //LEGISLATIVES YEARS
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
                        const res = await api.get("/stats/year/partyName", {
                            params: {
                                partyName: party,
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
                            label: "Votos por Partido",
                            data: voteCounts,
                            backgroundColor: [
                                "rgba(64, 174, 97)",
                                "rgba(196, 233, 164)",
                                "rgba(112, 154, 197)",
                                "rgba(185, 215, 226)",
                                "rgba(237, 181, 23)",
                                "rgba(240, 213, 156)",
                                "rgba(239, 98, 108)",
                                "rgba(244, 165, 166)",
                                "rgba(166, 144, 188)",
                                "rgba(215, 210, 231)",
                                "rgba(142, 224, 210)",
                                "rgba(197, 245, 228)",
                                "rgba(61, 120, 125)",
                                "rgba(140, 205, 205)",
                                "rgba(241, 156, 199)",
                                "rgba(250, 214, 231)",
                                "rgba(241, 122, 33)",
                                "rgba(255, 194, 158)",
                                "rgba(172, 122, 92)",
                                "rgba(222, 197, 180)"]
                        }
                    ]
                });

            } catch (e) {
                console.error("Erro", e);
            }
        };

        fetchData();
    }, [year]);

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
                    {Object.keys(yearNames).map((y) => (
                        <option key={y} value={y}>{yearNames[y]}</option>
                    ))}
                </select>
            </div>

            <div className="chart-bar-container">
                <Bar options={config} data={chartData} height={220} />
            </div>
        </div>
    );
};

export default GlobalLegislativeResultsPerYear;
