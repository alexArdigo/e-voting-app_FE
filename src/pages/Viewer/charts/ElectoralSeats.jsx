import React, {useRef, useEffect, useState} from "react";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// ChartJS.register(ChartDataLabels);
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    DoughnutController,
    ArcElement
} from "chart.js";
import api from "../../../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DoughnutController, ArcElement);

const ElectoralSeats = () => {
    const [seats, setSeats] = useState("");
    const [year, setYear] = useState("2025");
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

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


    const graphicsData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                    "rgba(255,99,132)",
                    "rgba(54,162,235)",
                    "rgba(255,206,86)",
                    "rgba(75,192,192)",
                    "rgba(153,102,255)",
                    "rgba(255,159,64)"
                ],
                borderWidth: 1,
                borderRadius: 1,
                minBarLength: 2
            }
        ]
    };


    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d"); // obtém o contexto do canvas

        if (chartRef.current) {
            chartRef.current.destroy(); // limpa gráfico anterior, se existir
        }

        chartRef.current = new ChartJS(ctx, {
            type: "doughnut",
            data: graphicsData,
            options: {
                responsive: true,
                circumference: 180,
                rotation: -90,
                scales: {
                    x: {
                        display: false,
                        grid: {display: false},
                    },
                    y: {
                        display: false,
                        grid: {display: false},
                        beginAtZero: true
                    }
                }
            }
        });

        // cleanup (optional mas recomendado pelo chat)
        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, []);

    return (
        <div>
            <h2>Gráficos de Teste</h2>
            <canvas ref={canvasRef} ></canvas>
        </div>
    );
};

export default ElectoralSeats;
