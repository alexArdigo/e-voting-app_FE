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
                const legislativeResponse = await api.get("/elections/legislative");
                const legislatives = legislativeResponse.data;

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
                            backgroundColor: "rgba(75, 192, 192, 0.5)"
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
                <Bar options={config} data={chartData} height={200} />
            </div>
        </div>
    );
};

export default GlobalLegislativeResultsPerYear;
