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

const ResultadosLegislativasGlobaisPorAno = () => {
    const [chartData, setChartData] = useState(null);
    const [year, setYear] = useState("");
    const yearNames = {
        "2021": "Eleiçoes Legislativas 2021",
        "2022": "Eleições Legislativas 2022",
        "2023": "Eleições Legislativas 2023",
        "2024": "Eleições Legislativas 2024",
        "2025": "Eleições Legislativas 2025",
        "2026": "Eleições Legislativas 2026"
    };

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
        <div>
            <h2>Distribuição de Votos por Partido (Global)</h2>
            <Bar options={config} data={chartData} height={200} />

            <div>
                <label htmlFor="year-select">Seleciona o ano:</label>
                <select
                    id="year-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}>
                    {Object.keys(yearNames).map((y) => (
                        <option key={y} value={y}>{yearNames[y]}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ResultadosLegislativasGlobaisPorAno;
