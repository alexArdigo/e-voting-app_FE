import React, {useState} from 'react';


import {useNavigate, useLocation} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import StyledContainer from "../components/specific/StyledContainer.jsx";
import {toast} from "react-toastify";


const ConfirmElectionPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedElectionName = location.state.selectedElectionName;
    const [confirmed, setConfirmed] = useState(false);

    const handleCheckboxChange = () => {
        if (!confirmed) {
            toast("Pfv confirme que compreende as condições para votar.");
        } else {
            navigate("/ballot", {
                state: {
                    electionId: location.state.selectedElectionId,
                    electionName: selectedElectionName
                }
            });
        }
    }

    return (
        <>
            <MainLayout style={{justifyContent: "space-between"}}>
                <div >
                    <img src="public/images/image 4.png"></img>
                </div>

                <StyledContainer variant="transparent" className="dflxColumn" style={{paddingRight:"400px", marginTop: "0"}}>
                    <StyledContainer variant="tranparent" style={{paddingBlock: "100px"}}>
                        <p>Selecionou:</p>
                        <h1 style={{fontSize: "50px"}}>{selectedElectionName || "Nome da eleição não disponível"}</h1>
                    </StyledContainer>
                    <StyledContainer variant="warning" style={{width: "600px", justifyContent: "center"}}>
                        <p>Atenção! Ao clicar em “Votar” irá ser redirecionado para o seu boletim de voto eletrónico.
                            Terá 5 minutos para submeter o seu voto. </p>
                        <label>
                            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                <input style={{padding: "10px"}} type="checkbox" id="dataConfirmation"
                                       name="dataConfirmation" onChange={() => setConfirmed(!confirmed)}/>
                                <p> Compreendo </p>
                            </div>
                        </label>
                    </StyledContainer>
                    <div className={"button-wrapper"}>
                        <button
                            className="vote-button"
                            onClick={() => handleCheckboxChange()}
                        >
                            Votar
                        </button>

                    </div>
                </StyledContainer>

            </MainLayout>

        </>
    )
        ;
};

export default ConfirmElectionPage;