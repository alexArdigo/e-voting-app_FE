import React, { useRef, useEffect } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DoughnutController, ArcElement);

const ChartDefaultContainer = () => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);


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

        // cleanup
        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, []);

    return (
        <div style={{ width: "600px", margin: "0 auto" }}>
            <h1>Gráficos de Teste</h1>
            <canvas ref={canvasRef} ></canvas>
        </div>
    );
};

export default ChartDefaultContainer;
