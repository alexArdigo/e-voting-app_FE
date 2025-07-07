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
import SideBar from "../SideBar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const VotesByPartyByDistrictChart = ({ electionName }) => {
    const [chartData, setChartData] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("Aveiro");
    const [year, setYear] = useState("2025");
    const years = ["2021", "2022", "2023", "2024", "2025"];



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
                const orgResponse = await api.get("/parties");
                const organisations = orgResponse.data;
                const partyNames = organisations.map(org => org.organisationName);
                console.log("Partidos encontrados:", partyNames);

                //DISTRICTS
                const districtResponse = await api.get("/districts");
                const districts = districtResponse.data;
                const districtNames = districts.map(district => district.districtName);
                console.log("Distritos encontrados:", districtNames);
                setDistricts(districtNames);

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


        data();

    }, [selectedDistrict, year]);

    if (!chartData) return <p>A carregar gráfico...</p>;

    return (
        <div>
            <h2>Distribuição de Votos por Partido</h2>
            <Bar options={config} data={chartData} />


            <div>
                <label htmlFor="district-select">Seleciona o ano:</label>
                <select
                    id="year-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}>
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>

            </div>


            <div>
                <label htmlFor="district-select">Seleciona o distrito:</label>
                <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}>
                    {districts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default VotesByPartyByDistrictChart;
