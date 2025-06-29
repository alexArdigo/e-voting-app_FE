import React, { useEffect, useState } from 'react';
import MainLayout from "./MainLayout.jsx";
import HalfLogo from "./HalfLogo.jsx";
import { useNavigate } from "react-router-dom";
import api from "../services/api.jsx";

const SelectElectionPage = () => {
    const navigate = useNavigate();
    const [elections, setElections] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [loadingData, setLoadingData] = useState(true);
    const [activeElection, setActiveElection] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("/elections/all");
                setElections(response.data || []);
                const responseActive = await api.get("/election/active");
                setActiveElection(responseActive.data || []);

            } catch (e) {
                console.error(e);
            } finally {
                setLoadingData(false);
            }
        })();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedOption) {
            alert("Por favor selecione uma eleição.");
            return;
        }
        const selectedElection = activeElection.find(e => e.id.toString() === selectedOption);
        navigate("/confirm", { state: { selectedElectionName: selectedElection?.name } });
    };

    return (
        <MainLayout>
            <HalfLogo />
            <h2>Selecione a eleição</h2>

            {loadingData ? (
                <p>A carregar...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {activeElection.map((election) => (
                        <div key={election.id}>
                            <label>
                                <input
                                    type="radio"
                                    name="election"
                                    value={election.id}
                                    checked={selectedOption === election.id.toString()}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                {election.name}
                            </label>
                        </div>
                    ))}
                    <button type="submit">Avançar</button>
                </form>
            )}
            <div>
                {elections.map((election) => (
                    <p key={election.id}>{election.name}</p>
                ))}
            </div>
        </MainLayout>
    );
};

export default SelectElectionPage;
