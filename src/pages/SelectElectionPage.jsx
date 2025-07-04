import React, { useEffect, useState } from 'react';
import HalfLogo from "../components/common/HalfLogo.jsx";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { toast } from "react-toastify";
import {
    getActiveElections,
    getNotActiveElections
} from "../services/ElectionService"

const SelectElectionPage = () => {
    const navigate = useNavigate();
    const [elections, setElections] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [loadingData, setLoadingData] = useState(true);
    const [activeElection, setActiveElection] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const upcoming = await getNotActiveElections();
                setElections(upcoming);

                const active = await getActiveElections();
                setActiveElection(active);
            } catch (e) {
                console.error(e);
                toast.error("Erro ao carregar eleições.");
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
        navigate("/confirm", {
            state: {
                selectedElectionId: selectedElection?.id,
                selectedElectionName: selectedElection?.name
            }
        });
    };

    return (
        <MainLayout style={{ paddingBlock: "100px" }}>
            <HalfLogo />
            <div className="steps-container">
                <h1 style={{ fontSize: "25px" }}>Selecione uma eleição:</h1>

                {loadingData ? (
                    <p>A carregar...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {activeElection
                            .filter(e => e && e.id && e.name)
                            .map((election) => (
                                <div key={election.id} className={"step"} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBlock: "30px",
                                    width: "1000px"
                                }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="election"
                                            value={election.id}
                                            checked={selectedOption === election.id.toString()}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            style={{ marginRight: "10px" }}
                                        />
                                        {election.name}
                                    </label>
                                </div>
                            ))}
                        <div className="button-wrapper">
                            <button className="vote-button" type="submit" disabled={!selectedOption}>Prosseguir</button>
                        </div>
                    </form>
                )}

                <h1 style={{ fontSize: "25px" }}>Próximas Eleições:</h1>
                <div className={"steps-container"} style={{ width: "1000px" }}>
                    <section className="steps-list" style={{ width: "1000px" }}>
                        {elections.map((election) => (
                            <div className={"step"} key={election.id} style={{ width: "1000px" }}>
                                <p>{election.name}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};

export default SelectElectionPage;
