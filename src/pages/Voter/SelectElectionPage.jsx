import React, { useEffect, useState } from 'react';
import HalfLogo from "../../components/common/HalfLogo.jsx";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import { toast } from "react-toastify";
import {
    getActiveElections,
    getNotActiveElections,
    voterHasVotedElectionList
} from "../../services/ElectionService";
import { useUserContext } from "../../services/UserContext";

const SelectElectionPage = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [elections, setElections] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [loadingData, setLoadingData] = useState(true);
    const [activeElection, setActiveElection] = useState([]);
    const [voterVotedList, setVoterVotedList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const upcoming = await getNotActiveElections();
                setElections(upcoming);

                const active = await getActiveElections();
                setActiveElection(active);

                const votedList = await voterHasVotedElectionList(user);
                setVoterVotedList(votedList);

            } catch (error) {
                console.error('Erro ao carregar eleições:', error);
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
        <MainLayout>
            <div className="steps-container" style={{width: "60vw", marginInline: "auto"}}>
                <h1 style={{fontSize: "25px"}}>Selecione uma eleição:</h1>
                {loadingData ? (
                    <p>A carregar...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {activeElection
                            .filter(e =>
                                e.electionType === 'PRESIDENTIAL' ||
                                (e.electionType === 'LEGISLATIVE' &&
                                    e.name.toLowerCase().includes(user.district.districtName.toLowerCase()))
                            )
                            .map((election) => (
                                <div key={election.id} className={"step"} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBlock: "30px",
                                    width: "inherit",
                                    marginInline: "auto"
                                }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="election"
                                            value={election.id}
                                            checked={selectedOption === election.id.toString()}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            style={{ marginRight: "10px" }}
                                            disabled={voterVotedList.includes(election.id)}
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
                <div className={"steps-container"} style={{ width: "inherit" }}>
                    <section className="steps-list">
                        {elections
                            .filter(e =>
                                e.electionType === 'PRESIDENTIAL' ||
                                (e.electionType === 'LEGISLATIVE' &&
                                    e.name.toLowerCase().includes(user.district.districtName.toLowerCase()))
                            )
                            .map((election) => (
                                <div className={"step"} key={election.id}>
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