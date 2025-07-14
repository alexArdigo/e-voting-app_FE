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
    const [seats, setSeats] = useState({});
    const [year, setYear] = useState("2026");
    const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
    const yearNames = {
        "2021": "Eleições Legislativas 2021",
        "2022": "Eleições Legislativas 2022",
        "2023": "Eleições Legislativas 2023",
        "2024": "Eleições Legislativas 2024",
        "2025": "Eleições Legislativas 2025",
        "2026": "Eleições Legislativas 2026"
    };
    const canvasRef = useRef(null);
    const chartRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/Elections/results/legislative/seats", {
                    params: {
                        year: year
                    }
                });
                setSeats(response.data);

            }catch (e){
                console.error("Erro", e);
            }
        };
        fetchData();
    }, [year]);

    const parties = Object.keys(seats);
    const nrSeats = Object.values(seats);


    const graphicsData = {
        labels: parties,
        datasets: [
            {
                label: "Lugares Assembleia da República",
                data: nrSeats,
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
        if (!canvasRef.current || Object.keys(seats).length === 0) return;
        const ctx = canvasRef.current.getContext("2d"); // obtém o contexto do canvas

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new ChartJS(ctx, {
            type: "doughnut",
            data: graphicsData,
            options: {
                responsive: true,
                circumference: 180,
                rotation: -90,
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom"
                    },
                },
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
    }, [graphicsData, seats, year]);

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

            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default ElectoralSeats;
