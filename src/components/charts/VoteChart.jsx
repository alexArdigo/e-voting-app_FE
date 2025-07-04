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
import api from "../../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const VoteChart = ({ electionName, electionId }) => {
    const [chartData, setChartData] = useState(null);


    const config = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Distribuição de Votos por Partido' },

        }
    };

    useEffect(() => {
        const data = async () => {
            try {
                console.log("Election ID:", electionId);
                console.log("Election Name:", electionName);

                const orgResponse = await api.get("/organisations");
                const organisations = orgResponse.data;

                if (!Array.isArray(organisations)) {
                    console.error("Resposta inesperada de /organisations:", organisations);
                    return;
                }

                const partyNames = organisations.map(org => org.organisationName);
                console.log("Partidos encontrados:", partyNames);

                const voteCounts = [];

                for (const party of partyNames) {
                    try {
                        const res = await api.get("/total-votes-by-party-by-district", {
                            params: {
                                partyName: party,
                                districtName: "Aveiro"
                            }
                        });
                        console.log(`${party}: ${res.data} votos`);
                        voteCounts.push(res.data);
                    } catch (err) {
                        console.warn(`Erro ao buscar votos para ${party}:`, err.response?.data || err.message);
                        voteCounts.push(0); // adiciona 0 se der erro
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

        if (electionId) {
            data();
        }
    }, [electionId]);

    if (!chartData) return <p>A carregar gráfico...</p>;

    return (
        <div style={{ width: "600px", margin: "0 auto" }}>
            <h2>Distribuição de Votos por Partido</h2>
            <Bar options={config} data={chartData} />
        </div>
    );
};

export default VoteChart;
