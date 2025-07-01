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
        <MainLayout style={{paddingBlock: "100px"}}>
            <HalfLogo/>
            <div className="steps-container">
                <h1 style={{fontSize:"25px"}}>Selecione uma eleição:</h1>

                {loadingData ? (
                    <p>A carregar...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {activeElection.map((election) => (
                            <div key={election.id} className={"step"} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBlock:"30px"}}>
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
                                {selectedOption === election.id.toString() && (<button type="submit">Prosseguir</button>)}
                            </div>
                        ))}
                        {/*<div className="button-wrapper">*/}
                        {/*    <button type="submit">Prosseguir</button>*/}
                        {/*</div>*/}
                    </form>
                    )}
                <h1 style={{fontSize:"25px"}}>Próximas Eleições:</h1>
                <div className={"steps-container"} style={{width:"1000px"}}>
                    <section className="steps-list" style={{width:"1000px"}}>
                        {elections.map((election) => (
                            <div className={"step"} style={{width:"1000px"}}>
                                <p key={election.id}> {election.name} </p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </MainLayout>
);
};

export default SelectElectionPage;
