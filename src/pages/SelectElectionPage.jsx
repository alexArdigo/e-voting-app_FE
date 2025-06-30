import React, {useEffect, useState} from 'react';
import HalfLogo from "../components/common/HalfLogo.jsx";
import {useNavigate} from "react-router-dom";
import api from "../services/api.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import {toast} from "react-toastify";

const SelectElectionPage = () => {
    const navigate = useNavigate();
    const [elections, setElections] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [loadingData, setLoadingData] = useState(true);
    const [activeElection, setActiveElection] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("/election/notactive");
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
            toast("Por favor selecione uma eleição.");
            return;
        }
        const selectedElection = activeElection.find(e => e.id.toString() === selectedOption);
        navigate("/confirm", {state: {selectedElectionName: selectedElection?.name}});
    };

    return (
        <MainLayout>
            <HalfLogo/>
            <div className="steps-container">
                <h1>Selecione a eleição</h1>

                {loadingData ? (
                    <p>A carregar...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {activeElection.map((election) => (
                            <div key={election.id} className={"step"}>
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
                        <div className="button-wrapper">
                            <button type="submit">Avançar</button>
                        </div>
                    </form>
                    )}
                <div className={"steps-container"}>
                    <h1>Próximas Eleições:</h1>
                    <div className={"step"}>
                        {elections.map((election) => (
                            <p key={election.id}>{election.name}</p>
                        ))}
                    </div>

                </div>
            </div>
        </MainLayout>
);
};

export default SelectElectionPage;
