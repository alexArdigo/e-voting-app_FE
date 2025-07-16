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
import {getLegislativeElections} from "../../../services/ElectionService";
import StyledContainer from "../../../layouts/StyledContainer";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DoughnutController, ArcElement);


const ElectoralSeats = () => {
    const [seats, setSeats] = useState({});
    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    const [yearNames, setYearNames] = useState({});
    const canvasRef = useRef(null);
    const chartRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
            try {

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
                    "rgba(64, 174, 97, 0.7)",
                    "rgba(196, 233, 164, 0.7)",
                    "rgba(112, 154, 197, 0.7)",
                    "rgba(185, 215, 226, 0.7)",
                    "rgba(237, 181, 23, 0.7)",
                    "rgba(240, 213, 156, 0.7)",
                    "rgba(239, 98, 108, 0.7)",
                    "rgba(244, 165, 166, 0.7)",
                    "rgba(166, 144, 188, 0.7)",
                    "rgba(215, 210, 231, 0.7)",
                    "rgba(142, 224, 210, 0.7)",
                    "rgba(197, 245, 228, 0.7)",
                    "rgba(61, 120, 125, 0.7)",
                    "rgba(140, 205, 205, 0.7)",
                    "rgba(241, 156, 199, 0.7)",
                    "rgba(250, 214, 231, 0.7)",
                    "rgba(241, 122, 33, 0.7)",
                    "rgba(255, 194, 158, 0.7)",
                    "rgba(172, 122, 92, 0.7)",
                    "rgba(222, 197, 180, 0.7)"
                ],
                borderColor: [
                    "rgba(255,255,255)"
                    // "rgba(54,162,235)",
                    // "rgba(255,206,86)",
                    // "rgba(75,192,192)",
                    // "rgba(153,102,255)",
                    // "rgba(255,159,64)"
                ],
                borderWidth: 1,
                borderRadius: 1,
                minBarLength: 2
            }
        ]
    };


    useEffect(() => {
        if (!canvasRef.current || Object.keys(seats).length === 0) return;
        const ctx = canvasRef.current.getContext("2d");

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

        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, [graphicsData, seats, year]);

    return (
        <div className="elected-candidates-container">
            <div className="elected-candidates-main">
            <div className="year-select-container">
                <label htmlFor="year-select" className="year-select-label" >
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
        </div>
    );
};

export default ElectoralSeats;
