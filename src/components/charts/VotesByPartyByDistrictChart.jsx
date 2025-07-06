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
import SideBar from "../../pages/Viewer/SideBar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const VotesByPartyByDistrictChart = ({ electionName, electionId }) => {
    const [chartData, setChartData] = useState(null);
    const [districtName, setDistrictName] = useState("Aveiro");


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

                const orgResponse = await api.get("/parties");
                const organisations = orgResponse.data;

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
                        voteCounts.push(res.data);
                    } catch (e) {
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
        <div>
            <h2>Distribuição de Votos por Partido</h2>
            <Bar options={config} data={chartData} />
        </div>
    );
};

export default VotesByPartyByDistrictChart;
